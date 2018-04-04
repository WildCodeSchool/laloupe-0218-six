import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(

    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(authState => {
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
  SignOut() {
    this.authService.googleSignOut();
  }

}
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];


@NgModule({
  declarations: [
    HomeComponent,
    AngularFireAuth

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, )
  ],
  providers: [],

})
export class AppModule { }


