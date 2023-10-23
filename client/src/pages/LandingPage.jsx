import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar';

const LandingPage = () => {

  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUser, setSignUser] = useState('estudante');

  return (
    <>
        <Navbar userType={undefined} 
                login={() => {
                  setSignup(false)
                  setLogin(true)
                }} 
                signup={() => {
                  setLogin(false)
                  setSignUser('estudante')
                  setSignup(true)
                }}
                instructorSignup={() => {
                  setLogin(false)
                  setSignUser('instrutor')
                  setSignup(true)
                }} />

        { signup && 
          <SignupForm 
          userType={signUser}
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