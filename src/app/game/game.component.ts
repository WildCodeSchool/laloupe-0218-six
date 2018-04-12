import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { defineGrid, extendHex } from 'honeycomb-grid-vincent';
import * as PIXI from 'pixi.js';







@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit {
  app;
  constructor() { }

  ngOnInit() {
    this.app = new PIXI.Application({ transparent: true });
    const graphics = new PIXI.Graphics();
    const graphicsBlue = new PIXI.Graphics();
    const hexes = extendHex({ size: 40 });
    const grid = defineGrid(hexes);
    /* 
        document.body.appendChild(app.view); */
    // this.renderer.appendChild(this.gridGame, app.view);
    document.querySelector('#gridGame').appendChild(this.app.view);
    // set a line style of 1px wide and color #999
    graphics.lineStyle(4, 0xFF0000);
    graphicsBlue.lineStyle(4, 0x00FF00);
    // render 10,000 hexes

    grid.rectangle({ width: 10, height: 10 }).forEach((hex) => {
      const point = hex.toPoint();
      console.log(hex);


      // add the hex's position to each of its corner points
      const corners = hex.corners().map(corner => corner.add(point));
      // separate the first from the other corners
      const [firstCorner, ...otherCorners] = corners;

      graphics.lineStyle(4, 0xFFFFFF);

      // move the "pen" to the first corner
      graphics.moveTo(firstCorner.x, firstCorner.y);
      // draw lines to the other corners
      otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
      // finish at the first corner
      graphics.lineTo(firstCorner.x, firstCorner.y);

      this.app.stage.addChild(graphics);



    });
    grid.rectangle({ width: 10, height: 10 }).forEach((hex) => {
      const point = hex.toPoint();
      console.log(hex);


      // add the hex's position to each of its corner points
      const corners = hex.corners().map(corner => corner.add(point));
      // separate the first from the other corners
      const [firstCorner, ...otherCorners] = corners;


      if (hex.x === 1 && hex.y === 1) {

        /*  graphics.lineStyle(4, 0x00FF00); */
        graphics.beginFill(0x00FF00);

        const cornersArray = [];
        corners.forEach(({ x, y }) => cornersArray.push(x, y));
        graphics.drawPolygon(cornersArray);

        this.app.stage.addChild(graphics);

      }

    });
  }
  ngOnDestroy() {
    document.querySelector('#gridGame').removeChild(this.app.view);
  }
}
