import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(

    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.authService.authState.subscribe((authState) => {
    //   console.log(authState);
    //   if (authState) {
    //     this.router.navigate(['matchmaking']);
    //   } else {
    //     console.log('Not connected');
    //   }

    // });
  }
  googleSignIn() {
    
    this.authService.authState.subscribe((authState) => {
      console.log(authState);
      if (authState) {
        this.router.navigate(['matchmaking']);
      } else {
        this.authService.googleSignIn();
        console.log('Not connected');
      }

    });
  }
  signOut() {
    this.authService.googleSignOut();
  }

}
