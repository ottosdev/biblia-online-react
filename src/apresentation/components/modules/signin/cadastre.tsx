import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/apresentation/components/ui/card.tsx";
import { Button } from "@/apresentation/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "@/apresentation/components/custom/custom-input.tsx";
import { cadastreFormSchema } from "./rules";
import { CadastrarProps, SigninService } from "@/infra/services/api/SigninService";
const service = new SigninService()
interface CadastreProps {
  onSuccess: () => void;
}

type CadastreForm = z.infer<typeof cadastreFormSchema>;

export function Cadastre({ onSuccess }: CadastreProps) {
  const navigate = useNavigate();
  // React Hook Forms
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CadastreForm>({
    resolver: zodResolver(cadastreFormSchema),
  });

  // React Query
  const { mutateAsync: handleCadastrarFn } = useMutation({
    mutationFn: (data: CadastrarProps) => service.cadastrar(data),
  });

  async function handleCadastre(data: CadastreForm) {
    try {
      await handleCadastrarFn({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Cadastro realizado com sucesso", {
        action: {
          label: "Entrar",
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`);
            onSuccess();
          },
        },
      });
    } catch (err: any) {
      toast.error(
        "Cadastro falhou, por favor verifique os dados ou contante o supporte."
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>
          Informe os dados abaixo para criar uma conta no sistema.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleCadastre)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <CustomInput
              type="text"
              placeholder="Nome"
              name="name"
              register={register}
              errors={errors}
            />
          </div>
          <div className="space-y-1">
            <CustomInput
              type="text"
              placeholder="Email"
              name="email"
              register={register}
              errors={errors}
            />
          </div>
          <div className="space-y-1">
            <CustomInput
              type="password"
              placeholder="Senha"
              name="password"
              register={register}
              errors={errors}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting}>Cadastre-se</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
