import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	constructor(private auth: AuthService, private router: Router, public toastController: ToastController) {
	}

	ngOnInit() {

	}

	login(form) {
		this.auth.signInWithEmail(form.value).then(
			() => {
				console.log("Sesión iniciada");
				this.presentToast('Has iniciado sesión correctamente');
				this.router.navigate(['/tabs/perfil']);
			},
			error => {
				console.log(error);
				this.presentToast('El usuario o la contraseña no son correctas');
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
