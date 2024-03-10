import { AxiosConfig } from "../config/axios.config";
export const API_URL = import.meta.env.VITE_API_URL;

export interface Capitulo {
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


export class CapitulosService extends AxiosConfig {
  public constructor() {
    super({
      baseURL: API_URL,
    });
  }

  public obterCapitulosVersiculos(livroId: number, capituloId: number) {
    return this.instance
      .get<Capitulo[]>(`/versiculos/${livroId}/${capituloId}`)
      .then((res) => res.data);
  }
}
