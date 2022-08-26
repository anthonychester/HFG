import { Container, TextStyle } from "pixi.js";
import { applt, xypair } from "../../app";
import { imageButton } from "../../customElements/imageButton";
import { resizeableGraphics } from "../../customElements/resizeableGraphics";
import { backroundCreate } from "../../customElements/reuseable";

export class CharterSelect extends Container {
  fullSource: string;
  textSource: string;
  loc: string;
  app: applt;
  text: imageButton;
  full: imageButton;
  color: string;
  bx: number;
  by: number;
  constructor(app, x: number, y: number) {
    super();
    this.app = app;
    this.bx = x;
    this.by = y;
    this.x = x;
    this.y = y;
    this.fullSource = "./src/icons/PlayerSelectScreen/Blank-Full.png";
    this.textSource = "Select Charater";
    this.color = "0x7C7B72";
    this.createBackround();
    this.createTextBox();

    this.text = new imageButton(this.app, {
      x: 2,
      y: 109,
      sw: 0.5,
      sh: 0.5,
      text: this.textSource,
      font: new TextStyle({
        fontFamily: "KaiseiHarunoUmi-Medium"
      }),
      con: this
    });
    this.addChild(this.text);

    this.full = new imageButton(this.app, {
      x: 0,
      y: 7,
      sw: 0.5,
      sh: 0.5,
      sprit1source: this.fullSource,
      con: this
    });
    this.addChild(this.full);
    window.addEventListener("updatesize", () => {
      this.resize();
    });
  }
  createTextBox() {
    let textBox = new resizeableGraphics(this.app);

    textBox.onResize(() => {
      textBox.clear();
      textBox.lineStyle(2, 0x000000, 1);
      //@ts-ignore
      textBox.beginFill("0xD9D9D9");
      let pos: xypair = this.app.toPos({ x: 0, y: 105 });
      textBox.x = pos.x;
      textBox.y = pos.y;
      let TBxy: xypair = this.app.toPos({ x: 108, y: 26 });
      textBox.drawRect(0, 0, TBxy.x, TBxy.y);
      textBox.endFill();
    });
    this.addChild(textBox);
  }
  createBackround() {
    let backround = new resizeableGraphics(this.app);

    backround.onResize(() => {
      backround.clear();
      backround.lineStyle(2, 0x000000, 1);
      //@ts-ignore
      backround.beginFill(this.color);
      let pos: xypair = this.app.toPos({ x: 0, y: 0 });
      backround.x = pos.x;
      backround.y = pos.y;
      let xy: xypair = this.app.toPos({ x: 108, y: 105 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });
    this.addChild(backround);
  }

  resize() {
    let pos: xypair = this.app.toPos({ x: this.bx, y: this.by });
    this.x = pos.x;
    this.y = pos.y;
  }
}

//this.app.loader.resources["./src/characters/" + loc + "/data.json"].data.info.name
//"./src/characters/" + loc + "/select/full.png"
