import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { PessoaService, Pessoa } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoa-list.html',
  styleUrls: ['./pessoa-list.css']

})
export class PessoaList {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(PessoaService);

  Pessoas: Pessoa[] = [];
  loading = false;
  error = '';

  form = this.fb.group({
    razaoSocial: ['', [Validators.required]],   // <-- agora é string (não null)
  });

  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true; this.error = '';
    this.api.listar().subscribe({
      next: (data) => { this.Pessoas = data; this.loading = false; },
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
