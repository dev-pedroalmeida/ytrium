import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles.module.css";
import NextIcon from "../assets/NextIcon";
import DescEditor from "../components/DescEditor";
import QuizzSubmit from "../components/QuizzSubmit";
import Container from "../components/Container";
import Loading from "../components/Loading";
import ContainerHeader from "../components/ContainerHeader";
import ContainerTitle from "../components/ContainerTitle";
import {
  Check,
  ChevronLeft,
  ListTodo,
  Plus,
  Sparkle,
  SquareLibrary,
  Text,
} from "lucide-react";
import Button from "../components/Button";
import Overlay from "../components/Overlay";

const CourseSubscribed = () => {
  const { user, setUser } = useContext(AuthContext);

  const { courseId } = useParams();

  const [course, setCourse] = useState();
  const [modulos, setModulos] = useState([]);
  const [listConQuizz, setListConQuizz] = useState([]);

  const [selectedModule, setSelectedModule] = useState(-1);
  const [selectedConQuizz, setSelectedConQuizz] = useState(-1);
  const [current, setCurrent] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const [badgeWon, setBadgeWon] =
    useState(
      {
      ins_id: 1,
      ins_titulo: "Bronze",
      ins_qtdCursos: 2,
      ins_icone: "52ab5f8e1b1954910de9186e6a5ba316",
    }
  )

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

    if (newCourse.modulos[selectedModule].quizzes) {
      newCourse.modulos[selectedModule].quizzes.forEach((qui) => {
        if (qui.completo == 0) {
          notComplete = true;
        }
      });
    }

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
        {
          cursoId: cursoId,
          cursoXp: course.cur_qtdExperiencia,
          userNivel: user.nivel || 1,
          userXp: user.experiencia || 0,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setUser({
          ...user,
          nivel: res.data.userNivel,
          experiencia: res.data.userXp,
        });

        let newCourse = course;
        newCourse.completo = 1;
        setCourse(newCourse);
        setBadgeWon(res.data.badge);

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
    <>
      {courseCompleted && (
        <Overlay onClick={() => setCourseCompleted(false)}>
          <div className="p-6 shadow-lg rounded-lg bg-white flex flex-col gap-2 w-[45ch] text-center">
            <div className="flex items-center gap-2">
              <Sparkle color="#F59E0B" />
              <div className="bg-amber-500 h-0.5 flex-1"></div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <h1 className="text-3xl font-bold">Parabéns!</h1>
            </div>
            <div className="text-lg font-medium">
              Você completo o curso {course?.cur_titulo}
            </div>

            {badgeWon && (
              <div className="flex flex-col items-center">
                <div className="text-lg font-medium">
                  e ganhou a insígnia {badgeWon?.ins_titulo}:
                </div>
                <img
                  src={`http://www.localhost:3000/badges/${badgeWon?.ins_icone}`}
                  alt="badge icon"
                  className="h-28 mt-4"
                />
              </div>
            )}
            <div className="mt-4 px-2 py-1 rounded text-white text-lg font-medium bg-gradient-to-tr from-amber-400/90 to-amber-500/90 flex items-center justify-center w-fit self-center">
              <Plus size={22} strokeWidth={3} />
              {course?.cur_qtdExperiencia} XP
            </div>
            <div className="flex justify-end items-center gap-4 mt-4">
              <Button variant="text" onClick={() => setCourseCompleted(false)}>
                Fechar
              </Button>
              <Button onClick={() => navigate("/student/profile")}>
                Ver Certificado
              </Button>
            </div>
          </div>
        </Overlay>
      )}
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ContainerHeader>
              <ContainerTitle>{course?.cur_titulo}</ContainerTitle>

              {course?.alc_status == 1 && (
                <div
                  className="flex items-center gap-2 bg-amber-100 hover:bg-orange-200/70 text-amber-500 font-semibold py-1 px-2 rounded-lg cursor-pointer transition"
                  onClick={() => navigate("/student/profile")}
                >
                  Baixar certificado
                  <NextIcon />
                </div>
              )}
            </ContainerHeader>

            <div className="grid grid-cols-4 gap-16">
              <div className="flex flex-col py-2 gap-2">
                {modulos.length > 0 &&
                  modulos?.map((modulo) => {
                    return (
                      <div
                        className={`p-2 rounded-lg cursor-pointer text-ellipsis flex items-center gap-1 text-amber-500 font-bold
                                    transition hover:ring-2 hover:ring-amber-400
                                    ${
                                      selectedModule === modulo.index &&
                                      "bg-amber-200/60"
                                    }`}
                        key={modulo.index}
                        onClick={() => {
                          handleSelectModule(modulo.index);
                        }}
                      >
                        <SquareLibrary size={18} />
                        <span className="overflow-hidden text-nowrap text-ellipsis flex-1">
                          {modulo.titulo}
                        </span>
                        <div
                          className={`p-1 rounded-lg bg-amber-200/50 text-amber-50
                                      ${
                                        modulo.completo == 1 &&
                                        "text-orange-400/80"
                                      }`}
                          onClick={() => {
                            handleCompleteModule(modulo.id);
                          }}
                        >
                          <Check size={18} strokeWidth={6} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="col-span-3 flex flex-col gap-4 p-2">
                {selectedModule != -1 ? (
                  <>
                    {selectedConQuizz == -1 ? (
                      <>
                        {listConQuizz.map((cq) => {
                          if (cq.hasOwnProperty("material")) {
                            return (
                              <div
                                className={`py-2 px-8 rounded-lg cursor-pointer text-ellipsis flex items-center gap-1 text-zinc-800 font-bold
                                            transition hover:ring-2 hover:ring-amber-400`}
                                key={cq.index}
                                onClick={() => {
                                  handleSelectConQuizz(cq.index, cq.completo);
                                }}
                              >
                                <Text size={20} />
                                <span className="overflow-hidden grow">
                                  {cq.titulo}
                                </span>
                                <div
                                  className={`p-1 rounded-lg bg-amber-200/50 text-amber-50
                                      ${
                                        cq.completo == 1 && "text-orange-400/80"
                                      }`}
                                >
                                  <Check size={18} strokeWidth={6} />
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className={`py-2 px-8 rounded-lg cursor-pointer text-ellipsis flex items-center gap-1 text-zinc-800 font-bold
                                          transition hover:ring-2 hover:ring-amber-400`}
                                key={cq.id}
                                onClick={() => {
                                  handleSelectConQuizz(cq.index, cq.completo);
                                }}
                              >
                                <ListTodo size={20} />
                                <span className="overflow-hidden grow">
                                  {cq.titulo}
                                </span>
                                <div
                                  className={`p-1 rounded-lg bg-amber-200/50 text-amber-50
                                      ${
                                        cq.completo == 1 && "text-orange-400/80"
                                      }`}
                                >
                                  <Check size={18} strokeWidth={6} />
                                </div>
                              </div>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="action"
                            onClick={() => handleSelectConQuizz(-1)}
                          >
                            <ChevronLeft size={20} />
                          </Button>

                          <h2 className="text-xl font-bold">
                            {listConQuizz[selectedConQuizz].titulo}
                          </h2>

                          <div
                            className={
                              current == 1 &&
                              "flex items-center gap-2 text-amber-500 font-medium py-1 px-2 rounded-lg"
                            }
                          >
                            {listConQuizz[selectedConQuizz].hasOwnProperty(
                              "porcentagemAcertos"
                            ) &&
                              current == 1 && (
                                <div>
                                  {
                                    listConQuizz[selectedConQuizz]
                                      .porcentagemAcertos
                                  }
                                  %
                                </div>
                              )}

                            <div
                              className={`p-1 rounded-lg bg-amber-200/50 text-amber-50
                              ${current == 1 && "text-orange-400/80"}`}
                            >
                              <Check size={18} strokeWidth={6} />
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
                                  {/* <h3>Vídeo:</h3> */}
                                  <iframe
                                    width="600"
                                    height="315"
                                    src={
                                      listConQuizz[selectedConQuizz].videoLink
                                    }
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                </>
                              )}
                            </div>
                            <div className="w-[80ch] self-center pt-4">
                              {listConQuizz[selectedConQuizz].material && (
                                <>
                                  {/* <h3 className="text-lg font-medium mb-4">Material escrito:</h3> */}
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

                            <Button
                              classes="self-center"
                              onClick={() =>
                                handleCompleteContent(
                                  listConQuizz[selectedConQuizz].id
                                )
                              }
                              disabled={current == 1}
                            >
                              Completar
                            </Button>
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
                  <p className="font-medium text-lg p-2">Selecione um módulo</p>
                )}
              </div>
            </div>
          </>
        )}
        {/* <div className={styles.log} onClick={() => console.log(answer)}>
          logger 
        </div> */}
      </Container>
    </>
  );
};

export default CourseSubscribed;
