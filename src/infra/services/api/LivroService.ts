import { AxiosConfig } from "../config/axios.config";

export const API_URL = import.meta.env.VITE_API_URL;

interface CadastrarLivrosRequest {
  nome: string;
  abreviacao: string;
  posicao: string;
  capa: File;
  testamento_id: string;
}

interface Testamento {
  id: number;
  nome: string;
}

export interface ResponseLivro {
  id: number;
  nome: string;
  abreviacao: string;
  posicao: number;
  testamento_id: number;
  created_at: string;
  updated_at: string;
  testamento: Testamento;
  versiculos: VersiculoProps[];
}

interface VersiculoProps {
  id: number;
  capitulo: number;
  versiculos: number;
  texto: string;
  livro_id: number;
}

export class LivroService extends AxiosConfig {
  public constructor() {
    super({
      baseURL: API_URL,
    });
  }

  public listarLivros() {
    return this.instance.get<ResponseLivro[]>("/livro").then((res) => res.data);
  }

  public cadastrarLivro(data: CadastrarLivrosRequest) {
    return this.instance.post("/livro", data).then((res) => res.data);
  }

  public deletarLivro(id: number) {
    return this.instance.delete(`/livro/${id}`).then((res) => res.data);
  }

  public obterLivroPorId(id: number) {
    return this.instance
      .get<ResponseLivro>(`/livro/${id}`)
      .then((res) => res.data);
  }

  public editarLivro(id: number, data: CadastrarLivrosRequest) {
    return this.instance.post(`/livro/${id}`, data).then((res) => res.data);
  }
}
