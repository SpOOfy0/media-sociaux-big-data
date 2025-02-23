import express from "express";
import logger from "../libs/logger.js";
import { sendPythonServerRequests } from "../handler/channels.js";

const ChannelRouter = express.Router();

ChannelRouter.get("/", (_req, res) => {
  res.render("channel", { title: "DataNerd - Channel" });
});

console.log(process.env);

ChannelRouter.get("/:query", async (req, res) => {
  const response = await fetch(`http://database:${process.env.DATABASE_PORT}/channels/${req.params.query}`);
  const json = await response.json();
  const data = json?.comments || [];
  console.log("cahnnel loaded");
  // const data = (await (await fetch(`http://database:27017/channels/${req.params.query}`)).json()).comments;
  
  const [sentiment, explaination] = await sendPythonServerRequests(data);

  logger.info({
    message: "Returning result to requester.",
    location: "ChannelRouter GET /:query"
  });

  return res.status(200).send({
    query: req.params.query,
    type: "json",
    result: data,
    sentiment: JSON.parse(sentiment),
    explaination: JSON.parse(explaination),
  });
});

export { ChannelRouter };