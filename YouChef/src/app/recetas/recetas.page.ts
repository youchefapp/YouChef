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
  private allRecetas: any[];
  private filteredRecetas: any[];
  private offset: number;
  private numRecetas: number;
  private loading: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private recetasService: RecetasService, public loadingController: LoadingController) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.presentLoading();

    this.recetasService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.recetasService.getNumberOfRecipes().then((data) => {
          this.numRecetas = data.rows.item(0).numRecipes;
          console.log("Total recetas: " + this.numRecetas);
        });

        this.recetasService.getRecipes().then(data => {
          this.allRecetas = data;
          this.recetas = this.allRecetas;
          this.offset += LIMIT;
          this.loading.dismiss();
        });
      }
    })
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.offset += LIMIT;

      console.log("offset: " + this.offset);
      console.log("recetasLenght: " + this.recetas.length);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.offset >= this.numRecetas) {
        event.target.disabled = true;
        console.log("Ya no hay más recetas");
      }
    }, 500);
  }

  search(event) {
    let val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.length > 4) {
      this.offset = LIMIT;
      this.filteredRecetas = this.recetasService.searchRecipe(val);
      this.recetas = this.filteredRecetas;
    }
    else {
      this.recetas = this.allRecetas;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando recetas...',
      duration: 10000
    });
    await this.loading.present();
  }

}
