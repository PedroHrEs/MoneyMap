import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './components/dashboard/dashboard';


export const routes: Routes = [
  { path: '', component: Login },

  { path: 'home', component: Home },

  { path: 'dashboard', component: Dashboard },

  { path: '**', redirectTo: '' }
];
