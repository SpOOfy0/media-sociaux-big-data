import express from "express";
import logger from "./libs/logger.js";
import { createRedirect } from "./handler/redirect.js";

const app = express();
const port = process.env.WAF_IN_PORT;

app.use(express.json());

app.use(createRedirect());

app.listen(port, () => {
  logger.info({
    message: `Firewall started on port ${port}.`,
    location: "waf-in"
  });
});
