import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable, startWith, BehaviorSubject, tap, finalize, merge } from 'rxjs';
import { ProgressBarComponent } from '../../../../shared';

@Component({
  selector: 'app-presupuesto-list',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProgressBarComponent],
  templateUrl: './presupuesto-list.html',
  styleUrl: './presupuesto-list.css',
})
export class PresupuestoList implements OnInit {

  presupuestos$!: Observable<Presupuesto[]>;
  presupuestosFiltrados$!: Observable<Presupuesto[]>;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isDeleting$ = new BehaviorSubject<boolean>(false);

  // Observable combinado para la barra de progreso
  isLoadingCombined$ = merge(this.isLoading$, this.isDeleting$);

  formBusqueda!: FormGroup;

  constructor(
    private presupuestoService: PresupuestoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // formulario
    this.formBusqueda = this.fb.group({
      buscar: ['']
    });

    // obtener datos
    this.presupuestos$ = this.presupuestoService.getPresupuestos().pipe(
      tap(() => this.isLoading$.next(true)),
      finalize(() => this.isLoading$.next(false))
    );

    // filtro reactivo (igual que empresas)
    this.presupuestosFiltrados$ = combineLatest([
      this.presupuestos$,
      this.formBusqueda.get('buscar')!.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([presupuestos, texto]) => {

        if (!texto) return presupuestos;

        return presupuestos.filter(p =>
          p.nombre.toLowerCase().includes(texto.toLowerCase()) ||
          p.rubro.toLowerCase().includes(texto.toLowerCase()) ||
          p.sector.toLowerCase().includes(texto.toLowerCase())
        );

      })
    );
  }

  delete(id: number) {
    if (!confirm('¿Eliminar presupuesto?')) return;

    this.isDeleting$.next(true);
    this.presupuestoService.delete(id).subscribe(() => {
      // recargar stream
      this.presupuestos$ = this.presupuestoService.getPresupuestos().pipe(
        tap(() => this.isLoading$.next(true)),
        finalize(() => {
          this.isLoading$.next(false);
          this.isDeleting$.next(false);
        })
      );
    });
  }
}
