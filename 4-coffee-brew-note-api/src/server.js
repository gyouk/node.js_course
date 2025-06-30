import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./openapi/swagger.js";
import brewRoutes from "./routes/brew.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/brews", brewRoutes);


app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
    console.log(`📚 Swagger docs at http://localhost:${PORT}/docs`);
});
