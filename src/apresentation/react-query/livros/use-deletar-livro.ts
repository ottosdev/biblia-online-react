import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LivroService } from "@/infra/services/api/LivroService";
const service = new LivroService();
export function useDeletarLivro() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (id: number) => service.deletarLivro(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      toast.success("Livro deletado com sucesso!");
    },
  });

  return { deletarFn: mutateAsync, livroDeletadoSucesso: isSuccess };
}
