import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles.module.css";
import BackIcon from "../assets/BackIcon";
import NextIcon from "../assets/NextIcon";
import DescEditor from "../components/DescEditor";
import QuizzSubmit from "../components/QuizzSubmit";

const CourseSubscribed = () => {
  const { user } = useContext(AuthContext);

  const { courseId } = useParams();

  const [course, setCourse] = useState();
  const [modulos, setModulos] = useState([]);
  const [listConQuizz, setListConQuizz] = useState([]);

  const [selectedModule, setSelectedModule] = useState(-1);
  const [selectedConQuizz, setSelectedConQuizz] = useState(-1);
  const [current, setCurrent] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function handleSelectModule(selected) {
    setSelectedConQuizz(-1);
    setSelectedModule(selected);

    function populateLista() {
      if (modulos[selected].quizzes) {
        return [...modulos[selected].conteudos, ...modulos[selected].quizzes];
      } else {
        return [...modulos[selected].conteudos];
      }
    }

    let lista = populateLista();

    lista = lista.sort((a, b) => a.index - b.index);

    setListConQuizz(lista);

    console.log(lista);
  }

  function handleSelectConQuizz(select, completo) {
    setSelectedConQuizz(select);
    if (select == -1) {
      setCurrent(0);
    } else {
      setCurrent(completo);
    }
  }

  function handleCompleteContent(contentId) {
    axios
      .put(
        `http://localhost:3000/student/completeContent`,
        { conteudoId: contentId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);

        let newListConQuizz = listConQuizz;
        newListConQuizz[selectedConQuizz].completo = 1;
        setListConQuizz(newListConQuizz);

        let newCourse = course;
        newCourse.modulos[selectedModule].conteudos.forEach((con) => {
          if (newListConQuizz[selectedConQuizz].id == con.id) {
            con.completo = 1;
          }
        });
        setCourse(newCourse);

        handleCompleteModule(newCourse.modulos[selectedModule].id);

        setCurrent(1);

        // handleSelectConQuizz(-1);
      });
  }

  function handleSaveQuizz(quizzId, porAcertos) {
    axios
      .put(
        `http://localhost:3000/student/completeQuizz`,
        { quizzId: quizzId, porAcertos: porAcertos },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);

        let newListConQuizz = listConQuizz;
        newListConQuizz[selectedConQuizz].completo = 1;
        setListConQuizz(newListConQuizz);

        let newCourse = course;
        newCourse.modulos[selectedModule].quizzes.forEach((qui) => {
          if (newListConQuizz[selectedConQuizz].id == qui.id) {
            qui.completo = 1;
            qui.porcentagemAcertos = porAcertos;
          }
        });
        setCourse(newCourse);

        handleCompleteModule(newCourse.modulos[selectedModule].id);

        setCurrent(1);

        // handleSelectConQuizz(-1);
      });
  }

  function handleCompleteModule(moduloId) {
    let notComplete = false;
    let newCourse = course;

    newCourse.modulos[selectedModule].quizzes.forEach((qui) => {
      if (qui.completo == 0) {
        notComplete = true;
      }
    });

    newCourse.modulos[selectedModule].conteudos.forEach((con) => {
      if (con.completo == 0) {
        notComplete = true;
      }
    });

    if (notComplete) return;

    axios
      .put(
        `http://localhost:3000/student/completeModule`,
        { moduloId: moduloId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        let newCourse = course;
        newCourse.modulos.forEach((mod) => {
          if (mod.id == moduloId) {
            mod.completo = 1;
          }
        });
        setCourse(newCourse);

        handleCompleteCourse(newCourse.cur_id);
      });
  }

  function handleCompleteCourse(cursoId) {
    let notComplete = false;
    let newCourse = course;

    newCourse.modulos.forEach((mod) => {
      if (mod.completo == 0) {
        notComplete = true;
      }
    });

    if (notComplete) return;

    axios
      .put(
        `http://localhost:3000/student/completeCourse`,
        { cursoId: cursoId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        let newCourse = course;
        newCourse.completo = 1;
        setCourse(newCourse);
        setTimeout(() => {
          setCourseCompleted(true);
        }, 1000);
      });
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
        }, 1000);
      });
  }, [courseId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className={styles.containerHeader}>
            <h1>{course?.cur_titulo}</h1>

            <div className={styles.quizzComplete} style={{cursor: 'pointer'}} onClick={() => navigate('profile/completions')}>
              Completo
              <NextIcon />
            </div>
          </div>

          <div className={styles.moduleContainer}>
            <div className={styles.moduleList}>
              {modulos.length > 0 &&
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
                })}
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

                        <div className={current == 1 && styles.quizzComplete}>
                          {listConQuizz[selectedConQuizz].hasOwnProperty(
                            "porcentagemAcertos"
                          ) &&
                            current == 1 && (
                              <div>
                                {
                                  listConQuizz[selectedConQuizz]
                                    .porcentagemAcertos
                                }%
                              </div>
                            )}

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
                      </div>

                      {listConQuizz[selectedConQuizz].hasOwnProperty(
                        "material"
                      ) ? (
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

                          <button
                            className={styles.btn}
                            style={{ alignSelf: "center" }}
                            onClick={() =>
                              handleCompleteContent(
                                listConQuizz[selectedConQuizz].id
                              )
                            }
                            disabled={current == 1}
                          >
                            Completar
                          </button>
                        </>
                      ) : (
                        <>
                          <QuizzSubmit
                            quizz={listConQuizz[selectedConQuizz]}
                            current={current}
                            handleSaveQuizz={(quizzId, porAcertos) =>
                              handleSaveQuizz(quizzId, porAcertos)
                            }
                          />
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
      {/* <div className={styles.log} onClick={() => console.log(answer)}>
        logger 
      </div> */}

      {courseCompleted && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.statusIcon + " " + styles.complete}>
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
              <h1>Parabéns!</h1>
            </div>
            Você completo o curso {course.cur_titulo}
            <div className={styles.modalRow}>
              <button
                className={styles.btnSecondary}
                onClick={() => setCourseCompleted(false)}
              >
                Fechar
              </button>
              <button className={styles.btn}>Ver Certificado</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSubscribed;
