import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const LandingPage = () => {

  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);


  return (
    <>
        <div>LandingPage</div>

        <button onClick={() => setSignup(!signup)}>Sign up</button>
        <button onClick={() => setLogin(!login)}>Login</button>

        { signup && 
          <SignupForm 
            closeForm={() => setSignup(false)} 
            login={() => {
              setSignup(false)
              setLogin(true)
            }} 
          /> 
        }
        
        { login && 
          <LoginForm 
            closeForm={() => setLogin(false)} 
            signup={() => {
              setLogin(false)
              setSignup(true)
            }} 
          /> 
        }
        
    </>
  )
}

export default LandingPage