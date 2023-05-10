const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.json({ name: "okay me nub", numbers: [1, 2, 3, 4, 5] });  
});

app.listen(port, () => {
  console.log("Server is live");
});
