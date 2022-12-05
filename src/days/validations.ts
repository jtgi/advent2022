import { z } from "zod";

export const UpdateDay = z.object({
  id: z.number(),
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  processing: z.any().optional(),
  roasterLink: z.any().optional(),
  day: z.number(),
  coffeeLink: z.any().optional(),
  videoLink: z.any().optional(),
})

export const CreateDay = z.object({
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  day: z.number(),
  roasterLink: z.any().optional(),
  processing: z.any().optional(),
  coffeeLink: z.any().optional(),
  videoLink: z.any().optional(),
})
