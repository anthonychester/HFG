import { Application, Container, Graphics, Sprite } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./resizeableGraphics";
import { ButtonHandler } from "./src/scripts/ButtonHandler";

export class Settings extends Container {
  constructor(app) {
    super();
    this.app = app;
    this.BH = new ButtonHandler(app);
    this.BH.onPress((e) => {});
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
      let xy = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });

    this.addChild(backround);

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
      let xy = this.app.toPos({ x: 10, y: 10 });
      back.x = xy.x;
      back.y = xy.y;
      let xysize = this.app.toPos({ x: 35, y: 25 });
      back.drawRect(0, 0, xysize.x, xysize.y);
      back.endFill();

      let pos = this.app.toPos({ x: 15, y: 14 });

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
  }

  onUp() {}

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update() {}
}
