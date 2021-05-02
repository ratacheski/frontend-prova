import { VendedorService } from './vendedor.service';
import { VendedoresDataSource } from './vendedores.datasource';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Vendedor } from '../shared/models/Vendedor';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss'],
})
export class VendedorComponent implements OnInit {
  displayedColumns = ['codigo', 'nome', 'acoes'];
  pageSize = 3;
  pageIndex = 0;
  direction = 'asc';
  filter = '';
  pageSizeOptions = [3, 5, 10];
  dataSource!: VendedoresDataSource;

  constructor(
    private service: VendedorService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new VendedoresDataSource(this.service);
    this.loadVendedores();
  }

  loadVendedores() {
    this.dataSource.loadVendedores({
      filter: this.filter,
      sort: this.direction,
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  handlePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadVendedores();
  }

  handleSort(event: Sort) {
    this.direction = event.direction;
    this.loadVendedores();
  }

  handleFilter() {
    this.loadVendedores();
  }

  handleClearClick() {
    this.filter = '';
    this.loadVendedores();
  }
  confirmDelete(vendedor: Vendedor) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atenção',
        message: `Deseja realmente remover o vendedor ${vendedor.nome}?`,
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.dataSource.deleteVendedor(vendedor).subscribe({
          next: () => {
            this._snackBar.open(`Vendedor ${vendedor.nome} excluído!`, '', {
              panelClass: 'snackbar-success',
            });
            this.loadVendedores();
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
