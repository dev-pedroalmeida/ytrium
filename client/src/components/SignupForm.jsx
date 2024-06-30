import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/styles.module.css";
import FormTitle from "./form/FormTitle";
import FormLegend from "./form/FormLegend";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";
import Overlay from "./Overlay";
import { z } from "zod";

const SignupForm = ({ userType = "estudante", closeForm, login }) => {
  const [signupValues, setSignupValues] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const handleInput = (e) => {
    setSignupValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupValues);
    setError();

    const SignSchema = z.object({
      senha: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    });

    const parsedSenha = SignSchema.passthrough().safeParse(signupValues);
    console.log(parsedSenha);

    if (!parsedSenha.success) {
      setError(`● A senha deve ter de 8 a 20 caracteres
        ● Possuir uma letra minúscula e uma maiúscula
        ● Um número e um caractere especial`);
      return;
    }

    if (signupValues.senha === signupValues.confirmaSenha) {
      let userData = {
        nome: signupValues.nome,
        email: signupValues.email,
        senha: signupValues.senha,
        tipo: userType,
      };

      axios
        .post("http://localhost:3000/signup", userData)
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            return setError("Email já cadastrado!");
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            login();
          }
        });
    } else {
      setError("As senhas devem ser iguais!");
    }
  };

  return (
    <Overlay onClick={closeForm}>
      <form
        id="signupform"
        onSubmit={handleSignup}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 pt-12 bg-white rounded-md shadow-lg min-w-[400px]"
      >
        <FormTitle>
          Inscreva-se
          <FormLegend>Torne-se um {userType}!</FormLegend>
        </FormTitle>

        {error && (
          <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg max-w-[350px] whitespace-pre-line">
            {error}
          </div>
        )}

        <FormLabel>
          Nome:
          <FormInput
            required={true}
            name="nome"
            type="text"
            placeholder="Nome Exemplo"
            onChange={handleInput}
          />
        </FormLabel>

        <FormLabel>
          Email:
          <FormInput
            required={true}
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            onChange={handleInput}
          />
        </FormLabel>

        <FormLabel>
          Senha:
          <FormInput
            required
            name="senha"
            type="password"
            placeholder="******"
            onChange={handleInput}
          />
        </FormLabel>

        <FormLabel>
          Confirmar senha:
          <FormInput
            required
            name="confirmaSenha"
            type="password"
            placeholder="******"
            onChange={handleInput}
          />
        </FormLabel>

        <div className="flex items-center gap-2 justify-end">
          <Button variant="text" onClick={() => closeForm()}>
            Cancelar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default SignupForm;
