import express from "express";
import logger from "../libs/logger.js";
import { Comments } from "../api/comments.js";

const ChannelRouter = express.Router();

ChannelRouter.get("/:channel", async (req, res) => {
  const maxResultsQuery = req.query.max ?? "10";
  if (typeof maxResultsQuery !== "string") {
    logger.warn({
      message: `Requested maxResult is invalid: "${maxResultsQuery}".`,
      location: "ChannelRouter GET /:channel"
    });

    return res.status(400).send({
      error: "Bad request",
      reason: `Maximum results parameter must be an integer.`
    });
  }

  const maxResults = Number.parseInt(maxResultsQuery);
  if (Number.isNaN(maxResults)) {
    logger.warn({
      message: `Requested maxResult is invalid: "${maxResultsQuery}".`,
      location: "ChannelRouter GET /:channel"
    });

    return res.status(400).send({
      error: "Bad request",
      reason: `Maximum results parameter must be an integer.`
    });
  }

  const comments = await Comments.byChannel(req.params.channel, maxResults);

  if (comments == null) {
    logger.error({
      message: "Returning error, API Key is not defined.",
      location: "router/comment.ts"
    });

    return res.status(500).send({
      error: "Internal Server Error",
      reason: "Server was misconfigured."
    });
  }

  logger.info({
    message: "Returning result to requester.",
    location: "ChannelRouter GET /:channel"
  });

  return res.status(200).send({
    channel: req.params.channel,
    type: "json",
    comments: comments
  });
});

export { ChannelRouter };
