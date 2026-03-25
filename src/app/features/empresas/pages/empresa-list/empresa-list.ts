import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith, tap, finalize } from 'rxjs/operators';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../../../shared';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProgressBarComponent],
  templateUrl: './empresa-list.html',
  styleUrl: './empresa-list.css',
})
export class EmpresaList implements OnInit {

  empresas$!: Observable<Empresa[]>;
  empresasFiltradas$!: Observable<Empresa[]>;
  isLoading$ = new BehaviorSubject<boolean>(false);

  formBusqueda!: FormGroup;

  constructor(
    private empresaService: EmpresaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // formulario reactivo
    this.formBusqueda = this.fb.group({
      buscar: ['']
    });

    // obtener empresas
    this.empresas$ = this.empresaService.getEmpresas().pipe(
      tap(() => this.isLoading$.next(true)),
      finalize(() => this.isLoading$.next(false))
    );

    // filtro reactivo
    this.empresasFiltradas$ = combineLatest([
      this.empresas$,
      this.formBusqueda.get('buscar')!.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([empresas, texto]) => {

        if (!texto) return empresas;

        return empresas.filter(e =>
          e.nombre.toLowerCase().includes(texto.toLowerCase())
        );

      })
    );

  }

}
