import { VersiculoService } from "@/infra/services/api/VersiculoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const service = new VersiculoService();
export function useDeletarVersiculo() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (id: number) => service.deletarVersiculo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["versiculos"] });
      toast.success("Versiculo deletado com sucesso!");
    },
  });

  return { deletarFn: mutateAsync, isSuccess };
}
