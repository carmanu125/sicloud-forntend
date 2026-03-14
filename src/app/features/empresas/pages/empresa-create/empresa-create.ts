import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-empresa-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-create.html'
})
export class EmpresaCreate {

  formEmpresa: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ) {

    this.formEmpresa = this.fb.group({
      nombre: ['']
    });

  }

  guardar() {

    const empresa: Empresa = {
      id: 0,
      nombre: this.formEmpresa.value.nombre
    };

    this.empresaService.createEmpresa(empresa)
      .subscribe({

        next: () => {

          this.router.navigate(['/empresas']);

        },

        error: (err) => {

          console.error("Error creando empresa", err);

        }

      });

  }

}
