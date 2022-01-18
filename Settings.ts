import { Container, Text, Sprite, TextStyle } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { windowFrame } from "./Standard";

export class Settings extends Container {
  app: applt;
  BH: ButtonHandler;
  previous: any;

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
      backround.beginFill(0xff0000);
      backround.x = 0;
      backround.y = 0;
      let xy: xypair = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });

    this.addChild(backround);

    let win = new windowFrame(this.app);
    this.addChild(win);

    let bar = new resizeableGraphics(this.app);
    bar.onResize(() => {
      bar.clear();
      bar.lineStyle(4, 0x000000, 1);
      bar.beginFill(0x4f4f4f);
      let xy: xypair = this.app.toPos({ x: 21.1, y: 11 });
      bar.x = xy.x;
      bar.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 457, y: 20 });
      bar.drawRect(0, 0, xysize.x, xysize.y);
      bar.endFill();
    });
    this.addChild(bar);

    let back = new resizeableGraphics(this.app);

    back.sprite = Sprite.from("src/icons/arrow_back_ios_new_black_24dp.svg");
    this.addChild(back.sprite);
    back.sprite.x = 0;
    back.sprite.y = 0;
    //@ts-ignore
    back.sprite.zIndex = 2;
    back.onResize((color = 0x4f4f4f) => {
      back.clear();
      back.lineStyle(4, 0x000000, 1);
      back.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 21.1, y: 11 });
      back.x = xy.x;
      back.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 35, y: 20 });
      back.drawRect(0, 0, xysize.x, xysize.y);
      back.endFill();

      let pos: xypair = this.app.toPos({ x: 24, y: 13 });

      back.sprite.x = pos.x;
      back.sprite.y = pos.y;
      back.sprite.scale.x = this.app.xm;
      back.sprite.scale.y = this.app.xm;
    });

    back.onMouseover(() => {
      back.resize(0x737373);
    });

    back.onMouseout(() => {
      back.resize();
    });

    back.onClick(() => {
      if (this.app.curent === this) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.previous;
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });

    this.addChild(back);

    let p1up = new resizeableGraphics(this.app);

    const buttonStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 20
    });

    p1up.text = new Text("W", buttonStyle);
    this.addChild(p1up.text);
    p1up.text.x = 0;
    p1up.text.y = 0;
    //@ts-ignore
    p1up.text.zIndex = 2;

    p1up.onResize((color = 0x4f4f4f) => {
      p1up.clear();
      p1up.lineStyle(4, 0x000000, 1);
      p1up.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 65, y: 50 });
      p1up.x = xy.x;
      p1up.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 35, y: 25 });
      p1up.drawRect(0, 0, xysize.x, xysize.y);
      p1up.endFill();

      let pos: xypair = this.app.toPos({ x: 72.7, y: 55 });

      p1up.text.x = pos.x;
      p1up.text.y = pos.y;
      p1up.text.scale.x = this.app.xm;
      p1up.text.scale.y = this.app.xm;
    });

    p1up.onMouseover(() => {
      p1up.resize(0x737373);
    });

    p1up.onMouseout(() => {
      p1up.resize();
    });

    p1up.onClick(() => {
      //W.I.P
    });

    this.addChild(p1up);
  }

  onUp() {}

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update() {}
}
