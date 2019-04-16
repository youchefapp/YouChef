import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService, Recipe } from 'src/providers/recetas/recetas.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta: Recipe;

  constructor(private activatedRoute: ActivatedRoute, private recetasService: RecetasService, private iab: InAppBrowser) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.recetasService.getRecipe(id).subscribe(recipe => {
        this.receta = recipe;
      });
    }
  }

  visitAuthor() {
    const browser = this.iab.create(this.receta.url, '_blank', 'location=yes');
    browser.show();
  }

  round(n:number) {
    return Math.round(n * 100) / 100;
  }

}
