export class physicsEngine {

  constructor(app) {
    this.ent = [];
    this.app = app;
  }

  add(ent, data) {
    this.ent.push({ ent: ent, data: data });
  }

  update(d) {
    let physics = this.app.data.physics;
    for (let i = 0; i < this.ent.length; i++) {
      let ent = this.ent[i].ent;

      ent.gravitySpeed += physics.gravity;
      ent.x += ent.speedX;
      ent.y += ent.speedY + ent.gravitySpeed;

      if (ent.y >= ent.limit.y) {
        ent.jumps = 0;
        ent.y = ent.limit.y;
        ent.onGround = true;
        ent.gravitySpeed = 0;
        ent.speedY = 0;
        //this.out += " " + this.sprite.height;
      } else {
        ent.onGround = false;
      }

      if (ent.y <= ent.padding) {
        ent.jumps = 0;
        ent.y = ent.padding;
        ent.onGround = true;
        ent.gravitySpeed = 0;
        ent.speedY = 0;
      }

      if (ent.x <= ent.padding) {
        ent.x = ent.padding;
        ent.speedX = 0;
      }

      if (ent.x >= ent.limit.x) {
        ent.x = ent.limit.x;
        ent.speedX = 0;
      }

      if (ent.speedX === 0) {
      } else if (ent.speedX > 0) {
        ent.speedX -= 0.2;
      } else if (ent.speedX < 0) {
        ent.speedX += 0.2;
      }
    }
  }
}
