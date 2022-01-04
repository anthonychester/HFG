//interface
//|||||||||||||||scale border width
import { Sprite } from "pixi.js";
import { applt } from "./app";
import { MainMeue } from "./MainMeue";
import { Settings } from "./Settings";
import { Info } from "./Info";
import { Controls } from "./Controls";
import { MapSelect } from "./MapSelect";

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
app.stage.sortableChildren = true;

document.body.appendChild(app.view);

app.secne = {
  MainMeue: new MainMeue(app),
  Settings: new Settings(app),
  Info: new Info(app),
  Controls: new Controls(app),
  MapSelect: new MapSelect(app)
};

app.curent = app.secne.MainMeue;

//@ts-ignore
app.curent.zIndex = 1;

const updatesize = new CustomEvent("updatesize", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false
});

function resize() {
  const inputImageAspectRatio = window.innerWidth / window.innerHeight;

  const outputImageAspectRatio = 16 / 9;

  let outputWidth = window.innerWidth;
  let outputHeight = window.innerHeight;

  if (inputImageAspectRatio > outputImageAspectRatio) {
    outputWidth = window.innerHeight * outputImageAspectRatio;
  } else if (inputImageAspectRatio < outputImageAspectRatio) {
    outputHeight = window.innerWidth / outputImageAspectRatio;
  }

  app.renderer.resize(outputWidth, outputHeight);

  app.xm = app.view.width / 500;
  app.ym = app.view.height / 200;

  window.dispatchEvent(updatesize);
}

function setup() {
  let Data = app.loader.resources["./src/data.json"];
  app.data = Data.data;
  resize();
}
app.xm = app.view.width / 500;
app.ym = app.view.height / 200;

for (let i in app.secne) {
  app.stage.addChild(app.secne[i]);
}

app.loader
  .add("./src/data.json", {
    crossOrigin: "anonymous"
  })
  .add("./src/maps/map1/map.png", {
    crossOrigin: "anonymous"
  })
  .add("LEMONMILK-Regular", "./src/fonts/LEMONMILK-Regular.otf", {
    crossOrigin: "anonymous"
  })
  .load(setup);

// Listen for animate update
app.ticker.add(function (delta) {
  //@ts-ignore
  app.curent.update(delta);
});

window.addEventListener("resize", resize);
