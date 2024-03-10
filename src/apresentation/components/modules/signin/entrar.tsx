import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/apresentation/components/ui/card.tsx";
import { Button } from "@/apresentation/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { entrarFormSchema } from "@/apresentation/components/modules/signin/rules";
import { CustomInput } from "@/apresentation/components/custom/custom-input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginProps, SigninService } from "@/infra/services/api/SigninService";

const service = new SigninService();
type EntrarFormSchema = z.infer<typeof entrarFormSchema>;

export function Entrar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EntrarFormSchema>({
    resolver: zodResolver(entrarFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: realizarLoginFn } = useMutation({
    mutationFn: (data: LoginProps) => service.login(data),
    onSuccess: (data: any) => {
      localStorage.setItem("@auth", data.token);
    },
  });

  async function handleEntrar(data: EntrarFormSchema) {
    try {
      await realizarLoginFn({
        email: data.email,
        password: data.password,
      });

      toast.success("Seja, bem vindo");
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error("Error ao realizar login, teste novamente.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Digite sua credenciais cadastrada na aba ao lado e aproveite.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleEntrar)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <CustomInput
              type="text"
              placeholder="E-mail"
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
          <Button disabled={isSubmitting}>Entrar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
