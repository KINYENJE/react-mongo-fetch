import express from 'express';
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config';
import Blog from './model/Blog.js';
import User from './model/User.js';

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

  app.get('/', async (req, res) => {
    try {
      const blogs = await Blog.find({});
      res.status(200).json(blogs)
      console.log(blogs)
    } catch (error) {
      res.status(500).json({message: 'An error occurred', error: err.message})
    }
   
  })

  /** CREATE A NEW USER */
  const user = await User.create({
    name: 'Bob Joe',
    email: 'bob@gmail.com',
  });




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
    title: 'Awesome Post 3!',
    slug: 'awesome-post 3',
    author: user._id,
    published: true,
    tags: ['tag1', 'tag2'],
  })

  

  /* Update the article */
  // article2.title = "THE UPDATED TITLE";
  // await article2.save();


  /** FIND INFO OF THE USER ALONG WITH THE BLOG POST ==========we use the .populate() method to all the info for the author  */
  // const article = await Blog.findOne({title: 'Awesome Post 3!'}).populate('author');
  // console.log(article)



  /** UPDATE TIME IN BLOG POST   */
  // try {
  //   const article3 = await Blog.findById("64de44e21ef4e1d053ecc541").exec();
  //   article3.title = "Updated Title 4";
  //   await article3.save();
  //   console.log('update was a success')
  //   console.log(article3);
  // } catch (error) {
  //   console.log('id not found', error)
  // }


  

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
    // const firstArticle = await Blog.findById("64dbfbbb598845973115e9c1", "title slug content").exec();
    // console.log(firstArticle);

    /** Deleting data */
    // const blog = await Blog.findByIdAndDelete("64dbfbbb598845973115e9c1").exec(); // delete by id

    /** deleteMany() methods */
  //  const blog2 = await Blog.deleteMany({}).exec(); // delete all
  //   console.log(blog2)

app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});