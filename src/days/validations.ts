import { z } from "zod";

export const UpdateDay = z.object({
  id: z.number(),
  date: z.date(),
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  roasterLink: z.string().url()
});

export const CreateDay = z.object({
  date: z.date(),
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  roasterLink: z.string().url()
});
