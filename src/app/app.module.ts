import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireAuth } from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

import { MatchMakingComponent } from './match-making/match-making.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'matchmaking', component: MatchMakingComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    MatchMakingComponent,
    MatchMakingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
