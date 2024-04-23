import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import ContainerHeader from "../../components/ContainerHeader";
import ContainerTitle from "../../components/ContainerTitle";
import CoursesList from "../../components/courseCard/CoursesList";
import CourseCard from "../../components/courseCard/CourseCard";

const StudentHome = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/course/getAll", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      });
  }, []);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Novos cursos</ContainerTitle>
      </ContainerHeader>
      <CoursesList>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.cur_id}>
              <Link to={`/course/${course.cur_id}`}>
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
                    <p>
                      {course.cur_qtdInscritos}
                      &nbsp;{course.cur_qtdInscritos == 1 ? 'inscrito' : 'inscritos'}
                    </p>
                    {/* <p className={`p-1 rounded text-white font-medium text-sm
                                  ${course.cur_dificuldade == 'Iniciante' && 'bg-lime-100 text-lime-600'}
                                  ${course.cur_dificuldade == 'Intermediário' && 'bg-indigo-100 text-indigo-600'}
                                  ${course.cur_dificuldade == 'Avançado' && 'bg-red-100 text-red-600'}
                    `}></p> */}
                    <p className={`p-1 rounded text-white font-medium bg-gradient-to-tr from-amber-400/90 to-amber-500/90`}>
                      {course.cur_dificuldade}
                    </p>
                  </CourseCard.Footer>
                </CourseCard.Root>
              </Link>
            </div>
          ))
        ) : (
          <p>Nenhum curso encontrado!</p>
        )}
      </CoursesList>
    </Container>
  );
};

export default StudentHome;
