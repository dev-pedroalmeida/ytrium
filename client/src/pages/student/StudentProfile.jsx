import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Certificate from "../../components/Certificate.jsx";
import axios from "axios";
import DownloadIcon from "../../assets/DownloadIcon.jsx";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const coursesList = courses?.map((course) => {
    return (
      <div
        className={styles.courseCard}
        key={course.cur_id}
        style={{ position: "relative" }}
      >
        <div className={styles.courseCardContent}>
          <div className={styles.courseTitle}>{course.cur_titulo}</div>

          <div className={styles.insInfo}>
            <div className={styles.personIcon}></div>
            {course.usu_nome}
          </div>
        </div>

        <div className={styles.courseFooter}>
          <PDFDownloadLink
            document={<Certificate nome={user.nome} curso={course.cur_titulo} instrutor={course.usu_nome} />}
            fileName="certificado.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Carregando..."
              ) : (
                <>
                  <button className={styles.btn}>
                    Certificado
                    <DownloadIcon />
                  </button>
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    );
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/completedCourses", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  }, []);

  return (
    <>
      <div className={styles.container}>
        {loading ? (
          <div style={{ textAlign: "center" }}>Carregando...</div>
        ) : (
          <>
            <div className={styles.containerHeader}>
              <div className={styles.profileInfo}>
                <div
                  className={styles.personIcon}
                  style={{ width: "48px", height: "48px" }}
                ></div>
                <div>
                  <h1>{user.nome}</h1>
                </div>
              </div>
            </div>

            <div className={styles.formTabs}>
              <div
                className={
                  styles.formTab + " " + (currentTab == 1 && styles.active)
                }
                onClick={() => {
                  setCurrentTab(1);
                }}
              >
                Cursos completos
              </div>
            </div>

            {currentTab == 1 && (
              <>
                <div style={{ marginTop: "16px" }}>
                  <div className={styles.coursesList}>
                    {courses.length > 0 ? (
                      coursesList
                    ) : (
                      <p>Nenhum curso completo!</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* <PDFViewer>
      <Certificate nome={user.nome} />
      </PDFViewer> */}
    </>
  );
};

export default StudentProfile;
