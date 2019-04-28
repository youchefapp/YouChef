import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {
  isAuthenticated: boolean;

  constructor(private auth: AuthService) { }

  ionViewDidEnter() {
    this.auth.isAuthenticated().subscribe((val) => this.isAuthenticated = val);
  }
}
