import express from "express";

const server = express();
const PORT = 8000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  console.log(`Server live at port: ${PORT}`);
});
