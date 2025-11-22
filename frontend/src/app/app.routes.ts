import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login) },

  { path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home').then(m => m.Home) },

  { path: 'lancamento',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/lancamento-list/lancamento-list').then(m => m.LancamentoList) },

  { path: 'conta',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/conta-list/conta-list').then(m => m.ContaList) },

  { path: 'pessoa',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/pessoa-list/pessoa-list').then(m => m.PessoaList) },

  { path: 'usuario',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/usuario-list/usuario-list').then(m => m.UsuarioList) },

  { path: 'centroCusto',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/centro-custo-list/centro-custo-list').then(m => m.CentroCustoList) },

  { path: 'banco',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/banco-list/banco-list').then(m => m.BancoList) },

  { path: 'extrato', loadComponent: () =>
      import('./pages/extrato-lancamento/extrato-lancamento')
        .then(m => m.ExtratoLancamento) },

  { path: '**', redirectTo: 'home' }

];
