import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import axios from "axios";
import Overlay from "./Overlay";
import FormTitle from "./form/FormTitle";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";

const NewBadge = ({ success, cancelar }) => {

  const [error, setError] = useState();

  function handleNewBadge(e) {
    e.preventDefault();
    setError();

    const badgeData = new FormData(e.target)

    const titulo = badgeData.get("ins_titulo")
    const qtdCursos = badgeData.get("ins_qtdCursos")
    const icone = badgeData.get("ins_icone")

    // console.log(titulo == "")
    // console.log(qtdCursos == "")
    // console.log(icone.size == 0)
    
    if (
      titulo == "" ||
      qtdCursos == "" ||
      icone.size == 0
    ) {
      setError("Preencha todos os campos");
    } else {
      axios
        .post("http://localhost:3000/admin/createBadge", badgeData, {withCredentials: true})
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
        onSubmit={handleNewBadge}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 mb-56 p-8 bg-white rounded-lg shadow-lg min-w-[350px]"
        encType="multipart/form-data"
      >
        <FormTitle>Nova insígnia</FormTitle>
        <FormLabel>
          Insira o título da insígnia:
          <FormInput
            type="text"
            name="ins_titulo"
            autoFocus={true}
          />
        </FormLabel>
        <FormLabel>
          Insira a quantidade de cursos:
          <FormInput
            type="number"
            name="ins_qtdCursos"
            autoFocus={true}
          />
        </FormLabel>
        <FormLabel>
          Selecione um ícone
          <FormInput
            type="file"
            name="ins_icone"
            autoFocus={true}
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
          <Button type="submit">Criar insígnia</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default NewBadge;
