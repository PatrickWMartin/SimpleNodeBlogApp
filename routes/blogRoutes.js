const express = require('express');
const Blog = require('../models/blogs');

const router = express.Router();


router.get("/", async (_, res) => {
  try {
    let blogData = await Blog.find().sort({createdAt: -1});
    res.render("index", {blogData});
  } catch (error) {
    console.log(error);  
  }
});

router.get("/blog/:blogId", async (req, res)=> {
  try{
    let blogData = await Blog.findById(req.params.blogId);
    res.render("singleblog", {blogData});
  } catch(error){
    console.log(error);
  }
});


router.get("/create", (_, res) => {
  res.render("create");
});


router.post("/create", async (req,res)=>{
  const blog = new Blog(req.body);
  console.log(req.body);
  await blog.save();
  res.redirect('/');
})

router.delete("/blog/delete/:blogId",async (req, res)=>{
  try{
    await Blog.findByIdAndDelete(req.params.blogId);
    res.json({redirect: '/'});
  } catch(error){
    console.log(error);
  }
});


module.exports = router;


