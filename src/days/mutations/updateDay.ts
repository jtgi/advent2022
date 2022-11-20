import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateDay } from "src/pages/days/validations";

export default resolver.pipe(
  resolver.zod(UpdateDay),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const day = await db.day.update({ where: { id }, data });

    return day;
  }
);
