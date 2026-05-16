import { z } from "zod";

export const geocodeSchema = z.array(z.object({
  name: z.string(),

  local_names: z
    .object({
      ascii: z.string().optional(),
      feature_name: z.string().optional(),
    })
    .catchall(z.string()) // allows dynamic language codes like "en", "hi", etc.
    .optional(),

  lat: z.number(),
  lon: z.number(),

  country: z.string(),
  state: z.string().optional(),
}));