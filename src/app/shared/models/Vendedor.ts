export class Vendedor {
  codigo: number;
  nome: string;

  constructor(vendedorInfo: any) {
    this.codigo = vendedorInfo.codigo;
    this.nome = vendedorInfo.nome;
  }
}

export class VendedorResponse {
  count: number;
  data: Vendedor[];

  constructor(vendedorResponse: any) {
    this.count = vendedorResponse.count;
    this.data = vendedorResponse.data;
  }
}
