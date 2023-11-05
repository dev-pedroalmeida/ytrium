import React, { useState } from 'react'
import styles from '../styles/styles.module.css';
import axios from 'axios';

const NewCategory = ( {success, cancelar} ) => {

  const [categoria, setCategoria] = useState('');

  function handleInput(e) {
    setCategoria(e.target.value);
  };

  const [error, setError] = useState();

  function handleNewCategory(e) {
    e.preventDefault();
    setError();

    if(categoria == '') {
      setError('Insira uma descrição')
    } else {
      axios.post('http://localhost:3000/admin/createCategory', {descricao: categoria}, {
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
      <form onSubmit={handleNewCategory}>
        <div className={styles.formTitle}>
          Nova categoria
        </div>
        <label>
          Insira a descrição da categoria:
          <input type="text" name='descricao' autoFocus onChange={handleInput} />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.btn} type="submit">Criar categoria</button>
        <button className={styles.btnSecondary} type="button" onClick={() => cancelar()}>Cancelar</button>
      </form>
    </div>
  )
}

export default NewCategory