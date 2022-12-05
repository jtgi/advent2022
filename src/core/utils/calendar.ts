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

  let tz = req.headers["x-vercel-ip-timezone"] as string
  if (!tz) {
    tz = ip && (await fetchTimezone(ip))
  }
  if (!tz) {
    tz = "America/Los_Angeles"
  }

  const start = moment.utc(process.env.BEGIN_DATE)
  const today = process.env.FAKE_TODAY ? moment.utc(process.env.FAKE_TODAY) : moment.utc()
  const ready = today.tz(tz).isSameOrAfter(start.tz(tz), "day")

  console.warn({ start, startTz: start.tz(tz), today, todayTz: today.tz(tz), ready, tz, ip })

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
      where: {},
      skip: undefined,
      orderBy: { day: "asc" },
      take: 24,
    },
    ctx
  )

  days.forEach((d) => console.warn(d.date, d.coffee))

  return {
    props: {
      days,
      ready,
      targetDay: day,
    },
  }
})
