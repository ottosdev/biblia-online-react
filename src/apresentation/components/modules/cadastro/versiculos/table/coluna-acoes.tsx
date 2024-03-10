import { Button } from "@/apresentation/components/ui/button.tsx";
import { useState } from "react";
import { toast } from "sonner";
import { Edit3, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/apresentation/components/ui/dialog.tsx";
import { EditarVersiculo } from "../editar-versiculo";
import { useDeletarVersiculo } from "@/apresentation/react-query/versiculos/use-deletar-livro";
interface ColunaAcoesProps {
  id: number;
}

export function ColunaAcoes({ id }: ColunaAcoesProps) {
  const [open, setOpen] = useState(false);
  const { deletarFn, isSuccess } = useDeletarVersiculo();

  async function handledeletarVersiculo(id: number) {
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
        <EditarVersiculo id={id} setOpen={setOpen} open={open} key={id} />
      </Dialog>

      <Button
        variant="destructive"
        size="xs"
        onClick={() =>
          toast.error("Deseja deletar?", {
            description:
              "Apos confirmar o versiculo sera deletado permanentimente",
            position: "top-center",
            duration: 40000,
            onDismiss: () => {
              isSuccess && toast.dismiss();
            },
            action: {
              label: "Deletar",
              onClick: () => handledeletarVersiculo(id),
            },
          })
        }
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
