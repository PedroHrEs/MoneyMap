import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UsuarioDTO {
  idUsuario: number;
  nomeUsuario: string;
  emailUsuario: string;
  senhaUsuario: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private base = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  list(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.base);
  }

  get(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.base}/${id}`);
  }

  create(dto: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.base, dto);
  }

  update(id: number, dto: UsuarioDTO): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
