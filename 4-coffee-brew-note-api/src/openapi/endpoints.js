import { z } from "zod";
import { registry } from "./registry.js";
import { BrewDTO } from "../dto/brew.dto.js";
import { ErrorDTO } from "../dto/error.dto.js";

// GET /api/brews
registry.registerPath({
    method: "get",
    path: "/api/brews",
    responses: {
        200: {
            description: "Array of brews",
            content: {
                "application/json": { schema: BrewDTO.array() }
            }
        }
    }
});

// GET /api/brews/{id}
registry.registerPath({
    method: "get",
    path: "/api/brews/{id}",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "Brew ID" })
        })
    },
    responses: {
        200: {
            description: "Brew by ID",
            content: {
                "application/json": { schema: BrewDTO }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": { schema: ErrorDTO }
            }
        }
    }
});
registry.registerPath({
    method: "post",
    path: "/api/brews",
    description: "Create a new brew record",
    request: {
        body: {
            description: "Brew to create",
            content: {
                "application/json": { schema: BrewDTO }
            }
        }
    },
    responses: {
        201: {
            description: "Brew created",
            content: {
                "application/json": { schema: BrewDTO }
            }
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": { schema: ErrorDTO }
            }
        }
    }
});

// PUT /api/brews/{id}
registry.registerPath({
    method: "put",
    path: "/api/brews/{id}",
    description: "Update brew",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "Brew ID" })
        }),
        body: {
            description: "Updated brew",
            content: {
                "application/json": { schema: BrewDTO }
            }
        }
    },
    responses: {
        200: {
            description: "Brew updated",
            content: {
                "application/json": { schema: BrewDTO }
            }
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": { schema: ErrorDTO }
            }
        },
        404: {
            description: "Brew not found",
            content: {
                "application/json": { schema: ErrorDTO }
            }
        }
    }
});

// DELETE /api/brews/{id}
registry.registerPath({
    method: "delete",
    path: "/api/brews/{id}",
    description: "Delete brew",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "Brew ID" })
        })
    },
    responses: {
        200: {
            description: "Brew deleted",
            content: {
                "application/json": { schema: BrewDTO }
            }
        },
        404: {
            description: "Brew not found",
            content: {
                "application/json": { schema: ErrorDTO }
            }
        }
    }
});