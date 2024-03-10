import { Card, CardDescription, CardHeader, CardTitle } from "../../../ui/card";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { useListarLivros } from "@/apresentation/react-query/livros/use-listar-livros";
import { Link } from "react-router-dom";
import CapitulosCardSkeleton from "@/apresentation/components/skeleton/capitulos-card-skeleton";

export default function LerLivros() {
  const { livros, livrosLoading } = useListarLivros({ open: true });

  const livrosOrdenados = livrosLoading
    ? []
    : livros?.sort((a, b) => a.posicao - b.posicao);
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {livrosLoading ? (
        <CapitulosCardSkeleton />
      ) : (
        livrosOrdenados &&
        livrosOrdenados.map((livro) => (
          <div className="cursor-pointer">
            <Popover key={livro.id}>
              <PopoverTrigger asChild>
                <Card className="w-[200px] dark:hover:bg-slate-700 hover:bg-slate-200 transition-all duration-300 ease-in-out ">
                  <CardHeader>
                    <CardTitle>{livro.nome}</CardTitle>
                    <CardDescription>{livro.testamento.nome}</CardDescription>
                  </CardHeader>
                </Card>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-[200px] shadow-lg rounded-md max-w-sm flex gap-2 flex-wrap">
                {livro.versiculos && livro.versiculos.length > 0 ? (
                  Array.from(
                    new Set(
                      livro.versiculos.map((versiculo) => versiculo.capitulo)
                    )
                  ).map((capitulo) => (
                    <Link
                      to={`/livros/${livro.nome}/${livro.id}/${capitulo}`}
                      key={capitulo}
                    >
                      <div className="w-8 text-center border border-md rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out">
                        {capitulo}
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs">Nenhum capítulo disponível</p>
                )}
              </PopoverContent>
            </Popover>
          </div>
        ))
      )}
    </div>
  );
}
