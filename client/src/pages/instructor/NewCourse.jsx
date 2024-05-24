import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NewModule from "../../components/NewModule";
import { useNavigate } from "react-router-dom";
import ContentModal from "../../components/ContentModal";
import QuizzModal from "../../components/QuizzModal";
import DescEditor from "../../components/DescEditor";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import Container from "../../components/Container";
import ContainerTitle from "../../components/ContainerTitle";
import ContainerHeader from "../../components/ContainerHeader";
import Button from "../../components/Button";
import FormLabel from "../../components/form/FormLabel";
import FormInput from "../../components/form/FormInput";
import { ListTodo, Plus, SquareLibrary, Text, Trash } from "lucide-react";
import FormSelect from "../../components/form/FormSelect";

const NewCourse = () => {
  const [newCourse, setNewCourse] = useState({
    titulo: "",
  });

  const handleInput = (e) => {
    setError();
    setNewCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [desc, setDesc] = useState([
    {
      type: "paragraph",
      children: [{ text: "Insira uma descrição!" }],
    },
  ]);

  const [error, setError] = useState();

  const navigate = useNavigate();

  const dificultyOptions = [
    { value: "Iniciante", label: "Iniciante - 1000 XP", xp: 1000 },
    { value: "Intermediário", label: "Intermediário - 2000 XP", xp: 2000 },
    { value: "Avançado", label: "Avançado - 3000 XP", xp: 3000 },
  ];

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "#e5e7eb",
      margin: "8px 0",
    }),
  };

  async function handleNewCourse(e) {
    e.preventDefault();
    setError();

    let courseData = {
      titulo: newCourse.titulo,
      descricao: JSON.stringify(desc),
      dificuldade: dificuldade.value,
      experiencia: dificuldade.xp,
      categorias: selectedCategories,
    };

    console.log(courseData);

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

    courseData.modulos = modulos;

    if (courseData.modulos.length < 1) {
      setError("O curso precisa de pelo menos um módulo!");
      setCurrentTab(2);
      return;
    }

    courseData.modulos.forEach((mod) => {
      if (mod.conteudos.length <= 0) {
        setError("Cada módulo precisa de pelo menos um conteúdo!");
        setCurrentTab(2);
        return;
      }
    });

    setTimeout(() => {
      if (error == false || error == undefined || error == "") {
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
            if (res.status == 200) {
              navigate("/instructor");
            }
          });
      }
    }, 1000);
  }

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
    <Container>
      <form id="newCourseForm" onSubmit={handleNewCourse}>
        <ContainerHeader>
          <ContainerTitle>Novo Curso</ContainerTitle>
          <Button type="submit">
            Criar
            <Plus size={20} />
          </Button>
        </ContainerHeader>

        <div className="flex gap-4 border-b-2 border-amber-300 pb-1 mb-8">
          <div
            className={`cursor-pointer p-2 rounded-lg font-bold text-sm text-amber-600/70 relative hover:bg-amber-100/80 ${
              currentTab == 1 && "text-amber-500 bg-amber-100"
            }`}
            onClick={() => {
              setError();
              setCurrentTab(1);
            }}
          >
            Informações básicas
          </div>
          <div
            className={`cursor-pointer p-2 rounded-lg font-bold text-sm text-amber-600/70 relative hover:bg-amber-100/80 ${
              currentTab == 2 && "text-amber-500 bg-amber-100"
            }`}
            onClick={() => {
              setError();
              setCurrentTab(2);
            }}
          >
            Módulos
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-500 my-3 px-2 py-1 rounded-lg">
            {error}
          </div>
        )}

        <div className={`flex flex-col gap-4 ${currentTab != 1 && "hidden"}`}>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <FormLabel>
              Título
              <FormInput type="text" name="titulo" onChange={handleInput} />
            </FormLabel>

            <FormLabel>
              Categorias:
              <FormSelect
                isMulti
                name="categoria"
                options={categories}
                onChange={(e) => {
                  setSelectedCategories([...e]);
                  setError();
                }}
              />
            </FormLabel>

            <FormLabel>
              Dificuldade:
              <FormSelect
                name="dificuldade"
                options={dificultyOptions}
                onChange={(e) => {
                  setError();
                  setDificuldade(e);
                }}
              />
            </FormLabel>
          </div>

          <div className="max-w-[60%]">
            <FormLabel>
              Descrição
              {/* <textarea
                name="descricao"
                onChange={handleInput}
                cols="30"
                rows="8"
              ></textarea> */}
              <div className="bg-white rounded shadow">
                <DescEditor
                  initialValue={desc}
                  onChange={(newDesc) => {
                    setDesc(newDesc);
                    setError();
                  }}
                  editor={editor}
                />
              </div>
            </FormLabel>
          </div>
        </div>

        <div className={currentTab != 2 ? "hidden" : "grid grid-cols-4 gap-16"}>
          <div className="flex flex-col py-2 gap-4">
            <Button
              classes="self-center"
              onClick={() => {
                setNewModule(true);
                setError();
              }}
            >
              Adicionar módulo
              <Plus size={16} />
            </Button>

            {modulos?.length > 0 ? (
              modulos.map((modulo, index) => {
                return (
                  <div
                    className={`py-1 px-2 rounded-lg cursor-pointer text-ellipsis flex items-center gap-1 text-amber-500 font-bold
                                transition hover:ring-2 hover:ring-amber-400
                                ${
                                  selectedModule === index && "bg-amber-200/60"
                                }`}
                    key={index}
                    onClick={() => {
                      setSelectedModule(index);
                    }}
                  >
                    <SquareLibrary size={18} />
                    <span className="overflow-hidden text-nowrap text-ellipsis flex-1">
                      {modulo.titulo}
                    </span>
                    <Button
                      variant="action"
                      onClick={() => {
                        setError();
                        setSelectedModule(-1);

                        let mods = modulos;
                        mods = mods.filter((mod) => {
                          if (mod.index != index) {
                            if (mod.index > index) {
                              mod.index--;
                            }
                            return true;
                          }
                          return false;
                        });

                        setModulos(mods);

                        let lcqs = listConQuizz;
                        lcqs = lcqs.filter((lcq, ind) => {
                          return ind != index;
                        });

                        setListConQuizz(lcqs);
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-sm mt-6">
                Nenhum módulo encontrado!
              </p>
            )}
          </div>

          <div className="col-span-3 flex flex-col gap-4 p-2">
            {modulos[selectedModule] ? (
              <>
                <div className="flex items-center justify-between text-zinc-900">
                  <h2 className="text-xl font-bold">
                    {modulos[selectedModule].titulo}
                  </h2>

                  <div className="self-end flex items-center gap-2">
                    <Button
                      variant="action"
                      onClick={() => {
                        setActionContent();
                        setOpenContent(true);
                      }}
                    >
                      Adicionar conteúdo
                      <Plus size={14} />
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        setOpenQuizz(true);
                      }}
                    >
                      Adicionar quizz
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>

                {listConQuizz[selectedModule].map((cq) => {
                  if (cq.hasOwnProperty("material")) {
                    return (
                      <div
                        className={`py-2 px-8 rounded-lg cursor-pointer text-ellipsis flex items-center gap-2 text-zinc-800 font-bold
                        transition hover:ring-2 hover:ring-amber-400`}
                        key={cq.index}
                        onClick={() => {
                          setActionContent(cq);
                          setOpenContent(true);
                        }}
                      >
                        <Text size={20} />
                        <span className="overflow-hidden grow">
                          {cq.titulo}
                        </span>
                        {/* <div>{cq.index}</div> */}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={`py-2 px-8 rounded-lg cursor-pointer text-ellipsis flex items-center gap-2 text-zinc-800 font-bold
                        transition hover:ring-2 hover:ring-amber-400`}
                        key={cq.index}
                        onClick={() => {
                          setActionQuizz(cq);
                          setOpenQuizz(true);
                        }}
                      >
                        <ListTodo size={20} />
                        <span className="overflow-hidden grow">
                          {cq.titulo}
                        </span>
                        {/* <div>{cq.index}</div> */}
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <p></p>
            )}
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
                quizzes: [],
              },
            ]);

            setListConQuizz([...listConQuizz, []]);

            setNewModule(false);
            setError();
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

            setActionContent();
            setOpenContent(false);
            setError();
          }}
          editContent={(con) => {
            let mod = modulos;
            mod[selectedModule].conteudos[con.index] = con;
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule][con.index] = con;
            setListConQuizz(conQuizz);

            setActionContent();
            setOpenContent(false);
            setError();
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

            setActionQuizz();
            setOpenQuizz(false);
            setError();
          }}
          editQuizz={(qui) => {
            let mod = modulos;
            mod[selectedModule].quizzes[qui.index] = qui;
            setModulos(mod);

            let conQuizz = listConQuizz;
            conQuizz[selectedModule][qui.index] = qui;
            setListConQuizz(conQuizz);

            setActionQuizz();
            setOpenQuizz(false);
            setError();
          }}
          qui={actionQuizz}
          cancelar={() => {
            setActionQuizz();
            setOpenQuizz(false);
          }}
        />
      )}

      {/* <div className={styles.log} onClick={() => console.log(modulos)}>
        logger 
      </div> */}
    </Container>
  );
};

export default NewCourse;
