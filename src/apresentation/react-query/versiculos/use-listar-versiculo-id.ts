import { VersiculoService } from "@/infra/services/api/VersiculoService";
import { useQuery } from "@tanstack/react-query";
const service = new VersiculoService();
interface Props {
  open: boolean;
  versiculoId: number;
}
export function useListarVersiculoId({ open, versiculoId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["versiculo", versiculoId],
    queryFn: () => service.obterVersiculoId(versiculoId),
    enabled: open,
  });

  return { versiculo: data, isLoading };
}
