import { Container, TextStyle } from "pixi.js";
import { ButtonHandler } from "./src/scripts/ButtonHandler";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { resizeableText } from "./customElements/resizeableText";
import { windowFrame } from "./Standard";

export class MapSelect extends Container {
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
      let xy = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();
    });

    this.addChild(backround);

    let win = new windowFrame(this.app);

    this.addChild(win);
  }

  onUp() {}

  onswitchto(pre) {
    this.previous = pre;

    for (let i = 0; i < this.app.data.maps.folderNames.length; i++) {
      let map = new resizeableGraphics(this.app);
      map.status = this.app.data.maps.folderNames[i];
      const soloStyle = new TextStyle({
        fill: ["#000000"],
        fontSize: 14
      });
      let xyt = this.app.toPos({ x: 30 + i * 105, y: 15 + 23.5 });
      map.text = new resizeableText(
        this.app,
        this.app.data.maps.folderNames[i],
        soloStyle,
        xyt.x,
        xyt.y
      );
      map.onResize((color = 0x4f4f4f) => {
        map.clear();
        map.lineStyle(4, 0x000000, 1);
        map.beginFill(color);
        let xy = this.app.toPos({ x: 25 + i * 100, y: 15 });
        map.x = xy.x;
        map.y = xy.y;
        let xysize = this.app.toPos({ x: 50, y: 50 });
        map.drawRect(0, 0, xysize.x, xysize.y);
        map.endFill();
      });
      map.onClick(() => {
        if (this.selected === map) {
          //this map doulbe clicked
          this.data.map = this.selected.status;
          //@ts-ignore
          this.app.curent.zIndex = 0;
          this.app.curent = this.app.secne.LoadingScreen;
          this.app.secne.LoadingScreen.setData(this.data);
          this.app.secne.LoadingScreen.onswitchto(this);
          //@ts-ignore
          this.app.curent.zIndex = 1;
        } else {
          if (this.selected) {
            this.selected.resize();
          }
          this.selected = map;
          map.resize(0x9f9f9f);
        }
      });
      map.resize();
      this.addChild(map);
      this.addChild(map.text);
    }
  }

  update() {}

  setData(initdata) {
    this.mode = initdata.mode;
    this.data = initdata;
  }
}
