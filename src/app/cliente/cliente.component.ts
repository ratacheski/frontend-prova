import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesDataSource } from './clientes.datasource';
import { Cliente } from './../shared/models/Cliente';

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from './cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  public displayedColumns: string[] = ['codigo', 'nome', 'vendedor', 'acoes'];
  pageSize = 3;
  pageIndex = 0;
  direction = 'asc';
  filter = '';
  pageSizeOptions = [3, 5, 10];
  dataSource!: ClientesDataSource;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new ClientesDataSource(this.clienteService);
    this.loadClientes();
  }
  loadClientes() {
    this.dataSource.loadClientes({
      filter: this.filter,
      sort: this.direction,
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    });
  }
  handlePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadClientes();
  }

  handleSort(event: Sort) {
    this.direction = event.direction;
    this.loadClientes();
  }

  handleFilter() {
    this.loadClientes();
  }

  handleClearClick() {
    this.filter = '';
    this.loadClientes();
  }
  confirmDelete(cliente: Cliente) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atenção',
        message: `Deseja realmente remover o cliente ${cliente.nome}?`,
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.dataSource.deleteCliente(cliente).subscribe({
          next: () => {
            this._snackBar.open(`Cliente ${cliente.nome} excluído!`, '', {
              panelClass: 'snackbar-success',
            });
            this.loadClientes();
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
