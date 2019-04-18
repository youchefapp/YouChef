import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private auth: AuthService, private router: Router, public toastController: ToastController) {
  }

  ngOnInit() {
  }

  register(form) {
    this.auth.signUp(form.value).then(
      () => {
        console.log("Usuario creado");
        this.presentToast('Te has registrado correctamente');
        this.router.navigate(['/tabs/perfil']);
      },
      error => {
				console.log(error);
				this.presentToast(error.message);
			}
    );
  }

  async presentToast(message) {
		const toast = await this.toastController.create({
		  message: message,
		  duration: 3000
		});
		toast.present();
	  }

}
