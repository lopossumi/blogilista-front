import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blogItem'>
    <div className='blogHeader'>
      {blog.title} {blog.author}
    </div>
    <div className='blogDetails'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
