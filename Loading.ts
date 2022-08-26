import { Container, TextStyle } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { resizeableText } from "./customElements/resizeableText";
import { windowFrame } from "./Standard";

export class Loading extends Container {
  app: applt;

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
      fontSize: 30
    });

    let Controls = new resizeableText(this.app, "Loading", header, 195, 40);
    this.addChild(Controls);
  }

  onUp() {}

  resize() {}

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
