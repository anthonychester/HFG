import { TextStyle, Container, Sprite } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { resizeableText } from "./customElements/resizeableText";
import { windowFrame } from "./Standard";

export class Info extends Container {
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
      backround.beginFill(0x00ff00);
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
      let xy: xypair = this.app.toPos({ x: 21.3, y: 12 });
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
      let xy: xypair = this.app.toPos({ x: 21.3, y: 12 });
      back.x = xy.x;
      back.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 35, y: 20 });
      back.drawRect(0, 0, xysize.x, xysize.y);
      back.endFill();

      let pos: xypair = this.app.toPos({ x: 24, y: 14 });

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

    const soloStyle = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 20
    });

    let text = new resizeableText(
      this.app,
      "This project is free and will always be free",
      soloStyle,
      65,
      170
    );

    this.addChild(text);

    const header = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 30
    });

    let Credits = new resizeableText(this.app, "Credits", header, 195, 40);

    this.addChild(Credits);

    let CreditsW = new resizeableGraphics(this.app);
    CreditsW.onResize(() => {
      CreditsW.clear();
      CreditsW.beginFill(0xaaaaaa);
      let xy: xypair = this.app.toPos({ x: 30, y: 63 });
      CreditsW.x = xy.x;
      CreditsW.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 440, y: 60 });
      CreditsW.drawRect(0, 0, xysize.x, xysize.y);
      CreditsW.endFill();
    });

    this.addChild(CreditsW);

    const ctextStyles = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 15
    });

    let Ctext = new resizeableText(
      this.app,
      "This project was created by AC Studio",
      ctextStyles,
      130,
      65
    );

    this.addChild(Ctext);

    const header2 = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 25
    });

    let ugc = new resizeableText(this.app, "UGC Policy", header2, 183, 125);

    this.addChild(ugc);

    let ugcW = new resizeableGraphics(this.app);
    ugcW.onResize(() => {
      ugcW.clear();
      ugcW.beginFill(0xaaaaaa);
      let xy: xypair = this.app.toPos({ x: 30, y: 145 });
      ugcW.x = xy.x;
      ugcW.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 440, y: 25 });
      ugcW.drawRect(0, 0, xysize.x, xysize.y);
      ugcW.endFill();
    });

    this.addChild(ugcW);

    const ugctextStyles = new TextStyle({
      fill: ["#ffffff"],
      fontSize: 13
    });

    let ugctext = new resizeableText(
      this.app,
      "All user generated content is made and is the property of the creator",
      ugctextStyles,
      50,
      150
    );

    this.addChild(ugctext);
  }

  onUp() {}

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update() {}
}
