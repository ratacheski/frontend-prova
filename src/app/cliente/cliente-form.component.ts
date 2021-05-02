import { VendedorService } from './../vendedor/vendedor.service';
import { Vendedor } from './../shared/models/Vendedor';
import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  codigo!: number;
  isAddMode = true;
  loading = false;
  submitted = false;
  vendedores: Vendedor[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ClienteService,
    private vendedorService: VendedorService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      nome: ['', Validators.required],
      vendedor: [null, Validators.required],
    });
    this.setValues();
    this.vendedorService.findVendedores().subscribe((x) => {
      this.vendedores = x.data;
    });
  }
  setValues() {
    if (!this.isAddMode) {
      this.service
        .getByCodigo(this.codigo)
        .pipe(first())
        .subscribe((x) => {
          this.vendedores = [{ ...x.vendedor }];
          this.form.setValue({
            codigo: x.codigo,
            nome: x.nome,
            vendedor: x.vendedor,
          });
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  public comparaVendedor = function (
    option: Vendedor,
    value: Vendedor
  ): boolean {
    return option.codigo === value.codigo;
  };

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }
  private createCliente() {
    this.service
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Cliente ${this.form.value.nome} cadastrado!`,
            '',
            {
              panelClass: 'snackbar-success',
            }
          );
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: ({ error }) => {
          this._snackBar.open(error.message, '', {
            panelClass: 'snackbar-error',
          });
          this.loading = false;
        },
      });
  }

  private updateCliente() {
    this.service
      .update(this.codigo, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Cliente ${this.form.value.nome} atualizado!`,
            '',
            {
              panelClass: 'snackbar-success',
            }
          );
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: ({ error }) => {
          this._snackBar.open(error.message, '', {
            panelClass: 'snackbar-error',
          });
          this.loading = false;
        },
      });
  }
}
