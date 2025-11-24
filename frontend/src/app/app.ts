import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  auth = inject(AuthService);
}
