import { AuthService, User } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas/recetas.service';

const DEFAULT_AVATAR = 'assets/img/avatar.png';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  user: User;
  profileImg: string = DEFAULT_AVATAR;
  sections: string = "favoritas";

  constructor(public auth: AuthService, private recetasService: RecetasService, private router: Router) {
  }

  ionViewWillEnter() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      if (this.user.photoURL) this.profileImg = this.user.photoURL;
      else this.profileImg = DEFAULT_AVATAR;
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

  changeImgProfile() {
    this.auth.openImagePicker();
  }

  goToReceta(id) {
    this.recetasService.getRecipe(id).then((receta) => {
      this.recetasService.selectedReceta = receta;

      this.router.navigate(['/receta/']).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    });
  }
}
