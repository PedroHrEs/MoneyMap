import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardItem } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  itens: DashboardItem[] = [];
  carregando: boolean = true;
  erro: string | null = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = null;

    this.dashboardService.listarItens().subscribe({
      next: (data) => {
        this.itens = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar itens:', err);
        this.erro = 'Não foi possível carregar os dados. Verifique a conexão com o backend.';
        this.carregando = false;
      }
    });
  }
}
