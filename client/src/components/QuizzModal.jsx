import React, { useState } from 'react';
import styles from '../styles/styles.module.css';
import PlusIcon from '../assets/PlusIcon';

const QuizzModal = ({saveQuizz, editQuizz, cancelar, 
  qui = {
          titulo: '',
          questoes: [
            { pergunta: '', alternativas: [{ alternativa: '', correta: true, }, { alternativa: '', correta: false, }] }
          ],
        }
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
    setQuestion((prev) => ({...prev, 'pergunta': perg}))
  };

  function handleAlternativa(alte, index) {
    let al = question.alternativas;
    al[index].alternativa = alte;
    setQuestion((prev) => ({
      ...prev,
      alternativas: [
        ...al,
      ]
    }));
  };

  function handleCorreta(index) {
    let al = question.alternativas;
    al[index].correta = true;

    al.forEach((a, i) => {
      if(i != index ) {
        a.correta = false;
      }
    })

    setQuestion((prev) => ({
      ...prev,
      alternativas: [
        ...al,
      ]
    }));
  };

  function handleNewAlternativa() {
    setQuestion((prev) => ({
      ...prev,
      alternativas: [
        ...prev.alternativas,
        { alternativa: '', correta: false, }
      ]
    }))
  }

  function handleSaveQuizz(e) {
    e.preventDefault();
    setError();

    if(quizz.titulo == '') {
      setError("O quizz precisa de um título!");
      return;
    }

    quizz.questoes.forEach((que) => {
      if(que.pergunta == '') {
        setError("Todas as questões precisam de uma pergunta!");
        return;
      }

      que.alternativas.forEach((alt) => {
        if(alt.alternativa == '') {
          setError("Preencha todas as alternativas!");
          return;
        }
      })
    })

    setTimeout(() => {
      if(error == '' ||
        error == undefined ||
        error == false) {
          
          if(quizz.hasOwnProperty('index')) {
            editQuizz(quizz);
          } else {
            saveQuizz(quizz);
          }
      }

    }, 1000)
  }

  return (
    <div className={styles.overlay}>
      <div 
          className={styles.container}
          style={{width: 80+"vw"}}>
        <form onSubmit={handleSaveQuizz} className={styles.borderless}>
          <div className={styles.formHeader}>
            <h1>{qui.hasOwnProperty('index') ? "Editar Quizz":"Novo Quizz"}</h1>
    
            <div className={styles.formHeaderSection}>
              <button 
                className={styles.btnSecondary}
                onClick={cancelar}>
                  Cancelar
              </button>
              <button className={styles.btn}>
                Salvar
              </button>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <label>
            Título
            <input type="text" name='titulo' defaultValue={qui.titulo} onChange={handleInput} />
          </label>

          <div className={styles.moduleContainer}>
            <div className={styles.moduleList}>
              <button
                type='button'
                className={styles.btn}
                onClick={() => {
                  let qu = quizz;
                  const i = qu.questoes.push({ pergunta: '', alternativas: [{ alternativa: '', correta: true, }, { alternativa: '', correta: false, }] });
                  setQuestion({ pergunta: '', alternativas: [{ alternativa: '', correta: true, }, { alternativa: '', correta: false, }] });

                  setSelectedQuestion(i - 1);
                  setQuizz(qu);
                }}
              >
                Adicionar questão
                <PlusIcon />
              </button>

              {quizz.questoes.map ((questao, index) => {
                return (
                  <div
                    className={
                      (selectedQuestion === index)
                        ? styles.selected + " " + styles.module
                        : styles.module
                    }
                    key={index}
                    onClick={() => {
                      setQuestion(quizz.questoes[index]);
                      setSelectedQuestion(index);
                    }}
                  >
                    <div> ▥ </div>
                    {`Questão ${index + 1}`}
                  </div>
                )
              })}
            </div>

            <div className={styles.moduleContent}>
              {selectedQuestion >= 0 && 
                <>
                  <div className={styles.formHeader}>
                    <h2>{`Questão ${selectedQuestion + 1}`}</h2>

                    <div className={styles.formHeaderSection}>
                      <button 
                        type='button' className={styles.btnSecondary}
                        onClick={() => {
                          let qu = quizz;
                          qu.questoes[selectedQuestion] = question;
                          setQuizz(qu);
                        }}>
                        Salvar questão
                      </button>
                    </div>
                  </div>

                  <label>
                    Pergunta
                    <textarea rows="2" name='pergunta' value={question.pergunta} onChange={e => handlePergunta(e.target.value)}></textarea>
                  </label>

                  {question.alternativas.map((alt, index) => {
                    return (
                      <div key={index} className={styles.alternative}>
                        <label htmlFor={`alternativa${index}`}>
                          {`${index + 1}ª Alternativa`}
                        </label>
                        <input type="text" name={`alternativa${index}`} id={`alternativa${index}`} value={alt.alternativa} onChange={e => handleAlternativa(e.target.value, index)} />
                        <input type="radio" name={`alternativa${index}quizz`} checked={alt.correta} readOnly />
                        <span onClick={() => handleCorreta(index)}>
                          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.0293 6.96413L6.98116 10.916L14.8988 3.01233" stroke="white" strokeWidth="5.25538" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        
                      </div>
                    )
                  })}

                  <button type='button' className={styles.btn} style={{alignSelf: 'center'}} 
                    disabled={question.alternativas.length == 4}
                    onClick={handleNewAlternativa}>
                    Adicionar alternativa
                    <PlusIcon />
                  </button>

                </>

              }
            </div>

          </div>
          
        </form>
      </div>
      {/* <div className={styles.log} onClick={() => console.log(quizz)}>
        logger 
      </div> */}
    </div>
  )
}

export default QuizzModal