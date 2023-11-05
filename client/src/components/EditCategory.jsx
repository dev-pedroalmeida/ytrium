import React, { useState } from 'react'
import styles from '../styles/styles.module.css';
import axios from 'axios';

const EditCategory = ( {category, success, cancelar} ) => {

  const [descricao, setDescricao] = useState(category.desc);

  function handleInput(e) {
    setDescricao(e.target.value);
  };

  const [error, setError] = useState();

  function handleEditCategory(e) {
    e.preventDefault();
    setError();

    if(!category) {
      setError('Id nulo')
    } else if(descricao == '') {
      setError('Insira uma descrição')
    } else {
      axios.put(`http://localhost:3000/admin/editCategory/${category.id}`, {descricao: descricao}, {
        withCredentials: true,
      })
      .catch(err => {
        console.log(err);
        if(err.response.status == 400) {
          return setError("Erro!");
        }
      })
      .then(res => {
        console.log(res);
        if(res.status == 200) {
          success();
        }
      })
    }
  }

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleEditCategory}>
        <div className={styles.formTitle}>
          Editar categoria
        </div>
        <label>
          Insira a nova descrição da categoria:
          <input type="text" name='descricao' autoFocus onFocus={(e) => e.target.value = descricao} onChange={handleInput} />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.btn} type="submit">Editar categoria</button>
        <button className={styles.btnSecondary} type="button" onClick={() => cancelar()}>Cancelar</button>
      </form>
    </div>
  )
}

export default EditCategory