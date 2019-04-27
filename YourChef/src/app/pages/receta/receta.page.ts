import { AuthService, User, Cocinadas } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../services/recetas/recetas.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastService } from 'src/app/util/toast.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta: any;
  inFavourites: boolean;
  inCocinadas: boolean;
  cocinadaObj: Cocinadas;
  isAuthenticated: boolean;
  loaded: boolean;

  constructor(private recetasService: RecetasService, public auth: AuthService,
    private toastService: ToastService, private iab: InAppBrowser, public alertController: AlertController) {
    this.loaded = false;
    this.isAuthenticated = false;
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.receta = this.recetasService.selectedReceta;
    console.log(this.receta)
    this.checkInUser();
  }

  visitAuthor() {
    const browser = this.iab.create(this.receta.url, '_blank', 'location=yes');
    browser.show();
  }

  round(n: number) {
    return Math.round(n * 100) / 100;
  }

  addFavourite() {
    this.auth.addFavouriteRecipe(this.receta.id, this.receta.name).then(() => {
      this.toastService.presentToast("¡Receta añadida a favoritos!");
    });
  }

  removeFavourite() {
    this.auth.removeFavouriteRecipe(this.receta.id, this.receta.name).then(() => {
      this.toastService.presentToast("Receta eliminada de favoritos");
    });
  }

  addCocinada(valoration) {
    this.auth.addCocinadaRecipe(this.receta.id, this.receta.cuisine, this.receta.name, valoration, this.receta.tags).then(() => {
      this.toastService.presentToast("¡Receta añadida a tu lista de cocinadas!");
    });
  }

  removeCocinada() {
    this.auth.removeCocinadaRecipe(this.receta.id, this.receta.cuisine, this.receta.name, this.cocinadaObj.valoration, this.cocinadaObj.tags).then(() => {
      this.toastService.presentToast("Receta eliminada de tu lista de cocinadas");
    });
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Valora la receta que has cocinado',
      inputs: [
        {
          name: 'valoration1',
          type: 'radio',
          label: '¡Excelente!',
          value: 'excelente'
        },
        {
          name: 'valoration2',
          type: 'radio',
          label: 'Muy buena',
          value: 'muybuena'
        },
        {
          name: 'valoration3',
          type: 'radio',
          label: 'Buena',
          value: 'buena'
        },
        {
          name: 'valoration4',
          type: 'radio',
          label: 'Regular',
          value: 'regular'
        },
        {
          name: 'valoration5',
          type: 'radio',
          label: 'No me ha gustado',
          value: 'mal'
        }
      ],
      message: "Después de cocinar la receta puedes valorarla para guardarla en tu perfil entre las recetas que has cocinado y poder recomendarte nuevas",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.addCocinada(data);
          }
        }
      ]
    });

    await alert.present();
  }

  private checkInUser() {
    this.auth.isAuthenticated().subscribe((auth) => {
      if (auth) {
        this.isAuthenticated = true;
        this.auth.getUser().subscribe((user: User) => {

          let auxFav = user.favRecipes.filter(r => r.id == this.receta.id);
          this.inFavourites = auxFav.length != 0 ? true : false;

          let auxCoc = user.cocinadas[this.receta.cuisine].filter(r => r.id == this.receta.id);
          this.inCocinadas = auxCoc.length != 0 ? true : false;

          this.cocinadaObj = auxCoc[0];
          this.loaded = true;
        });
      }
      else {
        this.isAuthenticated = false;
        this.loaded = true;
      }
    });
  }

}
