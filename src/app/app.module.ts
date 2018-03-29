import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
