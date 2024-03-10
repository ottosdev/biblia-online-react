import { Book, FileText } from "lucide-react";
import { ReactNode } from "react";

export const cadastro: {
  title: string;
  href: string;
  icon: ReactNode;
  description: string;
}[] = [
  {
    title: "Livros",
    href: "cadastro/livros",
    icon: <Book />,
    description: "Adicione algum livro que contenha na biblia.",
  },
  {
    title: "Capitulos/Versiculos",
    href: "cadastro/versiculos",
    icon: <FileText />,
    description:
      "Adicione os capitulos & versiculos da biblia para o livro correspondente.",
  },
];

export const livros: {
  title: string;
  href: string;
  icon: ReactNode;
  description: string;
}[] = [
  {
    title: "Livros",
    href: "/livros",
    icon: <Book />,
    description: "Adicione algum livro que contenha na biblia.",
  },
];
