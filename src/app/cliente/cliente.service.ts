import { ClienteResponse } from './../shared/models/Cliente';
import { Cliente } from 'src/app/shared/models/Cliente';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}
  findClientes(
    filter = '',
    sort = 'asc',
    pageNumber = 0,
    pageSize = 5
  ): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(environment.apiUrl + 'clientes', {
      params: new HttpParams()
        .set('filter', filter)
        .set('sort', sort)
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString()),
    });
  }
  deleteCliente(codigo: number) {
    return this.http.delete<void>(environment.apiUrl + `clientes/${codigo}`);
  }
  getByCodigo(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.apiUrl + 'clientes/' + codigo);
  }
  create(values: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.apiUrl + 'clientes/', values);
  }

  update(codigo: number, values: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      environment.apiUrl + `clientes/${codigo}`,
      values
    );
  }
}
