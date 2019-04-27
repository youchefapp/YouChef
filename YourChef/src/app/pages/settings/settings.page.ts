import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.auth.getUser().subscribe((user: User) => {
      this.user = user;
    }, err => {
      console.log("Couldn't retrieve user");
    });
  }

  edit(event) {
    this.auth.updateSettings(this.user.ajustes)
    .then(() => {
      console.log("Settings updated");
    });
  }

}
