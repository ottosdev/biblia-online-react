import { AxiosConfig } from "../config/axios.config";
export const API_URL = import.meta.env.VITE_API_URL;

export interface Versiculo {
  id: number;
  capitulo: number;
  versiculos: number;
  texto: string;
  livro_id: number;
  created_at: string;
  updated_at: string;
  livro: Livro;
}

export interface Livro {
  id: number;
  nome: string;
  abreviacao: string;
  posicao: number;
  testamento_id: number;
  created_at: string;
  updated_at: string;
  capa: any;
}

export class VersiculoService extends AxiosConfig {
  public constructor() {
    super({
      baseURL: API_URL,
    });
  }

  public obterVersiculos() {
    return this.instance.get<Versiculo[]>("/versiculo").then((res) => res.data);
  }

  public cadastrarVersiculo(data: any) {
    return this.instance.post("/versiculo", data).then((res) => res.data);
  }
  public obterVersiculoId(id: number) {
    return this.instance
      .get<Versiculo>(`/versiculo/${id}`)
      .then((res) => res.data);
  }

  public atualizarVersiculo(id: number, data: any) {
    return this.instance.put(`/versiculo/${id}`, data).then((res) => res.data);
  }

  public deletarVersiculo(id: number) {
    return this.instance
      .delete(`/versiculo/${id}`)
      .then((res) => res.data);
  }
}
