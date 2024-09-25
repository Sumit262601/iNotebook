import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='position-absolute text-center top-50 start-50 translate-middle mb-5'>
      <h1 className='display-3'>Welcome👋!</h1>
      {/* <h2 className="display-1 my-4">${username}</h2> */}
      <div className="my-4">
        <p className='fw-semibold'>Your notes on cloud ☁️ </p>
        <span>I hope you are happy to use iNotebook to store your pesonal notes in cloud</span>
      </div>
      <Link to='/yournotes' className='text-decoration-none fs-4' style={{color: "#726ccc"}} >Go to your Notes &rarr;</Link>
    </div>
  )
}

export default Home