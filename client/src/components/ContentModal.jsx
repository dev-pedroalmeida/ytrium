import React, { useState } from 'react';
import styles from '../styles/styles.module.css';

const ContentModal = ({saveContent, editContent, cancelar, cont = {titulo: '', videoLink: '', material: ''}}) => {

  const [content, setContent] = useState(cont)

  const [error, setError] = useState();

  const handleInput = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleSaveContent(e) {
    e.preventDefault();
    setError();

    for(let at in content) {
      if(at == '') {
        return setError("Preencha todos os campos!");
      }
    }

    if(cont.hasOwnProperty('index')) {
      editContent(content);
    } else {
      saveContent(content);
    }
    
  }

  return (
    <div className={styles.overlay}>
      <div 
          className={styles.container}
          style={{width: 80+"vw"}}>
        <form onSubmit={handleSaveContent} className={styles.borderless}>
          <div className={styles.formHeader}>
            <h1>{cont.hasOwnProperty('index') ? "Editar Conteúdo":"Novo conteúdo"}</h1>
    
            <div className={styles.formHeaderSection}>
              <button 
                className={styles.btnSecondary}
                onClick={cancelar}>
                  Cancelar
              </button>
              <button className={styles.btn}>
                Salvar
              </button>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <label>
            Título
            <input type="text" name='titulo' defaultValue={cont.titulo} onChange={handleInput} />
          </label>
          <label>
            Link do vídeo (opcional)
            <input type="text" name='videoLink' defaultValue={cont.videoLink} onChange={handleInput} />
          </label>
          <label>
            Material
            <textarea name='material' cols="30" rows="8" defaultValue={cont.material} onChange={handleInput} />
          </label>
          
        </form>
      </div>
    </div>
  )
}

export default ContentModal