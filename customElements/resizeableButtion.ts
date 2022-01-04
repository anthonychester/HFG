import { Graphics, Sprite, Text } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableText } from "./resizeableText";

interface op {
  border?: boolean;
  defcolor?: any;
  rscolor?: any;
  text?: Text | resizeableText;
  sprite?: Sprite;
}

export class resizeableButtion extends Graphics {
  app: applt;
  resize: any;
  text: Text | resizeableText;
  sprite: Sprite;
  opt: op;
  status: any;
  hover: boolean;

  constructor(
    app: applt,
    x: number,
    y: number,
    sx: number,
    sy: number,
    opt: op
  ) {
    super();
    this.app = app;
    this.hover = true;
    this.text = opt.text ? opt.text && this.addChild(opt.text) : undefined;
    this.sprite = opt.sprite
      ? opt.sprite && this.addChild(opt.sprite)
      : undefined;
    this.opt = opt;

    this.resize = (color = opt.defcolor ? opt.defcolor : 0x4f4f4f) => {
      this.clear();
      if (opt.border === undefined) {
        this.lineStyle(4, 0x000000, 1);
      } else if (opt.border) {
        this.lineStyle(4, 0x000000, 1);
      }
      this.beginFill(color);
      let xy: xypair = this.app.toPos({ x: x, y: y });
      this.x = xy.x;
      this.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: sx, y: sy });
      this.drawRect(0, 0, xysize.x, xysize.y);
      this.endFill();

      let pos: xypair = this.app.toPos({ x: 24, y: 13 });

      /*
      if (this.sprite !== undefined) {
        this.sprite.x = pos.x;
        this.sprite.y = pos.y;
        this.sprite.scale.x = this.app.xm;
        this.sprite.scale.y = this.app.xm;
      }
      if (this.text !== undefined) {
        this.text.x = pos.x;
        this.text.y = pos.y;
        this.text.scale.x = this.app.xm;
        this.text.scale.y = this.app.xm;
      }*/
    };

    //@ts-ignore
    this.mouseover = () => {
      if (this.hover) {
        this.resize(opt.rscolor ? opt.rscolor : 0x4f4f4f);
      }
    };
    //@ts-ignore
    this.mouseout = () => {
      if (this.hover) {
        this.resize();
      }
    };

    this.interactive = true;
    window.addEventListener("updatesize", () => {
      this.resize();
    });
    this.resize();
  }

  onClick(fun) {
    //@ts-ignore
    this.click = fun;
  }
}
