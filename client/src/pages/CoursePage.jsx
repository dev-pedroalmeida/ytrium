import React, { useEffect, useState } from 'react'
import styles from '../styles/styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {

  const { courseId } = useParams()

  const [course, setCourse] = useState([]);

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
      CoursePage
      {courseId}
    </div>
  )
}

export default CoursePage