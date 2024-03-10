import { LivroService } from "@/infra/services/api/LivroService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const service = new LivroService();
interface Props {
  setOpen: (value: boolean) => void;
  id: number;
}

export function useAtualizarLivro({ setOpen, id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => service.editarLivro(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      toast.success("Livro atualizado com sucesso!");
      setOpen(false);
    },
  });

  return { atualizarLivroFn: mutateAsync };
}
