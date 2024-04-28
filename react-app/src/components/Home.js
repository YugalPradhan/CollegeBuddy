import React from 'react';
import {Typewriter} from 'react-simple-typewriter';
import '../style/home.css'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="container2">
          <img src="boy.png" alt="" className='boy'></img>
            <div className="header">
                <h1>CollegeBuddy</h1>
            </div>
            <div className="content">
            <section className="wrapper">
  <div className="top">Welcome to CollegeBuddy!</div>
  <div className="bottom" aria-hidden="false">Welcome to CollegeBuddy!</div>
</section>
                <Typewriter
                    words={['Connect with fellow students.', 'Share, buy, and sell resources.']}
                    loop={true}
                    cursor={true}
                    cursorStyle='_'
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </div>
            <div className="get-started-button">
                <Link to="/login">Get Started</Link>
            </div>
        </div>
    );
}
export default Home;
