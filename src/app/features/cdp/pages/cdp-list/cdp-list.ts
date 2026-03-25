import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PresupuestoService } from '../../../presupuesto/services/presupuesto.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CdpService } from '../../services/cdp.service';

@Component({
  selector: 'app-cdp-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cdp-list.html',
  styleUrl: './cdp-list.css',
})
export class CdpList {
  showNewRow = false;

  formNuevoCdp: FormGroup<{
    valor: FormControl<number | null>;
  }>;
  
  formBusqueda: FormGroup;

  private presupuestoId$ = new BehaviorSubject<number | null>(null);

  cdps$ = this.presupuestoId$.pipe(
    switchMap(id => {
      if (!id) return [];
      return this.presupuestoService.getCdpsByPresupuestoId(id);
    })
  );

  constructor(
    private fb: FormBuilder,
    private presupuestoService: PresupuestoService,
    private cdpService: CdpService
  ) {
    this.formBusqueda = this.fb.group({
      presupuestoId: ['']
    });
    this.formNuevoCdp = this.fb.group({
      valor: this.fb.control<number | null>(null)
    }); 
  }

  buscar() {
    const id = this.formBusqueda.value.presupuestoId;
    if (!id) return;

    this.presupuestoId$.next(Number(id));
  }
  crearCdp() {
    const id = this.presupuestoId$.value;
    const valor = this.formNuevoCdp.controls.valor.value;

    if (!id) return;

    const payload = {
      idPresupuesto: id,
      valor: Number(valor)
    };

    this.cdpService.createCdp(payload).subscribe(() => {

      // reset form
      this.formNuevoCdp.reset();

      // ocultar fila
      this.showNewRow = false;

      // 🔥 recargar lista (clave)
      this.presupuestoId$.next(id);
    });
  }
}
