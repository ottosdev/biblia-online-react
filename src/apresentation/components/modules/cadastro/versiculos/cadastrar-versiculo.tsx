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
  Dialog,
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
import { useListarLivros } from "@/apresentation/react-query/livros/use-listar-livros";
import { Textarea } from "../../../ui/textarea";
import { useCadastrarVersiculo } from "@/apresentation/react-query/versiculos/use-cadastrar-versiculo";

const cadastrarLivroSchema = z.object({
  capitulo: z.string(),
  versiculos: z.string(),
  texto: z.string(),
  livro_id: z.string(),
});

type CadastrarVersiculoForm = z.infer<typeof cadastrarLivroSchema>;

interface CadastrarEditarVersiculoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CadastrarVersiculo({
  open,
  setOpen,
}: CadastrarEditarVersiculoProps) {
  const { cadastrarVersiculoFn } = useCadastrarVersiculo({ setOpen });
  const { livros, livrosLoading } = useListarLivros({ open });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarVersiculoForm>({
    resolver: zodResolver(cadastrarLivroSchema),
  });

  async function handleCadastrarEditarVersiculo(data: CadastrarVersiculoForm) {
    await cadastrarVersiculoFn(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Livro</DialogTitle>
          <DialogDescription>
            Por favor informe o nome do livro que deseja cadastrar.
          </DialogDescription>
        </DialogHeader>

        {livrosLoading ? (
          <></>
        ) : (
          // <ModalSkeleton />
          <form onSubmit={handleSubmit(handleCadastrarEditarVersiculo)}>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-1 items-center">
                <Controller
                  name="livro_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o livro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {livros &&
                            livros.map((livro) => (
                              <SelectItem
                                value={livro.id.toString()}
                                key={livro.id}
                              >
                                {livro.nome}
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
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
