import { Container, TextStyle } from "pixi.js";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { resizeableText } from "./customElements/resizeableText";
import { window } from "./Standard";

export class PlayerSelect extends Container {
  app: applt;
  BH: ButtonHandler;
  previous: any;
  mode: String;
  selected: resizeableGraphics;
  p1: String;

  constructor(app) {
    super();
    this.app = app;
    this.BH = new ButtonHandler(app);
    this.BH.onPress((e) => {});

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;

    this.setup();
  }

  setup() {
    let backround = new resizeableGraphics(this.app);
    backround.onResize(() => {
      backround.clear();
      backround.beginFill(0xff0000);
      backround.x = 0;
      backround.y = 0;
      let xy: xypair = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });

    this.addChild(backround);

    let win = new window(this.app);

    this.addChild(win);
  }

  onUp() {}

  onswitchto(pre) {
    this.previous = pre;

    for (let i = 0; i < this.app.data.players.folderNames.length; i++) {
      let player = new resizeableGraphics(this.app);
      player.status = this.app.data.players.folderNames[i];
      const soloStyle = new TextStyle({
        fill: ["#000000"],
        fontSize: 14
      });
      let xyt: xypair = this.app.toPos({ x: 30 + i * 105, y: 15 + 23.5 });
      player.text = new resizeableText(
        this.app,
        this.app.data.players.folderNames[i],
        soloStyle,
        xyt.x,
        xyt.y
      );
      player.onResize((color = 0x4f4f4f) => {
        player.clear();
        player.lineStyle(4, 0x000000, 1);
        player.beginFill(color);
        let xy: xypair = this.app.toPos({ x: 25 + i * 100, y: 15 });
        player.x = xy.x;
        player.y = xy.y;
        let xysize: xypair = this.app.toPos({ x: 50, y: 50 });
        player.drawRect(0, 0, xysize.x, xysize.y);
        player.endFill();
      });
      player.onClick(() => {
        if (this.selected === player) {
          //this player doulbe clicked
          if (this.p1) {
            //@ts-ignore
            this.app.curent.zIndex = 0;
            this.app.curent = this.app.secne.MapSelect;
            this.app.secne.MapSelect.setData({
              mode: this.mode,
              p1: this.p1,
              p2: this.selected.status
            });
            this.app.secne.MapSelect.onswitchto(this);
            //@ts-ignore
            this.app.curent.zIndex = 1;
          } else {
            //@ts-ignore
            this.p1 = this.selected.status;
            this.selected.resize();
            this.selected = undefined;
          }
        } else {
          if (this.selected) {
            this.selected.resize();
          }
          this.selected = player;
          player.resize(0x9f9f9f);
        }
      });
      player.resize();
      this.addChild(player);
      this.addChild(player.text);
    }
  }

  update() {}

  setMode(mode) {
    this.mode = mode;
  }
}
