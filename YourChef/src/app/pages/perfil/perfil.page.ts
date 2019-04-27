import { AuthService, User } from './../../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas/recetas.service';
import { ToastService } from 'src/app/util/toast.service';

import chartJs from 'chart.js';

const DEFAULT_AVATAR = 'assets/img/avatar.png';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('halfDoughnutCanvas') halfDoughnutCanvas;
  @ViewChild('barCanvasValoracion') barCanvasValoracion;
  barChart: any;
  halfDoughnutChart: any;
  barChartValoracion: any;

  user: User;
  profileImg: string = DEFAULT_AVATAR;
  sections: string = "favoritas";

  // Indica si hay estadísticas de dietas disponibles. El gráfico se construye si solo hay recetas
  showDietaEstadisticas: boolean;

  constructor(public auth: AuthService, private recetasService: RecetasService,
    private toastService: ToastService, private router: Router) {
      this.showDietaEstadisticas = false;
  }

  ionViewDidEnter() {
    this.auth.getUser().subscribe((user: User) => {
      this.user = user;
      if (this.user.photoURL) this.profileImg = this.user.photoURL;
      else this.profileImg = DEFAULT_AVATAR;
    }, err => {
      console.log("Couldn't retrieve user");
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      console.log("Sesión cerrada");
      this.router.navigate(['/tabs/login']);
    });
  }

  changeImgProfile() {
    this.auth.openImagePicker();
  }

  removeFavourite(id, name) {
    this.auth.removeFavouriteRecipe(id, name).then(() => {
      this.user.favRecipes = this.user.favRecipes.filter(receta => receta.id != id);

      this.toastService.presentToast("Receta eliminada de favoritos");
    })
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

  selectedTabChanged(event) {
    if (event.detail.value == "estadisticas") {
      setTimeout(() => {
        this.barChart = this.getBarChart();
        if (this.showDietaEstadisticas) this.halfDoughnutChart = this.getHalfDoughnutChart();
        this.barChartValoracion = this.getBarChartValoracion();
      }, 150);
    }
  }

  hasAnyRecipeCocinada() {
    return this.user.cocinadas.Espanola.length != 0
    || this.user.cocinadas.Griega.length != 0
    || this.user.cocinadas.Italiana.length != 0
    || this.user.cocinadas.Mediterranea.length != 0
    || this.user.cocinadas.Alemana.length != 0
    || this.user.cocinadas.Mexican.length != 0
    || this.user.cocinadas.India.length != 0
    || this.user.cocinadas.Inglesa.length != 0
    || this.user.cocinadas.Asiatica.length != 0
    || this.user.cocinadas.Tailandesa.length != 0
    || this.user.cocinadas.China.length != 0
    || this.user.cocinadas.USA.length != 0;
  }

  private getBarChart() {
    const data = {
      labels: ['Española', 'Griega', 'Italiana', 'Mediterránea', 'Alemana', 'Mexicana', 'India', 'Inglesa', 'Asiática', 'Tailandesa', 'China', 'USA'],
      datasets: [{
        label: '# de recetas',
        data: this.getEstadisticasPais(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }

            }
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  private getBarChartValoracion() {
    let estadisticas = this.getEstadisticasValoracion();

    const data = {
      labels: estadisticas.labels,
      datasets: [{
        label: 'Valoración media',
        data: estadisticas.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      aspectRatio: 1
    };

    return this.getChart(this.barCanvasValoracion.nativeElement, 'horizontalBar', data, options);
  }

  getHalfDoughnutChart() {
    let estadisticas = this.getEstadisticasDieta();

    const data = {
      labels: estadisticas.labels,
      datasets: [{
        label: '# of Votes',
        data: estadisticas.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56',
          '#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56',
          '#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    const options = {
      circumference: Math.PI,
      rotation: 1.0 * Math.PI,
      aspectRatio: 1
    };

    return this.getChart(this.halfDoughnutCanvas.nativeElement, 'doughnut', data, options);
  }

  private getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  private getEstadisticasDieta() {
    let estadisticas = { labels: [], data: [] };

    for (var cocina in this.user.cocinadas) {
      this.user.cocinadas[cocina].forEach(element => {
        element.tags.forEach(tag => {
          let index = estadisticas.labels.indexOf(tag);
          if (index == -1) {
            let i = estadisticas.labels.push(tag);
            estadisticas.data[i - 1] = 1;
          }
          else {
            estadisticas.data[index]++;
          }
        });
      });
    }

    if (estadisticas.labels.length != 0) {
      this.showDietaEstadisticas = true;
    }

    return estadisticas;
  }

  private getEstadisticasValoracion() {
    let estadisticas = { labels: [], data: [] };

    for (var cocina in this.user.cocinadas) {
      estadisticas.labels.push(cocina);
      let mean = 0;

      if (this.user.cocinadas[cocina].length != 0) {
        this.user.cocinadas[cocina].forEach(element => {
          mean += this.valorationToNumber(element.valoration);
         });
         mean /= this.user.cocinadas[cocina].length;
      }

      estadisticas.data.push(mean);
    };

    return estadisticas;
  }

  private valorationToNumber(valoration) {
    let val;

    switch (valoration) {
      case 'excelente': val = 5; break;
      case 'muybuena': val = 4; break;
      case 'buena': val = 3; break;
      case 'regular': val = 2; break;
      case 'mal': val = 1; break;
    }

    return val;
  }

  private getEstadisticasPais() {
    let estadisticas = [];
    estadisticas.push(this.user.cocinadas.Espanola.length);
    estadisticas.push(this.user.cocinadas.Griega.length);
    estadisticas.push(this.user.cocinadas.Italiana.length);
    estadisticas.push(this.user.cocinadas.Mediterranea.length);
    estadisticas.push(this.user.cocinadas.Alemana.length);
    estadisticas.push(this.user.cocinadas.Mexican.length);
    estadisticas.push(this.user.cocinadas.India.length);
    estadisticas.push(this.user.cocinadas.Inglesa.length);
    estadisticas.push(this.user.cocinadas.Asiatica.length);
    estadisticas.push(this.user.cocinadas.Tailandesa.length);
    estadisticas.push(this.user.cocinadas.China.length);
    estadisticas.push(this.user.cocinadas.USA.length);

    return estadisticas;
  }
}
