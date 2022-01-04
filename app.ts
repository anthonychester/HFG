import { Application } from "pixi.js";

export interface xypair {
  x: number;
  y: number;
}

export interface dataT {
  version: String;
  control: {
    player1: {
      UP: number;
      DOWN: number;
      LEFT: number;
      RIGHT: number;
      ATTACK1: number;
      ATTACK2: number;
    };
    player2: {
      UP: number;
      DOWN: number;
      LEFT: number;
      RIGHT: number;
      ATTACK1: number;
      ATTACK2: number;
    };
  };
  maps: {
    folderNames: String[];
  };
  players: {
    folderNames: String[];
  };
}

export class applt extends Application {
  xm: number;
  ym: number;
  data: dataT;
  curent: object;
  //@ts-ignore;
  secne: sences;

  toPos = (obj: xypair) => {
    //convert app xy to real xy
    //@ts-ignore
    return { x: obj.x * this.xm, y: obj.y * this.ym };
  };

  fromPos = (obj: xypair) => {
    //convert real xy to app xy
    //@ts-ignore
    return { x: obj.x / this.xm, y: obj.y / this.ym };
  };

  toList = (inarr: xypair[]) => {
    let out: xypair[] = [];

    for (let i = 0; i < inarr.length; i++) {
      out.push(this.toPos({ x: inarr[i].x, y: inarr[i].y }));
    }

    return out;
  };
}
