import express from "express";
import logger from "../libs/logger.js";
import { VideoRouter } from "./router/video.js";
import { Auth } from "../libs/check-auth.js";

const app = express();
const port = 13000;

app.set("view engine", "ejs");
app.set("views", (import.meta.dirname ?? __dirname) + "/../public/views");

app.use(express.json());
app.use(Auth.createCheckAuth());

app.use("/static", express.static((import.meta.dirname ?? __dirname) + "/../public/static"));
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