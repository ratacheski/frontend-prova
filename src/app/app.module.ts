import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { VendedorComponent } from './vendedor/vendedor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './home/home.component';
import { ClienteFormComponent } from './cliente/cliente-form.component';
import { VendedorFormComponent } from './vendedor/vendedor-form.component';
import { ProdutoFormComponent } from './produto/produto-form.component';
import { MatPaginatorIntlPortuguese } from './config/mat-paginator-portuguese';

@NgModule({
  declarations: [
    AppComponent,
    VendedorComponent,
    ClienteComponent,
    ProdutoComponent,
    ConfirmDialogComponent,
    HomeComponent,
    ClienteFormComponent,
    VendedorFormComponent,
    ProdutoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CdkTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      },
    },
    {
      provide: MatPaginatorIntl,
      useValue: MatPaginatorIntlPortuguese(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
