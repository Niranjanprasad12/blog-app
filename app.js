//jshint esversion:6
const mongoose = require('mongoose')
const express = require("express");
const ejs = require("ejs");
const Blog = require('./blogModel.js')   // require the blog model created in blogModel.js file...
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect(
  "mongodb+srv://Admin:niranjanprasad12@mycluster.ff5xg.mongodb.net/blogDB",
  () => {
    console.log("connected successfully");
  },
  (e) => {
    console.log(e);
  }
); // creating and connecting with the database locally


const lodash = require("lodash")

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []

app.get("/",function(request,response){
  blogs = Blog.find((err,foundBlog)=>{
    if (!err){
      response.render("home",{
        content:homeStartingContent,
        posts:foundBlog
      })
    }
  })
})

app.get("/about",function(request,response){
  response.render("about",{
    about:aboutContent
  })
})

app.get("/contact",function(request,response){
  response.render("contact",{
    contact:contactContent
  })
})

app.get("/compose",function(request,response){
  response.render("compose")
})

app.get("/posts/:id",function(request,response){   // here i used routing parameters of express
  let postId = request.params.id;
  // posts.forEach(function(post){
    
  //   if (lodash.lowerCase(testTitle) === lodash.lowerCase(post.title)){

  //   }
  // })

  Blog.findOne({_id: postId},(err,foundPost)=>{
    if (!err){
      response.render("post",{
        title:foundPost.title,
        content:foundPost.content
      })
    }
  })



})


app.post("/compose",function(request,response){
  
  const post = {
    title : request.body.title,
    content:request.body.content,
    link:lodash.kebabCase(request.body.title)
  }

  const newPost = new Blog({
    title: request.body.title,
    content: request.body.content
  })
  newPost.save((err)=>{
    if (!err){
      response.redirect('/')
    }
  })

  posts.push(post)
  response.redirect("/")

});







let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(3000, ()=>{
  console.log("Server started successfully");
});
