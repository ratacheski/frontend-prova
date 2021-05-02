import { Vendedor } from "./Vendedor";

export class Cliente {
  codigo: number;
  nome: string;
  vendedor: Vendedor;

  constructor(clienteInfo:any) {
    this.codigo = clienteInfo.codigo;
    this.nome = clienteInfo.nome;
    this.vendedor = clienteInfo.vendedor;
  }
}
