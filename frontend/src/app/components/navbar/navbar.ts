import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent implements OnDestroy {
  appName = 'Joinville Inova Conectada';
  isLoggedIn = false;
  hasAvatar = false;
  mobileMenuOpen: boolean = false;
  userInitials = '';
  userName = '';
  logoError = false;

  constructor(private router: Router, private authService: AuthService) {
    this.updateUserState();
  }

  updateUserState() {
    this.isLoggedIn = this.authService.isLoggedIn();
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
      this.userInitials = this.getInitials(user.name);
    } else {
      this.userName = '';
      this.userInitials = '';
    }
  }

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Listener para cliques fora do menu
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.mobileMenuOpen) return;
    
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // Fecha o menu se o clique foi fora do menu e do ícone hamburguer
    if (menu && !menu.contains(target) && hamburger && !hamburger.contains(target)) {
      this.mobileMenuOpen = false;
    }
  }

  // Remove o listener quando o componente é destruído
  ngOnDestroy() {
    // O HostListener é automaticamente removido pelo Angular
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      // Futuramente pode abrir menu de perfil
      // Por enquanto, faz logout
      this.authService.logout();
      this.updateUserState();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Atualiza o estado do usuário ao voltar para a navbar
  ngDoCheck() {
    this.updateUserState();
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.authService.logout();
    this.updateUserState();
    this.router.navigate(['/']);
  }
}