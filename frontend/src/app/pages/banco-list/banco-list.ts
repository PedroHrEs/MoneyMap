import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { BancoService, Banco } from '../../services/banco.service';

@Component({
  selector: 'app-banco-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './banco-list.html',
  styleUrls: ['./banco-list.css']
})
export class BancoList {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(BancoService);

  bancos: Banco[] = [];
  loading = false;
  error = '';

  form = this.fb.group({
    razaoSocial: ['', [Validators.required]],
  });

  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true; this.error = '';
    this.api.listar().subscribe({
      next: (data) => { this.bancos = data; this.loading = false; },
      error: (e) => { this.error = 'Falha ao carregar'; this.loading = false; }
    });
  }

  criar() {
    if (this.form.invalid) return;
    this.loading = true; this.error = '';
    this.api.criar(this.form.value).subscribe({
      next: () => { this.form.reset(); this.carregar(); },
      error: () => { this.error = 'Falha ao criar'; this.loading = false; }
    });
  }

  atualizar(id: number, razaoSocial: string) {
    this.loading = true; this.error = '';
    this.api.atualizar(id, { razaoSocial }).subscribe({
      next: () => { this.carregar(); },
      error: () => { this.error = 'Falha ao atualizar'; this.loading = false; }
    });
  }

  remover(id: number) {
    this.loading = true; this.error = '';
    this.api.remover(id).subscribe({
      next: () => { this.carregar(); },
      error: () => { this.error = 'Falha ao excluir'; this.loading = false; }
    });
  }
}
