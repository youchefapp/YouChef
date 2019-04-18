import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  email: string;

  constructor(public auth: AuthService, private router: Router) {
    this.email = this.auth.getEmail();
  }

  ionViewWillEnter() {

  }

  logout() {
    this.auth.signOut().then(() => {
      console.log("Sesión cerrada");
      this.router.navigate(['/tabs/login']);
    });
  }
}
