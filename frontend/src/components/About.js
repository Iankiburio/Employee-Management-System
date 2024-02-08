import React from 'react'
import '../css/home.css'


function About(){

    return(
        <section id="about-app">
          <div className='about'>
        <h1>About the app</h1>
        <p>Welcome to the Advanced Employee Management System (AEMS), a cutting-edge solution designed to streamline and optimize employee management processes for businesses of all sizes. 
          </p>
          <p>AEMS is more than just a tool; it's a comprehensive platform crafted with precision to meet the evolving needs of modern organizations.</p>
        </div>
        <div>
        <h1>Our Mission</h1>
          <p>At AEMS, our mission is to revolutionize the way businesses handle their workforce. </p>
          <p>We aim to empower organizations to efficiently manage their employees, enhance productivity, and foster a thriving work environment through intuitive and innovative features.</p>
      </div>
      </section>
    );
}

export default About;