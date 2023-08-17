import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:2121/')
      .then(response => setBlogs(response.data)) 
      console.log(blogs) 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       {blogs.map((blog) => { 
          return (
        <h1>{blog.title}</h1> )
        })}
      </header>
    </div>
  );
}

export default App;
