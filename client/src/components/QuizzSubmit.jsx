import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";

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
    answers.forEach(ans => {
      if(ans.questaoId == queId) {
        ans.selectId = selId;
      }
    })

    setSelectAnswers(answers);
  }

  function handleCompleteQuizz() {
    let answers = selectAnswers;
    let err = false;
    answers.forEach(ans => {
      if(ans.selectId == null || ans.selectId == '' || ans.selectId == undefined ||
          ans.questaoId == null || ans.questaoId == '' || ans.questaoId == undefined) {
        setError("Responda todas as questões!")
        err = true;
        return;
      }
    })

    if(err) return

    let corretas = 0;
    let incorretas = 0;
    let qtdPerguntas = answers.length;
    let porAcertos = 0;

    answers.forEach(ans => {
      if(ans.selectId == ans.corretaId) {
        console.log("Correto!");
        corretas++;
      } else {
        console.log("Incorreto!");
        incorretas++;
      }
    })

    porAcertos = (corretas / qtdPerguntas) * 100;

    if(porAcertos < 50) {
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
      let {id} = que.alternativas.find(alt => alt.correta == 1);

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
        <div>Carregando...</div>
      ) : (
        <>
          {error && <div className={styles.error}>{error}</div>}
          {info && <div className={styles.info}>{info}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <div>
            {questions.map((que, ind) => {
              return (
                <Question 
                  key={que.id}
                  que={que} 
                  handleSelectAnswer={(queId, selId) => handleSelectAnswer(queId, selId)} 

                />
              );
            })}
          </div>

          <button
            className={styles.btn}
            style={{ alignSelf: "center" }}
            onClick={() =>
              handleCompleteQuizz(selectAnswers)
            }
            disabled={current == 1}
          >
            Completar
          </button>
        </>
      )}
      <div className={styles.log} onClick={() => console.log(selectAnswers)}>
        logger 
      </div>
    </>
  );
};

const Question = ({que, handleSelectAnswer}) => {
  const [selected, setSelected] = useState();
  const [correct, setCorrect] = useState();

  useEffect(() => {

  }, [])

  return (
    <div className={styles.question}>
      <h3>{que.pergunta}</h3>
      {que.alternativas.map((alt) => {
        return (
          <div key={alt.id} className={styles.alternative}>
            <div
              className={
                selected != alt.id
                  ? styles.statusIcon
                  : styles.statusIcon + " " + styles.complete
              }
              onClick={() => {
                setSelected(alt.id);
                handleSelectAnswer(que.id, alt.id);
              }}
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

            <div>{alt.alternativa}</div>
            <div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizzSubmit;
