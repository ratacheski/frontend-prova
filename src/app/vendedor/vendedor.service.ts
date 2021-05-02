import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VendedorResponse } from '../shared/models/Vendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  constructor(private http: HttpClient) {}
  findVendedores(
    filter = '',
    sort = 'asc',
    pageNumber = 0,
    pageSize = 5
  ): Observable<VendedorResponse> {
    return this.http.get<VendedorResponse>(environment.apiUrl + 'vendedores', {
      params: new HttpParams()
        .set('filter', filter)
        .set('sort', sort)
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString()),
    });
  }
  deleteVendedor(codigo: number) {
    return this.http.delete<void>(environment.apiUrl + `vendedores/${codigo}`);
  }
}
