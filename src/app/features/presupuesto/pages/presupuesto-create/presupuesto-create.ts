import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './presupuesto-create.html',
  styleUrl: './presupuesto-create.css',
})
export class PresupuestoCreate {
  formPresupuesto: FormGroup;

  constructor(
    private fb: FormBuilder,
    private presupuestoService: PresupuestoService,
    private router: Router
  ) {

    this.formPresupuesto = this.fb.group({
      rubro: [''],
      fuente: [''],
      tipoPre: [''],
      sector: [''],
      producto: [''],
      programa: [''],
      codCpc: [''],
      bpin: [''],
      nombre: [''],
      tipo: [''],
      rm: [''],
      inicial: [0],
      empresaId: [0],
      denominacionCcpt: [''],
      dependencia: ['']
    });

  }

  guardar() {

    const presupuesto: Presupuesto = this.formPresupuesto.value;

    this.presupuestoService.createPresupuesto(presupuesto)
      .subscribe({

        next: () => {
          this.router.navigate(['/presupuesto']);
        },

        error: (err) => {
          console.error("Error creando presupuesto", err);
        }

      });
    }
}
