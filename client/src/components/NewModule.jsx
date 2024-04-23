import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import Overlay from "../components/Overlay";
import FormTitle from "./form/FormTitle";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import Button from "./Button";

const NewModule = ({ saveModule, cancelar }) => {
  const [module, setModule] = useState({
    titulo: "",
  });

  const [error, setError] = useState();

  const handleInput = (e) => {
    setModule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleNewModule(e) {
    e.preventDefault();
    setError();

    if (module.titulo == "") {
      setError("Insira um título");
    } else {
      saveModule(module.titulo);
    }
  }

  return (
    <Overlay onClick={() => cancelar()}>
      <form
        onSubmit={handleNewModule}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 pt-12 bg-white rounded-lg shadow-lg min-w-[380px]"
      >
        <FormTitle>Novo módulo</FormTitle>
        <FormLabel>
          Insira o título do módulo:
          <FormInput type="text" name="titulo" onChange={handleInput} />
        </FormLabel>

        {error && (
          <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 justify-end">
          <Button variant="secondary" type="button" onClick={() => cancelar()}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default NewModule;
