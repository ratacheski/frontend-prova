import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoFormComponent implements OnInit {
  form!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProdutoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      nome: ['', Validators.required],
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
      this.createProduto();
    } else {
      this.updateProduto();
    }
  }
  private createProduto() {
    this.service
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Produto ${this.form.value.nome} cadastrado!`,
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

  private updateProduto() {
    this.service
      .update(this.codigo, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open(
            `Produto ${this.form.value.nome} atualizado!`,
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
