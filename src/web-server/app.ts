import express from "express";
import logger from "../libs/logger.js";
import { VideoRouter } from "./router/video.js";

const app = express();
const port = 13000;

app.set("view engine", "ejs");
app.set("views", (import.meta.dirname ?? __dirname) + "/../public/views")

app.use(express.json());
app.use("/static", express.static((import.meta.dirname ?? __dirname) + "/../public/static"));
app.use("/videos", VideoRouter);

app.get("/", (_req, res) => {
  res.render("index", { title: "DataNerd" });
})

app.listen(port, () => {
  logger.info({
    message: `Server started! Go to http://localhost:${port}.`,
    location: "start"
  });
})