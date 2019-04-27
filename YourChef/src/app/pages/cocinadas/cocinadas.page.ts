import { Component, OnInit } from '@angular/core';
import { User, AuthService, Cocinadas } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas/recetas.service';
import { ToastService } from 'src/app/util/toast.service';

@Component({
  selector: 'app-cocinadas',
  templateUrl: './cocinadas.page.html',
  styleUrls: ['./cocinadas.page.scss'],
})
export class CocinadasPage implements OnInit {
  user: User;
  categoria: string;
  cocinadas: Cocinadas[];

  constructor(public auth: AuthService, private recetasService: RecetasService,
    private toastService: ToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.categoria = this.route.snapshot.paramMap.get('categoria');
  }

  ionViewDidEnter() {
    this.auth.getUser().subscribe((user: User) => {
      this.user = user;
      this.cocinadas = this.user.cocinadas[this.categoria];
    }, err => {
      console.log("Couldn't retrieve user");
    });
  }

  removeCocinada(id, name, valoration, tags) {
    this.auth.removeCocinadaRecipe(id, this.categoria, name, valoration, tags).then(() => {
      this.toastService.presentToast("Receta eliminada de tu lista de cocinadas");
    });
  }

  goToReceta(id) {
    this.recetasService.getRecipe(id).then((receta) => {
      this.recetasService.selectedReceta = receta;

      this.router.navigate(['/receta/']).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    });
  }

}
