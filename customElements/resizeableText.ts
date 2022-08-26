import { Text } from "pixi.js";

import { applt, xypair } from "../app";

export class resizeableText extends Text {
  xy: xypair;
  app: applt;
  status: any;
  sw: number;
  sh: number;

  constructor(app, text, style, x, y, sw = 1, sh = 1) {
    super(text, style);
    this.app = app;
    this.xy = { x: x, y: y };
    let pos = app.toPos(this.xy);
    this.x = pos.x;
    this.y = pos.y;
    this.sw = sw;
    this.sh = sh;

    window.addEventListener("updatesize", this.resize.bind(this));
  }

  resize() {
    let pos = this.app.toPos(this.xy);
    this.x = pos.x;
    this.y = pos.y;
    this.scale.x = (this.app.xm / 1) * this.sw;
    this.scale.y = (this.app.ym / 1) * this.sh;
  }
}
