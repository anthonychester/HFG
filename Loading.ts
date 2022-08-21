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
    let backround = new resizeableGraphics(this.app);
    backround.onResize(() => {
      backround.clear();
      backround.beginFill(0x000000);
      backround.x = 0;
      backround.y = 0;
      let xy: xypair = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });

    this.addChild(backround);

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
