import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import ContainerTitle from "../../components/ContainerTitle";
import ContainerHeader from "../../components/ContainerHeader";
import CoursesList from "../../components/courseCard/CoursesList";
import CourseCard from "../../components/courseCard/CourseCard";
import Button from "../../components/Button";
import { ChevronRight } from "lucide-react";

const SubscriptionsPage = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  // const coursesList = courses?.map((course) => {
  //   return (
  //     <div
  //       className={styles.courseCard}
  //       key={course.cur_id}
  //       style={{ position: "relative" }}
  //     >
  //       {course?.alc_status == 1 && (
  //         <div
  //           className={styles.quizzComplete}
  //           style={{
  //             cursor: "pointer",
  //             position: "absolute",
  //             top: "4px",
  //             right: "2px",
  //           }}
  //           onClick={() => navigate("/student/profile")}
  //         >
  //           Completo
  //         </div>
  //       )}
  //       <div className={styles.courseCardContent}>
  //         <Link to={`/course/subscribed/${course.cur_id}`}>
  //           <div className={styles.courseTitle}>{course.cur_titulo}</div>
  //         </Link>

  //         <p>Módulos {course.completos + " / " + course.quantidade}</p>
  //       </div>

  //       <div className={styles.courseFooter}>
  //         <button
  //           className={styles.btn + " " + styles.large}
  //           onClick={() => navigate(`/course/subscribed/${course.cur_id}`)}
  //         >
  //           Continuar
  //         </button>
  //       </div>
  //     </div>
  //   );
  // });

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/subscriptions", {
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
        <ContainerTitle>Suas inscrições</ContainerTitle>
      </ContainerHeader>
      <CoursesList>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.cur_id}>
              <Link to={`/course/subscribed/${course.cur_id}`}>
                <CourseCard.Root>
                  <CourseCard.Title completo={course.alc_status == 1}>{course.cur_titulo}</CourseCard.Title>
                  <CourseCard.Content>
                    <p>
                      Módulos {course.completos + " / " + course.quantidade}
                    </p>
                  </CourseCard.Content>
                  <CourseCard.Footer>
                    <Button variant="small" classes="place-self-end">
                      Continuar
                      <ChevronRight />
                    </Button>
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

export default SubscriptionsPage;
