import moment from "moment-timezone"
import { gSSP } from "src/blitz-server"
import { fetchTimezone } from "src/core/utils/timezone"
import getDays from "src/days/queries/getDays"

export const fetchCalendarSSR = gSSP<any, any, any>(async ({ req, query, ctx }) => {
  const day = query.day ? parseInt(query.day as string) : -1
  const forwarded = req.headers["x-forwarded-for"]
  let ip =
    process.env.FAKE_IP ??
    (typeof forwarded === "string" ? forwarded.split(/, /)[0] : req.socket.remoteAddress)
  let tz = (ip && (await fetchTimezone(ip))) || "America/Los_Angeles"

  const start = moment.tz(process.env.BEGIN_DATE, tz)
  const today = process.env.FAKE_TODAY ? moment.tz(process.env.FAKE_TODAY, tz) : moment.tz(tz)
  const ready = today.isSameOrAfter(start, "day")

  console.warn({ start, today, ready, tz, ip })

  if (!ready) {
    return {
      props: {
        days: [],
        ready: false,
        targetDay: -1,
      },
    }
  }

  const { days } = await getDays(
    {
      where: {
        AND: [{ date: { gte: start.toDate() } }, { date: { lte: today.toDate() } }],
      },
      skip: undefined,
      orderBy: undefined,
      take: undefined,
    },
    ctx
  )

  //TODO: y u no work; days is off by one
  return {
    props: {
      days,
      ready,
      targetDay: day === -1 ? today.date() : Math.min(today.date(), day),
    },
  }
})
