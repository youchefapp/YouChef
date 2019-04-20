import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/util/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private auth: AuthService, private router: Router, public toastService: ToastService) {
  }

  ngOnInit() {
  }

  register(form) {
    if (form.value.password != form.value.confirm) {
      this.toastService.presentToast('Las contraseñas no coinciden');
      return false;
    }

    this.auth.signUp(form.value).then(
      () => {
        console.log("Usuario creado");
        this.toastService.presentToast('Te has registrado correctamente');
        this.router.navigate(['/tabs/perfil']);
      },
      error => {
				console.log(error);
				this.toastService.presentToast(error.message);
			}
    );
  }

}
