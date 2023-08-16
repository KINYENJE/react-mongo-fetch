import express from 'express';
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config';
import Blog from './model/Blog.js';

const app = express();


app.use(cors());
app.use(express.json());

const connectionStr = process.env.DB_STRING;
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
  
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
  connectDB();




  // Create a new blog post object

  // const article = new Blog({
  //   title: 'Awesome Post!',
  //   slug: 'awesome-post',
  //   published: true,
  //   content: 'this is the content',
  //   tags: ['tag1', 'tag2'],
  // });

/* Insert the article in our MongoDB database  */
    // await article.save();



    /* Create a new blog post object method 2 */
  const article2 = await Blog.create({
    title: 'Awesome Post 2!',
    slug: 'awesome-post 2',
    published: true,
    content: 'this is the 2nd content',
    tags: ['tag1', 'tag2'],
  })

  /* Update the article */
  article2.title = "THE UPDATED TITLE";
  await article2.save();


  

  /**  Find a single blog post */
    // const firstArticle = await Blog.findOne({});
    // console.log(firstArticle);

  //**  Find a all blog post  */
    // const firstArticle = await Blog.find();
    // console.log(firstArticle);

  // Find a blog post by id
    // const firstArticle = await Blog.findById("64dbfbbb598845973115e9c1").exec();
    // console.log(firstArticle);

  /* Find a blog post by id and filter out the fields */
    const firstArticle = await Blog.findById("64dbfbbb598845973115e9c1", "title slug content").exec();
    console.log(firstArticle);

    /** Deleting data */
    // const blog = await Blog.findByIdAndDelete("64dbfbbb598845973115e9c1").exec(); // delete by id

    /** deleteMany() methods */
   // const blog2 = await Blog.deleteMany({title: 'THE UPDATED TITLE'}).exec(); // delete all
    // console.log(blog2)

app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});