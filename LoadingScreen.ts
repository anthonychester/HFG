import { Container, TextStyle } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { resizeableText } from "./customElements/resizeableText";

interface data {
  p1: String;
  p2: String;
  map: String;
  mode: String;
}

export class LoadingScreen extends Container {
  app: applt;
  data: data | any;
  dot1: resizeableGraphics;
  dot2: resizeableGraphics;
  dot3: resizeableGraphics;
  time: number;
  text: resizeableText;

  constructor(app) {
    super();
    this.app = app;

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;

    this.time = 0;

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

    const soloStyle = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 50
    });

    this.text = new resizeableText(this.app, "Loading", soloStyle, 160, 50);
    this.addChild(this.text);

    this.dot1 = new resizeableGraphics(this.app);
    this.dot1.onResize((color = 0xffffff) => {
      this.dot1.clear();
      this.dot1.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 150, y: 150 });
      let r: xypair = this.app.toPos({ x: 10, y: 0 });
      this.dot1.drawCircle(xy.x, xy.y, r.x);
    });
    this.addChild(this.dot1);

    this.dot2 = new resizeableGraphics(this.app);
    this.dot2.onResize((color = 0xffffff) => {
      this.dot2.clear();
      this.dot2.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 250, y: 150 });
      let r: xypair = this.app.toPos({ x: 10, y: 0 });
      this.dot2.drawCircle(xy.x, xy.y, r.x);
    });
    this.addChild(this.dot2);

    this.dot3 = new resizeableGraphics(this.app);
    this.dot3.onResize((color = 0xffffff) => {
      this.dot3.clear();
      this.dot3.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 350, y: 150 });
      let r: xypair = this.app.toPos({ x: 10, y: 0 });
      this.dot3.drawCircle(xy.x, xy.y, r.x);
    });
    this.addChild(this.dot3);
  }

  update(d) {
    this.time += d;
    switch (Math.round(this.time) % 10) {
      case 1:
        this.dot1.resize(0x000000);
        this.dot2.resize(0x000000);
        this.dot3.resize(0x000000);
        break;
      case 2:
        this.dot1.resize(0x101010);
        this.dot2.resize(0x070707);
        this.dot3.resize(0x050505);
        break;
      case 3:
        this.dot1.resize(0x202020);
        this.dot2.resize(0x141414);
        this.dot3.resize(0x101010);
        break;
      case 4:
        this.dot1.resize(0x303030);
        this.dot2.resize(0x212121);
        this.dot3.resize(0x151515);
        break;
      case 5:
        this.dot1.resize(0x404040);
        this.dot2.resize(0x282828);
        this.dot3.resize(0x202020);
        break;
      case 6:
        this.dot1.resize(0x303030);
        this.dot2.resize(0x212121);
        this.dot3.resize(0x151515);
        break;
      case 7:
        this.dot1.resize(0x202020);
        this.dot2.resize(0x141414);
        this.dot3.resize(0x101010);
        break;
      case 8:
        this.dot1.resize(0x101010);
        this.dot2.resize(0x070707);
        this.dot3.resize(0x050505);
        break;
    }
  }

  onswitchto() {}

  setData(initData) {
    this.data = initData;
  }
}
