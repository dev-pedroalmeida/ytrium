import React, { useState } from "react";
import styles from '../styles/styles.module.css';
import PlusIcon from '../assets/PlusIcon';
import axios from 'axios'
import NewModule from "../components/NewModule";

const NewCourse = () => {

  const [newCourse, setNewCourse] = useState({
    titulo: '',
    experiencia: '',
    descricao: '',
  });

  const [newModule, setNewModule] = useState(false);
  const [modulos, setModulos] = useState([]);

  const handleInput = (e) => {
    setNewCourse(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState();



  const handleNewCourse = (e) => {
    e.preventDefault();
    console.log(newCourse);
    setError();

    
    let courseData = {
      titulo: newCourse.titulo,
      experiencia: newCourse.experiencia,
      descricao: newCourse.descricao,
    };
    
    axios.post('http://localhost:3000/instructor/newCourse', courseData, {
      withCredentials: true,
    })
    .catch(err => {
      console.log(err);
      if(err.response.status == 400) {
        return setError("Erro!")
      }
    })
    .then(res => {
      console.log(res);
    })
    

  }

  return (
    <div className={styles.container}>
      <form id="newCourseForm" onSubmit={handleNewCourse}>
        <div className={styles.formSection}>
          <h1>Novo Curso</h1>
          <button className={styles.btn}>
            Criar
            <PlusIcon />
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formSection}>
          <div className={styles.formColumn}>
            <label>
              Título
              <input type="text" name="titulo" onChange={handleInput} />
            </label>
            <label className="row">
              Experiência: 
              <input type="text" name="experiencia" onChange={handleInput} />
            </label>
            <label className="row">
              Categorias: 
              <input type="text" name="categoria" disabled />
            </label>
          </div>

          <div className={styles.formColumn}>
            <label>
              Descrição
              <textarea name="descricao" onChange={handleInput} cols="30" rows="8"></textarea>
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Módulos</h2>
          <button type="button" className={styles.btn} onClick={() => setNewModule(true)}>
            Adicionar módulo
          </button>
        </div>

        <div className={styles.moduleList}>
          {modulos.length > 0 ? 
            modulos.map((modulo, index) => {
              return <div className={styles.module} key={index}>
                {modulo.titulo}
              </div>
            })
            :
            <p>
              Nenhum módulo encontrado!
            </p>
          }
        </div>
        
      </form>


      {newModule && <NewModule saveModule={(titulo) => {
          setModulos([...modulos, {titulo: titulo}]);
          setNewModule(false);
        }}
        cancelar={() => setNewModule(false)}
        />}
    </div>
  );
};

export default NewCourse;
