import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '2em'}}>
      <h1 style={{fontSize: '3em'}}>404</h1>
      <div>
        <p>Algo deu errado!</p>
        <Link to="landing">Voltar à página inicial</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
