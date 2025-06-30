import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry.js";
import "../dto/brew.dto.js";
import "../dto/error.dto.js";
import "./endpoints.js";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "Coffee Brew API",
        version: "1.0.0",
        description: "API for managing coffee brews",
    },
    servers: [{ url: "http://localhost:3000" }]
});