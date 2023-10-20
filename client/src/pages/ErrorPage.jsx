import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Algo deu errado!</p>
      <Link to="landing">Voltar à página inicial</Link>
    </div>
  );
};

export default ErrorPage;
