import { LivroService } from "@/infra/services/api/LivroService";
interface Props {
  open?: boolean;
}
import { useQuery } from "@tanstack/react-query";
const service = new LivroService();
export function useListarLivros({ open }: Props) {
  const { data: livros, isLoading } = useQuery({
    queryKey: ["livros"],
    queryFn: () => service.listarLivros(),
    enabled: open ? true : false,
  });

  return { livros: livros, livrosLoading: isLoading };
}
