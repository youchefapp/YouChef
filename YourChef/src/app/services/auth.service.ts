import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
 * En caso de que se prefiere usar AngularFire

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    // Persistencia local para que la sesión permanezca iniciada mientras que no se cierre sesión
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
        credentials.password);
    });
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        /* FireAuth está desacoplado de Cloud Firestore, almacenamos en la base de datos
          la información del usuario para posteriormente ir guardando toda la información
          que genere en la aplicación */
        firebase
          .firestore()
          .doc(`/users/${newUserCredential.user.uid}`)
          .set({ name: credentials.name, email: credentials.email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  getEmail() {
    return this.user && this.user.email;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
