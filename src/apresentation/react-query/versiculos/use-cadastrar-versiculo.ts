import { VersiculoService } from "@/infra/services/api/VersiculoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  setOpen: (value: boolean) => void;
}
const service = new VersiculoService();
export function useCadastrarVersiculo({ setOpen }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => service.cadastrarVersiculo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["versiculos"] });
      toast.success("Versiculo cadastrado com sucesso!");
      setOpen(false);
    },
  });
  return { cadastrarVersiculoFn: mutateAsync };
}
