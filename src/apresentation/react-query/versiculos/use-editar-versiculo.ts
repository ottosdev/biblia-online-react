import { VersiculoService } from "@/infra/services/api/VersiculoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const service = new VersiculoService();
interface Props {
  setOpen: (value: boolean) => void;
  id: number;
}

export function useAtualizarVersiculo({ setOpen, id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => service.atualizarVersiculo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["versiculos"] });
      toast.success("Versiculo atualizado com sucesso!");
      setOpen(false);
    },
  });

  return { atualizarVersiculoFn: mutateAsync };
}
