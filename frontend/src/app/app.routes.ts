import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { LancamentoList } from './pages/lancamento-list/lancamento-list';
// 💡 Importar o novo componente
import { LancamentoCadastro } from './pages/lancamento-cadastro/lancamento-cadastro';

export const routes: Routes = [

  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'lancamentos', component: LancamentoList },

  // 💡 NOVA ROTA PARA CADASTRO
  { path: 'cadastro-lancamento', component: LancamentoCadastro },

  { path: '**', redirectTo: '' }
];
