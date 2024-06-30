import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import ContainerHeader from "../../components/ContainerHeader";
import ContainerTitle from "../../components/ContainerTitle";
import CoursesList from "../../components/courseCard/CoursesList";
import CourseCard from "../../components/courseCard/CourseCard";
import Button from "../../components/Button";
import { FolderSearch } from "lucide-react";

const AdminHome = () => {
  const [pendingCourses, setPendingCourses] = useState([]);

  const navigate = useNavigate();

  function publishCourse(id) {
    axios
      .put(
        "http://localhost:3000/admin/publishCourse",
        { id },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          return setError("Erro!");
        }
      })
      .then((res) => {
        console.log(res);
        setPendingCourses(
          pendingCourses.filter((c) => {
            return c.cur_id !== id;
          })
        );
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/pendingCourses", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setPendingCourses(res.data);
      });
  }, []);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Cursos pendentes</ContainerTitle>
      </ContainerHeader>

      <CoursesList>
        {pendingCourses.length > 0 ? (
          pendingCourses.map((course) => {
            return (
              <Link to={`/course/${course.cur_id}`} key={course.cur_id}>
                <CourseCard.Root>
                  <CourseCard.Title>{course.cur_titulo}</CourseCard.Title>

                  <CourseCard.Content>
                    <CourseCard.CategoriasList>
                      {course.categorias.map((cat, index) => {
                        return (
                          <CourseCard.Categoria key={index}>
                            {cat}
                          </CourseCard.Categoria>
                        );
                      })}
                    </CourseCard.CategoriasList>
                  </CourseCard.Content>

                  <CourseCard.Footer>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        publishCourse(course.cur_id);
                      }}
                    >
                      Tornar público
                    </Button>
                  </CourseCard.Footer>
                </CourseCard.Root>
              </Link>
            );
          })
        ) : (
          <div className="col-span-2 min-h-32 bg-white/40 ring-1 ring-amber-400 rounded-lg shadow p-3 flex flex-col items-center justify-center">
            <FolderSearch size={32} color="#f59e0b" />
            <p className="font-medium text-lg">Nenhum curso pendente!</p>
          </div>
        )}
      </CoursesList>
    </Container>
  );
};

export default AdminHome;
