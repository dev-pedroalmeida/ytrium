import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import PlusIcon from "../../assets/PlusIcon";
import NewCategory from "../../components/NewCategory";
import axios from "axios";
import DeleteIcon from "../../assets/DeleteIcon";
import EditIcon from "../../assets/EditIcon";
import EditCategory from "../../components/EditCategory";
import DeleteCategory from "../../components/DeleteCategory";
import Container from "../../components/Container";
import ContainerHeader from "../../components/ContainerHeader";
import ContainerTitle from "../../components/ContainerTitle";
import Button from "../../components/Button";
import { Pen, Plus, Trash } from "lucide-react";

const AdminCategories = () => {
  const [newCategory, setNewCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [actionCategory, setActionCategory] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [categories, setCategories] = useState([]);

  const [refresh, setRefresh] = useState(true);

  // const categoryList = categories.map(c => {
  //   return (
  //     <tr key={c.cat_id}>
  //       <td>{c.cat_id}</td>
  //       <td>{c.cat_descricao}</td>
  //       <td className='actions'>
  //         <button className={styles.btnAction} onClick={() => {
  //           setActionCategory({id: c.cat_id, desc: c.cat_descricao});
  //           setOpenDelete(true);
  //         }}> <DeleteIcon /> </button>
  //         <button className={styles.btnAction} onClick={() => {
  //           setActionCategory({id: c.cat_id, desc: c.cat_descricao});
  //           setOpenEdit(true);
  //         }}> <EditIcon /> </button>
  //       </td>
  //     </tr>
  //   )
  // })

  useEffect(() => {
    if (refresh == true) {
      axios
        .get("http://localhost:3000/admin/categories", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setCategories(res.data);
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh]);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Categorias</ContainerTitle>
        <Button onClick={() => setNewCategory(true)}>
          Nova Categoria
          <Plus size={16} />
        </Button>
      </ContainerHeader>

      <div className="shadow rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="text-left">
            <tr className="*:p-4 border-b border-zinc-100">
              <th>Id</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c) => {
                return (
                  <tr
                    key={c.cat_id}
                    className="*:px-4 *:py-2 odd:bg-zinc-100/30 hover:bg-zinc-100/80 border-b border-zinc-100 last:border-0"
                  >
                    <td>{c.cat_id}</td>
                    <td>{c.cat_descricao}</td>
                    <td className="flex items-center justify-end gap-2">
                      <Button
                        variant="action"
                        onClick={() => {
                          setActionCategory({
                            id: c.cat_id,
                            desc: c.cat_descricao,
                          });
                          setOpenEdit(true);
                        }}
                      >
                        <Pen size={16} color="black" />
                      </Button>
                      <Button
                        variant="action"
                        onClick={() => {
                          setActionCategory({
                            id: c.cat_id,
                            desc: c.cat_descricao,
                          });
                          setOpenDelete(true);
                        }}
                      >
                        <Trash size={16} color="black" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4" colSpan={3}>Nenhuma categoria encontrada!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {newCategory && (
        <NewCategory
          success={() => {
            setRefresh(true);
            setNewCategory(false);
          }}
          cancelar={() => setNewCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          category={actionCategory}
          success={() => {
            setRefresh(true);
            setActionCategory(null);
            setOpenEdit(false);
          }}
          cancelar={() => {
            setActionCategory(null);
            setOpenEdit(false);
          }}
        />
      )}

      {openDelete && (
        <DeleteCategory
          category={actionCategory}
          success={() => {
            setRefresh(true);
            setActionCategory(null);
            setOpenDelete(false);
          }}
          cancelar={() => {
            setActionCategory(null);
            setOpenDelete(false);
          }}
        />
      )}
    </Container>
  );
};

export default AdminCategories;
