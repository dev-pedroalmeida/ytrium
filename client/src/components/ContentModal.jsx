import React, { useMemo, useState } from "react";
import styles from "../styles/styles.module.css";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import DescEditor from "./DescEditor";
import Overlay from "./Overlay";
import Container from "./Container";
import FormTitle from "./form/FormTitle";
import Button from "./Button";
import FormLabel from "./form/FormLabel";
import FormInput from "./form/FormInput";
import { z } from 'zod'

const ContentModal = ({
  saveContent,
  editContent,
  cancelar,
  cont = { titulo: "", videoLink: "", material: "" },
}) => {
  const [content, setContent] = useState(cont);

  const [error, setError] = useState();

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [material, setMaterial] = useState(
    cont.material == ""
      ? [
          {
            type: "paragraph",
            children: [{ text: "Insira o conteúdo do material!" }],
          },
        ]
      : JSON.parse(cont.material)
  );

  const handleInput = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleSaveContent(e) {
    e.preventDefault();
    setError();

    if (content.titulo == "") {
      setError("O conteúdo precisa de um título!");
      return;
    }

    if (content.videoLink == "" && material == "") {
      setError("O conteúdo precisa de um vídeo ou um material escrito!");
      return;
    }

    const videoLinkRegex = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/

    const videoLink = videoLinkRegex.exec(content.videoLink)

    console.log(content)    

    console.log(error);
    if (error == false || error == undefined || error == "") {
      if (cont.hasOwnProperty("index")) {
        editContent({
          ...content,
          videoLink: videoLink[1].slice(2),
          material: JSON.stringify(material),
        });
      } else {
        saveContent({
          ...content,
          material: JSON.stringify(material),
        });
      }
    }
  }

  return (
    <Overlay onClick={cancelar}>
      <Container>
        <form
          onSubmit={handleSaveContent}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 mb-56 px-8 pt-12 pb-64 bg-white rounded-lg shadow-lg min-w-[850px]"
        >
          <div className="flex items-center justify-between gap-8">
            <FormTitle border={false}>
              {cont.hasOwnProperty("index")
                ? "Editar Conteúdo"
                : "Novo conteúdo"}
            </FormTitle>

            <div className="flex items-center gap-4">
              <Button variant="action" onClick={cancelar}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">
              {error}
            </div>
          )}

          <FormLabel>
            Título
            <FormInput
              type="text"
              name="titulo"
              defaultValue={cont.titulo}
              onChange={handleInput}
            />
          </FormLabel>
          <FormLabel>
            Link do vídeo (opcional)
            <FormInput
              type="text"
              name="videoLink"
              defaultValue={cont.videoLink}
              onChange={handleInput}
            />
          </FormLabel>
          <FormLabel>
            Material escrito
            {/* <textarea name='material' cols="30" rows="8" defaultValue={cont.material} onChange={handleInput} /> */}
            <DescEditor
              initialValue={material}
              placeholder={"Insira uma descrição!"}
              onChange={(newMaterial) => setMaterial(newMaterial)}
              editor={editor}
            />
          </FormLabel>
        </form>
      </Container>
    </Overlay>
  );
};

export default ContentModal;
