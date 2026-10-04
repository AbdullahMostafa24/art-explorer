import { z } from "zod";

const idFromUrl = (url: string) => Number(url.split("/").filter(Boolean).pop());

export const pokemonSummarySchema = z
    .object({ name: z.string(), url: z.string() })
    .transform(({ name, url }) => ({ id: idFromUrl(url), name }));

export const pokemonListSchema = z.object({
    count: z.number(),
    results: z.array(pokemonSummarySchema),
});

export type PokemonSummary = z.infer<typeof pokemonSummarySchema>;