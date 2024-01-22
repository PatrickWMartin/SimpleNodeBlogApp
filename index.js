const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const app = express();



const port = 3000;
const dbConn = "";
mongoose.connect(dbConn);

app.set("view engine", "ejs");


app.get("/", async (req, res) => {
  //placeholder data
  let blogData = await Blog.find();
  console.log(blogData);
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
   const blog = new Blog({
    title: 'Test blog2',
    body: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
  });

  let result = await blog.save()
  res.send(result);
})


app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
