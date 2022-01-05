//@ts-ignore Some imports fall to
import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "./app";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { Player } from "./src/scripts/Player";
import { collisionDetector } from "./src/scripts/collisionDetector";
import { animationObject } from "./src/scripts/animationHandler";

interface data {
  p1: String;
  p2: String;
  map: String;
  mode: String;
}

export class Stage extends Container {
  app: applt;
  player1: Player;
  player2: Player;
  map: Sprite;
  loaded: boolean;
  BH: ButtonHandler;
  CD: collisionDetector;
  data: data;
  constructor(app) {
    super();

    this.app = app;
    this.loaded = false;
    //@ts-ignore
    this.sortableChildren = true;

    this.CD = new collisionDetector(app);

    window.addEventListener("updatesize", () => {
      this.resize();
    });
  }

  onswitchto() {}

  resize() {
    //@ts-ignore
    //app.mapscaley = app.view.height / oldmapy;
    //@ts-ignore
    //app.mapscalex = app.view.width / oldmapx;
    if (this.loaded) {
      this.map.width = this.app.view.width;
      this.map.height = this.app.view.height;

      this.player1.onresize();
      this.player2.onresize();
    }
  }

  update(delta) {
    this.CD.check();
    this.player1.update(delta);
    this.player2.update(delta);
  }

  setData(data) {
    this.data = data;

    let MH1sheet = this.app.loader.resources[
      "./src/players/MH1/spritesheet.json"
    ];
    let MH2sheet = this.app.loader.resources[
      "./src/players/MH2/spritesheet.json"
    ];

    let mapData = this.app.loader.resources["./src/maps/map1/data.json"];
    let mapImg = this.app.loader.resources["./src/maps/map1/map.png"];

    this.map = new Sprite(mapImg.texture);

    this.map.width = this.app.view.width;
    this.map.height = this.app.view.height;
    this.addChild(this.map);

    this.BH = new ButtonHandler(this.app);

    let animations1 = MH1sheet.spritesheet.animations;
    let animations2 = MH2sheet.spritesheet.animations;

    let anis1: animationObject = {
      death: animations1["death"],
      hit: animations1["hit"],
      attack2: animations1["attack2"],
      attack1: animations1["attack1"],
      fall: animations1["fall"],
      jump: animations1["jump"],
      run: animations1["run"],
      idle: animations1["idle"]
    };

    let anis2: animationObject = {
      death: animations2["death"],
      hit: animations2["hit"],
      attack2: animations2["attack2"],
      attack1: animations2["attack1"],
      fall: animations2["fall"],
      jump: animations2["jump"],
      run: animations2["run"],
      idle: animations2["idle"]
    };

    //app.stage.addChild(new Sprite(animations2["idle"][0]));

    this.player1 = new Player(
      this.app,
      "player1",
      anis1["idle"],
      animations1,
      this.CD
    );
    this.player2 = new Player(
      this.app,
      "player2",
      anis2["idle"],
      animations2,
      this.CD
    );
    //set speed, start play
    this.CD.add("player1", this.player1);
    this.CD.add("player2", this.player2);
    this.resize();
    this.loaded = true;
  }
}
