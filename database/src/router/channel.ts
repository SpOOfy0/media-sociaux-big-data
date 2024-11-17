import express from "express";
import logger from "../libs/logger.js";
import { Channel } from "../data/channel.js";

const ChannelRouter = express.Router();

ChannelRouter.get("/:query", async (req, res) => {
  let data = await Channel.read(req.params.query);

  if (data.length < 10) {
    logger.info({
      message: `Not enough data (${data.length}), fetching from collector...`,
      location: "data-collector"
    });

    const url = `http://data-collector:${process.env.DATA_COLLECTOR_PORT}/channels/${req.params.query}`;
    data = (await (await fetch(url)).json()).comments;

    Channel.append(req.params.query, data);
  }

  logger.info({
    message: "Returning result to requester.",
    location: "ChannelRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: "json",
    comments: data
  });
});

export { ChannelRouter };