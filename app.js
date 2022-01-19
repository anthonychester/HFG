import { Application } from "pixi.js";

export class applt extends Application {
  toPos(obj) {
    //convert app xy to real xy
    //@ts-ignore
    return { x: obj.x * this.xm, y: obj.y * this.ym };
  }

  fromPos(obj) {
    //convert real xy to app xy
    //@ts-ignore
    return { x: obj.x / this.xm, y: obj.y / this.ym };
  }

  toList(inarr) {
    let out = [];

    for (let i = 0; i < inarr.length; i++) {
      out.push(this.toPos({ x: inarr[i].x, y: inarr[i].y }));
    }

    return out;
  }
}
