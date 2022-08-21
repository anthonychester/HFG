import { Application } from "pixi.js";
import { Loading } from "./Loading";
export interface xypair {
  x: number;
  y: number;
}

export interface playerCont {
  UP: number;
  DOWN: number;
  LEFT: number;
  RIGHT: number;
  ATTACK1: number;
  ATTACK2: number;
}

export interface dataT {
  version: String;
  control: {
    player1: playerCont;
    player2: playerCont;
  };
  maps: {
    folderNames: String[];
  };
  players: {
    folderNames: String[];
  };
  loading;
}

export class applt extends Application {
  /** x multiplyer for screen
   * app.view.width / 500
   */
  xm: number;
  /** y multiplyer for screen
   * app.view.height / 200
   */
  ym: number;
  data: dataT;
  curent: object;
  /** Loading Screen */
  loading: Loading;
  //@ts-ignore;
  secne: sences;
  mods: any;
  inputHandler: any;
  loader: any;
  updatesize: CustomEvent;

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

  /**
   * Recalculate the x and y mutiplayer and emits and update via window event
   */
  resize = () => {
    const inputImageAspectRatio = window.innerWidth / window.innerHeight;

    const outputImageAspectRatio = 16 / 9;

    let outputWidth = window.innerWidth;
    let outputHeight = window.innerHeight;

    if (inputImageAspectRatio > outputImageAspectRatio) {
      outputWidth = window.innerHeight * outputImageAspectRatio;
    } else if (inputImageAspectRatio < outputImageAspectRatio) {
      outputHeight = window.innerWidth / outputImageAspectRatio;
    }

    this.renderer.resize(outputWidth, outputHeight);

    this.xm = this.view.width / 500;
    this.ym = this.view.height / 250;

    window.dispatchEvent(this.updatesize);
  };
}