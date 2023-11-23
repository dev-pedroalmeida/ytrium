import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import PlusIcon from '../../assets/PlusIcon';

const InstructorHome = () => {

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const coursesList = courses.map(course => {
    
    return (
      <div className={styles.courseCard} key={course.cur_id}>
        <div className={styles.courseCardContent}>
          <Link to={`/course/${course.cur_id}`}>
            <div className={styles.courseTitle}>{course.cur_titulo}</div>
          </Link>
          
          <div className={styles.courseCategoriasList}>
            {
              course.categorias.map((cat, index) => {
                return <div key={index} className={styles.courseCategoria}>{cat}</div>
              })
            }
          </div>
        </div>

        <div className={styles.courseFooter}>
          {course.cur_status == 'pendente' ?
            <p>Curso pendente</p>
            :
            <p>
              {course.cur_qtdInscritos}
              &nbsp;inscritos
            </p>
          }
        </div>
      </div>
    )
  });


  useEffect(() => {
    axios.get("http://localhost:3000/instructor/courses", {
      withCredentials: true,
    })
    .then(res => {
      console.log(res.data)
      setCourses(res.data);
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Seus cursos</h1>
        <button className={styles.btn} onClick={() => navigate('new-course')}>
          Novo
          <PlusIcon />
        </button>
      </div>

      <div className={styles.coursesList}>
        {
        courses.length > 0 
          ?
          coursesList
          :
          <p>Nenhum curso encontrado!</p>
        }
      </div>
    </div>
  )
}

export default InstructorHome