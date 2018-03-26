import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
