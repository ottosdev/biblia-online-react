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
import { useListarLivrosId } from "@/apresentation/react-query/livros/use-listar-livro-id";
import { useAtualizarLivro } from "@/apresentation/react-query/livros/use-editar-livro";
import { Input } from "../../../ui/input";

const editarLivroSchema = z.object({
  nome: z.string(),
  posicao: z.string(),
  abreviacao: z.string(),
  capa: z
    .instanceof(File)
    .optional()
    .refine((file) => file != null, {
      message: "A capa do livro é obrigatória.",
    }),
  testamento_id: z.string(),
  _method: z.string().optional(),
});

type EditarLivroForm = z.infer<typeof editarLivroSchema>;

interface EditarLivroProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export function EditarLivro({ open, setOpen, id }: EditarLivroProps) {
  const { testamentos } = useListarTestamentos({ open });
  const { livroLoading, livro } = useListarLivrosId({ open, livroId: id });
  const { atualizarLivroFn } = useAtualizarLivro({ id, setOpen });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditarLivroForm>({
    resolver: zodResolver(editarLivroSchema),
    values: {
      nome: livro?.nome ?? "",
      abreviacao: livro?.abreviacao ?? "",
      posicao: livro?.posicao.toString() ?? "",
      capa: undefined,
      testamento_id: livro?.testamento.id.toString() ?? "",
    },
  });
  async function handleEditarLivro(data: EditarLivroForm) {
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("abreviacao", data.abreviacao);
    formData.append("posicao", data.posicao);
    formData.append("testamento_id", data.testamento_id);
    formData.append("_method", "PUT");
    if (data.capa) {
      formData.append("capa", data.capa);
      await atualizarLivroFn(formData);
    }
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
          <DialogDescription>
            Por favor informe o nome do livro que deseja editar.
          </DialogDescription>
        </DialogHeader>
        {livroLoading && !livro ? (
          <ModalSkeleton />
        ) : (
          <form onSubmit={handleSubmit(handleEditarLivro)}>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-1 items-center ">
                <Controller
                  name="testamento_id"
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
                  name="nome"
                  placeholder="Nome"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 items-center">
                <CustomInput
                  errors={errors}
                  register={register}
                  name="abreviacao"
                  placeholder="Abreviação"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 items-center">
                <CustomInput
                  errors={errors}
                  register={register}
                  name="posicao"
                  placeholder="Posição"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-1 items-center">
                <Controller
                  control={control}
                  name="capa"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <Input
                      type="file"
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      className={`
                        ${errors[name]?.message ? "border-red-400" : ""}`}
                      onChange={(e: any) => {
                        const file = e.target.files[0];
                        onChange(file);
                      }}
                    />
                  )}
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
