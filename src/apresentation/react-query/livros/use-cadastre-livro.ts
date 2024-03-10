import { LivroService } from "@/infra/services/api/LivroService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  setOpen: (value: boolean) => void;
}
const service = new LivroService();
export function useCadastrarLivro({ setOpen }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => service.cadastrarLivro(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      toast.success("Livro cadastrado com sucesso!");
      setOpen(false);
    },
  });
  return { cadastrarLivroFn: mutateAsync };
}
