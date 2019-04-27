import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CocinadasPage } from './cocinadas.page';

import { BackButtonTabsModule } from 'ion-back-button-tabs';

const routes: Routes = [
  {
    path: '',
    component: CocinadasPage
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
  declarations: [CocinadasPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CocinadasPageModule {}
