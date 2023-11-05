import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {

  const [pendingCourses, setPendingCourses] = useState([]);

  const navigate = useNavigate();

  function publishCourse(id) {

    axios.put('http://localhost:3000/admin/publishCourse', {id}, {
      withCredentials: true,
    })
    .catch(err => {
      console.log(err);
      if(err.response.status == 400) {
        return setError("Erro!")
      }
    })
    .then(res => {
      console.log(res);
      setPendingCourses(pendingCourses.filter(c => {
        return c.cur_id !== id;
      }))
    })
  }

  const pendingCoursesList = pendingCourses.map(course => {
    return (
      <div className={styles.courseCard} key={course.cur_id}>
        <div className={styles.courseContent}>
          <div className={styles.courseTitle}>{course.cur_titulo}</div>

            <div className={styles.courseCategoria}>Categoria</div>
        </div>

        <div className={styles.courseFooter}>
          <button className={styles.btn}
                  onClick={() => publishCourse(course.cur_id)}
          >
            Tornar público
          </button>
        </div>
      </div>
    )
  });


  useEffect(() => {
    axios.get("http://localhost:3000/admin/pendingCourses", {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      setPendingCourses(res.data);
    })
  }, [])

  return (
    <div className={styles.container}>
      <h1>Cursos pendentes</h1>

      <div className={styles.coursesList}>
        {
        pendingCourses.length > 0 
          ?
          pendingCoursesList
          :
          <p>Nenhum curso encontrado!</p>
        }
      </div>
    </div>
  )
}

export default AdminHome