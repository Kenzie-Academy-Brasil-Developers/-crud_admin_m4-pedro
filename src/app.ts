import "express-async-errors";
import express, { Application } from "express";
import userRoutes from "./routes/users.routes";
import { handleErrors } from "./error";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use(handleErrors);

export default app;
