import { RecetasService } from '../../providers/recetas/recetas.service';
import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

const LIMIT = 5;

@Component({
  selector: 'app-recetas',
  templateUrl: 'recetas.page.html',
  styleUrls: ['recetas.page.scss']
})
export class RecetasPage {
  recetas: any[];
  private loadedRecetas: number;
  private numRecetas: number;
  private loading: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private recetasService: RecetasService, public loadingController: LoadingController) { 
    this.loadedRecetas = 0;
  }

  ngOnInit(): void {
    this.presentLoading();

    this.recetasService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.recetasService.getNumberOfRecipes().then((data) => {
          this.numRecetas = data.rows.item(0).numRecipes;
          console.log("Total recetas: " + this.numRecetas);
        });

        this.recetasService.getRecipes(LIMIT ,this.loadedRecetas).then(data => {
          this.recetas = data;
          this.loadedRecetas = this.recetas.length;
          this.loading.dismiss();
        });
      }
    })
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.recetasService.getRecipes(LIMIT, this.loadedRecetas).then(data => {
        this.recetas = data;
        this.loadedRecetas += this.recetas.length;
      });

      console.log("loadedRecetas: " + this.loadedRecetas);
      console.log("recetasLenght: " + this.recetas.length);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.loadedRecetas >= this.numRecetas) {
        event.target.disabled = true;
        console.log("Ya no hay más recetas");
      }
    }, 500);
  }

  search(event) {
      this.recetas = [];
      this.loadedRecetas = 0;
      
      this.recetasService.searchRecipe(event.target.value).then((data) => {
        this.recetas = data;
      })    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando recetas...',
      duration: 10000
    });
    await this.loading.present();
  }

}
