import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LancamentoService } from '../../services/lancamento.service';
import { Lancamento } from '../../models/lancamento.model';

@Component({
  selector: 'app-lancamento-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './lancamento-list.html',
  styleUrls: ['./lancamento-list.css']
})
export class LancamentoList implements OnInit {

  lancamentos: Lancamento[] = [];
  carregando: boolean = true;
  erro: string | null = null;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  carregarLancamentos(): void {
    this.carregando = true;
    this.erro = null;

    this.lancamentoService.listarTodos().subscribe({
      next: (data) => {
        this.lancamentos = data;
        this.carregando = false;
        console.log('Lista de Lançamentos Carregada:', data);
      },
      error: (err) => {
        console.error('Erro ao buscar lançamentos:', err);
        this.erro = 'Falha ao carregar os dados. Verifique a API e o console do navegador.';
        this.carregando = false;
      }
    });
  }

  excluirLancamento(id: number): void {
      console.log(`Solicitação de exclusão para ID: ${id}`);
  }
}
