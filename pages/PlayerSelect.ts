//@ts-ignore
import * as characters from "../src/characters/characters.json";
import { Container, Sprite } from "pixi.js";
import { applt } from "../app";
import { imageButton } from "../customElements/imageButton";
import { backroundCreate } from "../customElements/reuseable";
import { CharterSelect } from "./elements/CharterSelect";

export class PlayerSelect extends Container {
  app: applt;
  previous: any;
  icons: imageButton[];
  selections: number[];
  display: CharterSelect[];
  current: number;
  constructor(app) {
    super();
    this.app = app;

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;
    this.icons = [];
    this.selections = [];
    this.display = [];
    this.current = 0;
    window.addEventListener("loaded", this.loaded.bind(this));
    this.setup();
  }
  setup() {
    let backround = backroundCreate(this.app, "0x69A5FF");
    this.addChild(backround);
  }

  loaded() {
    for (let i = 0; i < 15; i++) {
      if (characters.list.length - 1 < i) {
        if (i <= 10) {
          this.icons.push(this.noChar(40 * i + 25, 15));
        } else {
          this.icons.push(this.noChar(40 * i - 400 + 125, 55));
        }
      } else {
        if (i <= 10) {
          this.icons.push(this.nextChar(40 * i + 30, 15, i));
        } else {
          this.icons.push(this.nextChar(40 * i - 400 + 130, 55, i));
        }
      }
    }

    for (let i in this.icons) {
      this.addChild(this.icons[i]);
    }

    for (let i = 0; i < this.app.data.rules.numOfPlayer; i++) {
      this.createDisplay(i * 133 + 25, 104);
      //this.createDisplay(133, 104);
    }

    this.app.resize();
  }

  updateSlection(data) {
    let dis = this.display[this.current];
    let pre = "./src/characters/" + characters.list[data.id].location + "/";
    let info = this.app.loader.resources[pre + "data.json"].data.info;
    this.selections[this.current] = data.id;
    //@ts-ignore
    dis.text.sprite1.text = info.name;
    dis.full.sprite1.texture = this.app.loader.resources[
      pre + "select/full.png"
    ].texture;
    dis.color = info["accent-color"];
    this.app.resize();
  }

  createDisplay(x, y) {
    let selection = new CharterSelect(this.app, x, y);
    this.display.push(selection);
    this.selections.push(-1);
    this.addChild(selection);
  }

  noChar(x, y): imageButton {
    return new imageButton(this.app, {
      con: this,
      x: x,
      y: y,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/PlayerSelectScreen/NoChar.png"
    });
  }

  nextChar(x, y, i): imageButton {
    let loc = characters.list[i].location;
    let char = new imageButton(this.app, {
      con: this,
      x: x,
      y: y,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/characters/" + loc + "/select/icon.png"
    });
    char.data = { id: i };
    char.callbacks.onmouseover = (self) => {
      this.updateSlection(self.data);
    };
    char.callbacks.onclick = (self) => {
      if (this.current < this.app.data.rules.numOfPlayer - 1) {
        this.current += 1;
      } else {
        if (this.app.curent === this) {
          this.app.gameData.chars = this.selections;

          //@ts-ignore
          this.app.curent.zIndex = 0;
          this.app.curent = this.app.secne.MapSelect;
          this.app.secne.MapSelect.onswitchto(this);
          //@ts-ignore
          this.app.curent.zIndex = 1;
        }
      }
    };
    return char;
  }

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update(delta) {}
}
