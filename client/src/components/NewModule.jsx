import React, { useState } from 'react'
import styles from '../styles/styles.module.css';

const NewModule = ( {saveModule, cancelar} ) => {

  const [module, setModule] = useState({
    titulo: '',
  });

  const [error, setError] = useState();

  const handleInput = (e) => {
    setModule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleNewModule(e) {
    e.preventDefault();
    setError();

    if(module.titulo == '') {
      setError('Insira um título')
    } else {
      saveModule(module.titulo);
    }
  }

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleNewModule}>
        <div className={styles.formTitle}>
          Novo módulo
        </div>
        <label>
          Insira o título do módulo:
          <input type="text" name="titulo" onChange={handleInput}  />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.btn} type="submit">Salvar</button>
        <button className={styles.btnSecondary} type="button" onClick={() => cancelar()}>Cancelar</button>
      </form>
    </div>
  )
}

export default NewModule