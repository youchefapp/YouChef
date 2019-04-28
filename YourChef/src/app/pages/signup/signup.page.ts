import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/util/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  previousPage: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, public toastService: ToastService) {
    this.previousPage = this.route.snapshot.paramMap.get('p') ? atob(this.route.snapshot.paramMap.get('p')) : null;
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

  back() { this.router.navigateByUrl(this.previousPage); }

}
