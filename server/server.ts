import express from "express";

const server = express();
server.use(express.static("dist"));

server.get("/", (_, res) => {
  res.sendFile("index.html");
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
});
