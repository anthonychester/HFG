import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "../app";
import { imageButton } from "../customElements/imageButton";
import { backroundCreate } from "../customElements/reuseable";

export class MainMeue extends Container {
  app: applt;
  previous: any;
  constructor(app) {
    super();
    this.app = app;

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;
    window.addEventListener("loaded", this.loaded.bind(this));
    this.setup();
  }
  setup() {
    let backround = backroundCreate(this.app, "0x69A5FF");

    this.addChild(backround);
  }

  loaded() {
    let info = new imageButton(this.app, {
      con: this,
      x: 25,
      y: 200,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/InfoIcon.png",
      sprit2source: "./src/icons/MainMeue/InfoIcon-Dark.png"
    });
    info.setNextScreen(this.app.secne.Info);
    this.addChild(info);
    let settings = new imageButton(this.app, {
      con: this,
      x: 435,
      y: 200,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/SettingsIcon.png",
      sprit2source: "./src/icons/MainMeue/SettingsIcon-Dark.png"
    });
    settings.setNextScreen(this.app.secne.Settings);
    this.addChild(settings);
    let title = new imageButton(this.app, {
      con: this,
      x: 130,
      y: 25,
      sw: 0.5,
      sh: 0.5,
      sprit1source: "./src/icons/MainMeue/MainTitle.png"
    });
    this.addChild(title);
    this.addChild(settings);
    let log = new imageButton(this.app, {
      con: this,
      x: 400,
      y: 10,
      sw: 0.15,
      sh: 0.15,
      sprit1source: "./src/icons/MainMeue/Version(2).png"
    });
    this.addChild(log);
    let local = new imageButton(this.app, {
      con: this,
      x: 50,
      y: 135,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MainMeue/LocalButton.png",
      sprit2source: "./src/icons/MainMeue/LocalButton-Dark.png"
    });
    //gameData
    local.onClick(() => {
      if (this.app.curent === this) {
        this.app.gameData = {
          mode: 0,
          chars: [],
          map: -1,
          players: this.app.data.rules.numOfPlayer
        };

        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.PlayerSelect;
        this.app.secne.PlayerSelect.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });
    this.addChild(local);
    this.app.resize();
  }

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update(delta) {}
}
