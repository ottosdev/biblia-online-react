import { Button } from "@/apresentation/components/ui/button.tsx";
import { useState } from "react";
import { EditarLivro } from "@/apresentation/components/modules/cadastro/livros/editar-livro";
import { toast } from "sonner";
import { Edit3, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/apresentation/components/ui/dialog.tsx";
import { useDeletarLivro } from "../../../../../react-query/livros/use-deletar-livro";
import { useListarLivrosId } from "@/apresentation/react-query/livros/use-listar-livro-id";
interface ColunaAcoesProps {
  id: number;
}

export function ColunaAcoes({ id }: ColunaAcoesProps) {
  const [open, setOpen] = useState(false);
  const { deletarFn, livroDeletadoSucesso } = useDeletarLivro();
  const { livro } = useListarLivrosId({ livroId: id, open: true });

  async function handledeletarLivro(id: number) {
    await deletarFn(id);
  }

  return (
    <div className="flex gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="xs"
            className="bg-amber-400 hover:bg-amber-400/80  dark:bg-amber-600 dark:hover:dark:bg-amber-600/90"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <EditarLivro id={id} setOpen={setOpen} open={open} key={id} />
      </Dialog>

      {livro && livro.versiculos.length === 0 && (
        <Button
          variant="destructive"
          size="xs"
          onClick={() =>
            toast.error("Deseja deletar?", {
              description:
                "Apos confirmar o liuro sera deletado permanentimente",
              position: "top-center",
              duration: 40000,
              onDismiss: () => {
                livroDeletadoSucesso && toast.dismiss();
              },
              action: {
                label: "Deletar",
                onClick: () => handledeletarLivro(id),
              },
            })
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
