import { CustomDataTable } from "@/apresentation/components/custom/custom-data-table.tsx";
import { columns } from "@/apresentation/components/modules/cadastro/livros/table/columns";
import { ListaSkeleton } from "@/apresentation/components/skeleton/lista-skeleton";
import { CadastrarLivro } from "@/apresentation/components/modules/cadastro/livros/cadastrar-livro";
import { useState } from "react";
import { Button } from "@/apresentation/components/ui/button.tsx";
import { useListarLivros } from "@/apresentation/react-query/livros/use-listar-livros";
import { dicionarioLivro } from "./table/dicionario";

export function LivroComponent() {
  const { livros, livrosLoading } = useListarLivros({ open: true });

  const [open, setOpen] = useState(false);

  if (livrosLoading) {
    return <ListaSkeleton />;
  }
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Cadastrar</Button>

      {livros && (
        <CustomDataTable
          data={livros}
          columns={columns}
          filtro={true}
          columnsDictionary={dicionarioLivro}
        />
      )}

      {/* Modal */}
      <CadastrarLivro open={open} setOpen={setOpen} />
    </div>
  );
}
