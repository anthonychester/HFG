//@ts-ignore Some imports fall to
import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "./app";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { Player } from "./src/scripts/Player";
import { collisionDetector } from "./src/scripts/collisionDetector";
import { animationObject } from "./src/scripts/animationHandler";
import { physicsEngine } from "./src/scripts/physicsEngine";

export class Stage extends Container {
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

    this.physicsEngine = new physicsEngine(this.app);
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
    this.physicsEngine.update(delta);
    this.CD.check();
    this.player1.update(delta);
    this.player2.update(delta);
  }

  setData(data) {
    this.data = data;

    let p1sheet = this.app.loader.resources[
      "./src/players/" + this.data.p1 + "/spritesheet.json"
    ];
    let p2sheet = this.app.loader.resources[
      "./src/players/" + this.data.p2 + "/spritesheet.json"
    ];

    let p1data = this.app.loader.resources[
      "./src/players/" + this.data.p2 + "/data.json"
    ];
    let p2data = this.app.loader.resources[
      "./src/players/" + this.data.p2 + "/data.json"
    ];

    let mapData = this.app.loader.resources[
      "./src/maps/" + this.data.map + "/data.json"
    ];
    let mapImg = this.app.loader.resources[
      "./src/maps/" + this.data.map + "/map.png"
    ];

    this.map = new Sprite(mapImg.texture);

    this.map.width = this.app.view.width;
    this.map.height = this.app.view.height;
    this.addChild(this.map);

    this.BH = new ButtonHandler(this.app);

    let animations1 = p1sheet.spritesheet.animations;
    let animations2 = p2sheet.spritesheet.animations;

    let anis1 = {
      death: animations1["death"],
      hit: animations1["hit"],
      attack2: animations1["attack2"],
      attack1: animations1["attack1"],
      fall: animations1["fall"],
      jump: animations1["jump"],
      run: animations1["run"],
      idle: animations1["idle"]
    };

    let anis2 = {
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
      this,
      "player1",
      anis1["idle"],
      animations1,
      this.CD,
      p1data
    );
    this.player2 = new Player(
      this.app,
      this,
      "player2",
      anis2["idle"],
      animations2,
      this.CD,
      p2data
    );
    //set speed, start play
    this.CD.add("player1", this.player1);
    this.CD.add("player2", this.player2);

    this.physicsEngine.add(this.player1, p1data);
    this.physicsEngine.add(this.player2, p1data);

    this.resize();
    this.loaded = true;
  }
}
