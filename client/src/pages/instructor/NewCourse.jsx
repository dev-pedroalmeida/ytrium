import React, { useEffect, useMemo, useState } from "react";
import styles from "../../styles/styles.module.css";
import PlusIcon from "../../assets/PlusIcon";
import axios from "axios";
import NewModule from "../../components/NewModule";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ContentModal from "../../components/ContentModal";
import QuizzModal from "../../components/QuizzModal";
import DeleteIcon from "../../assets/DeleteIcon";

const NewCourse = () => {

  const [newCourse, setNewCourse] = useState({
    titulo: "",
    experiencia: "",
    descricao: "",
  });

  const [modulos, setModulos] = useState([]);
  const [dificuldade, setDificuldade] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedModule, setSelectedModule] = useState(-1);

  const [currentTab, setCurrentTab] = useState(1);
  const [newModule, setNewModule] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [actionContent, setActionContent] = useState();
  const [openQuizz, setOpenQuizz] = useState(false);
  const [actionQuizz, setActionQuizz] = useState();
  
  const [categories, setCategories] = useState();

  const [listConQuizz, setListConQuizz] = useState([]);

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
    setError();

    let courseData = {
      titulo: newCourse.titulo,
      descricao: newCourse.descricao,
      dificuldade: dificuldade.value,
      experiencia: dificuldade.xp,
      categorias: selectedCategories,
      modulos: modulos,
    };

    for (let i in courseData) {
      if (
        courseData[i] == null ||
        courseData[i] == undefined ||
        courseData[i] == ""
      ) {
        setError("Preencha todos os campos!");
        setCurrentTab(1);
        return;
      }
    }

    console.log(courseData);

    axios
      .post("http://localhost:3000/instructor/newCourse", courseData, {
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
        // if(res.status == 200) {
        //   navigate('/instructor');
        // }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/instructor/categories", {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(
          res.data.map(({ cat_id, cat_descricao }) => {
            return {
              value: cat_id,
              label: cat_descricao,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

        <div className={styles.formTabs}>
          <div
            className={
              styles.formTab + " " + (currentTab == 1 && styles.active)
            }
            onClick={() => setCurrentTab(1)}
          >
            Informações básicas
          </div>
          <div
            className={
              styles.formTab + " " + (currentTab == 2 && styles.active)
            }
            onClick={() => setCurrentTab(2)}
          >
            Módulos
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={currentTab != 1 ? styles.hidden : ""}>
          <div className={styles.formSection}>
            <div className={styles.formColumn}>
              <label>
                Título
                <input type="text" name="titulo" onChange={handleInput} />
              </label>
              <label>
                Dificuldade:
                <Select
                  noOptionsMessage={() => "Não encontrado!"}
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
                <Select
                  isMulti
                  noOptionsMessage={() => "Não encontrado!"}
                  name="categoria"
                  options={categories}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors,
                      primary: "#272727",
                    },
                  })}
                  styles={selectStyles}
                  onChange={(e) => setSelectedCategories([...e])}
                />
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <label>
              Descrição
              <textarea
                name="descricao"
                onChange={handleInput}
                cols="30"
                rows="8"
              ></textarea>
            </label>
          </div>
        </div>

        <div className={currentTab != 2 ? styles.hidden : styles.moduleContainer}>
          <div className={styles.moduleList}>
            <button
              type="button"
              className={styles.btn}
              onClick={() => setNewModule(true)}
            >
              Adicionar módulo
              <PlusIcon />
            </button>

            {modulos?.length > 0 ? (
              modulos.map((modulo, index) => {
                return (
                  <div
                    className={
                      (selectedModule === index)
                        ? styles.selected + " " + styles.module
                        : styles.module
                    }
                    key={index}
                    
                  >
                    <div> ▥ </div>
                    <span onClick={() => {
                      setSelectedModule(index);
                    }}>
                      {modulo.titulo}
                    </span>
                    <button type="button" className={styles.btnText}
                      onClick={() => {
                        setSelectedModule(-1);

                        let mods = modulos;
                        mods = mods.filter(mod => {
                          if(mod.index != index) {
                            if(mod.index > index) {
                              mod.index--;
                            }
                            return true;
                          }
                          return false;
                        })

                        setModulos(mods);

                        let lcqs = listConQuizz;
                        lcqs = lcqs.filter((lcq, ind) => {
                          return ind != index;
                        })

                        setListConQuizz(lcqs);
                      }}>
                      <DeleteIcon />
                    </button>
                  </div>
                );
              })
            ) : (
              <p>Nenhum módulo encontrado!</p>
            )}
          </div>

          <div className={styles.moduleContent}>
            {modulos[selectedModule] ?
              <>
                <div className={styles.formHeader}>
                  <h2>{modulos[selectedModule].titulo}</h2>
                    
                  <div className={styles.formHeaderSection}>
                    <button type="button" className={styles.btnText}
                      onClick={() => {
                        setOpenContent(true);
                      }}>
                      Adicionar conteúdo
                      <PlusIcon color="#808080" />
                    </button>
                    <button type="button" className={styles.btnText}
                      onClick={() => {
                        setOpenQuizz(true);
                      }}>
                      Adicionar quizz
                      <PlusIcon color="#808080" />  
                    </button>
                  </div>
                </div>
                
                {listConQuizz[selectedModule].map(cq => {

                  if(cq.hasOwnProperty('material')) {
                    return (
                      <div 
                        className={styles.module} key={cq.index} 
                        onClick={() => {
                          setActionContent(cq);
                          setOpenContent(true);
                      }}>
                        Modulo: 
                        {cq.titulo}
                        <div>
                          {cq.index}
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div 
                        className={styles.module} key={cq.index} 
                        onClick={() => {
                          setActionQuizz(cq);
                          setOpenQuizz(true);
                      }}>
                        Quizz: 
                        {cq.titulo}
                        <div>
                          {cq.index}
                        </div>
                      </div>
                    )
                  }
                })}

              </>
              :
              <p></p>
            }
          </div>
        </div>
      </form>

      {newModule && (
        <NewModule
          saveModule={(titulo) => {
            setModulos([
              ...modulos,
              { 
                titulo: titulo, 
                index: modulos.length,
                conteudos: [],
                quizzes: []
              },
            ]);

            setListConQuizz([
              ...listConQuizz,
              []
            ])

            setNewModule(false);
          }}
          cancelar={() => setNewModule(false)}
        />
      )}

      {openContent && (
        <ContentModal 
          saveContent={(con) => {
            let mod = modulos;
            con.index = listConQuizz[selectedModule].length;
            mod[selectedModule].conteudos.push(con);
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule].push(con);
            setListConQuizz(conQuizz);

            setOpenContent(false);
          }}
          editContent={(con) => {
            let mod = modulos;
            mod[selectedModule].conteudos[con.index] = con;
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule][con.index] = con;
            setListConQuizz(conQuizz);

            setOpenContent(false);
          }}
          cont={actionContent}
          cancelar={() => {
            setActionContent();
            setOpenContent(false);
          }}
        />
      )}

      {openQuizz && (
        <QuizzModal 
          saveQuizz={(qui) => {
            let mod = modulos;
            qui.index = listConQuizz[selectedModule].length;
            mod[selectedModule].quizzes.push(qui);
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule].push(qui);
            setListConQuizz(conQuizz);

            setOpenQuizz(false);
          }}
          editQuizz={(qui) => {
            let mod = modulos;
            mod[selectedModule].quizzes[qui.index] = qui;
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule][qui.index] = qui;
            setListConQuizz(conQuizz);

            setOpenQuizz(false);
          }}
          qui={actionQuizz}
          cancelar={() => {
            setActionQuizz();
            setOpenQuizz(false);
          }}
        />
      )}

      <div className={styles.log} onClick={() => console.log(modulos)}>
          logger
      </div>
    </div>
  );
};

export default NewCourse;
