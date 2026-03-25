import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/presupuesto.model';
import { environment } from '../../../../environments/environment';
import { CdpListItem } from '../../cdp/models/cdp-list.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private apiUrl = `${environment.apiUrl}/presupuesto`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los presupuestos
   * GET /api/presupuesto
   */
  getPresupuestos(): Observable<Presupuesto[]> {
    return this.http.get<Presupuesto[]>(this.apiUrl);
  }

  /**
   * Crear presupuesto
   * POST /api/presupuesto
   */
  createPresupuesto(presupuesto: Presupuesto): Observable<Presupuesto> {
    return this.http.post<Presupuesto>(this.apiUrl, presupuesto);
  }

  /**
   * Obtener por id
   */
  getById(id: number): Observable<Presupuesto> {
    return this.http.get<Presupuesto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Eliminar
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCdpsByPresupuestoId(id: number): Observable<CdpListItem[]> {
  return this.http.get<CdpListItem[]>(
    `${environment.apiUrl}/Presupuesto/${id}/cdps`
  );
}
}