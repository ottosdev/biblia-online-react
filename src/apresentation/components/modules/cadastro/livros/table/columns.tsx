import { ColumnDef } from "@tanstack/react-table";
import { LivroProps } from "@/apresentation/components/modules/cadastro/livros/interface";
import { ColunaAcoes } from "@/apresentation/components/modules/cadastro/livros/table/coluna-acoes";

export const columns: ColumnDef<LivroProps>[] = [
  {
    accessorKey: "nome",
    header: "Nome do livro",
  },
  {
    accessorKey: "abreviacao",
    header: "Abreviacao",
  },
  {
    accessorKey: "posicao",
    header: "Posição",
  },
  {
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      return <ColunaAcoes id={row.original.id} />;
    },
  },
];
