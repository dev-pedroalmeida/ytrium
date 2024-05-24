import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";
import DescEditor from "../components/DescEditor";
import Container from "../components/Container";
import CourseCard from "../components/courseCard/CourseCard";
import Button from "../components/Button";
import { Loader2, SquareLibrary } from "lucide-react";
import Loading from "../components/Loading.jsx";

const CoursePage = () => {
  const { user } = useContext(AuthContext);

  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function subscribe() {
    await axios
      .post(
        `http://localhost:3000/student/subscribe`,
        { curso: course },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/student/subscriptions");
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/course/${courseId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCourse(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [courseId]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-2">
            <div className="flex-1 flex justify-between pr-8 border-r-2 border-gray-100">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">{course.cur_titulo}</h1>
                <div className="text-lg font-medium flex items-center gap-2">
                  <div className="rounded-full w-8 h-8 bg-gradient-to-b from-amber-500 to-amber-400"></div>
                  {course.usu_nome}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="px-2 py-1 rounded text-white font-medium bg-gradient-to-tr from-amber-400/90 to-amber-500/90">
                  {course.cur_dificuldade}-{course.cur_qtdExperiencia} xp
                </div>
                <div>
                  <CourseCard.CategoriasList>
                    {course.categorias &&
                      course.categorias.map((cat) => {
                        return (
                          <CourseCard.Categoria key={cat.id}>
                            {cat.descricao}
                          </CourseCard.Categoria>
                        );
                      })}
                  </CourseCard.CategoriasList>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end pl-20">
              {user?.tipo == "estudante" &&
                (course.alc_status == null ? (
                  <Button onClick={() => subscribe()}>Inscreva-se</Button>
                ) : (
                  <Button onClick={() => navigate(`/course/subscribed/${courseId}`)}>
                    Continuar
                  </Button>
                ))}
              <p>
                {course.cur_qtdInscritos}
                &nbsp;{course.cur_qtdInscritos == 1 ? "inscrito" : "inscritos"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[5fr_3fr] gap-8 my-14">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
              {/* <p style={{marginTop: '8px'}}>{course.cur_descricao}</p> */}
              <DescEditor
                initialValue={JSON.parse(course.cur_descricao)}
                readOnly={true}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Módulos</h2>

              <div className="flex flex-col py-2 gap-2 mt-2">
                {course.modulos?.length > 0 ? (
                  course.modulos.map((modulo, index) => {
                    return (
                      <div className="p-2 rounded-lg text-ellipsis flex items-center gap-1 bg-amber-100 text-amber-500 font-bold" key={index}>
                        <SquareLibrary size={18} />
                        <span className="overflow-hidden grow-0">{modulo.titulo}</span>
                      </div>
                    );
                  })
                ) : (
                  <p>Nenhum módulo encontrado!</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default CoursePage;
