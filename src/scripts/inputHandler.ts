interface input {
  code: any;
  time: number;
  isCurPress: boolean;
  device: String;
}

interface playerControls {
  p1: {
    type: "keyboard";
    controls: {};
  };
  p2: {
    type: "keyboard";
    controls: {};
  };
}

export class inputHandler {
  input: any;
  app: any;
  controls: playerControls;
  constructor(app) {
    this.input = {};
    this.app = app;
    let controls = JSON.parse(localStorage.getItem("controls"));
    if (controls) {
    } else {
      let plcont: playerControls = {
        p1: {
          type: "keyboard",
          controls: this.app.data.control.player1
        },
        p2: {
          type: "keyboard",
          controls: this.app.data.control.player2
        }
      };
      localStorage.setItem("controls", JSON.stringify(plcont));
    }
  }

  onInput(fun, type?: String[]) {}

  isPress(code, player: String) {}

  update(d) {}
}
