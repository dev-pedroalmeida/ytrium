import React, { useState } from "react";
import styles from "../../styles/styles.module.css";
import PlusIcon from "../../assets/PlusIcon";
import axios from "axios";
import NewModule from "../../components/NewModule";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const NewCourse = () => {
  const [newCourse, setNewCourse] = useState({
    titulo: "",
    experiencia: "",
    descricao: "",
  });

  const [newModule, setNewModule] = useState(false);
  const [modulos, setModulos] = useState([]);
  const [dificuldade, setDificuldade] = useState({});

  const handleInput = (e) => {
    setNewCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState();

  const navigate = useNavigate();

  const dificultyOptions = [
    { value: "iniciante", label: "Iniciante - 1000 XP", xp: 1000 },
    { value: "intermediário", label: "Intermediário - 2000 XP", xp: 2000 },
    { value: "avançado", label: "Avançado - 3000 XP", xp: 3000 },
  ];

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "#e5e7eb",
      margin: "8px 0",
    }),
  };

  const handleNewCourse = (e) => {
    e.preventDefault();
    console.log(newCourse);
    setError();

    let courseData = {
      titulo: newCourse.titulo,
      experiencia: newCourse.experiencia,
      descricao: newCourse.descricao,
      dificuldade: dificuldade.value,
      xp: dificuldade.xp,
    };

    console.log(courseData);

    // axios.post('http://localhost:3000/instructor/newCourse', courseData, {
    //   withCredentials: true,
    // })
    // .catch(err => {
    //   console.log(err);
    //   if(err.response.status == 400) {
    //     return setError("Erro!")
    //   }
    // })
    // .then(res => {
    //   navigate('/instructor');
    // })
  };

  return (
    <div className={styles.container}>
      <form
        id="newCourseForm"
        onSubmit={handleNewCourse}
        className={styles.borderless}
      >
        <div className={styles.formHeader}>
          <h1>Novo Curso</h1>
          <button className={styles.btn + " " + styles.large}>
            Criar
            <PlusIcon />
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formSection}>
          <div className={styles.formColumn}>
            <label>
              Título
              <input
                required
                type="text"
                name="titulo"
                onChange={handleInput}
              />
            </label>
            <label>
              Dificuldade:
              <Select
                noOptionsMessage={() => "Não encontrado!"}
                required
                name="dificuldade"
                options={dificultyOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary: "#272727",
                  },
                })}
                styles={selectStyles}
                onChange={(e) => setDificuldade(e)}
              />
            </label>
          </div>

          <div className={styles.formColumn}>
            <label>
              Categorias:
              <input type="text" name="categoria" disabled />
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <label>
            Descrição
            <textarea
              required
              name="descricao"
              onChange={handleInput}
              cols="30"
              rows="8"
            ></textarea>
          </label>
        </div>

        <div className={styles.formSection}>
          <h2>Módulos</h2>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setNewModule(true)}
          >
            Adicionar módulo
          </button>
        </div>

        <div className={styles.moduleList}>
          {modulos.length > 0 ? (
            modulos.map((modulo, index) => {
              return (
                <div className={styles.module} key={index}>
                  {modulo.titulo}
                </div>
              );
            })
          ) : (
            <p>Nenhum módulo encontrado!</p>
          )}
        </div>
      </form>

      {newModule && (
        <NewModule
          saveModule={(titulo) => {
            setModulos([...modulos, { titulo: titulo }]);
            setNewModule(false);
          }}
          cancelar={() => setNewModule(false)}
        />
      )}
    </div>
  );
};

export default NewCourse;
