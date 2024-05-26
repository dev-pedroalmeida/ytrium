import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import ContainerHeader from "../../components/ContainerHeader";
import ContainerTitle from "../../components/ContainerTitle";
import axios from "axios";
import Button from "../../components/Button";
import NewBadge from "../../components/NewBadge"
import EditBadge from "../../components/EditBadge"
import DeleteBadge from "../../components/DeleteBadge"
import { Pen, Plus, Trash } from "lucide-react";

const AdminBadges = () => {
  const [newBadge, setNewBadge] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [actionBadge, setActionBadge] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [badges, setBadges] = useState([]);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh == true) {
      axios
        .get("http://localhost:3000/admin/badges", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setBadges(res.data);
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
        <ContainerTitle>Insígnias</ContainerTitle>
        <Button onClick={() => setNewBadge(true)}>
          Nova insígnia
          <Plus size={16} />
        </Button>
      </ContainerHeader>

      <div className="shadow rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="text-left">
            <tr className="*:p-4 border-b border-zinc-100">
              <th>Icone</th>
              <th>Titulo</th>
              <th>Qtd cursos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {badges.length > 0 ? (
              badges.map((b) => {
                return (
                  <tr
                    key={b.ins_id}
                    className="*:px-4 *:py-2 odd:bg-zinc-100/30 hover:bg-zinc-100/80 border-b border-zinc-100 last:border-0"
                  >
                    <td>
                      <img src={`http://www.localhost:3000/badges/${b.ins_icone}`} alt="badge icon" className="h-10 w-10" />
                    </td>
                    <td>{b.ins_titulo}</td>
                    <td>{b.ins_qtdCursos}</td>
                    <td className="flex items-center justify-end gap-2">
                      <Button
                        variant="action"
                        onClick={() => {
                          setActionBadge({
                            id: b.ins_id,
                            titulo: b.ins_titulo,
                            qtdCursos: b.ins_qtdCursos,
                            icone: b.ins_icone,
                          });
                          setOpenEdit(true);
                        }}
                      >
                        <Pen size={16} color="black" />
                      </Button>
                      <Button
                        variant="action"
                        onClick={() => {
                          setActionBadge({
                            id: b.ins_id,
                            titulo: b.ins_titulo,
                            qtdCursos: b.ins_qtdCursos,
                            icone: b.ins_icone,
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
                <td className="p-4" colSpan={3}>
                  Nenhuma insígnia encontrada!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {newBadge && (
        <NewBadge
          success={() => {
            setRefresh(true);
            setNewBadge(false);
          }}
          cancelar={() => setNewBadge(false)}
        />
      )}

      {openEdit && (
        <EditBadge
          badge={actionBadge}
          success={() => {
            setRefresh(true);
            setActionBadge(null);
            setOpenEdit(false);
          }}
          cancelar={() => {
            setActionBadge(null);
            setOpenEdit(false);
          }}
        />
      )}

      {openDelete && (
        <DeleteBadge
          badge={actionBadge}
          success={() => {
            setRefresh(true);
            setActionBadge(null);
            setOpenDelete(false);
          }}
          cancelar={() => {
            setActionBadge(null);
            setOpenDelete(false);
          }}
        />
      )}
    </Container>
  );
};

export default AdminBadges;
