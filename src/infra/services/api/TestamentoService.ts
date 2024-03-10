import { AxiosConfig } from "../config/axios.config";

export const API_URL = import.meta.env.VITE_API_URL;
export interface TestamentoResponse {
  id: number;
  nome: string;
}

export class TestamentoService extends AxiosConfig {
  public constructor() {
    super({
      baseURL: API_URL,
    });
  }

  public obterTestamentos() {
    return this.instance
      .get<TestamentoResponse[]>("/testamento")
      .then((res) => res.data);
  }
}
