import React, { useEffect, useState } from "react";
import ytrium from "../assets/ytrium.png";
import styles from "../styles/styles.module.css"
import navStyles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";

const Navbar = ({ userType, login, signup, instructorSignup }) => {

  const [navContent, setNavContent] = useState();

  useEffect(() => {
    switch(userType){
      case (null || undefined):
        setNavContent(
          <div className={navStyles.btnGroup}>
            <button className={styles.btnText} onClick={() => instructorSignup()}>
              Inscreva-se como um instrutor
            </button>
            <button className={styles.btnSecondary} onClick={() => login()}>
              Fazer login
            </button>
            <button className={styles.btn} onClick={() => signup()}>
              Cadastre-se
            </button>
          </div>
        )
        break;
      case 'estudante':
        setNavContent(
          <>
            <div className={navStyles.navGroup}>
              <Link to={'/student'}>
                Home
              </Link>
              <Link to={'subscriptions'}>
                Inscrições
              </Link>
              <Link to={'explore'}>
                Explorar
              </Link>

            </div>
            <ProfileIcon />
          </>
        )
        break;
      case 'instrutor':
        setNavContent(
          <>
            <div className={navStyles.navGroup}>
              <Link to={'/instructor'}>
                Home
              </Link>
              <Link to={'courses'}>
                Meus cursos
              </Link>

            </div>
            <ProfileIcon />
          </>
        )
        break;
      case 'admin':
        setNavContent(
          <>
            <div className={navStyles.navGroup}>
              <Link to={'/admin'}>
                Home
              </Link>
              <Link to={'users'}>
                Usuários
              </Link>
              <Link to={'courses'}>
                Cursos
              </Link>
              <Link to={'badges'}>
                Insígnias
              </Link>

            </div>
            <ProfileIcon />
          </>
        )
        break;
    }
  }, [userType])

  return (
    <header>
      <img src={ytrium} alt="ytrium logo" className={navStyles.logo} />
      {navContent}
    </header>
  );
};

export default Navbar;
