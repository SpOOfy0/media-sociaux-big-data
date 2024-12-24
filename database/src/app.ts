import express from "express";
import logger from "./libs/logger.js";
import { VideoRouter } from "./router/video.js";
import { ChannelRouter } from "./router/channel.js";

const app = express();
const port = process.env.DATABASE_PORT;

app.use(express.json());
app.use("/videos", VideoRouter);
app.use("/channels", ChannelRouter);

app.listen(port, () => {
  logger.info({
    message: `Database service started on port ${port}.`,
    location: "database"
  });
});
