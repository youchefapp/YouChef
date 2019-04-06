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

  getRecipes(limit, offset) {
    return this.database.executeSql("SELECT * FROM recipe LIMIT ? OFFSET ?", [limit, offset]).then((data) => {
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let receta = data.rows.item(i);

          this.database.executeSql("SELECT tag FROM tag INNER JOIN recipe_tags ON tag.id = recipe_tags.tags_id WHERE recipe_tags.recipe_id = ?", [receta.id]).then((data) => {
            let tags = [];
            for (let i = 0; i < data.rows.length; i++) {
              tags.push(data.rows.item(i).tag);
            }
            receta.tags = tags;
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

  searchRecipe(name) {

    return this.database.executeSql("SELECT * FROM recipe AS r WHERE r.name LIKE '%" + name + "%'", []).then((data) => {
      let recipes = [];
      for (let i = 0; i < data.rows.length; i++) {
        recipes.push(data.rows.item(i));
      }

      return recipes;
    })
  }

  getNumberOfRecipes() {
    return this.database.executeSql("SELECT COALESCE(MAX(id)+1, 0) AS numRecipes FROM recipe", []);
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
