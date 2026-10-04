import "server-only"
import { pokemonListSchema } from "./schemas";

const BASE = "https://pokeapi.co/api/v2";

export class PokeApiError extends Error {
    constructor(public status: number) {
        super(`PokeAPI responded with ${status}`);
    }
}

export async function listPokemon({ page = 1, limit = 24 } = {}) {
    const offset = (page - 1) * limit;
    const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`, {
        next: { revalidate: 86400, tags: ["pokemon"] },
    });
    if (!res.ok) throw new PokeApiError(res.status);
    const { count, results } = pokemonListSchema.parse(await res.json());
    return { results, totalPages: Math.ceil(count / limit) };
}

export function artworkUrl(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}