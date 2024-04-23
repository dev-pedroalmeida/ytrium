import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from "../../assets/PlusIcon";
import Container from "../../components/Container";
import ContainerHeader from "../../components/ContainerHeader";
import ContainerTitle from "../../components/ContainerTitle";
import Button from "../../components/Button";
import CoursesList from "../../components/courseCard/CoursesList";
import CourseCard from "../../components/courseCard/CourseCard";

const InstructorHome = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/instructor/courses", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      });
  }, []);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Seus cursos</ContainerTitle>
        <Button onClick={() => navigate("new-course")}>
          Novo
          <PlusIcon />
        </Button>
      </ContainerHeader>

      <CoursesList>
        {courses.length > 0 ? (
          courses.map((course) => {
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
                    {course.cur_status == "pendente" ? (
                      <p>Curso pendente</p>
                    ) : (
                      <p>
                        {course.cur_qtdInscritos}
                        &nbsp;
                        {course.cur_qtdInscritos == 1
                          ? "inscrito"
                          : "inscritos"}
                      </p>
                    )}
                  </CourseCard.Footer>
                </CourseCard.Root>
              </Link>
            );
          })
        ) : (
          <p>Nenhum curso encontrado!</p>
        )}
      </CoursesList>
    </Container>
  );
};

export default InstructorHome;
