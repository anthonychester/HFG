import { Text } from "pixi.js";

import { applt, xypair } from "./app";

export class resizeableText extends Text {
  xy: xypair;
  app: applt;
  status: any;

  constructor(app, text, style, x, y) {
    super(text, style);
    this.app = app;
    this.xy = { x: x, y: y };
    let pos = app.toPos(this.xy);
    this.x = pos.x;
    this.y = pos.y;

    window.addEventListener("updatesize", this.resize.bind(this));
  }

  resize() {
    let pos = this.app.toPos(this.xy);
    this.x = pos.x;
    this.y = pos.y;
    this.scale.x = this.app.xm;
    this.scale.y = this.app.xm;
  }
}
