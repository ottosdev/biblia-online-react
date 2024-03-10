import { VersiculoService } from "@/infra/services/api/VersiculoService";
import { useQuery } from "@tanstack/react-query";
const service = new VersiculoService();

export function useListarVersiculos() {
  const { data, isLoading } = useQuery({
    queryKey: ["versiculos"],
    queryFn: () => service.obterVersiculos(),
  });

  return { versiculos: data, isLoading };
}
