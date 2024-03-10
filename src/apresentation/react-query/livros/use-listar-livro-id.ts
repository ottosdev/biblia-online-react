import { LivroService } from "@/infra/services/api/LivroService";
import { useQuery } from "@tanstack/react-query";
const service = new LivroService();
interface Props {
  open: boolean;
  livroId: number;
}
export function useListarLivrosId({ open, livroId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["livro", livroId],
    queryFn: () => service.obterLivroPorId(livroId),
    enabled: open,
  });

  return { livro: data, livroLoading: isLoading };
}
