import { z } from "zod";

export const UpdateDay = z.object({
  id: z.number(),
  date: z.date(),
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  processingMethod: z.any().optional(),
  roasterLink: z.any().optional(),
  coffeeLink: z.any().optional(),
  videoLink: z.any().optional(),
})

export const CreateDay = z.object({
  date: z.date(),
  roaster: z.string(),
  location: z.string(),
  coffee: z.string(),
  tastingNotes: z.string(),
  varieties: z.string(),
  roasterLink: z.any().optional(),
  processingMethod: z.any().optional(),
  coffeeLink: z.any().optional(),
  videoLink: z.any().optional(),
})
