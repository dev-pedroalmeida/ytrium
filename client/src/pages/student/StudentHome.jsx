import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentHome = () => {

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const coursesList = courses.map(course => {
    return (
      <div className={styles.courseCard} key={course.cur_id}>
        <div className={styles.courseContent}>
          <Link to={`/course/${course.cur_id}`}>
            <div className={styles.courseTitle}>{course.cur_titulo}</div>
          </Link>

          <div className={styles.courseCategoria}>Categoria</div>
        </div>

        <div className={styles.courseFooter}>
          <p>
            {course.cur_qtdInscritos}
          </p>
        </div>
      </div>
    )
  });


  useEffect(() => {
    axios.get("http://localhost:3000/course/getAll", {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      setCourses(res.data);
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Novos cursos</h1>
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

      {/* <h1>Populares</h1>
      <div className={styles.coursesList}>

        <p>Nenhum curso encontrado!</p>
      </div> */}
    </div>
  )
}

export default StudentHome