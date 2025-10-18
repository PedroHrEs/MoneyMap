import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private readonly apiUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Erro na API listarTodos:', err);
        return throwError(() => err);
      })
    );
  }

  salvar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl, lancamento);
  }
}
