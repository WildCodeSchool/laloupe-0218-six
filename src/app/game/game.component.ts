import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { initInput } from './input';
import { paramInt, paramFloat, varying } from './util';
import { qrRange, range, loadFile, loadJSON, loadTexture } from '../../util';
import MapView from '../../MapView';
import { TextureAtlas, isMountain, isWater, TileData } from '../../interfaces';
import { generateRandomMap } from '../../map-generator';
import { TextureLoader, Color } from 'three';
import { MapMeshOptions } from '../../MapMesh';
import DefaultMapViewController from '../../DefaultMapViewController';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit {
  message: string;
  roomId: string;
  opponentId;
  room;
  mapView;
  mapSize = paramInt('size', 20);
  zoom = paramFloat('zoom', 30);

  app;
  constructor(private route: ActivatedRoute, private db: AngularFirestore,
              private authService: AuthService) { }
  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.initView();
  }
  ngOnDestroy() {
    // document.querySelector('#gridGame').removeChild(this.app.view);
  }

  async initView() {
    const mapView = await this.initGrid(this.mapSize, this.zoom);
    initInput(mapView);
  }
  asset(relativePath: string): string {
    return 'assets/' + relativePath;
  }


  async loadTextureAtlas() {
    return loadJSON<TextureAtlas>(this.asset('land-atlas.json'));
  }

  async generateMap(mapSize: number) {

    return generateRandomMap(mapSize, (q, r, height): TileData => {
      const terrain = 'ocean';

      return { q, r, terrain, height: 0, treeIndex: 3, rivers: null, fog: false, clouds: false };
    });
  }

  async initGrid(mapSize: number, initialZoom: number): Promise<MapView> {
    const textureLoader = new TextureLoader();
    const loadTexture = (name: string) => {
      const texture = textureLoader.load(this.asset(name));
      texture.name = name;
      return texture;
    };
    const options: MapMeshOptions = {
      terrainAtlas: null,
      terrainAtlasTexture: loadTexture('terrain.png'),
      hillsNormalTexture: loadTexture('hills-normal.png'),
      coastAtlasTexture: null,
      riverAtlasTexture: loadTexture('river-diffuse.png'),
      undiscoveredTexture: loadTexture('paper.jpg'),
      treeSpritesheet: loadTexture('trees.png'),
      treeSpritesheetSubdivisions: 0,
      transitionTexture: loadTexture('transitions.png'),
      treesPerForest: 0,
      gridWidth: 0.025,
      gridColor: new Color(0x42322b),
      gridOpacity: 0.25,


    };
    const [map, atlas] = await Promise.all([this.generateMap(mapSize), this.loadTextureAtlas()]);

    options.terrainAtlas = atlas;

    this.mapView = new MapView();
    this.mapView.zoom = initialZoom;
    this.mapView.load(map, options);

    const controller = this.mapView.controller as DefaultMapViewController;
    controller.debugOutput = document.getElementById('debug') as HTMLElement;

    this.mapView.onLoaded = () => {
      // uncover tiles around selection
      this.setFogAround(this.mapView.selectedTile.q,
                        this.mapView.selectedTile.r, 20, false, false, false);
    };

    this.mapView.onTileSelected = (tile: TileData) => {
      this.setFogAround(tile.q, tile.r, 0, false, true, true);
    };

    this.db.doc('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        if (this.room.win) {
          if (this.room.win === this.authService.authId) {
            this.message = 'I Win';
          } else {
            this.message = 'I Loose';
          }
          document.getElementById('openModalButton').click();

        }
        if (Object.keys(this.room.players).length > 1) {
          this.opponentId = (Object.keys(this.room.players)[0] === this.authService.authId) ?
            Object.keys(this.room.players)[1] : Object.keys(this.room.players)[0];
        }
        if (this.room.players[this.authService.authId]) {
          const me = this.room.players[this.authService.authId];
          for (let index = 0; index < me.pawns.length; index += 1) {
            const element = me.pawns[index];
            // console.log(element);
            this.setTile(element.q, element.r, 1);
          }
        }
        if (this.room.players[this.opponentId]) {
          const opponent = this.room.players[this.opponentId];
          for (let index = 0; index < opponent.pawns.length; index += 1) {
            const element = opponent.pawns[index];
            // console.log(element);
            this.setTile(element.q, element.r, 2);
          }
        }
      });
    return this.mapView;
  }

  setFogAround(q: number, r: number, range: number,
               fog: boolean, clouds: boolean, isPlayer: boolean) {
    const tiles = this.mapView.getTileGrid().neighbors(q, r, range);
    let updated;
    updated = tiles.map((t) => {
      t.fog = fog;
      t.clouds = clouds;
      return t;
    });
    if (isPlayer) {
      if (this.checkNeighbors(q, r)) {
        this.room.win = this.authService.authId;
      }
      this.room.players[this.authService.authId].pawns.push({ q, r });
      this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
    }
    this.mapView.updateTiles(updated);
  }

  checkNeighbors(q: number, r: number): boolean {
    const neighbors = this.mapView.getTileGrid().neighbors(q, r, 1);
    const isWin = neighbors.reduce((acc, t) => {
      return acc || this.checkNeighbors2(t.q, t.r);
    },                             false);
    console.log('tadaaa', isWin);
    return isWin;
  }

  reducer(acc: boolean, d: TileData): boolean {
    return acc && d.clouds;
  }
  // ￼ Rules !


  checkNeighbors2(q: number, r: number): boolean {
    if (this.mapView.getTile(q, r).fog === false) {
      return false;
    }
    const neighbors = this.mapView.getTileGrid().neighbors(q, r, 1);
    return neighbors.reduce(this.reducer, true);
  }

  setTile(q, r, mode) {
    const clouds = (mode === 1) ? true : false;
    const fog = (mode === 2) ? true : false;
    this.setFogAround(q, r, 0, fog, clouds, false);
  }
}
