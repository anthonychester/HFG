import { Graphics, Sprite, Text } from "pixi.js";
import { applt } from "./app";

export class resizeableGraphics extends Graphics {
  app: applt;
  resize: any;
  text: Text;
  sprite: Sprite;
  status: any;

  constructor(app) {
    super();
    this.app = app;

    this.resize = () => {};

    this.interactive = true;
    window.addEventListener("updatesize", () => {
      this.resize();
    });
  }

  onMouseout(fun) {
    //@ts-ignore
    this.mouseout = fun;
  }

  onClick(fun) {
    //@ts-ignore
    this.click = fun;
  }

  onMouseover(fun) {
    //@ts-ignore
    this.mouseover = fun;
  }

  onResize(fun) {
    this.resize = fun;
  }
}
