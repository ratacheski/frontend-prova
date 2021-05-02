import { ProdutoService } from './produto.service';
import { DataSource } from '@angular/cdk/collections';
import { Produto } from 'src/app/shared/models/Produto';
import { PageEvent } from '@angular/material/paginator';
import { ProdutosDataSource } from './produtos.datasource';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  displayedColumns = ['codigo', 'nome', 'acoes'];
  pageSize = 3;
  pageIndex = 0;
  direction = 'asc';
  filter = '';
  pageSizeOptions = [3, 5, 10];
  dataSource!: ProdutosDataSource;

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new ProdutosDataSource(this.produtoService);
    this.loadProdutos();
  }

  loadProdutos() {
    this.dataSource.loadProdutos({
      filter: this.filter,
      sort: this.direction,
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    });
  }
  handlePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProdutos();
  }

  handleSort(event: Sort) {
    this.direction = event.direction;
    this.loadProdutos();
  }

  handleFilter() {
    this.loadProdutos();
  }

  handleClearClick() {
    this.filter = '';
    this.loadProdutos();
  }

  confirmDelete(produto: Produto) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atenção',
        message: `Deseja realmente remover o produto ${produto.nome}?`,
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.dataSource.deleteProduto(produto).subscribe({
          next: () => {
            this._snackBar.open(`Produto ${produto.nome} excluído!`, '', {
              panelClass: 'snackbar-success',
            });
            this.loadProdutos();
          },
          error: ({ error }) => {
            this._snackBar.open(error.message, '', {
              panelClass: 'snackbar-error',
            });
          },
        });
      }
    });
  }
}
