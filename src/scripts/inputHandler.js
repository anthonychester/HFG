export class inputHandler {
  constructor(app) {
    this.input = {};
    this.app = app;
    let controls = JSON.parse(localStorage.getItem("controls"));
    if (controls) {
    } else {
      let plcont = {
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

  onInput(fun, type) {}

  isPress(code, player) {}

  update(d) {}
}
