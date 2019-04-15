import { RecetasService } from '../../providers/recetas/recetas.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import {
  LoadingController,
  IonInfiniteScroll,
  MenuController,
  ToastController
} from '@ionic/angular';

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
  offset: number;
  private numRecetas: number;
  private searchVal: string;
  cocina: string[];
  dificultad: string[];
  dieta: string[];
  alergenos: string[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private recetasService: RecetasService, public loadingController: LoadingController,
    private menu: MenuController, public toastController: ToastController,
    private router: Router) {
    this.offset = 0;
    this.searchVal = "";
    this.cocina = [];
    this.dificultad = [];
    this.dieta = [];
    this.alergenos = [];
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
          this.loadingController.dismiss();
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
    this.searchVal = event.target.value;
    this.filter();
  }

  filter() {
    if (this.isAnyFilterActivated()) {
      this.offset = LIMIT;
      this.filteredRecetas = this.recetasService.searchRecipe(this.searchVal,
        this.cocina,
        this.dificultad,
        this.dieta,
        this.alergenos);
      this.recetas = this.filteredRecetas;

      if (this.recetas.length == 0) this.presentToast("No se ha encontrado ninguna receta");
    }
    else {
      this.recetas = this.allRecetas;
    }
  }

  clearFilters() {
    this.offset = LIMIT;
    this.searchVal = "";
    this.cocina = [];
    this.dificultad = [];
    this.dieta = [];
    this.alergenos = [];

    this.recetas = this.allRecetas;
  }

  private isAnyFilterActivated(): boolean {
    return this.cocina.length != 0
      || this.dificultad.length != 0
      || this.dieta.length != 0
      || this.alergenos.length != 0
      || this.searchVal && this.searchVal.trim() != '' && this.searchVal.length > 4;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas...',
      duration: 10000
    });
    await loading.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu() {
    this.menu.close();
  }

  goToReceta(receta) {
    this.recetasService.selectedReceta = receta;
    this.router.navigate(['/receta/']).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });

  }

}
