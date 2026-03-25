import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { ProgressBarComponent } from '../../../../shared';

@Component({
  selector: 'app-empresa-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProgressBarComponent],
  templateUrl: './empresa-create.html',
  styleUrl: './empresa-create.css'
})
export class EmpresaCreate {

  formEmpresa: FormGroup;
  isSaving$ = new BehaviorSubject<boolean>(false);

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

    this.isSaving$.next(true);
    this.empresaService.createEmpresa(empresa)
      .subscribe({

        next: () => {
          this.isSaving$.next(false);
          this.router.navigate(['/empresas']);

        },

        error: (err) => {
          this.isSaving$.next(false);
          console.error("Error creando empresa", err);

        }

      });

  }

}
