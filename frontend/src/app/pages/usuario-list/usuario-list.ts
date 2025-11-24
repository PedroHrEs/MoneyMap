import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UsuarioService, UsuarioDTO } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-list.html',
  styleUrls: ['./usuario-list.css']
})
export class UsuarioList {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(UsuarioService);

  usuarios: UsuarioDTO[] = [];
  loading = false;
  error = '';

  form = this.fb.group({
    nomeUsuario: ['', [Validators.required]],
    emailUsuario: ['', [Validators.required, Validators.email]],
    senhaUsuario: ['']
  });

  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true; this.error = '';
    this.api.list().subscribe({
      next: (data) => { this.usuarios = data; this.loading = false; },
      error: () => { this.error = 'Falha ao carregar'; this.loading = false; }
    });
  }

  criar() {
    if (this.form.invalid) return;
    this.loading = true; this.error = '';
    this.api.create(this.form.value as UsuarioDTO).subscribe({
      next: () => { this.form.reset(); this.carregar(); },
      error: () => { this.error = 'Falha ao criar'; this.loading = false; }
    });
  }

  atualizar(id: number, dto: UsuarioDTO) {
    this.loading = true; this.error = '';
    this.api.update(id, dto).subscribe({
      next: () => this.carregar(),
      error: () => { this.error = 'Falha ao atualizar'; this.loading = false; }
    });
  }

  remover(id: number) {
    this.loading = true; this.error = '';
    this.api.remove(id).subscribe({
      next: () => this.carregar(),
      error: () => { this.error = 'Falha ao excluir'; this.loading = false; }
    });
  }
}
