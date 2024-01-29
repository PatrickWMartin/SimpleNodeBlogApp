const express = require("express");
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config()


const app = express();



const port = process.env.PORT || 3000;

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

app.use(blogRoutes);

app.use((_, __) => {
  res.status(404).render("404");
});

