import { AuthService, User } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  user: User;
  imageUrl: string = 'assets/img/profile_bg.jpg';

  constructor(public auth: AuthService, private router: Router) {
  }

  ionViewWillEnter() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    }, err => {
      console.log("Couldn't retrieve user");
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      console.log("Sesión cerrada");
      this.router.navigate(['/tabs/login']);
    });
  }
}
