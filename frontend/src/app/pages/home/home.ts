import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  opcoes = [
    { nome: 'Listar', rota: '/dashboard', icone: '📈' },
    { nome: 'Novo Lançamento', rota: '/cadastro', icone: '✍️' },
    { nome: 'Minha Conta', rota: '/perfil', icone: '👤' },
  ];
}
