import { VendedorService } from './vendedor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor.component.scss'],
})
export class VendedorFormComponent implements OnInit {
  form!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: VendedorService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;
    this.form = this.formBuilder.group({
      codigo: [null, Validators.required],
      nome: [null, Validators.required],
    });

    if (!this.isAddMode) {
      console.log(this.codigo);
      this.service
        .getByCodigo(this.codigo)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createVendedor();
    } else {
      this.updateVendedor();
    }
  }
  private createVendedor() {
    this.service
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Vendedor ${this.form.value.nome} cadastrado!`,
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

  private updateVendedor() {
    this.service
      .update(this.codigo, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Vendedor ${this.form.value.nome} atualizado!`,
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
