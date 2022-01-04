import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { applt, xypair } from "./app";

export class window extends resizeableGraphics {
  app: applt;
  constructor(app) {
    super(app);
    this.app = app;
    this.onResize(() => {
      this.clear();
      this.beginFill(0x878686);
      let xy: xypair = this.app.toPos({ x: 20, y: 10 });
      this.x = xy.x;
      this.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 460, y: 178 });
      this.drawRect(0, 0, xysize.x, xysize.y);
      this.endFill();
    });
  }
}

export class bar extends resizeableGraphics {
  app: applt;
  constructor(app) {
    super(app);
    this.app = app;

    this.onResize(() => {
      this.clear();
      this.lineStyle(4, 0x000000, 1);
      this.beginFill(0x4f4f4f);
      let xy: xypair = this.app.toPos({ x: 21.3, y: 12 });
      this.x = xy.x;
      this.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 457, y: 20 });
      this.drawRect(0, 0, xysize.x, xysize.y);
      this.endFill();
    });
  }
}
/*
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
    */
