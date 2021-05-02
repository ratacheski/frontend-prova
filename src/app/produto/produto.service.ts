import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto, ProdutoResponse } from 'src/app/shared/models/Produto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}
  findProdutos(
    filter = '',
    sort = 'asc',
    pageNumber = 0,
    pageSize = 5
  ): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(environment.apiUrl + 'produtos', {
      params: new HttpParams()
        .set('filter', filter)
        .set('sort', sort)
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString()),
    });
  }
  deleteProduto(codigo: number) {
    return this.http.delete<void>(environment.apiUrl + `produtos/${codigo}`);
  }
  getByCodigo(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(environment.apiUrl + 'produtos/' + codigo);
  }
  create(values: Produto): Observable<Produto> {
    return this.http.post<Produto>(environment.apiUrl + 'produtos/', values);
  }

  update(codigo: number, values: Produto): Observable<Produto> {
    return this.http.put<Produto>(
      environment.apiUrl + `produtos/${codigo}`,
      values
    );
  }
}
