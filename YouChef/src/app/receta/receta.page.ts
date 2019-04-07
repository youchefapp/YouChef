import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/providers/recetas/recetas.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta: any;

  constructor(private recetasService: RecetasService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.receta = this.recetasService.selectedReceta;
  }

}
