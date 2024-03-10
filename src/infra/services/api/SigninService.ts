import { AxiosConfig } from "../config/axios.config";
export const API_URL = import.meta.env.VITE_API_URL;
export interface CadastrarProps {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export class SigninService extends AxiosConfig {
  public constructor() {
    super({
      baseURL: API_URL,
    });
  }

  protected initializeRequestInterceptor() {}
  protected initializeResponseInterceptor() {}

  public cadastrar(data: CadastrarProps) {
    return this.instance.post("/register", data).then((res) => res.data);
  }

  public login(data: LoginProps) {
    return this.instance.post("/login", data).then((res) => res.data);
  }
}
