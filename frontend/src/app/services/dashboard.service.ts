import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DashboardItem {
  id: number;
  descricao: string;
  valor: number;

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) { }


  listarItens(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.apiUrl}/itens`);
  }
}
