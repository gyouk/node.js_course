import { z } from "zod";
import { registry } from "../openapi/registry.js";

export const ErrorDTO = registry.register(
    "ErrorDTO",
    z.object({
        error: z.string().openapi({ example: "Validation error" }),
        details: z.array(z.any()).openapi({ example: [] }),
    }).openapi("ErrorDTO")
);
