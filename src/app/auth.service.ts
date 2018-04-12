import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {


  public authState = null;



  authId: string;
  name: string;

  constructor(private afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authId = user.uid;
        this.name = user.displayName;
      } else {
        this.authId = null;
        this.name = null;
      }
    });
  }



  googleSignIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  googleSignOut() {
    this.afAuth.auth.signOut();
  }
}
