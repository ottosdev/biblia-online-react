import CapituloVersiculoTextoSkeleton from "@/apresentation/components/skeleton/capitulo-versiculo-texto-skeleton";
import { Separator } from "@/apresentation/components/ui/separator";
import { useCapitulosVersiculos } from "@/apresentation/react-query/capitulos/use-listar-capitulos-versiculos";
import { useParams } from "react-router-dom";

export default function LerCapitulo() {
  const { nome, capituloId, livroId } = useParams();
  const capituloIdNumber = Number(capituloId);
  const livroIdNumber = Number(livroId);
  const { capitulosVersiculos, isLoading } = useCapitulosVersiculos({
    livroId: livroIdNumber,
    capituloId: capituloIdNumber,
  });

  return (
    <div className="grid grid-cols-3 h-full ">
      <div className="col-span-1">
        <strong>
          {nome} {capituloId}
        </strong>

        {isLoading ? (
          <CapituloVersiculoTextoSkeleton />
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {capitulosVersiculos &&
              capitulosVersiculos.map((item) => (
                <div key={item.id}>
                  <p>
                    <span className="text-[8px] align-top pr-1">
                      {item.versiculos}
                    </span>
                    <span className="italic">{item.texto}</span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Separator orientation="vertical" className="h-[40rem]" />
      </div>

      <div className="col-span-1">
        <strong>Explicação</strong>
      </div>
    </div>
  );
}
