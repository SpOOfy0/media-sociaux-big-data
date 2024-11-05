import express from "express";
import logger from "../libs/logger.js";
import { Video } from "../data/video.js";

const VideoRouter = express.Router();

VideoRouter.get("/:query", async (req, res) => {
  let data = await Video.request(req.params.query);

  if (data.length != 10) {
    logger.info({
      message: `Not enough data (${data.length}), fetching from collector...`,
      location: "data-collector"
    });

    const url = `http://data-collector:${process.env.DATA_COLLECTOR_PORT}/videos/${req.params.query}`;
    data = (await (await fetch(url)).json()).videos;

    Video.append(req.params.query, data);
  }

  logger.info({
    message: "Returning result to requester.",
    location: "VideoRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: "json",
    videos: data
  });
});

export { VideoRouter };