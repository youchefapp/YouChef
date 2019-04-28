import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {
  isAuthenticated: boolean;
  currentRoute: string;

  constructor(private auth: AuthService, private router: Router) { 
    this.currentRoute = btoa(this.router.url);
  }

  ionViewDidEnter() {
    this.auth.isAuthenticated().subscribe((val) => this.isAuthenticated = val);
  }
}
