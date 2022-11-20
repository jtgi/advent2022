import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteDay = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteDay),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const day = await db.day.deleteMany({ where: { id } });

    return day;
  }
);
