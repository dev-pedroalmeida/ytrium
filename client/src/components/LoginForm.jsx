import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles.module.css";
import FormTitle from "./form/FormTitle";
import FormLegend from "./form/FormLegend";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";
import Overlay from "./Overlay";

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
    <Overlay onClick={closeForm}>
      <form
        id="loginform"
        onSubmit={handleLogin}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 pt-12 bg-white rounded-md shadow-lg w-[400px]"
      >
        <FormTitle>
          Login
          <FormLegend>Insira seus dados!</FormLegend>
        </FormTitle>
        
        {error && 
        <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
          {error}
        </div>}
        
        <FormLabel>
          Email:
          <FormInput
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            onChange={handleInput}
          />
        </FormLabel>

        <FormLabel>
          Senha:
          <FormInput
            name="senha"
            type="password"
            placeholder="******"
            onChange={handleInput}
          />
        </FormLabel>

        <div className="flex items-center gap-1 justify-end">
          <Button variant="secondary" onClick={() => closeForm()}>
            Cancelar
          </Button>
          <Button type="submit">
            Logar
          </Button>
        </div>
      </form>
    </Overlay>
  );
};

export default LoginForm;
