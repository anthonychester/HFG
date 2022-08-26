import { resizeableGraphics } from "./resizeableGraphics";

export function backroundCreate(app, color: String): resizeableGraphics {
  let backround = new resizeableGraphics(this.app);

  backround.onResize(() => {
    backround.clear();
    backround.lineStyle(4, 0x000000, 1);
    backround.beginFill(color);
    backround.x = 0;
    backround.y = 0;
    let xy: xypair = app.toPos({ x: 500, y: 250 });
    backround.drawRect(0, 0, xy.x, xy.y);
    backround.endFill();
  });
  return backround;
}
