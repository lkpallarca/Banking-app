import React, { useState } from 'react'

export default function useToggle() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  
  const toggleModal = (boolean) => {
    if (boolean) {
      setShowSignUp(!showSignUp);
    } else {
      setShowLogIn(!showLogIn)
    }
  }

  return {
    showSignUp,
    showLogIn,
    toggleModal
  }
}
