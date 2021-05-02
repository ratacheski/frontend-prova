import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/Cliente';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesDataSource implements DataSource<Cliente> {
  private clienteSubject = new BehaviorSubject<Cliente[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  constructor(private clienteService: ClienteService) {}

  connect(_collectionViewer: CollectionViewer): Observable<Cliente[]> {
    return this.clienteSubject.asObservable();
  }
  disconnect(_collectionViewer: CollectionViewer): void {
    this.clienteSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }
  loadClientes({ filter = '', sort = 'asc', pageNumber = 0, pageSize = 5 }) {
    this.loadingSubject.next(true);
    this.clienteService
      .findClientes(filter, sort, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: any) => {
        this.countSubject.next(resp.count);
        this.clienteSubject.next(resp.data);
      });
  }
  deleteCliente(cliente: Cliente) {
    return this.clienteService.deleteCliente(cliente.codigo);
  }
}
