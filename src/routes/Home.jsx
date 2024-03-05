import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    document.title="Home";
 
  return (
    <>
      <div className="home_container">
        <div className="home_content">
          <h1>Together, we are healing ourselves and the Earth.</h1>
          <p>Together, we are healing ourselves and the Earth.
            With roots in the Amazon rainforest, we equip people around the world with inspiration and training to regenerate the planet’s ecosystems, bring justice to their communities, and restore our relationships with the Earth, each other, and ourselves.</p>
          <button><Link to="/email-input">get started</Link></button>

        </div>
      </div>
    </>

  )
}

export default Home