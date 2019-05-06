import { RecetasService } from '../../services/recetas/recetas.service';
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  LoadingController,
  IonInfiniteScroll,
  MenuController,
} from '@ionic/angular';

import { ToastService } from 'src/app/util/toast.service';
import { AuthService, User } from 'src/app/services/auth.service';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

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
  isAuthenticated: boolean;

  currentRoute: string;

  filterBySettings: boolean;
  filterRecommendations: boolean;
  user: User;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private recetasService: RecetasService, public loadingController: LoadingController,
    private menu: MenuController, public toastService: ToastService, private estadisticas: EstadisticasService,
    private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.offset = 0;
    this.searchVal = "";
    this.cocina = [];
    this.dificultad = [];
    this.dieta = [];
    this.alergenos = [];

    this.filterBySettings = false;
    this.filterRecommendations = false;
    this.isAuthenticated = false;

    this.currentRoute = btoa(this.router.url);
  }

  ngOnInit(): void {
    this.presentLoading();
    this.getCocinaParam();

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
          this.filter();
        });
      }
    })
  }

  ionViewDidEnter() {
    this.auth.isAuthenticated().subscribe((auth) => {
      if (auth) {
        this.isAuthenticated = true;
        this.auth.getUser().subscribe((user: User) => {
          this.user = user;         
        });
      }
      else {
        this.isAuthenticated = false;
      }
    });

    this.getCocinaParam();
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

      if (this.recetas.length == 0) this.toastService.presentToast("No se ha encontrado ninguna receta");
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
    this.filterBySettings = false;
    this.filterRecommendations = false;

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
    this.router.navigate(['/receta/', {p: this.currentRoute}]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });

  }

  round(n: number) {
    return Math.round(n * 100) / 100;
  }

  filterByUserSettings() {
    if (this.filterBySettings) {
      if (this.user.ajustes.azucar) this.alergenos.push("Sin azúcar");
      if (this.user.ajustes.carbohidratos) this.dieta.push("Bajo en carbohidratos");
      if (this.user.ajustes.equilibrada) this.dieta.push("Equilibrada");
      if (this.user.ajustes.fibra) this.dieta.push("Mucha fibra");
      if (this.user.ajustes.frutosSecos) this.alergenos.push("Sin frutos secos");
      if (this.user.ajustes.gluten) this.alergenos.push("Sin gluten");
      if (this.user.ajustes.grasas) this.dieta.push("Bajo en grasas");
      if (this.user.ajustes.huevo) this.alergenos.push("Sin huevo");
      if (this.user.ajustes.lacteos) this.alergenos.push("Sin lácteos");
      if (this.user.ajustes.mariscos) this.alergenos.push("Sin mariscos");
      if (this.user.ajustes.nueces) this.alergenos.push("Libre de nueces y de cacahuetes");
      if (this.user.ajustes.paleo) this.dieta.push("Paleo");
      if (this.user.ajustes.pescado) this.alergenos.push("Sin pescado");
      if (this.user.ajustes.pocaGrasa) this.dieta.push("Poca grasa");
      if (this.user.ajustes.proteico) this.dieta.push("Alto valor protéico");
      if (this.user.ajustes.sodio) this.dieta.push("Bajo en sodio");
      if (this.user.ajustes.soja) this.alergenos.push("Sin soja");
      if (this.user.ajustes.vegetariano) this.dieta.push("Vegetariano");
  
      this.filter();
    }
    else {
      this.clearFilters();
    }    
  }

  filterByRecommendations() {
    if (this.filterRecommendations) {
      let stats = this.estadisticas.getEstadisticasValoracion(this.user);

      for (let i = 0; i < stats.labels.length; i++) {
        // Recomedamos recetas que tengan una valoración media > 3
        if (stats.data[i] > 3 ) this.cocina.push(stats.labels[i]);
      }

      this.filter();
    }
    else {
      this.clearFilters();
    }    
  }

  private getCocinaParam() {
    let cocinaParam = this.route.snapshot.paramMap.get('categoria');
    if (cocinaParam) {
      this.cocina = [];
      this.cocina.push(cocinaParam);
    }
  }

}