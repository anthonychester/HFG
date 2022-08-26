import { applt } from "./app";
//@ts-ignore
import * as assests from "./src/assests.json";
//@ts-ignore
import * as characters from "./src/characters/characters.json";

interface Assests {
  unnamed: string[];
  named: string[][];
}

export class Loader {
  app: applt;
  assests: Assests;
  toload: number;

  constructor(app) {
    this.app = app;
    this.assests = assests;
    this.toload = 0;
  }

  add(url: string) {
    this.assests.unnamed.push(url);
  }
  addname(name: string, url: string) {
    this.assests.named.push([name, url]);
  }

  load() {
    this.loadCharacters();

    for (let i in this.assests.unnamed) {
      this.toload += 1;
      this.app.loader.add(this.assests.unnamed[i], {
        crossOrigin: "anonymous"
      });
    }
    for (let i in this.assests.named) {
      this.toload += 1;
      this.app.loader.add(this.assests.named[i][0], this.assests.named[i][1], {
        crossOrigin: "anonymous"
      });
    }
    //called once per loaded asset
    this.app.loader.onProgress.add(() => {
      this.app.loading.progess();
    });
    //this.app.loader.load(());
    this.app.loader.load(this.app.onLoad);
  }

  loadCharacters() {
    for (let i in characters.list) {
      let loc = "./src/characters/" + characters.list[i].location;
      let select = loc + "/select/";
      this.add(select + "full.png");
      this.add(select + "icon.png");
      this.add(select + "text.png");
      this.add(loc + "atlas.png");
      this.add(loc + "data.json");
      this.add(loc + "moves.json");
      this.add(loc + "spritesheet.json");
    }
  }
}
