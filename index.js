const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
require('dotenv').config()


const app = express();



const port = 3000;
mongoose.connect(process.env.DB_CONNECTION_STRING );

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let blogData = await Blog.find();
  res.render("index", {blogData});
});

//placeholder for a single blog page
app.get("/blog/:blogId", async (req, res)=> {
  let blogData = await Blog.findById(req.params.blogId);
  res.send(blogData);
});


app.get("/create", (req, res) => {
  res.render("create");
});


app.post("/create", async (req,res)=>{
  const blog = new Blog(req.body);
  console.log(req.body);
  await blog.save();
  res.redirect('/');
})


app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
