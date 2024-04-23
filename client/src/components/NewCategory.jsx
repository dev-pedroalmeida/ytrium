import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import axios from "axios";
import Overlay from "./Overlay";
import FormTitle from "./form/FormTitle";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";

const NewCategory = ({ success, cancelar }) => {
  const [categoria, setCategoria] = useState("");

  function handleInput(e) {
    setCategoria(e.target.value);
  }

  const [error, setError] = useState();

  function handleNewCategory(e) {
    e.preventDefault();
    setError();

    if (categoria == "") {
      setError("Insira uma descrição");
    } else {
      axios
        .post(
          "http://localhost:3000/admin/createCategory",
          { descricao: categoria },
          {
            withCredentials: true,
          }
        )
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            return setError("Erro!");
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            success();
          }
        });
    }
  }

  return (
    <Overlay onClick={() => cancelar()}>
      <form
        onSubmit={handleNewCategory}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 mb-56 p-8 bg-white rounded-lg shadow-lg min-w-[350px]"
      >
        <FormTitle>Nova categoria</FormTitle>
        <FormLabel>
          Insira a descrição da categoria:
          <FormInput
            type="text"
            name="descricao"
            autoFocus={true}
            onChange={handleInput}
          />
        </FormLabel>

        {error && (
          <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" type="button" onClick={() => cancelar()}>
            Cancelar
          </Button>
          <Button type="submit">Criar categoria</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default NewCategory;
