import React from "react";
import pic from './../assets/02.png';
import './../css/index.css';
import SignUpModal from "../components/SignUpModal";
import LogInModal from "../components/LogInModal";
import Footer from '../components/Footer';
import SectionTwo from "../components/WelcomeScreenSectionTwo";
import SectionThree from "../components/WelcomeScreenSectionThree";
import useToggle from "../hooks/useToggle";

export default function WelcomeScreen() {
  const { showSignUp, showLogIn, toggleModal } = useToggle();

  return (
    <div className="welcome">
      <nav>
        <p>
          NOBLE BANK
        </p>
        <div className='navright'>
          <a>
            About
          </a>
          <a>
            Blog
          </a>
            <button className="SignUp" onClick={() => toggleModal(true)}>
              Sign Up
            </button>
        </div>
      </nav>
      <div className="WelcomeScreen-content">
        <div className='grid'>
          <div className='left'>
            <p>
              <span className='boldText'>
                It's never been simpler to make a payment
              </span><br></br>
              <br></br>
              <span className='desc'>
                Learn how to handle your finances in the most straightforward way possible.
                Deposits, withdrawals, and transfers are all possible.
                With NO LIMITS, you can send money all over the world!
              </span>
            </p>
            <div className='buttons'>
              <button className='LogIn' onClick={() => toggleModal(false)} >
                Log in
              </button>
              <button className='downloadBtn'>
                Download App
              </button>
            </div>
          </div>
          <div className='right'>
            <img src={pic} alt='Glass Cards' className='cardsPhoto' />
          </div>
        </div>
      </div>
      {showSignUp ? <SignUpModal closeState={() => toggleModal(true)}/> : null}
      {showLogIn ? <LogInModal closeState={() => toggleModal(false)}/> : null}
      <SectionTwo />
      <SectionThree />
      <Footer />
    </div>
  );
}
