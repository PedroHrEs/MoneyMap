import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CentroCustoService, CentroCusto } from '../../services/centro-custo.service';

@Component({
  selector: 'app-centro-custo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './centro-custo-list.html',
  styleUrls: ['./centro-custo-list.css']
})
export class CentroCustoList {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(CentroCustoService);

  centroCustos: CentroCusto[] = [];
  loading = false;
  error = '';

  form = this.fb.group({
    descricao: ['', [Validators.required]],   // <-- agora é string (não null)
  });

  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true; this.error = '';
    this.api.listar().subscribe({
      next: (data) => { this.centroCustos = data; this.loading = false; },
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

  atualizar(id: number, descricao: string) {
    this.loading = true; this.error = '';
    this.api.atualizar(id, { descricao }).subscribe({
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
