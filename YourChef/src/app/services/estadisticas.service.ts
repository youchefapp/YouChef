import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor() { }

  getEstadisticasDieta(user) {
    let estadisticas = { labels: [], data: [] };

    for (var cocina in user.cocinadas) {
      user.cocinadas[cocina].forEach(element => {
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

    if (estadisticas.labels.length == 0) {
      for (var cocina in user.cocinadas) {
        estadisticas.labels.push(cocina);
        estadisticas.data.push(0);
      }
    }

    return estadisticas;
  }

  getEstadisticasValoracion(user) {
    let estadisticas = { labels: [], data: [] };

    for (var cocina in user.cocinadas) {
      estadisticas.labels.push(cocina);
      let mean = 0;

      if (user.cocinadas[cocina].length != 0) {
        user.cocinadas[cocina].forEach(element => {
          mean += this.valorationToNumber(element.valoration);
         });
         mean /= user.cocinadas[cocina].length;
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

  getEstadisticasPais(user) {
    let estadisticas = [];
    estadisticas.push(user.cocinadas.Espanola.length);
    estadisticas.push(user.cocinadas.Griega.length);
    estadisticas.push(user.cocinadas.Italiana.length);
    estadisticas.push(user.cocinadas.Mediterranea.length);
    estadisticas.push(user.cocinadas.Alemana.length);
    estadisticas.push(user.cocinadas.Mexican.length);
    estadisticas.push(user.cocinadas.India.length);
    estadisticas.push(user.cocinadas.Inglesa.length);
    estadisticas.push(user.cocinadas.Asiatica.length);
    estadisticas.push(user.cocinadas.Tailandesa.length);
    estadisticas.push(user.cocinadas.China.length);
    estadisticas.push(user.cocinadas.USA.length);

    return estadisticas;
  }
}
