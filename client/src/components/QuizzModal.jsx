import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import PlusIcon from "../assets/PlusIcon";
import Overlay from "./Overlay";
import Container from "./Container";
import FormTitle from "./form/FormTitle";
import Button from "./Button";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import FormTextarea from "./form/FormTextarea";
import { Check, ListTodo, Plus } from "lucide-react";

const QuizzModal = ({
  saveQuizz,
  editQuizz,
  cancelar,
  qui = {
    titulo: "",
    questoes: [
      {
        pergunta: "",
        alternativas: [
          { alternativa: "", correta: true },
          { alternativa: "", correta: false },
        ],
      },
    ],
  },
}) => {
  const [quizz, setQuizz] = useState(qui);
  const [selectedQuestion, setSelectedQuestion] = useState(-1);
  const [question, setQuestion] = useState();
  // const [question, setQuestion] = useState({pergunta: '', alternativas: [{ alternativa: '', correta: true, }, { alternativa: '', correta: false, }]});

  const [error, setError] = useState();

  const handleInput = (e) => {
    setQuizz((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handlePergunta(perg) {
    setQuestion((prev) => ({ ...prev, pergunta: perg }));
  }

  function handleAlternativa(alte, index) {
    let al = question.alternativas;
    al[index].alternativa = alte;
    setQuestion((prev) => ({
      ...prev,
      alternativas: [...al],
    }));
  }

  function handleCorreta(index) {
    let al = question.alternativas;
    al[index].correta = true;

    al.forEach((a, i) => {
      if (i != index) {
        a.correta = false;
      }
    });

    setQuestion((prev) => ({
      ...prev,
      alternativas: [...al],
    }));
  }

  function handleNewAlternativa() {
    setQuestion((prev) => ({
      ...prev,
      alternativas: [...prev.alternativas, { alternativa: "", correta: false }],
    }));
  }

  function handleSaveQuizz(e) {
    e.preventDefault();
    setError();
    let err = "";

    if (quizz.titulo == "") {
      setError("O quizz precisa de um título!");
      err = "titulo";
    }

    quizz.questoes.forEach((que) => {
      if (que.pergunta == "") {
        setError("As questões precisam de uma pergunta!");
        err = "pergunta";
      }

      que.alternativas.forEach((alt) => {
        if (alt.alternativa == "") {
          setError("Preencha todas as alternativas!");
          err = "alternativa";
        }
      });
    });
    console.log(err)
    console.log(quizz)
    if (err == "") {
      if (quizz.hasOwnProperty("index")) {
        editQuizz(quizz);
      } else {
        saveQuizz(quizz);
      }
    }
  }

  return (
    <Overlay onClick={cancelar}>
      <Container>
        <form
          onSubmit={handleSaveQuizz}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 mb-36 px-8 pt-12 pb-24 bg-white rounded-lg shadow-lg min-w-[850px]"
        >
          <div className="flex items-center justify-between gap-8">
            <FormTitle>
              {qui.hasOwnProperty("index") ? "Editar Quizz" : "Novo Quizz"}
            </FormTitle>

            <div className="flex items-center gap-4">
              <Button variant="action" onClick={cancelar}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
              {error}
            </div>
          )}

          <FormLabel>
            Título
            <FormInput
              type="text"
              name="titulo"
              defaultValue={qui.titulo}
              onChange={handleInput}
            />
          </FormLabel>

          <div className="grid grid-cols-4 gap-16">
            <div className="flex flex-col py-2 gap-4">
              <Button
                classes="self-center"
                type="button"
                onClick={() => {
                  let qu = quizz;
                  const i = qu.questoes.push({
                    pergunta: "",
                    alternativas: [
                      { alternativa: "", correta: true },
                      { alternativa: "", correta: false },
                    ],
                  });
                  setQuestion({
                    pergunta: "",
                    alternativas: [
                      { alternativa: "", correta: true },
                      { alternativa: "", correta: false },
                    ],
                  });

                  setSelectedQuestion(i - 1);
                  setQuizz(qu);
                }}
              >
                Adicionar questão
                <Plus size={14} />
              </Button>

              {quizz.questoes.map((questao, index) => {
                return (
                  <div
                    className={`py-1 px-2 rounded-lg cursor-pointer text-ellipsis flex items-center gap-1 text-amber-500 font-bold
                    transition hover:ring-2 hover:ring-amber-400
                    ${selectedQuestion === index && "bg-amber-200/60"}`}
                    key={index}
                    onClick={() => {
                      setQuestion(quizz.questoes[index]);
                      setSelectedQuestion(index);
                    }}
                  >
                    <ListTodo size={18} />
                    {`Questão ${index + 1}`}
                  </div>
                );
              })}
            </div>

            <div className="col-span-3 flex flex-col gap-4 p-2">
              {selectedQuestion >= 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{`Questão ${
                      selectedQuestion + 1
                    }`}</h2>

                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        let qu = quizz;
                        qu.questoes[selectedQuestion] = question;
                        setQuizz(qu);
                      }}
                    >
                      Salvar questão
                    </Button>
                  </div>

                  <FormLabel>
                    Pergunta
                    <FormTextarea
                      rows="2"
                      name="pergunta"
                      value={question.pergunta}
                      onChange={(e) => handlePergunta(e.target.value)}
                    />
                  </FormLabel>

                  {question.alternativas.map((alt, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 cursor-pointer p-1"
                      >
                        <div
                          onClick={() => handleCorreta(index)}
                          className={`p-1 rounded-full bg-amber-200/50 text-amber-50 transition
                          ${alt.correta && "text-orange-400/80"}`}
                        >
                          <Check size={18} strokeWidth={6} />
                        </div>

                        <div className="flex-1">
                          <FormLabel>
                            <FormInput
                              type="text"
                              name={`alternativa${index}`}
                              id={`alternativa${index}`}
                              value={alt.alternativa}
                              onChange={(e) =>
                                handleAlternativa(e.target.value, index)
                              }
                            />
                          </FormLabel>
                        </div>

                        {/* <input type="radio" name={`alternativa${index}quizz`} checked={alt.correta} readOnly />
                        <span onClick={() => handleCorreta(index)}>
                          <svg
                            width="18"
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
                        </span> */}
                      </div>
                    );
                  })}

                  <Button
                    classes="self-center"
                    type="button"
                    disabled={question.alternativas.length == 4}
                    onClick={handleNewAlternativa}
                  >
                    Adicionar alternativa
                    <PlusIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </Container>
      {/* <div className={styles.log} onClick={() => console.log(quizz)}>
        logger 
      </div> */}
    </Overlay>
  );
};

export default QuizzModal;
