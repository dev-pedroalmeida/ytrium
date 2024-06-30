import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Certificate from "../../components/Certificate.jsx";
import axios from "axios";
import Container from "../../components/Container.jsx";
import Loading from "../../components/Loading.jsx";
import ContainerHeader from "../../components/ContainerHeader.jsx";
import CoursesList from "../../components/courseCard/CoursesList.jsx";
import CourseCard from "../../components/courseCard/CourseCard.jsx";
import Button from "../../components/Button.jsx";
import { Download, Info, UserRound } from "lucide-react";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [badges, setBadges] = useState([]);
  const [xpPerc, setXpPerc] = useState(null);

  useEffect(() => {
    console.log(user);
    axios
      .get("http://localhost:3000/student/completedCourses", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    axios
      .get("http://localhost:3000/student/myBadges", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setBadges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    setXpPerc(((user?.experiencia || 0) / ((user?.nivel || 1) * 4000)) * 100);
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ContainerHeader>
              <div className="flex items-center gap-2 flex-1">
                <div className="rounded-full w-14 h-14 bg-gradient-to-b from-amber-500 to-amber-400 flex items-center justify-center">
                  <UserRound size={40} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.nome}</h1>
                  <h1 className="text-lg">{user?.email}</h1>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="bg-amber-500 p-1 rounded-md text-amber-50 font-bold text-lg w-fit mb-1">
                    Nível {user?.nivel || 1}
                  </div>
                  <div className="font-bold text-center">
                    {user?.experiencia || 0} / {(user?.nivel || 1) * 4000}
                  </div>
                </div>
                <div className="w-[500px] bg-amber-500/20 h-6 rounded-lg overflow-hidden">
                  {xpPerc !== null && (
                    <div
                      className={`bg-amber-500 h-6`}
                      style={{ width: `${xpPerc}%` }}
                    />
                  )}
                </div>
              </div>
            </ContainerHeader>

            <div className="flex gap-4 border-b-2 border-amber-300 pb-1 mt-12">
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
              <div
                className={`cursor-pointer p-2 rounded-lg font-bold text-sm text-amber-600/70 relative ${
                  currentTab == 2 && "text-amber-500 bg-amber-100"
                }`}
                onClick={() => {
                  setCurrentTab(2);
                }}
              >
                Insígnias
              </div>
            </div>

            {currentTab == 1 && (
              <div className="mt-4">
                <CoursesList>
                  {courses?.length > 0 ? (
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
                                  nome={user?.nome}
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
                    <div className="col-span-2 min-h-44 bg-white/40 ring-1 ring-amber-400 rounded-lg shadow p-3 flex flex-col items-center justify-center">
                      <Info size={32} color="#f59e0b" />
                      <p className="text-center font-semibold">
                        Nenhum curso completo!
                      </p>
                    </div>
                  )}
                </CoursesList>
              </div>
            )}

            {currentTab == 2 && (
              <div className="mt-4">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {badges?.length > 0 ? (
                    badges?.map((badge) => {
                      return (
                        <div
                          key={badge?.ins_id}
                          className="bg-white flex flex-col items-center p-4 gap-2 shadow rounded-lg"
                        >
                          <img
                            src={`http://localhost:3000/badges/${badge?.ins_icone}`}
                            alt="badge icon"
                            className="w-24 mb-2"
                          />
                          <div className="h-1 w-full bg-gradient-to-tr from-amber-300 to bg-amber-500"></div>
                          <div className="font-bold text-lg mt-1">
                            {badge?.ins_titulo}
                          </div>
                          <div>
                            Por completar {badge?.ins_qtdCursos} cursos!
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 min-h-44 bg-white/40 ring-1 ring-amber-400 rounded-lg shadow p-3 flex flex-col items-center justify-center">
                      <Info size={32} color="#f59e0b" />
                      <p className="text-center font-semibold">
                        Você ainda não possui nenhuma insígnia,
                      </p>
                      <p className="text-center font-semibold">
                        complete cursos para conseguí-las!
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
