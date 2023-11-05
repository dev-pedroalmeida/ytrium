import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles.module.css';
import PlusIcon from '../../assets/PlusIcon';
import NewCategory from '../../components/NewCategory';
import axios from 'axios';
import DeleteIcon from '../../assets/DeleteIcon';
import EditIcon from '../../assets/EditIcon';
import EditCategory from '../../components/EditCategory';
import DeleteCategory from '../../components/DeleteCategory';

const AdminCategories = () => {

  const [newCategory, setNewCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [actionCategory, setActionCategory] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [categories, setCategories] = useState([]);

  const [refresh, setRefresh] = useState(true);

  const categoryList = categories.map(c => {
    return (
      <tr key={c.cat_id}>
        <td>{c.cat_id}</td>
        <td>{c.cat_descricao}</td>
        <td className='actions'>
          <button className={styles.btnAction} onClick={() => {
            setActionCategory({id: c.cat_id, desc: c.cat_descricao});
            setOpenDelete(true);
          }}> <DeleteIcon /> </button>
          <button className={styles.btnAction} onClick={() => {
            setActionCategory({id: c.cat_id, desc: c.cat_descricao});
            setOpenEdit(true);
          }}> <EditIcon /> </button>
        </td>
      </tr>
    )
  })

  useEffect(() => {

    if(refresh == true) {
      axios.get('http://localhost:3000/admin/categories', {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
        setCategories(res.data);
        setRefresh(false);
      })
      .catch(err => {
        console.log(err);
      })
    }

  }, [refresh])

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Categorias</h1>
        <button className={styles.btn +' '+ styles.large} onClick={() => setNewCategory(true)}>
          Nova Categoria <PlusIcon />
        </button>
      </div>

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ?
              categoryList
              :
              <tr>
                <td colSpan={3}>
                  Nenhuma categoria encontrada!
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>



      {newCategory && 
        <NewCategory 
          success={() => {
            setRefresh(true);
            setNewCategory(false);
          }}
          cancelar={() => setNewCategory(false)} 
        />}

      {openEdit && 
        <EditCategory 
          category={actionCategory}
          success={() => {
            setRefresh(true);
            setActionCategory(null);
            setOpenEdit(false);
          }}
          cancelar={() => {
            setActionCategory(null);
            setOpenEdit(false)}
          } 
        />}

      {openDelete && 
        <DeleteCategory 
          category={actionCategory}
          success={() => {
            setRefresh(true);
            setActionCategory(null);
            setOpenDelete(false);
          }}
          cancelar={() => {
            setActionCategory(null);
            setOpenDelete(false)}
          } 
        />}
    </div>
  )
}

export default AdminCategories