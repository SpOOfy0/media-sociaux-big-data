import express from "express";
import logger from "../libs/logger.js";
import { Auth } from "../libs/check-auth.js";

const app = express();
const port = 13002;

app.use(express.json());
app.use(Auth.createCheckAuth());

app.listen(port, () => {
  logger.info({
    message: `Database service started on port ${port}.`,
    location: "database"
  });
});