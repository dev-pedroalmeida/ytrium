import React, { useState } from 'react'
import styles from '../styles/styles.module.css';
import axios from 'axios';

const DeleteCategory = ( {category, success, cancelar} ) => {

  const [error, setError] = useState();

  function handleDeleteCategory(e) {
    e.preventDefault();
    setError();
    
    axios.delete(`http://localhost:3000/admin/deleteCategory/${category.id}`, {
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

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleDeleteCategory}>
        <div className={styles.formTitle}>
          Excluir categoria
        </div>
        <label>
          Deseja excluir a categoria {category.desc}?
        </label>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.btnGroup}>
          <button className={styles.btnSecondary} type="button" onClick={() => cancelar()}>Cancelar</button>
          <button className={styles.btnDanger} type="submit">Excluir</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteCategory