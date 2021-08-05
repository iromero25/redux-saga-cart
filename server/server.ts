import express from "express";
import path from "path";
import apiRoutes from "./routes";

const server = express();

// Simulate a small amount of delay to demonstrate app's async features
const serverDelayConstant = 100;
server.use((_req, _res, next) => {
  const delay = (Math.random() * 15 + 5) * serverDelayConstant;
  setTimeout(next, delay);
});
server.use(express.static("dist"));
server.use(apiRoutes);

const sendFileOptions = {
  root: path.join("dist"),
};
server.get("/", (_req, res) => {
  res.sendFile("index.html", sendFileOptions);
});
server.get("/api", (_req, res) => {
  res.sendFile("api.html", sendFileOptions);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
