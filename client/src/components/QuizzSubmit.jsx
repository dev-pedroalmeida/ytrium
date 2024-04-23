import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import Loading from "./Loading";
import Button from "./Button";
import { Check } from "lucide-react";

const QuizzSubmit = ({ quizz, current, handleSaveQuizz }) => {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [selectAnswers, setSelectAnswers] = useState();
  const [error, setError] = useState();
  const [info, setInfo] = useState();
  const [success, setSuccess] = useState();

  function handleSelectAnswer(queId, selId) {
    setError();
    setInfo();
    let answers = selectAnswers;
    answers.forEach((ans) => {
      if (ans.questaoId == queId) {
        ans.selectId = selId;
      }
    });

    setSelectAnswers(answers);
  }

  function handleCompleteQuizz() {
    let answers = selectAnswers;
    let err = false;
    answers.forEach((ans) => {
      if (
        ans.selectId == null ||
        ans.selectId == "" ||
        ans.selectId == undefined ||
        ans.questaoId == null ||
        ans.questaoId == "" ||
        ans.questaoId == undefined
      ) {
        setError("Responda todas as questões!");
        err = true;
        return;
      }
    });

    if (err) return;

    let corretas = 0;
    let incorretas = 0;
    let qtdPerguntas = answers.length;
    let porAcertos = 0;

    answers.forEach((ans) => {
      if (ans.selectId == ans.corretaId) {
        console.log("Correto!");
        corretas++;
      } else {
        console.log("Incorreto!");
        incorretas++;
      }
    });

    porAcertos = (corretas / qtdPerguntas) * 100;

    if (porAcertos < 50) {
      setInfo(`Você acertou ${porAcertos}%. Acerte 50% ou mais para passar!`);
    } else {
      handleSaveQuizz(quizz.id, porAcertos);
      setSuccess(`Parabéns, você acertou ${porAcertos}%!`);
    }
  }

  useEffect(() => {
    setQuestions(quizz.questoes);

    let answers = [];
    quizz.questoes.forEach((que) => {
      let { id } = que.alternativas.find((alt) => alt.correta == 1);

      answers.push({
        questaoId: que.id,
        selectId: null,
        corretaId: id,
      });
    });
    setSelectAnswers(answers);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [quizz]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-[80ch] self-center">
            <div className="mb-4">
              {error && (<div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">{error}</div>)}
              {info && (<div className="bg-yellow-100 text-yellow-500 px-2 py-1 rounded-lg">{info}</div>)}
              {success && (<div className="bg-lime-100 text-lime-500 px-2 py-1 rounded-lg">{success}</div>)}
            </div>
            {questions.map((que, ind) => {
              return (
                <Question
                  key={que.id}
                  que={que}
                  handleSelectAnswer={(queId, selId) =>
                    handleSelectAnswer(queId, selId)
                  }
                />
              );
            })}
          </div>

          <Button
            classes="self-center"
            onClick={() => handleCompleteQuizz(selectAnswers)}
            disabled={current == 1}
          >
            Completar
          </Button>
        </>
      )}
      {/* <div className={styles.log} onClick={() => console.log(selectAnswers)}>
        logger 
      </div> */}
    </>
  );
};

const Question = ({ que, handleSelectAnswer }) => {
  const [selected, setSelected] = useState();
  const [correct, setCorrect] = useState();

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <h3 className="text-lg font-medium">{que.pergunta}</h3>
      {que.alternativas.map((alt) => {
        return (
          <div
            key={alt.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-amber-100 transition rounded-lg p-1"
            onClick={() => {
              setSelected(alt.id);
              handleSelectAnswer(que.id, alt.id);
            }}
          >
            <div
              className={`p-1 rounded-full bg-amber-200/50 text-amber-50 transition
                          ${selected == alt.id && "text-orange-400/80"}`}
            >
              <Check size={18} strokeWidth={6} />
            </div>

            <div className="flex-1">{alt.alternativa}</div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizzSubmit;
