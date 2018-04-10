import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    window.onload = function () {

      const canvas = <HTMLCanvasElement>document.getElementById('mycanvas');

      if (!canvas) {

        alert('Impossible de récupérer le canvas');

        return;

      }


      const context = canvas.getContext('2d');

      if (!context) {

        alert('Impossible de récupérer le context du canvas');

        return;

      }



     // C'est ici que l'on placera tout le code servant à nos dessins.
     // On n'oublie pas de récupérer le canvas et son context.


      context.beginPath();// On démarre un nouveau tracé

      context.moveTo(0, 0);// On se déplace au coin inférieur gauche

      context.lineTo(300, 0);

      context.lineTo(300, 300);

      context.lineTo(0, 300);

      context.stroke();// On trace seulement les lignes.

      context.closePath();

      context.strokeStyle = 'rgba(255, 255, 255)'; // Toutes les prochaines formes 
      /* pleines seront rouges. */

      context.strokeStyle = 'rgba(255, 255, 255)'; // Toutes les prochaines formes "stroke" 
      /* seront bleues et semi-transparentes.  */
    };

  }
}


