import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-do-usuario',
  templateUrl: './area-do-usuario.html',
  styleUrls: ['./area-do-usuario.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AreaDoUsuario {
  selectedTab: 'perfis' | 'eventos' | 'inscricoes' = 'perfis';

  selectTab(tab: 'perfis' | 'eventos' | 'inscricoes') {
    this.selectedTab = tab;
  }
}