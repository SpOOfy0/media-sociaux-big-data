import express from "express";
// import cors from "cors";
import logger from "./libs/logger.js";
import { VideoRouter } from "./router/video.js";
import { ChannelRouter } from "./router/channel.js";
import { ChatRouter } from "./router/chat.js";

const app = express();
const port = process.env.WEB_SERVER_PORT;

app.set("view engine", "ejs");
app.set("views", "/app/public/views");

app.use(express.json());
// app.use(cors());

app.use("/static", express.static("/app/public/static"));
app.use("/videos", VideoRouter);
app.use("/channels", ChannelRouter);
app.use("/chat", ChatRouter);

app.get("/", (_req, res) => {
  res.render("index", { title: "DataNerd" });
});

app.listen(port, () => {
  logger.info({
    message: `Web server started on port ${port}.`,
    location: "web-server"
  });
});
