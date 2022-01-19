import { Container, Text, Sprite, TextStyle } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { resizeableText } from "./customElements/resizeableText";
import { resizeableButtion } from "./customElements/resizeableButtion";
import { windowFrame } from "./Standard";

export class Controls extends Container {
  constructor(app) {
    super();
    this.app = app;
    this.BH = new ButtonHandler(app);
    this.BH.onPress((e) => {
      this.onPress(e);
    });
    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;
    this.cur = null;
    this.player = "player1";

    this.event = new CustomEvent("Pair", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false
    });

    this.setup();
  }
  setup() {
    let backround = new resizeableGraphics(this.app);
    backround.onResize(() => {
      backround.clear();
      backround.beginFill(0xff0000);
      backround.x = 0;
      backround.y = 0;
      let xy = this.app.toPos({ x: 500, y: 200 });
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
      let xy = this.app.toPos({ x: 21.1, y: 11 });
      bar.x = xy.x;
      bar.y = xy.y;
      let xysize = this.app.toPos({ x: 457, y: 20 });
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
      let xy = this.app.toPos({ x: 21.1, y: 11 });
      back.x = xy.x;
      back.y = xy.y;
      let xysize = this.app.toPos({ x: 35, y: 20 });
      back.drawRect(0, 0, xysize.x, xysize.y);
      back.endFill();

      let pos = this.app.toPos({ x: 24, y: 13 });

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

        console.log(this.app.data);
      }
    });

    this.addChild(back);

    const header = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 30
    });

    let Controls = new resizeableText(this.app, "Controls", header, 195, 40);
    this.addChild(Controls);
    const subStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 10
    });
    const buttonStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 20
    });
    //Up
    //Left
    //Right
    //Down
    let down = new resizeableButtion(this.app, 70, 120, 35, 25, {
      text: new resizeableText(this.app, "s", buttonStyle, 10.5, 6.5),
      rscolor: 0x737373
    });

    down.onClick(() => {
      //W.I.P
      if (this.cur == null) {
        down.hover = false;
        this.cur = down;
        down.resize(0x737373);
      }
      //this.app.data.control.player1.UP = 0
      down.status = "DOWN";
    });
    this.addChild(down);
    this.addChild(new resizeableText(this.app, "down", subStyle, 25, 140));

    let pair = new resizeableButtion(this.app, 150, 120, 35, 25, {
      text: new resizeableText(this.app, "pair", buttonStyle, 10.5, 6.5),
      rscolor: 0x737373
    });

    pair.onClick(() => {
      //console.log(window);
      window.dispatchEvent(this.event);
    });
    this.addChild(pair);
  }

  onUp() {}

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update() {}

  onPress(e) {
    if (this.cur != null) {
      this.app.data.control[this.player][this.cur.status] = e.keyCode;
      this.cur.text.text = e.key;
      this.cur.resize();
      this.cur.hover = true;
      this.cur = null;
    }
  }
}
