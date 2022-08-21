import { Graphics, Sprite, Container } from "pixi.js";
import { applt, xypair } from "../app";
export class imageButton extends Graphics {
  app: applt;
  resize: any;
  sprite1: Sprite;
  sprite2: Sprite;
  status: any;
  x: number;
  y: number;
  sw: number;
  sh: number;

  /**
   * @param {Container} con - the extended Container(this) inwhich the constructor is called
   * @param {number} x x postion for sprites
   * @param {number} y y postion for sprites
   * @param {number} sw scale for width of sprites
   * @param {number} sh scale for width of sprites
   * @param {string} sprit1source - The default Sprite's path within app loader
   * @param {string} [sprit2source] - The Sprite on hover path within app loader
   */
  constructor(
    con: Container,
    x: number,
    y: number,
    sw: number,
    sh: number,
    sprit1source: string,
    sprit2source: string = null
  ) {
    super();
    //@ts-ignore
    this.app = con.app;
    //@ts-ignore
    this.sortableChildren = true;
    let pos: xypair = this.app.toPos({ x: x, y: y });
    this.x = x;
    this.y = y;
    this.sw = sw;
    this.sh = sh;
    this.sprite1 = Sprite.from(this.app.loader.resources[sprit1source].texture);
    this.sprite1.x = pos.x;
    this.sprite1.y = pos.y;
    //@ts-ignore
    this.sprite1.zIndex = 1;
    con.addChild(this.sprite1);
    if (sprit2source) {
      this.sprite2 = Sprite.from(
        this.app.loader.resources[sprit2source].texture
      );
      this.sprite2.x = pos.x;
      this.sprite2.y = pos.y;
      //@ts-ignore
      this.sprite2.zIndex = 0;
      con.addChild(this.sprite2);
    }

    this.resize = () => {
      let pos: xypair = this.app.toPos({ x: this.x, y: this.y });
      this.sprite1.x = pos.x;
      this.sprite1.y = pos.y;

      this.sprite1.scale.x = (this.app.xm / 1) * this.sw;
      this.sprite1.scale.y = (this.app.ym / 1) * this.sh;
      if (this.sprite2) {
        this.sprite2.x = pos.x;
        this.sprite2.y = pos.y;

        this.sprite2.scale.x = (this.app.xm / 1) * this.sw;
        this.sprite2.scale.y = (this.app.ym / 1) * this.sh;
      }
    };
    this.sprite1.interactive = true;
    this.sprite2.interactive = true;
    if (this.sprite2) {
      //@ts-ignore
      this.sprite1.mouseover = () => {
        //@ts-ignore
        this.sprite1.zIndex = 0;
        //@ts-ignore
        this.sprite2.zIndex = 1;
      };
      //@ts-ignore
      this.sprite2.mouseout = () => {
        //@ts-ignore
        this.sprite1.zIndex = 1;
        //@ts-ignore
        this.sprite2.zIndex = 0;
      };
    }
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
    this.sprite2.click = fun;
  }

  onMouseover(fun) {
    //@ts-ignore
    this.mouseover = fun;
  }

  onResize(fun) {
    this.resize = fun;
  }
}
