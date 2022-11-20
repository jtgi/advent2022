import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateDay } from "src/pages/days/validations";

export default resolver.pipe(
  resolver.zod(CreateDay),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const day = await db.day.create({ data: input });

    return day;
  }
);
