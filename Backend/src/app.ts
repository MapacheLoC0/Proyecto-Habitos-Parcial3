import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.config"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", mainRouter);

export default app;
