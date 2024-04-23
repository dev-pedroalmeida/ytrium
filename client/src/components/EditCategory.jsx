import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import axios from "axios";
import Overlay from "./Overlay";
import FormTitle from "./form/FormTitle";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";

const EditCategory = ({ category, success, cancelar }) => {
  const [descricao, setDescricao] = useState(category.desc);

  function handleInput(e) {
    setDescricao(e.target.value);
  }

  const [error, setError] = useState();

  function handleEditCategory(e) {
    e.preventDefault();
    setError();

    if (!category) {
      setError("Id nulo");
    } else if (descricao == "") {
      setError("Insira uma descrição");
    } else {
      axios
        .put(
          `http://localhost:3000/admin/editCategory/${category.id}`,
          { descricao: descricao },
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
        onSubmit={handleEditCategory}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 mb-56 p-8 bg-white rounded-lg shadow-lg min-w-[350px]"
      >
        <FormTitle>Editar categoria</FormTitle>
        <FormLabel>
          Insira a nova descrição da categoria:
          <FormInput
            type="text"
            name="descricao"
            autoFocus={true}
            defaultValue={descricao}
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
          <Button type="submit">Editar categoria</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default EditCategory;
