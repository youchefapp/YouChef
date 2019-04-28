import { ToastService } from 'src/app/util/toast.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	currentRoute: string;

	constructor(private auth: AuthService, private router: Router, public toastService: ToastService) {
		this.currentRoute = btoa(this.router.url);
	}

	ngOnInit() {

	}

	login(form) {
		this.auth.signInWithEmail(form.value).then(
			() => {
				console.log("Sesión iniciada");
				this.toastService.presentToast('Has iniciado sesión correctamente');
				this.router.navigate(['/tabs/perfil']);
			},
			error => {
				console.log(error);
				this.toastService.presentToast('El usuario o la contraseña no son correctas');
			}
		);
	}
}
