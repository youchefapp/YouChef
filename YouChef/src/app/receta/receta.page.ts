import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/providers/recetas/recetas.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta: any;

  constructor(private recetasService: RecetasService, private iab: InAppBrowser) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.receta = this.recetasService.selectedReceta;
  }

  visitAuthor() {
    const browser = this.iab.create(this.receta.url, '_blank', 'location=yes');
    browser.show();
  }

}
