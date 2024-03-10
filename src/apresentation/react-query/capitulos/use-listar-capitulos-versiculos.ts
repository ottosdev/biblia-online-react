import { CapitulosService } from "@/infra/services/api/CapitulosService";
import { useQuery } from "@tanstack/react-query";
const service = new CapitulosService();
interface Props {
  livroId: number;
  capituloId: number;
}
export function useCapitulosVersiculos({ livroId, capituloId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["capitlos-versiculos", capituloId, livroId],
    queryFn: () => service.obterCapitulosVersiculos(livroId, capituloId),
  });

  return { capitulosVersiculos: data, isLoading };
}
