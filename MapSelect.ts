import { Container } from "pixi.js";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { window } from "./Standard";

export class MapSelect extends Container {
  app: applt;
  BH: ButtonHandler;
  previous: any;
  mode: String;

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

    for (let i = 0; i < this.app.data.maps.folderNames.length; i++) {
      let map = new resizeableGraphics(this.app);
      map.onResize(() => {
        map.clear();
        map.lineStyle(4, 0x000000, 1);
        map.beginFill(0x4f4f4f);
        let xy: xypair = this.app.toPos({ x: 25.1 + i * 100, y: 15 });
        map.x = xy.x;
        map.y = xy.y;
        let xysize: xypair = this.app.toPos({ x: 50, y: 50 });
        map.drawRect(0, 0, xysize.x, xysize.y);
        map.endFill();
      });
      map.resize();
      this.addChild(map);
    }
  }

  update() {}

  setMode(mode) {
    this.mode = mode;
  }
}
