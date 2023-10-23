import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/styles.module.css';

const InstructorHome = () => {

  const [courses, setCourses] = useState([]);

  const coursesList = courses.map(course => {
    return <div>
      a
    </div>
  });


  useEffect(() => {
    axios.get("http://localhost:3000/instructor/courses", {
      withCredentials: true,
    })
    .then(res => {
      setCourses(res.data);
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Seus cursos</h1>
        <button className={styles.btn}>
          Novo
        </button>
      </div>

      {courses.length > 0 ?
        coursesList
        :
        <p>Nenhum curso encontrado!</p>
      }
    </div>
  )
}

export default InstructorHome