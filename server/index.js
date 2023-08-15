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

  const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'this is the content',
    tags: ['tag1', 'tag2'],
  });


  // Insert the article in our MongoDB database
    await article.save();

  // Find a single blog post
    const firstArticle = await Blog.findOne({});
    console.log(firstArticle);

//   const kittySchema = new mongoose.Schema({
//     name: String
//   })

//   const Kitten = mongoose.model('Kitten', kittySchema);
  
//   const kittens = await Kitten.find();
  


  


app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});