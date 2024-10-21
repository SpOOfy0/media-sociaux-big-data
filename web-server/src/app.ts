import express from "express";
import logger from "./libs/logger.js";
import { VideoRouter } from "./router/video.js";

const app = express();
const port = process.env.WEB_SERVER_PORT;

app.set("view engine", "ejs");
app.set("views", "/app/public/views");

app.use(express.json());

app.use("/static", express.static("/app/public/static"));
app.use("/videos", VideoRouter);

app.get("/", (_req, res) => {
  res.render("index", { title: "DataNerd" });
});

app.listen(port, () => {
  logger.info({
    message: `Web server started on port ${port}.`,
    location: "web-server"
  });
});
