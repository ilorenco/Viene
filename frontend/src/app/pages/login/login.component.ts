import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  loginForm: FormGroup;
  showPopup: boolean = false;
  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  entrar() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.popupType = 'success';
          this.popupMessage = 'Login realizado com sucesso!';
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/mapa']);
          }, 1500);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage = 'Erro ao fazer login: ' + (err.error?.message || 'Tente novamente.');
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500);
        }
      });
    }
  }
}