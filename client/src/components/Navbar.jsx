import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import YtriumText from "../assets/YtriumText";
import YtriumLogo from "../assets/YtriumLogo";
import NavItem from "./NavItem";

import Button from "./Button";

const Navbar = ({ userType, login, signup, instructorSignup }) => {
  const [navContent, setNavContent] = useState();

  useEffect(() => {
    switch (userType) {
      case null || undefined:
        setNavContent(
          <div className="flex items-center gap-4">
            <Button variant="text" onClick={() => instructorSignup()}>
              Inscreva-se como um instrutor
            </Button>
            <Button variant="secondary" onClick={() => login()}>
              Fazer login
            </Button>
            <Button onClick={() => signup()}>Cadastre-se</Button>
          </div>
        );
        break;
      case "estudante":
        setNavContent(
          <>
            <div className="flex items-center gap-8">
              <Link to={"/student"}>
                <NavItem>Home</NavItem>
              </Link>
              <Link to={"/student/subscriptions"}>
                <NavItem>Inscrições</NavItem>
              </Link>
              {/* <Link to={"/student/explore"}>
                <NavItem>Explorar</NavItem>
              </Link> */}
            </div>
            <ProfileIcon />
          </>
        );
        break;
      case "instrutor":
        setNavContent(
          <>
            <div className="flex items-center gap-8">
              <Link to={"/instructor"}>
                <NavItem>Home</NavItem>
              </Link>
              {/* <Link to={"/instructor/courses"}>
                <NavItem>Meus cursos</NavItem>
              </Link> */}
            </div>
            <ProfileIcon />
          </>
        );
        break;
      case "admin":
        setNavContent(
          <>
            <div className="flex items-center gap-8">
              <Link to={"/admin"}>
                <NavItem>Home</NavItem>
              </Link>
              <Link to={"/admin/categories"}>
                <NavItem>Categorias</NavItem>
              </Link>
              <Link to={"/admin/badges"}>
                <NavItem>Insígnias</NavItem>
              </Link>
              {/* <Link to={"/admin/users"}>
                <NavItem>Usuários</NavItem>
              </Link>
              <Link to={"/admin/courses"}>
                <NavItem>Cursos</NavItem>
              </Link> */}
            </div>
            <ProfileIcon />
          </>
        );
        break;
    }
  }, [userType]);

  return (
    <header
      className={`py-3 flex items-center justify-between border-b-2 border-amber-500/30 transition-all
                    ${
                      (userType == null || userType == undefined) ?
                      "bg-amber-50/70 rounded-lg mx-20 px-6 relative top-5"
                      :
                      "px-24"
                    }`}
    >
      <div className="flex items-center gap-1">
        <YtriumLogo />
        <YtriumText />
      </div>
      {/* <img src={ytrium} alt="ytrium logo" className={navStyles.logo} /> */}
      {navContent}
    </header>
  );
};

export default Navbar;
