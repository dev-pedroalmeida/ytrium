import React, { useMemo, useState } from 'react';
import styles from '../styles/styles.module.css';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import DescEditor from "./DescEditor";

const ContentModal = ({saveContent, editContent, cancelar, cont = {titulo: '', videoLink: '', material: ''}}) => {

  const [content, setContent] = useState(cont)

  const [error, setError] = useState();

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [material, setMaterial] = useState(
    cont.material == '' ?
    [
      {
        type: "paragraph",
        children: [{ text: "Insira o conteúdo do material!" }]
      }
    ]
    :
    JSON.parse(cont.material)
  );

  const handleInput = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleSaveContent(e) {
    e.preventDefault();
    setError();

    if(content.titulo == '') {
      setError('O conteúdo precisa de um título!');
      return;
    }

    if(content.videoLink == '' && material == '') {
      setError('O conteúdo precisa de um vídeo ou um material escrito!');
      return;
    }

    console.log(error)
    if(error == false ||
      error == undefined ||
      error == '') {
      if(cont.hasOwnProperty('index')) {
        editContent({
          ...content,
          material: JSON.stringify(material),
        });
      } else {
        saveContent({
          ...content,
          material: JSON.stringify(material),
        });
      }
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
            Material escrito
            {/* <textarea name='material' cols="30" rows="8" defaultValue={cont.material} onChange={handleInput} /> */}
            <DescEditor 
                initialValue={material}
                placeholder={"Insira uma descrição!"}
                onChange={(newMaterial) => setMaterial(newMaterial)}
                editor={editor} 
              />
          </label>
          
        </form>
      </div>

      
    </div>
  )
}

export default ContentModal