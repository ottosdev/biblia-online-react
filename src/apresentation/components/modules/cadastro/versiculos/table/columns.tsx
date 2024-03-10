import { ColumnDef } from "@tanstack/react-table";
import { Versiculo } from "@/infra/services/api/VersiculoService";
import { ColunaAcoes } from "./coluna-acoes";

export const columns: ColumnDef<Versiculo>[] = [
  {
    accessorKey: "livro.nome",
    header: "Livro",
  },
  {
    accessorKey: "capitulo",
    header: "Numero Capitulo",
  },
  {
    accessorKey: "versiculos",
    header: "Numero Versiculo",
  },
  {
    accessorKey: "texto",
    header: "Versiculo Texto",
  },
  {
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      return <ColunaAcoes id={row.original.id} />;
    },
  },
];
