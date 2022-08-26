import { Container, TextStyle } from "pixi.js";
import { applt, xypair } from "../app";
import { resizeableText } from "../customElements/resizeableText";
import { backroundCreate } from "../customElements/reuseable";

export class Loading extends Container {
  app: applt;
  progress: resizeableText;

  constructor(app) {
    super();
    this.app = app;
    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;

    this.setup();
  }
  setup() {
    const header = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 90
    });

    let backround = backroundCreate(this.app, "0x000000");

    this.addChild(backround);

    let controls = new resizeableText(
      this.app,
      "Loading",
      header,
      195,
      40,
      0.333,
      0.333
    );
    this.addChild(controls);

    this.progress = new resizeableText(
      this.app,
      "0%",
      header,
      230,
      100,
      0.25,
      0.25
    );
    this.addChild(this.progress);
    this.app.resize();
  }

  onUp() {}

  resize() {}

  progess() {
    this.progress.text = Math.round(this.app.loader.progress) + "%";
    //console.log(this.app.loader.progress);
  }

  update(d) {}
  inable() {
    //@ts-ignore
    this.zIndex = 2;
  }
  disable() {
    //@ts-ignore
    this.zIndex = 0;
  }
}
