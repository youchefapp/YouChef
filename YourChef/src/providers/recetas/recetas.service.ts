import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Http, ResponseContentType } from '@angular/http';
import { map, filter, take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

export interface Nutrient {
  name: string;
  cuantity: number;
  daily_percentage: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  weight: number;
}

export interface Recipe {
  id?: string;
  name: string;
  img: string;
  url: string;
  attribution: string;
  duration: string;
  calories: number;
  weight: number;
  difficulty: string;
  rations: number;
  cuisine: string;
  steps: string[];
  ingredients: Ingredient[];
  nutrients: Nutrient[];
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private recipes: Observable<Recipe[]>;
  private _selectedReceta: Observable<Recipe>;

  private recipeCollection: AngularFirestoreCollection<Recipe>;

  constructor(private afs: AngularFirestore) {
    this.recipeCollection = this.afs.collection<Recipe>('recipes', ref => ref.limit(10));
    this.recipes = this.recipeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes;
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.recipeCollection.doc<Recipe>(id).valueChanges().pipe(
      take(1),
      map(recipe => {
        recipe.id = id;
        return recipe
      })
    );
  }

  searchRecipe(name, cocina, dificultad, dieta, alergenos) {
    return this.recipes.pipe(
      map(recipes => recipes.filter(receta => {
        return receta.name.toLowerCase().indexOf(name.toLowerCase()) > -1
          && this.filterCocina(receta, cocina)
          && this.filterDificultad(receta, dificultad)
          && this.filterDieta(receta, dieta)
          && this.filterAlergenos(receta, alergenos);
      }))
    );
  }

  private filterCocina(receta: Recipe, cocina): boolean {
    return cocina.length != 0 ? cocina.indexOf(receta.cuisine) > -1 : true;
  }

  private filterDificultad(receta: Recipe, dificultad): boolean {
    return dificultad.length != 0 ? dificultad.indexOf(receta.difficulty) > -1 : true;
  }

  private filterDieta(receta: Recipe, dieta): boolean {
    return dieta.length != 0 ? this.containsAllElems(receta.tags, dieta) : true;
  }

  private filterAlergenos(receta: Recipe, alergenos): boolean {
    return alergenos.length != 0 ? this.containsAllElems(receta.tags, alergenos) : true;
  }

  private containsAllElems(arr, target) {
    return target.every(v => arr.includes(v));
  }

}

