import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(message, ok = true, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration: duration,
      position: 'bottom',
      showCloseButton: ok,
      closeButtonText: 'OK'
    });
    
    toast.present();
  }
}
