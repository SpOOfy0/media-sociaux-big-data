import express from "express";
import { Search } from "../api/search.js";
import { VideoParser } from "../parser/video.js";
import logger from "../../libs/logger.js";
import { Auth } from "../../libs/check-auth.js";

const VideoRouter = express.Router();

VideoRouter.get("/", (_req, res) => {
  res.render("videos", { title: "DataNerd - Videos" });
});

/**
 * Generate three Python graphs using machine learning for data studies.
 * @param json The data to send to the Python server.
 * @returns The three generated graphs.
 */
async function sendPythonServerRequests(json: any[]): Promise<string[]> {
  const data = json.map(data => ({
    likes: Number.parseInt(data.likes),
    views: Number.parseInt(data.views),
    comments: Number.parseInt(data.comments),
    tags: Number.parseInt(data.tags.length),
    publication: Number.parseInt(data.publication),
    duration: Number.parseInt(data.duration),
    madeForKids: data.madeForKids ? 1 : 0
  }));

  const key = Auth.getKey();

  const pairsPromise = fetch("http://localhost:13001/pairs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify(data)
  });

  const outliersPromise = fetch("http://localhost:13001/outliers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify(data)
  });

  const importancePromise = fetch("http://localhost:13001/importance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      data,
      y: "likes"
    })
  });

  const responses = await Promise.all([pairsPromise, outliersPromise, importancePromise]);

  return Promise.all(responses.map(response => response.text()));
}

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

  const parser = new VideoParser(query);
  const json = JSON.parse(parser.parse({ type: "json" }));

  const [pairs, outliers, importance] = await sendPythonServerRequests(json);
  const parsedResult = parser.parse({ type: requestedType });

  logger.info({
    message: "Returning result to requester.",
    location: "VideoRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: requestedType || "json",
    result: requestedType == "csv" ? parsedResult : JSON.parse(parsedResult),
    pairs,
    importance,
    outliers
  });
})

export { VideoRouter };