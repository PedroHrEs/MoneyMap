import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IdNome { id: number; nome?: string; razaoSocial?: string; descricaoMeta?: string; }

export interface Conta {
  id: number;
  descricao: string;
  saldo: number;   // BigDecimal no back, number no front
  limite: number;  // BigDecimal no back, number no front
  tipoConta: string; // deve casar com o Enum do back (ex.: 'CORRENTE')
  agencia: string;
  numero: number;
  usuario: { idUsuario: number; nomeUsuario: string };
  banco: { id: number; razaoSocial: string };
}

export interface ContaPayload {
  descricao?: string;
  saldo?: number;
  limite?: number;
  tipoConta?: string;
  agencia?: string;
  numero?: number;
  usuarioId?: number | null;
  bancoId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ContaService {
  private readonly API = 'http://localhost:8080/conta';

  // endpoints para os combos
  private readonly API_BANCOS = 'http://localhost:8080/banco';
  private readonly API_USUARIOS = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  // ----------------- CRUD Contas -----------------
  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.API);
  }

  buscar(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}/${id}`);
  }

criar(payload: ContaPayload) {
  const body = this.toBackendBody(payload);
  console.log('POST body =>', body);   // <== veja se bate com o do Postman
  return this.http.post<Conta>(this.API, body);
}

  atualizar(id: number, payload: ContaPayload): Observable<Conta> {
    const body = this.toBackendBody(payload);
    return this.http.put<Conta>(`${this.API}/${id}`, body);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // ----------------- Combos -----------------
  listarBancos(): Observable<IdNome[]> {
    return this.http.get<IdNome[]>(this.API_BANCOS);
  }

  listarUsuarios(): Observable<IdNome[]> {
    return this.http.get<IdNome[]>(this.API_USUARIOS);
  }


  private normalizeTipoConta = (v?: string|null) => {
  const t = (v ?? '').toString().trim().toUpperCase();
  return t;
};

private toBackendBody(p: Partial<ContaPayload>): any {
  const body: any = {};
  if (p.descricao !== undefined) body.descricao = p.descricao;
  if (p.saldo !== undefined) body.saldo = Number(p.saldo ?? 0);
  if (p.limite !== undefined) body.limite = Number(p.limite ?? 0);
  if (p.tipoConta !== undefined) body.tipoConta = this.normalizeTipoConta(p.tipoConta);

  if (p.usuarioId !== undefined) {
    body.usuario = p.usuarioId ? { id: p.usuarioId } : null;
  }
  if (p.bancoId !== undefined) {
    body.banco = p.bancoId ? { id: p.bancoId } : null;
  }

  return body;
}
}
