import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "../app";
import { imageButton } from "../customElements/imageButton";
import { backroundCreate } from "../customElements/reuseable";
import * as PIXI from "pixi.js";

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
    let info = new imageButton(
      this,
      10,
      10,
      0.25,
      0.25,
      "./src/icons/MainMeue/InfoIcon.png",
      "./src/icons/MainMeue/InfoIcon-Dark.png"
    );
    info.onClick(() => {
      if (this.app.curent === this) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.Info;
        this.app.secne.Info.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });
    this.addChild(info);
    /*two.sprite = Sprite.from(
      this.app.loader.resources["./src/icons/MainMeue/InfoIcon.png"].texture
    );*/
    this.app.resize();
  }

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update(delta) {}
}
