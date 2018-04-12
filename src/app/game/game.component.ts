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
  @ViewChild('gridgame')
  private gridGame: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const app = new PIXI.Application({ transparent: true });
    const graphics = new PIXI.Graphics();

    const hex = extendHex({ size: 40 });
    const grid = defineGrid(hex);
    /* 
        document.body.appendChild(app.view); */
    this.renderer.appendChild(this.gridGame, app.view);
    // set a line style of 1px wide and color #999
    graphics.lineStyle(1, 0x999999);

    // render 10,000 hexes
    grid.rectangle({ width: 10, height: 10 }).forEach((hex) => {
      const point = hex.toPoint();
      // add the hex's position to each of its corner points
      const corners = hex.corners().map(corner => corner.add(point));
      // separate the first from the other corners
      const [firstCorner, ...otherCorners] = corners;

      // move the "pen" to the first corner
      graphics.moveTo(firstCorner.x, firstCorner.y);
      // draw lines to the other corners
      otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
      // finish at the first corner
      graphics.lineTo(firstCorner.x, firstCorner.y);

      app.stage.addChild(graphics);
    });








  }
}
