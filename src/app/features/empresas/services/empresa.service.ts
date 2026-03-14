import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'https://localhost:7032/api/empresa';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las empresas
   * GET /api/empresa
   */
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  /**
   * Obtener empresa por id
   * GET /api/empresa/{id}
   */
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear empresa
   * POST /api/empresa
   */
  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }

  /**
   * Eliminar empresa
   * DELETE /api/empresa/{id}
   */
  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

}