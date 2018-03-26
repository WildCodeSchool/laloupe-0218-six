import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent }
]


@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, )
  ],
  providers: [],

})
export class AppModule { }


