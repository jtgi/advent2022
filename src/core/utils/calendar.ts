import moment from "moment-timezone"
import { gSSP } from "src/blitz-server"
import { fetchTimezone } from "src/core/utils/timezone"
import getDays from "src/days/queries/getDays"

export const fetchCalendarSSR = gSSP<any, any, any>(async ({ req, res, query, ctx }) => {
  const day = query.day ? parseInt(query.day as string) : -1
  const forwarded = req.headers["x-forwarded-for"]
  let ip =
    process.env.FAKE_IP ??
    (typeof forwarded === "string" ? forwarded.split(/, /)[0] : req.socket.remoteAddress)
  let tz = (ip && (await fetchTimezone(ip))) || "America/Los_Angeles"

  const start = moment.utc(process.env.BEGIN_DATE)
  const today = process.env.FAKE_TODAY ? moment.utc(process.env.FAKE_TODAY) : moment.utc()
  const ready = today.tz(tz).isSameOrAfter(start.tz(tz), "day")

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

  console.warn(days.map((d) => ({ date: d.date, coffee: d.coffee })))

  res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")

  return {
    props: {
      days,
      ready,
      targetDay: day === -1 ? today.date() : Math.min(today.date(), day),
    },
  }
})
