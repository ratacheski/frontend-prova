import { VendedorFormComponent } from './vendedor/vendedor-form.component';
import { ClienteFormComponent } from './cliente/cliente-form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { ProdutoFormComponent } from './produto/produto-form.component';

const routes: Routes = [
  {
    path: 'vendedor',
    children: [
      { path: '', component: VendedorComponent },
      { path: 'novo', component: VendedorFormComponent },
      { path: ':codigo', component: VendedorFormComponent },
    ],
  },
  {
    path: 'cliente',
    children: [
      { path: '', component: ClienteComponent },
      { path: 'novo', component: ClienteFormComponent },
      { path: ':codigo', component: ClienteFormComponent },
    ],
  },
  {
    path: 'produto',
    children: [
      { path: '', component: ProdutoComponent },
      { path: 'novo', component: ProdutoFormComponent },
      { path: ':codigo', component: ProdutoFormComponent },
    ],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
