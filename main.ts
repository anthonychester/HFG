//interface
//|||||||||||||||scale border width
import * as PIXI from "pixi.js";

import { applt } from "./app";
import { MainMeue } from "./pages/MainMeue";
import { Settings } from "./Settings";
import { Info } from "./Info";
import { Controls } from "./Controls";
import { MapSelect } from "./MapSelect";
import { PlayerSelect } from "./PlayerSelect";
import { LoadingScreen } from "./LoadingScreen";
import { Stage } from "./Stage";
import JoyconMod from "./mods/Joycon/main";
import { inputHandler } from "./src/scripts/inputHandler";
import { Loading } from "./Loading";

const inputImageAspectRatio = window.innerWidth / window.innerHeight;

const outputImageAspectRatio = 16 / 9;

let outputWidth = window.innerWidth;
let outputHeight = window.innerHeight;

if (inputImageAspectRatio > outputImageAspectRatio) {
  outputWidth = window.innerHeight * outputImageAspectRatio;
} else if (inputImageAspectRatio < outputImageAspectRatio) {
  outputHeight = window.innerWidth / outputImageAspectRatio;
}

let res = window.devicePixelRatio || 1;

const app = new applt(outputWidth, outputHeight, {
  autoResize: true,
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  //@ts-ignore
  resolution: res,
  backgroundColor: 0x1099bb
});
//@ts-ignore
app.loader = PIXI.Loader.shared;
app.mods = {};
app.loading = new Loading(app);
app.stage.addChild(app.loading);
//@ts-ignore
app.stage.sortableChildren = true;

document.body.appendChild(app.view);

app.secne = {
  MainMeue: new MainMeue(app),
  Settings: new Settings(app),
  Info: new Info(app),
  Controls: new Controls(app),
  MapSelect: new MapSelect(app),
  PlayerSelect: new PlayerSelect(app),
  LoadingScreen: new LoadingScreen(app),
  Stage: new Stage(app)
};

app.curent = app.secne.MainMeue;
//@ts-ignore
app.curent.zIndex = 1;

app.updatesize = new CustomEvent("updatesize", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false
});

const updateloaded = new CustomEvent("loaded", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false
});

let loaded = false;

function setup() {
  let Data = app.loader.resources["./src/data.json"];
  app.data = Data.data;

  app.mods["JoyconMod"] = new JoyconMod(
    app,
    app.loader.resources["./mods/Joycon/data.json"].data
  );
  app.inputHandler = new inputHandler(app);
  app.loading.disable();
  app.resize();
  window.dispatchEvent(updateloaded);
  loaded = true;
}
app.xm = app.view.width / 500;
app.ym = app.view.height / 200;

for (let i in app.secne) {
  app.stage.addChild(app.secne[i]);
}
if (!loaded) {
  app.loader
    .add("./src/data.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/images/circle/spritesheet.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/players/MH1/spritesheet.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/players/MH1/data.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/players/MH2/spritesheet.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/players/MH2/data.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/maps/map1/data.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/maps/map1/map.png", {
      crossOrigin: "anonymous"
    })
    .add("LEMONMILK-Regular", "./src/fonts/LEMONMILK-Regular.otf", {
      crossOrigin: "anonymous"
    })
    .add("./mods/Joycon/data.json", {
      crossOrigin: "anonymous"
    })
    .add("./src/icons/MainMeue/InfoIcon.png", {
      crossOrigin: "anonymous"
    })
    .add("./src/icons/MainMeue/InfoIcon-Dark.png", {
      crossOrigin: "anonymous"
    })
    .add("./src/icons/MainMeue/Settings.png", {
      crossOrigin: "anonymous"
    })
    .add("./src/icons/MainMeue/Settings-Dark.png", {
      crossOrigin: "anonymous"
    })
    .load(setup);
}
app.loading.inable();
// Listen for animate update
app.ticker.add(function (delta) {
  if (loaded) {
    //@ts-ignore
    app.curent.update(delta);
    app.inputHandler.update(delta);
  } else {
    app.loading.update(delta);
  }
});

window.addEventListener("resize", app.resize);
