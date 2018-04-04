import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';


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
    this.authService.authState.subscribe((authState) => {
      console.log(authState);
      if (authState) {
        this.router.navigate(['game']);
      } else {
        console.log('Not connected');
      }

    });
  }
  googleSignIn() {
    this.authService.googleSignIn();
  }
  signOut() {
    this.authService.googleSignOut();
  }

}
