import React from 'react'

const About = () => {

  return (
    <div className='container my-5'> 
      <h3>This is an about iNotebook:</h3>
      <div className='my-5'>
      <h5>Using iNotebook you could-</h5>
        <ol className="list-group list-group-numbered mx-5 my-4">
          <li className="list-group-item">Write your personal / proffesional notes</li>
          <li className="list-group-item">Secure your notes on clould</li>
          <li className="list-group-item">Access your notes from anywhere / from any devices</li>
          <li className="list-group-item">Edit or Delete your notes</li>
          <li className="list-group-item">Give your notes a relevant tag</li>
          <li className="list-group-item">Maintaine privacy using credentials</li>
        </ol>
      </div>
    </div>
  )
}
export default About