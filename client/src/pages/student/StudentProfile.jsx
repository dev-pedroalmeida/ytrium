import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Certificate from "../../components/Certificate.jsx";
import axios from "axios";
import DownloadIcon from "../../assets/DownloadIcon.jsx";
import Container from "../../components/Container.jsx";
import Loading from "../../components/Loading.jsx";
import ContainerHeader from "../../components/ContainerHeader.jsx";
import CoursesList from "../../components/courseCard/CoursesList.jsx";
import CourseCard from "../../components/courseCard/CourseCard.jsx";
import Button from "../../components/Button.jsx";
import { Download } from "lucide-react";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

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
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ContainerHeader>
              <div className="flex items-center gap-2 justify-center flex-1">
                <div className="rounded-full w-14 h-14 bg-gradient-to-b from-amber-500 to-amber-400"></div>
                <div>
                  <h1 className="text-2xl font-bold">{user.nome}</h1>
                  <h1 className="text-lg">{user.email}</h1>
                </div>
              </div>
            </ContainerHeader>

            <div className="flex gap-4 border-b-2 border-amber-300 pb-1">
              <div
                className={`cursor-pointer p-2 rounded-lg font-bold text-sm text-amber-600/70 relative ${
                  currentTab == 1 && "text-amber-500 bg-amber-100"
                }`}
                onClick={() => {
                  setCurrentTab(1);
                }}
              >
                Cursos completos
              </div>
            </div>

            {currentTab == 1 && (
              <>
                <div className="mt-4">
                  <CoursesList>
                    {courses.length > 0 ? (
                      courses?.map((course) => {
                        return (
                          <CourseCard.Root key={course.cur_id}>
                            <CourseCard.Title>
                              {course.cur_titulo}
                            </CourseCard.Title>
                            <CourseCard.Content>
                              <div className="flex items-center gap-2 text-lg mb-4">
                                <div className="rounded-full w-8 h-8 bg-gradient-to-b from-amber-500 to-amber-400"></div>
                                {course.usu_nome}
                              </div>
                            </CourseCard.Content>

                            <CourseCard.Footer>
                              <PDFDownloadLink
                                document={
                                  <Certificate
                                    nome={user.nome}
                                    curso={course.cur_titulo}
                                    instrutor={course.usu_nome}
                                  />
                                }
                                fileName="certificado.pdf"
                              >
                                {({ blob, url, loading, error }) =>
                                  loading ? (
                                    "Carregando..."
                                  ) : (
                                    <Button>
                                      Certificado
                                      <Download size={18} />
                                    </Button>
                                  )
                                }
                              </PDFDownloadLink>
                            </CourseCard.Footer>
                          </CourseCard.Root>
                        );
                      })
                    ) : (
                      <p>Nenhum curso completo!</p>
                    )}
                  </CoursesList>
                </div>
              </>
            )}
          </>
        )}
      </Container>
      {/* <PDFViewer width={'400px'} height={'300px'}>
        <Certificate nome={user?.nome} />
      </PDFViewer> */}
    </>
  );
};

export default StudentProfile;
