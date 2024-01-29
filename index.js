const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
require('dotenv').config()


const app = express();



const port = 3000;

(async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.DB_CONNECTION_STRING );
    
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
   console.log(error) 
  }
}
)()

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let blogData = await Blog.find();
    res.render("index", {blogData});
  } catch (error) {
    console.log(error);  
  }
});

//placeholder for a single blog page
app.get("/blog/:blogId", async (req, res)=> {
  try{
    let blogData = await Blog.findById(req.params.blogId);
    res.render("singleblog", {blogData});
  } catch(error){
    console.log(error);
  }
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

app.delete("/blog/delete/:blogId",async (req, res)=>{
  console.log(req.params.blogId);
  try{
    const test  = await Blog.findByIdAndDelete(req.params.blogId);
    console.log(test);
    res.json({redirect: '/'});
  } catch(error){
    console.log(error);
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

