//@ts-ignore
import * as maps from "../src/maps/maps.json";
import { Container, Sprite } from "pixi.js";
import { applt, xypair } from "../app";
import { imageButton } from "../customElements/imageButton";
import { resizeableGraphics } from "../customElements/resizeableGraphics";
import { backroundCreate } from "../customElements/reuseable";

export class MapSelect extends Container {
  app: applt;
  previous: any;
  preview: imageButton;
  icons: imageButton[];
  selection: number;
  constructor(app) {
    super();
    this.app = app;
    this.icons = [];
    this.selection = -1;
    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;
    window.addEventListener("loaded", this.loaded.bind(this));
    this.setup();
  }
  setup() {
    let backround = backroundCreate(this.app, "0x69A5FF");

    this.addChild(backround);
  }

  loaded() {
    let ran = new imageButton(this.app, {
      con: this,
      x: 225,
      y: 28,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/icons/MapSelectScreen/random-icon.png"
    });
    ran.data = { id: -1 };
    ran.callbacks.onmouseover = (self) => {
      this.updateSlection(self.data);
    };
    ran.callbacks.onclick = (self) => {
      this.nextScreen(self.data.id);
    };
    this.icons.push(ran);

    for (let i = 0; i < maps.list.length; i++) {
      let pi = i + 2;
      this.icons.push(
        this.newMaps(83 * pi + 142, Math.trunc(pi / 3) * 42 + 28, i)
      );
    }

    let panel = new resizeableGraphics(this.app);

    panel.onResize(() => {
      panel.clear();
      //@ts-ignore
      panel.beginFill("0x272727");
      panel.alpha = 0.85;
      let pos: xypair = this.app.toPos({ x: 9, y: 10 });
      panel.x = pos.x;
      panel.y = pos.y;
      let xy: xypair = this.app.toPos({ x: 482, y: 231 });
      panel.drawRect(0, 0, xy.x, xy.y);
      panel.endFill();
    });
    this.addChild(panel);
    let blankFill = new resizeableGraphics(this.app);

    blankFill.onResize(() => {
      blankFill.clear();
      //@ts-ignore
      blankFill.beginFill("0x000000");
      let pos: xypair = this.app.toPos({ x: 225, y: 28 });
      blankFill.x = pos.x;
      blankFill.y = pos.y;
      let xy: xypair = this.app.toPos({ x: 250, y: 195 });
      blankFill.drawRect(0, 0, xy.x, xy.y);
      blankFill.endFill();
    });
    this.addChild(blankFill);

    this.preview = new imageButton(this.app, {
      x: 26,
      y: 37,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/images/blank.png",
      con: this
    });

    this.app.resize();
  }
  newMaps(x: number, y: number, i: number): imageButton {
    let loc = maps.list[i].location;
    let map = new imageButton(this.app, {
      con: this,
      x: x,
      y: y,
      sw: 0.25,
      sh: 0.25,
      sprit1source: "./src/maps/" + loc + "/icon.png"
    });
    map.data = { id: i };
    map.callbacks.onmouseover = (self) => {
      this.updateSlection(self.data);
    };
    map.callbacks.onclick = (self) => {
      this.nextScreen(self.data.id);
    };
    return map;
  }
  nextScreen(id: number) {
    if (id == -1) {
      id = Math.floor(Math.random() * maps.list.length);
    }
    this.app.gameData.map = id;
  }
  updateSlection(data: any) {
    if (data.id >= 0) {
      let pre = "./src/maps/" + maps.list[data.id].location + "/";
      this.selection = data.id;
      //@ts-ignore
      this.preview.sprite1.texture = this.app.loader.resources[
        pre + "preview.png"
      ].texture;
      this.app.resize();
    } else {
      this.selection = data.id;
      //@ts-ignore
      this.preview.sprite1.texture = this.app.loader.resources[
        "./src/icons/MapSelectScreen/preview.png"
      ].texture;
      this.app.resize();
    }
  }

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update(delta) {}
}
