import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  database: SQLiteObject;
  private recetas: any[];
  private _selectedReceta: any;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.recetas = [];
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'recipes.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/recipes.sql')
      .pipe(
        map(res => res.text()))
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  getRecipes() {
    return this.database.executeSql("SELECT * FROM recipe", []).then((data) => {
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let receta = data.rows.item(i);

          receta.steps = JSON.parse(receta.steps);

          let steps = [];
          for (var paso in receta.steps) {
            if (receta.steps.hasOwnProperty(paso)) {
              steps.push(receta.steps[paso]);
            }
          }

          receta.steps = steps;

          this.database.executeSql("SELECT tag FROM tag INNER JOIN recipe_tags ON tag.id = recipe_tags.tags_id WHERE recipe_tags.recipe_id = ?", [receta.id]).then((data) => {
            let tags = [];
            for (let i = 0; i < data.rows.length; i++) {
              tags.push(data.rows.item(i).tag);
            }
            receta.tags = tags;
          });

          this.database.executeSql("SELECT name, weight FROM ingredient INNER JOIN recipe_ingredient ON ingredient.id = recipe_ingredient.ingredient_id WHERE recipe_ingredient.recipe_id = ?", [receta.id]).then((data) => {
            let ingredients = [];
            for (let i = 0; i < data.rows.length; i++) {
              let ingredient:any = {};
              ingredient.name = data.rows.item(i).name;
              ingredient.weight = data.rows.item(i).weight;
              ingredients.push(ingredient);
            }
            receta.ingredients = ingredients;
          });

          this.recetas.push(receta);
        }
        console.log("Number of recipes on database = " + this.recetas.length);
      }

      return this.recetas;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  searchRecipe(name, cocina, dificultad, dieta, alergenos) {
    return this.recetas.filter(receta => {
      return receta.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        && this.filterCocina(receta, cocina)
        && this.filterDificultad(receta, dificultad)
        && this.filterDieta(receta, dieta)
        && this.filterAlergenos(receta, alergenos);
    });
  }

  private filterCocina(receta, cocina): boolean {
    return cocina.length != 0 ? cocina.indexOf(receta.cuisine) > -1 : true;
  }

  private filterDificultad(receta, dificultad): boolean {
    return dificultad.length != 0 ? dificultad.indexOf(receta.difficulty) > -1 : true;
  }

  private filterDieta(receta, dieta): boolean {
    return dieta.length != 0 ? this.containsAllElems(receta.tags, dieta) : true;
  }

  private filterAlergenos(receta, alergenos): boolean {
    return alergenos.length != 0 ? this.containsAllElems(receta.tags, alergenos) : true;
  }

  private containsAllElems(arr, target) {
    return target.every(v => arr.includes(v));
  }

  get selectedReceta() {
    return this._selectedReceta;
  }

  set selectedReceta(receta) {
    this._selectedReceta = receta;
  }

  getNumberOfRecipes() {
    return this.database.executeSql("SELECT COALESCE(MAX(id), 0) AS numRecipes FROM recipe", []);
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
