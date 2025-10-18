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

    { nome: 'Ver Lançamentos', rota: '/lancamentos', icone: '💸' },
    { nome: 'Cadastrar Novo Lançamento', rota: '/cadastro-lancamento', icone: '✍️' },
    { nome: 'Minha Conta', rota: '/perfil', icone: '👤' },
  ];
}
