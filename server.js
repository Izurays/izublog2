if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const path = require('path');
const { cloudinary } = require('./cloudinary');

const app = express()

mongoose.connect('mongodb://localhost/blog',()=>{
  console.log("connected to blog database")
} ,{
  useNewUrlParser: true, useUnifiedTopology: true,

})
let initial_path = path.join(__dirname, "public");
//server.use(express.static("./images"));
app.use(express.static(initial_path));



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen("3000", ()=>{
  console.log("listening on port 3000.......")
})