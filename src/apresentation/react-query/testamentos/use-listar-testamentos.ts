import { TestamentoService } from "@/infra/services/api/TestamentoService";
import { useQuery } from "@tanstack/react-query";
const service = new TestamentoService();
interface Props {
  open: boolean;
}
export function useListarTestamentos({ open }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["testamentos"],
    queryFn: () => service.obterTestamentos(),
    enabled: open,
  });

  return { testamentos: data, testamentosLoading: isLoading };
}
