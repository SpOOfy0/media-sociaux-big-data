import express from "express";
import logger from "../libs/logger.js";
import { sendPythonServerRequests } from "../handler/videos.js";
import { VideoParser } from "../parser/video.js";

const VideoRouter = express.Router();

VideoRouter.get("/", (_req, res) => {
  res.render("videos", { title: "DataNerd - Videos" });
});

VideoRouter.get("/:query", async (req, res) => {
  const requestedType = req.query.type ?? "json";
  if (requestedType != "csv" && requestedType != "json") {
    logger.warn({
      message: `Requested type that doesn't exist: "${requestedType}".`,
      location: "VideoRouter GET /:query"
    });

    return res.status(400).send({
      error: "Bad request",
      reason: `Requested type must be "csv", "json" or unset.`
    });
  }

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
  
  const data = (await (await fetch(`http://database:${process.env.DATABASE_PORT}/videos/${req.params.query}`)).json()).videos;
  const parser = new VideoParser(data);

  const json = JSON.parse(parser.parse());

  const [pairs, outliers, importance] = await sendPythonServerRequests(json);

  logger.info({
    message: "Returning result to requester.",
    location: "VideoRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: requestedType || "json",
    result: json,
    pairs,
    importance,
    outliers
  });
});

export { VideoRouter };