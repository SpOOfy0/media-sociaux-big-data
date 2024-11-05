import express from "express";
import logger from "../libs/logger.js";
import { Search } from "../api/search.js";

const VideoRouter = express.Router();

VideoRouter.get("/:query", async (req, res) => {
  const maxResultsQuery = req.query.max ?? "10";
  if (typeof maxResultsQuery != "string") {
    logger.warn({
      message: `Requested maxResult is invalid: "${maxResultsQuery}".`,
      location: "VideoRouter GET /:query"
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
      location: "VideoRouter GET /:query"
    });

    return res.status(400).send({
      error: "Bad request",
      reason: `Maximum results parameter must be an integer.`
    });
  }
  
  const query = await Search.videos(req.params.query, maxResults);

  if (query == null) {
    logger.error({
      message: "Returning error, API Key is not defined.",
      location: "router/video.ts"
    });

    return res.status(500).send({
      error: "Internal Server Error",
      reason: "Server was misconfigured."
    });
  }

  logger.info({
    message: "Returning result to requester.",
    location: "VideoRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: "json",
    videos: query
  });
});

export { VideoRouter };