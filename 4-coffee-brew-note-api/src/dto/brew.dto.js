import { z } from "zod";
import { registry } from "../openapi/registry.js";


export const BrewDTO = registry.register(
    "BrewDTO",
    z.object({
        beans: z.string().min(3).max(40).openapi({ example: "Colombian Supremo" }),
        method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']).openapi({ example: 'v60' }),
        rating: z.number().min(1).max(5).optional().openapi({ example: 5 }),
        notes: z.string().max(200).optional().openapi({ example: "Smooth and rich flavor with hints of chocolate." }),
        brewedAt: z.string().datetime().optional().openapi({ example: "2023-10-01T10:00:00Z" }),
    }).openapi("BrewDTO")
);
