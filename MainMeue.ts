import { Container, TextStyle, Text, Sprite } from "pixi.js";
import { applt, xypair } from "./app";
import { resizeableGraphics } from "./customElements/resizeableGraphics";
import { resizeableText } from "./customElements/resizeableText";

export class MainMeue extends Container {
  app: applt;
  previous: any;
  constructor(app) {
    super();
    this.app = app;

    //@ts-ignore
    this.sortableChildren = true;
    this.interactive = true;

    this.setup();
  }
  setup() {
    let backround = new resizeableGraphics(this.app);

    backround.sprite = Sprite.from("src/images/HFG.svg");
    this.addChild(backround.sprite);
    backround.sprite.x = 0;
    backround.sprite.y = 0;
    //@ts-ignore
    backround.sprite.zIndex = 2;
    backround.onResize(() => {
      backround.clear();
      backround.lineStyle(4, 0x000000, 1);
      backround.beginFill(0x0000ff);
      backround.x = 0;
      backround.y = 0;
      let xy: xypair = this.app.toPos({ x: 500, y: 200 });
      backround.drawRect(0, 0, xy.x, xy.y);
      backround.endFill();

      let pos: xypair = this.app.toPos({ x: 135, y: 15 });

      backround.sprite.x = pos.x;
      backround.sprite.y = pos.y;
      backround.sprite.scale.x = this.app.xm;
      backround.sprite.scale.y = this.app.xm;
    });

    this.addChild(backround);

    let info = new resizeableGraphics(this.app);

    info.sprite = Sprite.from("src/icons/info_black_24dp.svg");
    this.addChild(info.sprite);
    info.sprite.x = 0;
    info.sprite.y = 0;
    //@ts-ignore
    info.sprite.zIndex = 2;
    info.onResize((color = 0x4f4f4f) => {
      info.clear();
      info.lineStyle(4, 0x000000, 1);
      info.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 20, y: 165 });
      info.x = xy.x;
      info.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 35, y: 25 });
      info.drawRect(0, 0, xysize.x, xysize.y);
      info.endFill();

      let pos: xypair = this.app.toPos({ x: 25.5, y: 168.5 });

      info.sprite.x = pos.x;
      info.sprite.y = pos.y;
      info.sprite.scale.x = this.app.xm;
      info.sprite.scale.y = this.app.xm;
    });

    info.onMouseover(() => {
      info.resize(0x737373);
    });

    info.onMouseout(() => {
      info.resize();
    });

    info.onClick(() => {
      if (this.app.curent === this) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.Info;
        this.app.secne.Info.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });

    this.addChild(info);

    let settings = new resizeableGraphics(this.app);

    settings.sprite = Sprite.from("src/icons/settings_black_24dp.svg");
    this.addChild(settings.sprite);
    settings.sprite.x = 0;
    settings.sprite.y = 0;
    //@ts-ignore
    settings.sprite.zIndex = 2;
    settings.onResize((color = 0x4f4f4f) => {
      settings.clear();
      settings.lineStyle(4, 0x000000, 1);
      settings.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 448, y: 165 });
      settings.x = xy.x;
      settings.y = xy.y;
      let xysize: xypair = this.app.toPos({ x: 35, y: 25 });
      settings.drawRect(0, 0, xysize.x, xysize.y);
      settings.endFill();

      let pos: xypair = this.app.toPos({ x: 453, y: 168.5 });

      settings.sprite.x = pos.x;
      settings.sprite.y = pos.y;
      settings.sprite.scale.x = this.app.xm;
      settings.sprite.scale.y = this.app.xm;
    });

    settings.onMouseover(() => {
      settings.resize(0x737373);
    });

    settings.onMouseout(() => {
      settings.resize();
    });

    settings.onClick(() => {
      if (this.app.curent === this) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.Controls;
        this.app.secne.Controls.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });

    this.addChild(settings);

    let solo = new resizeableGraphics(this.app);

    const soloStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 20
    });

    solo.text = new Text("Solo", soloStyle);
    this.addChild(solo.text);
    solo.text.x = 0;
    solo.text.y = 0;
    //@ts-ignore
    solo.text.zIndex = 2;
    solo.onResize((color = 0x4f4f4f) => {
      solo.clear();
      solo.lineStyle(4, 0x000000, 1);
      solo.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 440, y: 150 });
      solo.x = xy.x;
      solo.y = xy.y;

      let xy1: xypair = this.app.toPos({ x: 0, y: 0 });
      let xy2: xypair = this.app.toPos({ x: 0, y: -25 });
      let xy3: xypair = this.app.toPos({ x: -130, y: -25 });
      let xy4: xypair = this.app.toPos({ x: -100, y: 0 });

      solo.lineTo(xy1.x, xy1.y);
      solo.lineTo(xy2.x, xy2.y);
      solo.lineTo(xy3.x, xy3.y);
      solo.lineTo(xy4.x, xy4.y);
      solo.closePath();
      solo.endFill();

      let pos: xypair = this.app.toPos({ x: 365, y: 130 });

      solo.text.x = pos.x;
      solo.text.y = pos.y;
      solo.text.scale.x = this.app.xm;
      solo.text.scale.y = this.app.xm;
    });

    solo.onMouseover(() => {
      solo.resize(0x737373);
    });

    solo.onMouseout(() => {
      solo.resize();
    });

    this.addChild(solo);

    let local = new resizeableGraphics(this.app);

    const localStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 20
    });

    local.text = new Text("Local", localStyle);
    this.addChild(local.text);
    local.text.x = 0;
    local.text.y = 0;
    //@ts-ignore
    local.text.zIndex = 2;
    local.onResize((color = 0x4f4f4f) => {
      local.clear();
      local.lineStyle(4, 0x000000, 1);
      local.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 60, y: 150 });
      local.x = xy.x;
      local.y = xy.y;

      let xy1: xypair = this.app.toPos({ x: 0, y: 0 });
      let xy2: xypair = this.app.toPos({ x: 0, y: -25 });
      let xy3: xypair = this.app.toPos({ x: 130, y: -25 });
      let xy4: xypair = this.app.toPos({ x: 100, y: 0 });

      local.lineTo(xy1.x, xy1.y);
      local.lineTo(xy2.x, xy2.y);
      local.lineTo(xy3.x, xy3.y);
      local.lineTo(xy4.x, xy4.y);
      local.closePath();
      local.endFill();

      let pos: xypair = this.app.toPos({ x: 85, y: 130 });

      local.text.x = pos.x;
      local.text.y = pos.y;
      local.text.scale.x = this.app.xm;
      local.text.scale.y = this.app.xm;
    });

    local.onMouseover(() => {
      local.resize(0x737373);
    });

    local.onMouseout(() => {
      local.resize();
    });

    local.onClick(() => {
      if (this.app.curent === this) {
        //@ts-ignore
        this.app.curent.zIndex = 0;
        this.app.curent = this.app.secne.PlayerSelect;
        this.app.secne.PlayerSelect.setMode("l");
        this.app.secne.PlayerSelect.onswitchto(this);
        //@ts-ignore
        this.app.curent.zIndex = 1;
      }
    });

    this.addChild(local);

    let online = new resizeableGraphics(this.app);

    const onlineStyle = new TextStyle({
      fill: ["#000000"],
      fontSize: 20
    });

    online.text = new Text("Online", onlineStyle);
    this.addChild(online.text);
    online.text.x = 0;
    online.text.y = 0;
    //@ts-ignore
    online.text.zIndex = 2;
    online.onResize((color = 0x4f4f4f) => {
      online.clear();
      online.lineStyle(4, 0x000000, 1);
      online.beginFill(color);
      let xy: xypair = this.app.toPos({ x: 200, y: 150 });
      online.x = xy.x;
      online.y = xy.y;

      let xy1: xypair = this.app.toPos({ x: -30, y: 0 });
      let xy2: xypair = this.app.toPos({ x: 0, y: -25 });
      let xy3: xypair = this.app.toPos({ x: 100, y: -25 });
      let xy4: xypair = this.app.toPos({ x: 130, y: 0 });

      online.lineTo(xy1.x, xy1.y);
      online.lineTo(xy2.x, xy2.y);
      online.lineTo(xy3.x, xy3.y);
      online.lineTo(xy4.x, xy4.y);
      online.closePath();
      online.endFill();

      let pos: xypair = this.app.toPos({ x: 220, y: 130 });

      online.text.x = pos.x;
      online.text.y = pos.y;
      online.text.scale.x = this.app.xm;
      online.text.scale.y = this.app.xm;

      const soloStyle = new TextStyle({
        fill: ["#000000"],
        fontSize: 20
      });

      let v = this.app.data ? this.app.data.version : " ";

      let version = new resizeableText(this.app, v, soloStyle, 400, 10);

      this.addChild(version);
    });

    online.onMouseover(() => {
      online.resize(0x737373);
    });

    online.onMouseout(() => {
      online.resize();
    });

    this.addChild(online);

    let two = new resizeableGraphics(this.app);

    two.sprite = Sprite.from("src/icons/1p.png");
    this.addChild(two.sprite);
    two.sprite.x = 0;
    two.sprite.y = 0;
    //@ts-ignore
    two.sprite.zIndex = 2;
    two.onResize(() => {
      console.log(0.001 / this.app.xm);
      two.sprite.scale.x = this.app.xm / 2.5;
      two.sprite.scale.y = this.app.ym / 2.5;
    });
  }

  resize() {}

  onswitchto(pre) {
    this.previous = pre;
  }

  update(delta) {}
}
