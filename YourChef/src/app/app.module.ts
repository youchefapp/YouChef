import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RecetasService } from './services/recetas/recetas.service';
import { EstadisticasService } from './services/estadisticas.service';
import { ToastService } from './util/toast.service';

import { AuthService } from './services/auth.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    RecetasService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /* Because of a recent update to the Firebase SDK we can also add the provide block at the end to prevent an error message in our log. */
    { provide: FirestoreSettingsToken, useValue: {} },
    SQLitePorter,
    SQLite,
    InAppBrowser,
    AuthService,
    EstadisticasService,
    WebView,
    ImagePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
