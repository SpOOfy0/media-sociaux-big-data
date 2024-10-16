import express from "express";
import logger from "./libs/logger.js";

const app = express();
const port = 13002;

app.use(express.json());

app.listen(port, () => {
  logger.info({
    message: `Database service started on port ${port}.`,
    location: "database"
  });
});