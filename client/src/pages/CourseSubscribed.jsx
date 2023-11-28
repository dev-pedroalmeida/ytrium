import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles.module.css";
import BackIcon from "../assets/BackIcon";
import DescEditor from "../components/DescEditor";

const CourseSubscribed = () => {
  const { user } = useContext(AuthContext);

  const { courseId } = useParams();

  const [course, setCourse] = useState();
  const [modulos, setModulos] = useState([]);
  const [listConQuizz, setListConQuizz] = useState([]);

  const [selectedModule, setSelectedModule] = useState(-1);
  const [selectedConQuizz, setSelectedConQuizz] = useState(-1);
  const [current, setCurrent] = useState(0);

  const [answer, setAnswer] = useState([]);

  const [loading, setLoading] = useState(true);

  function handleSelectModule(selected) {
    setSelectedConQuizz(-1);
    setAnswer([]);
    setSelectedModule(selected);

    function populateLista() {
      if(modulos[selected].quizzes) {
        return [...modulos[selected].conteudos, ...modulos[selected].quizzes];
      } else {
        return [...modulos[selected].conteudos]
      }
    }

    let lista = populateLista();

    lista = lista.sort((a, b) => a.index - b.index);

    setListConQuizz(lista);

    console.log(lista);
  }

  function handleSelectConQuizz(select, completo) {
    setSelectedConQuizz(select);
    setAnswer([])
    if(select == -1) {
      setCurrent(0);
    } else {
      setCurrent(completo);
    }
  }

  function handleSelectAnswer(ind, selected) {
    console.log(ind)
    console.log(selected)
    let ans = answer
    ans[ind] = {
      selected: selected,
    }
    setAnswer(ans);
  }

  function handleCompleteContent(contentId) {
    axios
      .put(`http://localhost:3000/student/completeContent`, {conteudoId: contentId}, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        let newListConQuizz = listConQuizz;
        newListConQuizz[selectedConQuizz].completo = 1;
        setListConQuizz(newListConQuizz);

        let newCourse = course;
        newCourse.modulos[selectedModule].conteudos.forEach(con => {
          if(newListConQuizz[selectedConQuizz].id == con.id) {
            con.completo = 1;
          }
        })
        setCourse(newCourse);

        setCurrent(1);

        // handleSelectConQuizz(-1);
      })
  }

  function handleCompleteQuizz(quizzId) {
    // axios
    //   .put(`http://localhost:3000/student/completeQuizz`, {quizzId: quizzId}, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     let newListConQuizz = listConQuizz;
    //     newListConQuizz[selectedConQuizz].completo = 1;
    //     setListConQuizz(newListConQuizz);

    //     let newCourse = course;
    //     newCourse.modulos[selectedModule].quizzes.forEach(qui => {
    //       if(newListConQuizz[selectedConQuizz].id == qui.id) {
    //         qui.completo = 1;
    //       }
    //     })
    //     setCourse(newCourse);

    //     setCurrent(1);

    //     // handleSelectConQuizz(-1);
    //   })


  }


  useEffect(() => {
    axios
      .get(`http://localhost:3000/student/subscribed/${courseId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCourse(res.data);
        setModulos(res.data.modulos);
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      })
  }, [courseId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className={styles.containerHeader}>
            <h1>{course?.cur_titulo}</h1>
          </div>

          <div className={styles.moduleContainer}>
            <div className={styles.moduleList}>
              {modulos.length > 0 && (
                modulos?.map((modulo) => {
                  return (
                    <div
                      className={
                        selectedModule === modulo.index
                          ? styles.selected + " " + styles.module
                          : styles.module
                      }
                      key={modulo.index}
                    >
                      <div> ▥ </div>
                      <span
                        onClick={() => {
                          handleSelectModule(modulo.index);
                        }}
                      >
                        {modulo.titulo}
                      </span>
                      <div
                        className={
                          modulo.completo == 0
                            ? styles.statusIcon
                            : styles.statusIcon + " " + styles.complete
                        }
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233"
                            stroke="white"
                            strokeWidth="5.25538"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className={styles.moduleContent}>
              {selectedModule != -1 ? (
                <>
                  {selectedConQuizz == -1 ? (
                    <>
                      {listConQuizz.map((cq) => {
                        if (cq.hasOwnProperty("material")) {
                          return (
                            <div
                              className={styles.module}
                              key={cq.index}
                              onClick={() => {
                                handleSelectConQuizz(cq.index, cq.completo);
                              }}
                            >
                              Conteúdo:&nbsp;
                              {cq.titulo}
                              <div
                                className={
                                  cq.completo == 1
                                    ? styles.statusIcon + " " + styles.complete
                                    : styles.statusIcon
                                }
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 18 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233"
                                    stroke="white"
                                    strokeWidth="5.25538"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className={styles.module}
                              key={cq.id}
                              onClick={() => {
                                handleSelectConQuizz(cq.index, cq.completo);
                              }}
                            >
                              Quizz:&nbsp;
                              {cq.titulo}
                              <div
                                className={
                                  cq.completo == 1
                                    ? styles.statusIcon + " " + styles.complete
                                    : styles.statusIcon
                                }
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 18 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233"
                                    stroke="white"
                                    strokeWidth="5.25538"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </>
                  ) : (
                    <>
                      <div className={styles.moduleHeader}>
                        <button
                          onClick={() => handleSelectConQuizz(-1)}
                          className={styles.btnText}
                        >
                          <BackIcon />
                          Voltar
                        </button>

                        <h2>{listConQuizz[selectedConQuizz].titulo}</h2>

                        <div
                          className={
                            current == 1
                              ? styles.statusIcon + " " + styles.complete
                              : styles.statusIcon
                          }
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 18 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233"
                              stroke="white"
                              strokeWidth="5.25538"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {listConQuizz[selectedConQuizz].hasOwnProperty("material") 
                      ? (
                        <>
                          <div>
                            {listConQuizz[selectedConQuizz].videoLink && (
                              <>
                                <h3>Vídeo:</h3>
                                <iframe
                                  width="600"
                                  height="315"
                                  src={listConQuizz[selectedConQuizz].videoLink}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                              </>
                            )}
                          </div>
                          <div>
                            {listConQuizz[selectedConQuizz].material && (
                              <>
                                <h3>Material escrito:</h3>
                                <DescEditor
                                  initialValue={JSON.parse(
                                    listConQuizz[selectedConQuizz].material
                                  )}
                                  readOnly={true}
                                />
                                {/* <p>{listConQuizz[selectedConQuizz].material}</p> */}
                              </>
                            )}
                          </div>

                          <button className={styles.btn} style={{alignSelf: 'center'}}
                            onClick={() => handleCompleteContent(listConQuizz[selectedConQuizz].id)}
                            disabled={current == 1}>
                            Completar
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            {listConQuizz[selectedConQuizz].questoes.map((que, ind) => {
                              return (
                                <div key={que.id} className={styles.question}>
                                  <h3>{que.pergunta}</h3>
                                  {que.alternativas.map(alt => {
                                    return (
                                      <div key={alt.id} className={styles.alternative}>
                                        
                                        <div className={
                                              answer[ind]?.selected == alt.id
                                                ? styles.statusIcon + " " + styles.complete
                                                : styles.statusIcon 
                                            }
                                        >
                                          <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 18 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233"
                                              stroke="white"
                                              strokeWidth="5.25538"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>

                                        <div>
                                          {alt.alternativa}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>

                              )
                            })}
                          </div>

                          <button className={styles.btn} style={{alignSelf: 'center'}}
                            onClick={() => handleCompleteQuizz(listConQuizz[selectedConQuizz].id)}
                            disabled={current == 1}>
                            Completar
                          </button>
                        </>
                      )}


                      

                    </>
                  )}
                </>
              ) : (
                <p className={styles.selecione}>Selecione um módulo</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseSubscribed;
