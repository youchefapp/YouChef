import { AuthService, User } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../services/recetas/recetas.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastService } from 'src/app/util/toast.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta: any;
  inFavourites: boolean;

  constructor(private recetasService: RecetasService, public auth: AuthService, 
    private toastService: ToastService, private iab: InAppBrowser) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.receta = this.recetasService.selectedReceta;
    this.checkInFavourites();
  }

  visitAuthor() {
    const browser = this.iab.create(this.receta.url, '_blank', 'location=yes');
    browser.show();
  }

  round(n:number) {
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

  private checkInFavourites() {
    if (this.auth.isAuthenticated()) {
      this.auth.getUser().subscribe((user: User) => {

        let aux = user.favRecipes.filter(r => r.id == this.receta.id);
        this.inFavourites = aux.length != 0 ? true : false;
      });
    }
  }

}
