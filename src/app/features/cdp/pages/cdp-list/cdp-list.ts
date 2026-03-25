import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PresupuestoService } from '../../../presupuesto/services/presupuesto.service';
import { Presupuesto } from '../../../presupuesto/models/presupuesto.model';
import { BehaviorSubject, switchMap, finalize, merge } from 'rxjs';
import { CdpService } from '../../services/cdp.service';
import { ProgressBarComponent } from '../../../../shared';

@Component({
  selector: 'app-cdp-list',
  imports: [CommonModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './cdp-list.html',
  styleUrl: './cdp-list.css',
})
export class CdpList implements OnInit {
  showNewRow = false;
  showModal = false;

  // Estados de carga
  isLoadingPresupuestos$ = new BehaviorSubject<boolean>(false);
  isLoadingCdps$ = new BehaviorSubject<boolean>(false);
  isCreatingCdp$ = new BehaviorSubject<boolean>(false);

  // Observable combinado para la barra de progreso
  isLoading$ = merge(this.isLoadingPresupuestos$, this.isLoadingCdps$, this.isCreatingCdp$);

  formNuevoCdp: FormGroup<{
    valor: FormControl<number | null>;
  }>;
  
  formBusqueda: FormGroup;

  presupuestos: Presupuesto[] = [];
  presupuestoSeleccionado: Presupuesto | null = null;

  private presupuestoId$ = new BehaviorSubject<number | null>(null);

  cdps$ = this.presupuestoId$.pipe(
    switchMap(id => {
      if (!id) return [];
      this.isLoadingCdps$.next(true);
      return this.presupuestoService.getCdpsByPresupuestoId(id).pipe(
        finalize(() => this.isLoadingCdps$.next(false))
      );
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

  ngOnInit() {
    this.cargarPresupuestos();
  }

  cargarPresupuestos() {
    this.isLoadingPresupuestos$.next(true);
    this.presupuestoService.getPresupuestos().subscribe({
      next: (presupuestos) => {
        this.presupuestos = presupuestos;
        this.isLoadingPresupuestos$.next(false);
      },
      error: (error) => {
        console.error('Error al cargar presupuestos:', error);
        this.isLoadingPresupuestos$.next(false);
      }
    });
  }

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  seleccionarPresupuesto(presupuesto: Presupuesto) {
    this.presupuestoSeleccionado = presupuesto;
    this.presupuestoId$.next(presupuesto.id!);
    this.cerrarModal();
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

    this.isCreatingCdp$.next(true);
    this.cdpService.createCdp(payload).subscribe({
      next: () => {
        // reset form
        this.formNuevoCdp.reset();
        // ocultar fila
        this.showNewRow = false;
        // 🔥 recargar lista (clave)
        this.presupuestoId$.next(id);
        this.isCreatingCdp$.next(false);
      },
      error: (error) => {
        console.error('Error al crear CDP:', error);
        this.isCreatingCdp$.next(false);
      }
    });
  }
}
