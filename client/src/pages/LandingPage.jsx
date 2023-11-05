import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar';
import styles from '../styles/styles.module.css';
import LandingIlustration from '../assets/LandingIlustration';

const LandingPage = () => {

  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUser, setSignUser] = useState('estudante');


  return (
    <div>
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

        <div className={styles.landingContainer}>
          <div className={styles.landingColumn}>
            <h1>Aprenda no Seu Ritmo, Conquiste o Futuro</h1>
            <p>Explore cursos de tecnologia, suba de nível e alcance seus objetivos. O poder do conhecimento está em suas mãos.</p>
          </div>
          <div className={styles.landingColumn}>
            <LandingIlustration />
          </div>
        </div>
        
    </div>
  )
}

export default LandingPage