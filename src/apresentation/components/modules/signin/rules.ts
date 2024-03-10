import { z } from "zod";

export const entrarFormSchema = z.object({
  email: z.string().email({ message: "E-mail Obrigatório" }),
  password: z.string().min(6, { message: "Senha Obrigatória" }),
});

export const cadastreFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail é obrigatorio" }),
  password: z.string().min(6, { message: "Senha é obrigatorio" }),
});
