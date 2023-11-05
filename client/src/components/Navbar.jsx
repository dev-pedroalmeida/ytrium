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
              <Link to={'/student/subscriptions'}>
                Inscrições
              </Link>
              <Link to={'/student/explore'}>
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
              <Link to={'/instructor/courses'}>
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
              <Link to={'/admin/users'}>
                Usuários
              </Link>
              <Link to={'/admin/courses'}>
                Cursos
              </Link>
              <Link to={'/admin/badges'}>
                Insígnias
              </Link>
              <Link to={'/admin/categories'}>
                Categorias
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
