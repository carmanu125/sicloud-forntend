import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-list.html',
  styleUrl: './empresa-list.css',
})
export class EmpresaList implements OnInit {

  empresas$!: Observable<Empresa[]>;
  empresasFiltradas$!: Observable<Empresa[]>;

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
    this.empresas$ = this.empresaService.getEmpresas();

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
