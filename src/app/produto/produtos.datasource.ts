import { ProdutoService } from './produto.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Produto } from 'src/app/shared/models/Produto';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutosDataSource implements DataSource<Produto> {
  private produtoSubject = new BehaviorSubject<Produto[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  constructor(private produtoService: ProdutoService) {}

  connect(_collectionViewer: CollectionViewer): Observable<Produto[]> {
    return this.produtoSubject.asObservable();
  }
  disconnect(_collectionViewer: CollectionViewer): void {
    this.produtoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }
  loadProdutos({ filter = '', sort = 'asc', pageNumber = 0, pageSize = 5 }) {
    this.loadingSubject.next(true);
    this.produtoService
      .findProdutos(filter, sort, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: any) => {
        this.countSubject.next(resp.count);
        this.produtoSubject.next(resp.data);
      });
  }
  deleteProduto(produto: Produto) {
    return this.produtoService.deleteProduto(produto.codigo);
  }
}
