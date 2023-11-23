import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/styles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext.jsx';

const CoursePage = () => {

  const { user } = useContext(AuthContext);

  const { courseId } = useParams()

  const [course, setCourse] = useState([]);

  const navigate = useNavigate();

  async function subscribe() {
    await axios.post(`http://localhost:3000/student/subscribe`, {curso: course}, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res);
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/course/${courseId}`, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      setCourse(res.data);
    })
  }, [ courseId ])

  return (
    <div className={styles.container}>
      <div className={styles.courseHeader}>
        <div className={styles.courseMainInfo}>
          <div className={styles.courseMainInfoSection}>
            <h1>
              {course.cur_titulo}
            </h1>
            <div className={styles.insInfo}>
              <div className={styles.personIcon}></div>
              {course.usu_nome}
            </div>
          </div>
          <div className={styles.courseMainInfoSection}>
            <div className={styles.courseDificulty}>
              {course.cur_dificuldade}
              -
              {course.cur_qtdExperiencia} xp
            </div>
            <div>
              <div className={styles.courseCategoriasList}>
                {
                  course.categorias &&
                  course.categorias.map((cat) => {
                    return <div key={cat.id} className={styles.courseCategoria}>{cat.descricao}</div>
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <div className={styles.courseSecInfo}>
          {user?.tipo == 'estudante' &&

            (
              course.alc_status == null ?
              <button className={styles.btn + ' ' + styles.large} onClick={() => subscribe()}>
                Inscreva-se
              </button>
              :
              <button className={styles.btn + ' ' + styles.large} onClick={() => navigate(`/course/subscribed/${courseId}`)}>
                Continuar
              </button>

            )
          
          }
          <p>
            {course.cur_qtdInscritos}
            &nbsp;inscritos
          </p>
        </div>
      </div>
      

      <div className={styles.courseContent}>
        <div>
          <h2>Descrição</h2>
          <p style={{marginTop: '8px'}}>{course.cur_descricao}</p>
        </div>

        <div>
          <h2>Módulos</h2>

          <div className={styles.moduleList} style={{marginTop: '8px'}}>
          {course.modulos?.length > 0 ? (
              course.modulos.map((modulo, index) => {
                return (
                  <div
                    className={
                      styles.module
                    }
                    key={index}
                  >
                    <div> ▥ </div>
                    <span>
                      {modulo.titulo}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>Nenhum módulo encontrado!</p>
            )}
          </div>

        </div>
      </div>

      {/* <div className={styles.log} onClick={() => console.log(user)}>
          logger 
      </div> */}
    </div>
  )
}

export default CoursePage