export class Produto {
  codigo: number;
  nome: string;

  constructor(produtoInfo: any) {
    this.codigo = produtoInfo.codigo;
    this.nome = produtoInfo.nome;
  }
}

export class ProdutoResponse {
  count: number;
  data: Produto[];

  constructor(produtoResponse: any) {
    this.count = produtoResponse.count;
    this.data = produtoResponse.data;
  }
}
