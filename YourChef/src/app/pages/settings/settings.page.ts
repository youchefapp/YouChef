import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/util/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User;
  previousPage: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, public toastService: ToastService) {
    this.previousPage = this.route.snapshot.paramMap.get('p') ? atob(this.route.snapshot.paramMap.get('p')) : null;
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.auth.getUser().subscribe((user: User) => {
      this.user = user;
    }, err => {
      console.log("Couldn't retrieve user");
    });

    // Información de ayuda que solo se muestra la primera vez que se accede a los ajustes
    this.auth.showSettingsHelp().then((val) => {
      if (!val) {
        this.toastService.presentToast("Marca las opciones y se guardarán automáticamente");
        this.auth.showedSettingsHelp().then((val) => console.log("Showed settings help " + val));
      }
    });
  }

  edit(event) {
    this.auth.updateSettings(this.user.ajustes)
    .then(() => {
      console.log("Settings updated");
    });
  }

  back() { this.router.navigateByUrl(this.previousPage); }

}
