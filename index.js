const express = require("express");

const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
