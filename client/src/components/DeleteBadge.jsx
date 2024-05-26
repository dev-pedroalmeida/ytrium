import React, { useState } from "react";
import axios from "axios";
import Overlay from "./Overlay";
import FormTitle from "./form/FormTitle";
import Button from "./Button";

const DeleteBadge = ({ badge, success, cancelar }) => {
  const [error, setError] = useState();

  function handleDeleteBadge(e) {
    e.preventDefault();
    setError();

    axios
      .delete(`http://localhost:3000/admin/deleteBadge/${badge.id}`, {
        withCredentials: true,
      })
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

  return (
    <Overlay onClick={() => cancelar()}>
      <form
        onSubmit={handleDeleteBadge}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 mb-56 p-8 bg-white rounded-lg shadow-lg min-w-[350px]"
      >
        <FormTitle>Excluir insígnia</FormTitle>
        <label>
          Deseja excluir a insígnia{" "}
          <span className="font-bold">{badge.titulo}</span>?
        </label>

        {error && (
          <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" type="button" onClick={() => cancelar()}>
            Cancelar
          </Button>
          <Button type="submit">Excluir</Button>
        </div>
      </form>
    </Overlay>
  );
};

export default DeleteBadge;
