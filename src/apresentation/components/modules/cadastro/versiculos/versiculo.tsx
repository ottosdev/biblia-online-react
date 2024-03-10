import { useListarVersiculos } from "@/apresentation/react-query/versiculos/use-listar-versiculos";
import { CustomDataTable } from "../../../custom/custom-data-table";
import { columns } from "./table/columns";
import { Button } from "../../../ui/button";
import { useState } from "react";
import { CadastrarVersiculo } from "./cadastrar-versiculo";
import { dicionarioVersiculo } from "./table/dicionario";
import { ListaSkeleton } from "@/apresentation/components/skeleton/lista-skeleton";

export default function VersiculoComponent() {
  const { versiculos, isLoading } = useListarVersiculos();

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <ListaSkeleton />;
  }
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Cadastrar</Button>
      {versiculos && (
        <CustomDataTable
          columns={columns}
          data={versiculos}
          filtro={true}
          columnsDictionary={dicionarioVersiculo}
        />
      )}
      <CadastrarVersiculo setOpen={setOpen} open={open} />
    </div>
  );
}
