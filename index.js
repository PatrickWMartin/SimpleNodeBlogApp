const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const app = express();



const port = 3000;
const dbConn = "";
mongoose.connect(dbConn);

app.set("view engine", "ejs");

app.get('/test',(req, res) => {
 const blog = new Blog({
    title: 'Test blog',
    body: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
  });

  blog.save().then((result)=>{
    res.send(result);
  }).catch((err)=>{console.log(err)})
});
app.get("/", (req, res) => {
  //placeholder data
  const blogData = [
  {title:'Test Title 1'},
  {title:'Test Title 2'},
  {title:'Test Title 3'},
  {title:'Test Title 4'},
  {title:'Test Title 5'},
  ];

  res.render("index", {blogData});
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
