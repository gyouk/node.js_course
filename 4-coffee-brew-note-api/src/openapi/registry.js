import {extendZodWithOpenApi, OpenAPIRegistry} from '@asteasolutions/zod-to-openapi';
import {z} from 'zod';

/* додаємо .openapi() у всі Zod-схеми */
extendZodWithOpenApi(z);
export const registry = new OpenAPIRegistry();