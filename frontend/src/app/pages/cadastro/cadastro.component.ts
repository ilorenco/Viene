import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class Cadastro {
  cadastroForm: FormGroup;
  showPopup: boolean = false;
  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get password() {
    return this.cadastroForm.get('password');
  }

  cadastrarUsuario() {
    if (this.cadastroForm.valid) {
      const { nome, email, password } = this.cadastroForm.value;
      this.authService.register({ name: nome, email, password }).subscribe({
        next: () => {
          this.popupType = 'success';
          this.popupMessage = 'Cadastro realizado com sucesso!';
          this.showPopup = true;
          this.cadastroForm.reset();
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/login']);
          }, 1800);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage = 'Erro ao cadastrar: ' + (err.error?.message || 'Tente novamente.');
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 2500);
        }
      });
    }
  }
}