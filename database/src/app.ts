import express from "express";
import logger from "./libs/logger.js";

const app = express();
const port = process.env.DATABASE_PORT;

app.use(express.json());

app.listen(port, () => {
  logger.info({
    message: `Database service started on port ${port}.`,
    location: "database"
  });
});
