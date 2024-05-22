import React from "react";
import { Sparkle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Root = ({ children }) => {
  return (
    <div className="group h-full relative bg-white rounded-lg shadow p-3 hover:ring-2 hover:ring-amber-400 hover:shadow-xl transition-all flex flex-col">
      {children}
    </div>
  );
};

const Title = ({ children, completo = false }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Sparkles color="#F59E0B" fill="#F59E0B" />
        <div className="bg-amber-500 h-0.5 flex-1"></div>
        {completo && (
          <div className="py-0.5 px-1 text-sm font-medium tracking-tight rounded-lg bg-amber-500 text-white">
            Completo
          </div>
        )}
      </div>
      <h1 className="text-lg font-semibold text-balance">{children}</h1>
    </div>
  );
};

const Content = ({ children }) => {
  return <div className="py-2 flex-1">{children}</div>;
};

const CategoriasList = ({ children }) => {
  return <div className="flex flex-wrap gap-1">{children}</div>;
};

const Categoria = ({ children }) => {
  return (
    <div className="p-1 text-sm font-bold text-amber-500 rounded-md bg-orange-100/30 ">
      {children}
    </div>
  );
};

const Footer = ({ children }) => {
  return <div className="pt-1 flex items-end justify-between">{children}</div>;
};

const CourseCard = {
  Root,
  Title,
  Content,
  CategoriasList,
  Categoria,
  Footer,
};

export default CourseCard;
