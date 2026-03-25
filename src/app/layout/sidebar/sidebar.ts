import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  activeMenu: string | null = null;
  activeSubMenu: string | null = null;

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
    this.activeSubMenu = null;
  }

  toggleSubMenu(sub: string) {
    this.activeSubMenu = this.activeSubMenu === sub ? null : sub;
  }
}
