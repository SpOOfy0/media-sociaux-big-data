import express from "express";
import logger from "./libs/logger.js";
import { VideoRouter } from "./router/video.js";

const app = express();
const port = process.env.DATA_COLLECTOR_PORT;

app.use(express.json());
app.use("/videos", VideoRouter);

app.listen(port, () => {
  logger.info({
    message: `Data collector service started on port ${port}.`,
    location: "data-collector"
  });
});
