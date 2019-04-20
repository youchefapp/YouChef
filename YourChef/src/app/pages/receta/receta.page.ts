import { AuthService } from './../../services/auth.service';
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

  constructor(private recetasService: RecetasService, private auth: AuthService, 
    private toastService: ToastService, private iab: InAppBrowser) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.receta = this.recetasService.selectedReceta;
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
    })
  }

}
