import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/styles.module.css';

const CourseSubscribed = () => {

  const { user } = useContext(AuthContext);

  const { courseId } = useParams()

  const [course, setCourse] = useState();
  const [modulos, setModulos] = useState([])

  const [selectedModule, setSelectedModule] = useState(-1);

  useEffect(() => {
    axios.get(`http://localhost:3000/student/subscribed/${courseId}`, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      setCourse(res.data);
      setModulos(res.data.modulos);
      
    })
  }, [ courseId ])

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>
          {course?.cur_titulo}
        </h1>

      </div>


      <div className={styles.moduleContainer}>
          <div className={styles.moduleList}>

            {modulos.length > 0 ? (

              modulos?.map((modulo) => {
                return (
                  <div
                      className={
                        (selectedModule === modulo.index)
                          ? styles.selected + " " + styles.module
                          : styles.module
                      }
                      key={modulo.index}
                    >

                      <div> ▥ </div>
                      <span onClick={() => {
                        setSelectedModule(modulo.index);
                      }}>
                        {modulo.titulo}
                      </span>

                  </div>
                )
              })
            ) : (
              <p>Loading...</p>
            )}

          </div>

          <div className={styles.moduleContent}>
            {modulos[selectedModule] ? (
              
              <>
              </>

            ) : (
              <></>
            )}
          </div>
      </div>


    </div>
  )
}

export default CourseSubscribed