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
import { useCadastrarLivro } from "../../../../react-query/livros/use-cadastre-livro";
import { useListarTestamentos } from "@/apresentation/react-query/testamentos/use-listar-testamentos";
import { ModalSkeleton } from "../../../skeleton/modal-skeleton";

const cadastrarLivroSchema = z.object({
  nome: z.string(),
  posicao: z.string(),
  abreviacao: z.string(),
  capa: z.instanceof(File).optional(),
  testamento_id: z.string(),
});

type CadastrarLivroForm = z.infer<typeof cadastrarLivroSchema>;

interface CadastrarEditarLivroProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CadastrarLivro({ open, setOpen }: CadastrarEditarLivroProps) {
  const { cadastrarLivroFn } = useCadastrarLivro({ setOpen });
  const { testamentos, testamentosLoading } = useListarTestamentos({ open });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarLivroForm>({
    resolver: zodResolver(cadastrarLivroSchema),
  });

  async function handleCadastrarEditarLivro(data: CadastrarLivroForm) {
    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("abreviacao", data.abreviacao);
    formData.append("posicao", data.posicao);
    formData.append("testamento_id", data.testamento_id);

    if (data.capa) {
      formData.append("capa", data.capa);
    }
    await cadastrarLivroFn(formData);
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

        {testamentosLoading ? (
          <ModalSkeleton />
        ) : (
          <form onSubmit={handleSubmit(handleCadastrarEditarLivro)}>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-1 items-center">
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
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 items-center">
                <Controller
                  control={control}
                  name="capa"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <input
                      type="file"
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        // Garantir que onChange receba o arquivo, não o evento.
                        const file = e.target.files[0];
                        onChange(file); // Atualiza o valor do campo com o arquivo
                      }}
                    />
                  )}
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
