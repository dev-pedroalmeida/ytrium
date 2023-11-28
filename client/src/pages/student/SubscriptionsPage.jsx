import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubscriptionsPage = () => {

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const coursesList = courses?.map(course => {
    return (
      <div className={styles.courseCard} key={course.cur_id}>
        <div className={styles.courseCardContent}>
          <Link to={`/course/subscribed/${course.cur_id}`}>
            <div className={styles.courseTitle}>{course.cur_titulo}</div>
          </Link>

          <p>
            Módulos {course.completos +" / "+ course.quantidade}
          </p>
        </div>

        <div className={styles.courseFooter}>
          <button className={styles.btn + ' ' + styles.large} onClick={() => navigate(`/course/subscribed/${course.cur_id}`)}>
            Continuar
          </button>
        </div>
      </div>
    )
  });

  useEffect(() => {
    axios.get("http://localhost:3000/student/subscriptions", {
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
        <h1>Suas inscrições</h1>
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

export default SubscriptionsPage