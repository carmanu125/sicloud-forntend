import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-presupuesto-list',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './presupuesto-list.html',
  styleUrl: './presupuesto-list.css',
})
export class PresupuestoList implements OnInit {

  presupuestos$!: Observable<Presupuesto[]>;
  presupuestosFiltrados$!: Observable<Presupuesto[]>;

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
    this.presupuestos$ = this.presupuestoService.getPresupuestos();

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

    this.presupuestoService.delete(id).subscribe(() => {
      // recargar stream
      this.presupuestos$ = this.presupuestoService.getPresupuestos();
    });
  }
}
