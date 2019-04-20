import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';


export interface User {
  name: string;
  email: string;
  favRecipes: any[];
  photoURL?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,
    private imagePicker: ImagePicker, private webview: WebView) {
    afAuth.auth.onAuthStateChanged(user => {
      this.user = user;
    });

    this.userCollection = this.afs.collection('users');
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
          .set({ name: credentials.name, email: credentials.email, favRecipes: [] });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  getUser() {
    return this.userCollection.doc<User>(this.user.uid).valueChanges();
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  addFavouriteRecipe(id, name) {
    return firebase
           .firestore()
           .doc(`/users/${this.user.uid}`)
           .update({ favRecipes: firebase.firestore.FieldValue.arrayUnion({id: id, name: name})});
  }

  removeFavouriteRecipe(id, name) {
    return firebase
           .firestore()
           .doc(`/users/${this.user.uid}`)
           .update({ favRecipes: firebase.firestore.FieldValue.arrayRemove({id: id, name: name})});
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  private uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('profile_img').child(this.user.uid);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.ref.getDownloadURL())
          }, err => {
            reject(err);
          })
      })
    })
  }

  private encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  private uploadImageToFirebase(image) {
    image = this.webview.convertFileSrc(image);
    var aux = this;
    //uploads img to Firebase Storage
    this.uploadImage(image)
      .then(photoURL => {

        // Update user profile (Authentication module)
        aux.user.updateProfile({ photoURL: photoURL }).then(() => console.log("Update profile succesful"));

        // Update user profile (Firebase Database)
        firebase
          .firestore()
          .doc(`/users/${aux.user.uid}`)
          .update({ photoURL: photoURL }).then(() => console.log("Update database succesful"));
      })
  }
}
