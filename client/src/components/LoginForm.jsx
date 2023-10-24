import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles.module.css";
import lsStyles from "./LogSignForm.module.css";

const LoginForm = ({ closeForm }) => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    senha: "",
  });

  const handleInput = (e) => {
    setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginValues);
    setError();

    if (loginValues.email !== null && loginValues.senha !== null) {
      axios
        .post("http://localhost:3000/login", loginValues, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            setError("Email ou senha inválidos!");
          }
        })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            setUser(res.data);
            navigate("/");
          }
        });
    } else {
      setError("Preencha todos os campos!");
    }
  };

  return (
    <div className={styles.overlay}>
      <form id="loginform" className={lsStyles.lsform} onSubmit={handleLogin}>
        <div className={lsStyles.formTitle}>
          Login
          <p className={lsStyles.formLegend}>Insira seus dados!</p>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            onChange={handleInput}
          />
        </label>

        <label>
          Senha:
          <input
            name="senha"
            type="password"
            placeholder="******"
            onChange={handleInput}
          />
        </label>

        <button type="submit" className={styles.btn}>
          Logar
        </button>
        <button className={styles.btnSecondary} onClick={() => closeForm()}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
