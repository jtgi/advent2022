import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetDaysInput
  extends Pick<Prisma.DayFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetDaysInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: days,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.day.count({ where }),
    query: (paginateArgs) => db.day.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    days,
    nextPage,
    hasMore,
    count,
  }
})
