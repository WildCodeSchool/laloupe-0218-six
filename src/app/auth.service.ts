import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {


  public authState = null;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.authState = this.afAuth.authState;
  }

  googleSignIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  googleSignOut() {
    this.afAuth.auth.signOut();
  }
}
