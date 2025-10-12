import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  successMessage = '';
  private redirectDelay = 2000;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {

        this.successMessage = 'Login Bem-Sucedido! Redirecionando...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, this.redirectDelay);
      },
      error: () => {
        this.errorMessage = 'Usuário ou senha incorretos';
      }
    });
  }
}
