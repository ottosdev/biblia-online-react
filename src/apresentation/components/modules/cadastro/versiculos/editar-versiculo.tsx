import { Button } from "@/apresentation/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/apresentation/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/apresentation/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../../../custom/custom-input";
import { ModalSkeleton } from "@/apresentation/components/skeleton/modal-skeleton";
import { useListarTestamentos } from "@/apresentation/react-query/testamentos/use-listar-testamentos";
import { useListarVersiculoId } from "@/apresentation/react-query/versiculos/use-listar-versiculo-id";
import { useAtualizarVersiculo } from "@/apresentation/react-query/versiculos/use-editar-versiculo";
import { Textarea } from "../../../ui/textarea";

const editarVersiculoSchema = z.object({
  capitulo: z.number(),
  versiculos: z.number(),
  texto: z.string(),
  livro_id: z.string(),
});

type EditarLivroForm = z.infer<typeof editarVersiculoSchema>;

interface EditarLivroProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export function EditarVersiculo({ open, setOpen, id }: EditarLivroProps) {
  const { testamentos } = useListarTestamentos({ open });
  const { versiculo, isLoading } = useListarVersiculoId({
    open,
    versiculoId: id,
  });
  const { atualizarVersiculoFn } = useAtualizarVersiculo({ id, setOpen });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditarLivroForm>({
    resolver: zodResolver(editarVersiculoSchema),
    values: {
      capitulo: versiculo?.capitulo ?? 0,
      versiculos: versiculo?.versiculos ?? 0,
      texto: versiculo?.texto ?? "",
      livro_id: versiculo?.livro_id.toString() ?? "",
    },
  });
  async function handleEditarLivro(data: EditarLivroForm) {
    await atualizarVersiculoFn(data);
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Versiculo</DialogTitle>
          <DialogDescription>
            Por favor altere os dados abaixo conforme necessario.
          </DialogDescription>
        </DialogHeader>
        {isLoading && !versiculo ? (
          <ModalSkeleton />
        ) : (
          <form onSubmit={handleSubmit(handleEditarLivro)}>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-1 items-center ">
                <Controller
                  name="livro_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um testamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {testamentos &&
                            testamentos.map((testamento) => (
                              <SelectItem
                                value={testamento.id.toString()}
                                key={testamento.id}
                              >
                                {testamento.nome}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center">
                <CustomInput
                  errors={errors}
                  register={register}
                  name="capitulo"
                  placeholder="Capitulo"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 items-center">
                <CustomInput
                  errors={errors}
                  register={register}
                  name="versiculos"
                  placeholder="Versiculo"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 items-center">
                <Textarea
                  placeholder="Texto do versiculo"
                  {...register("texto")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Editar
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </>
  );
}
