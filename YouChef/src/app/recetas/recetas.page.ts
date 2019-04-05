import { RecetasService } from '../../providers/recetas/recetas.service';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: 'recetas.page.html',
  styleUrls: ['recetas.page.scss']
})
export class RecetasPage {
  recetas: any[];
  private loading: HTMLIonLoadingElement;

  constructor(private recetasService: RecetasService, public loadingController: LoadingController) { }

  ngOnInit(): void {
    this.presentLoading();

    this.recetasService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.recetasService.getRecipes().then(data => {
          this.recetas = data;
          this.loading.dismiss();
        });
      }
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
