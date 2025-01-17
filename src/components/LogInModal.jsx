import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUsers, storeAccessingUser } from '../storage/storage';
import './../css/index.css';
import AlertModals from './AlertModals';

export default function LogInModal({ closeState }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [path, setPath] = useState('');
  const [userExists, setUserExists] = useState(false)
  const [accessingUser, setAccessingUser] = useState('')
  const [unamePassIncorrect, setUnamePassIncorrect] = useState(false)
  const users = getStoredUsers();
  const navigate = useNavigate();

  function handlePasswordChange(e) {
    if(usernameInput == 'admin' && e.target.value == 'admin') {
      setPath('/admin');
      setUserExists(true)
      setAccessingUser('admin')
    }

    const user = users?.find(each => each.password === e.target.value && each.username === usernameInput);
    if(user) {
      setPath('/user')
      setAccessingUser(user.accNum)
      setUserExists(true)
    }
  }

  function handleLogIn(e) {
    e.preventDefault()
    if(userExists === true) {
      storeAccessingUser(accessingUser)
      navigate(path)
    } else {
      setUnamePassIncorrect(true)
    }
    resetState()
  }

  function resetState() {
    setUserExists(false)
    setPath('')
    setUsernameInput('')
  }

  return (
    <div className="show-login-modal">
      <form className="login-wrapper" onSubmit={handleLogIn}>
        <button type='button' id="close-sign-up" onClick={closeState}>X</button>
        <p className="wrapper-text">
          <span className='bold-login-text'>Welcome Back!</span>
          <br></br>
          Please enter your details.
        </p>
        <div className="form-container">
          <label htmlFor="login-username" className="username-label">Username</label>
          <input onChange={(e) => setUsernameInput(e.target.value)} type="text" id="login-username" placeholder="Enter username" required></input>
          <label htmlFor="login-password" className="password-label">Password</label>         
          <input onChange={handlePasswordChange} type="password" id="login-password" placeholder="Password (8 or more characters)" required minLength={8}></input>
          <div className="signInBtn">
            <button type='submit' id='submitBtn'>Sign In</button>
          </div>
        </div>
      </form>
      <AlertModals 
        displayState={unamePassIncorrect ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> unamePassIncorrect ? setUnamePassIncorrect(false) : setUnamePassIncorrect(true)}
        boldAlert={'OOPS!'}
        message={"Sorry, the username/password is invalid/incorrect."}
        image={"https://img.icons8.com/cotton/50/000000/error--v4.png"}
      />
    </div>
  );
}
