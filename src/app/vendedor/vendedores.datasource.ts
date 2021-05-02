import { VendedorService } from './vendedor.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Vendedor } from '../shared/models/Vendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedoresDataSource implements DataSource<Vendedor> {
  private vendedorSubject = new BehaviorSubject<Vendedor[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  constructor(private vendedorService: VendedorService) {}

  connect(_collectionViewer: CollectionViewer): Observable<Vendedor[]> {
    return this.vendedorSubject.asObservable();
  }
  disconnect(_collectionViewer: CollectionViewer): void {
    this.vendedorSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }
  loadVendedores({ filter = '', sort = 'asc', pageNumber = 0, pageSize = 5 }) {
    this.loadingSubject.next(true);
    this.vendedorService
      .findVendedores(filter, sort, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: any) => {
        this.countSubject.next(resp.count);
        this.vendedorSubject.next(resp.data);
      });
  }
  deleteVendedor(vendedor: Vendedor) {
    return this.vendedorService.deleteVendedor(vendedor.codigo);
  }
}
