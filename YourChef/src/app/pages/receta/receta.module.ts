import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { BackButtonTabsModule } from 'ion-back-button-tabs';

import { IonicModule } from '@ionic/angular';

import { RecetaPage } from './receta.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BackButtonTabsModule
  ],
  declarations: [RecetaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecetaPageModule {}
