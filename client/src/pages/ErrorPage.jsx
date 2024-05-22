import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ErrorPage = () => {

  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <div className="max-h-[1100px] min-h-screen w-screen absolute top-0 right-0 -z-10 overflow-hidden bg-amber-50">
        <div className="w-[700px] h-[700px] bg-amber-400/60 blur-[100px] rounded-full absolute -top-96 right-0 box-border"></div>
        <div className="w-[800px] h-[800px] bg-orange-400/60 blur-[100px] rounded-full absolute -top-56 left-[200px]"></div>
      </div>
      <h1 className="text-9xl">404</h1>

      <p className="text-4xl">Algo deu errado!</p>
      <Button variant="large" onClick={() => navigate("/landing")}>
        Voltar ao início
      </Button>
    </div>
  );
};

export default ErrorPage;
