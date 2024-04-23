import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUser, setSignUser] = useState("estudante");

  return (
    <>
      {signup && (
        <SignupForm
          userType={signUser}
          closeForm={() => setSignup(false)}
          login={() => {
            setSignup(false);
            setLogin(true);
          }}
        />
      )}

      {login && (
        <LoginForm
          closeForm={() => setLogin(false)}
          signup={() => {
            setLogin(false);
            setSignup(true);
          }}
        />
      )}

      <div className="relative">
        <div className="max-h-[1100px] min-h-[800px] w-screen absolute top-0 right-0 -z-10 overflow-hidden">
          <div className="w-[700px] h-[700px] bg-amber-400/70 blur-[100px] rounded-full absolute -top-80 right-0 box-border"></div>
          <div className="w-[800px] h-[800px] bg-orange-400/60 blur-[100px] rounded-full absolute -top-48 right-[500px]"></div>
        </div>
        <Navbar
          userType={undefined}
          login={() => {
            setSignup(false);
            setLogin(true);
          }}
          signup={() => {
            setLogin(false);
            setSignUser("estudante");
            setSignup(true);
          }}
          instructorSignup={() => {
            setLogin(false);
            setSignUser("instrutor");
            setSignup(true);
          }}
        />

        <div className="mx-24 my-20">
          <h1 className="mb-16 text-8xl text-balance font-semibold">
            Aprenda no Seu Ritmo, Conquiste o Futuro
          </h1>
          <p className="max-w-2xl text-balance text-2xl font-medium text-zinc-700">
            Explore cursos de tecnologia, suba de nível e alcance seus
            objetivos. O poder do conhecimento está em suas mãos.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
