import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
  <div class="app-container">
    <!-- SIDEBAR -->
    <nav class="sidebar" [class.collapsed]="isCollapsed" *ngIf="auth.isLoggedIn()">
      <div class="sidebar-header">
        <span class="brand">💰 Coinkeeper</span>
        <button class="toggle-btn" (click)="toggleSidebar()">☰</button>
      </div>

      <ul class="nav flex-column mt-3">
        <li class="nav-item">
          <a class="nav-link" routerLink="/home" routerLinkActive="active">🏠 Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/lancamentos" routerLinkActive="active">💰 Lançamentos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/contas" routerLinkActive="active">💳 Contas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/centroCustos" routerLinkActive="active">📊 Centros de Custos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/pessoas" routerLinkActive="active">👥 Pessoas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/usuarios" routerLinkActive="active">🧑‍💼 Usuários</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/extrato" routerLinkActive="active">📈 Extrato</a>
        </li>
      </ul>

      <div class="sidebar-footer mt-auto">
        <button class="btn btn-outline-light btn-sm w-100" (click)="auth.logout()">Sair</button>
      </div>
    </nav>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="main-content" [class.expanded]="isCollapsed">
      <router-outlet></router-outlet>
    </main>
  </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    /* SIDEBAR */
    .sidebar {
      width: 240px;
      background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
      color: white;
      display: flex;
      flex-direction: column;
      padding: 20px 15px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      transition: width 0.3s ease;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .brand {
      white-space: nowrap;
      overflow: hidden;
      transition: opacity 0.3s ease;
    }

    .sidebar.collapsed .brand {
      opacity: 0;
    }

    .toggle-btn {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 1.4rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .toggle-btn:hover {
      transform: scale(1.2);
    }

    .nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 10px 0;
    }

    .nav-link {
      color: #ccc;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      border-radius: 8px;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link.active {
      background: linear-gradient(90deg, #007bff, #00c6ff);
      color: #fff;
    }

    .sidebar-footer {
      margin-top: auto;
      text-align: center;
    }

    /* CONTEÚDO PRINCIPAL */
    .main-content {
      flex: 1;
      margin-left: 240px;
      background: #0a1120;
      color: white;
      padding: 20px;
      overflow-y: auto;
      transition: margin-left 0.3s ease;
    }

    .main-content.expanded {
      margin-left: 70px;
    }

    /* Quando colapsa, esconde textos, mas mantém ícones */
    .sidebar.collapsed .nav-link {
      justify-content: center;
    }

    .sidebar.collapsed .nav-link span {
      display: none;
    }
  `]
})
export class AppComponent {
  auth = inject(AuthService);
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
