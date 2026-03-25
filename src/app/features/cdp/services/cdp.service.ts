import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateCdp } from '../models/cdp-create.model';
import { CdpListItem } from '../models/cdp-list.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdpService {

  private apiUrl = `${environment.apiUrl}/cdp`;

  constructor(private http: HttpClient) {}

  createCdp(data: CreateCdp): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getCdpList(): Observable<CdpListItem[]> {
    return this.http.get<CdpListItem[]>(this.apiUrl);
  }

  
}