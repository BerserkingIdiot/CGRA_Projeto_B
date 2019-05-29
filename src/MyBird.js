class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCube(scene);
    this.wing = new MyDiamond(scene);
    this.x = 0;
    this.y = 3;
    this.z = 0;
    this.wingAngle = 0;
    this.orientation = 0;  // Angle around yy axis
    this.speed = 0;        // Movement speed
    this.maxSpeed = 20;
    this.acceleration = 0;
  }

  turn(v) {
    if (this.orientation * Math.PI / 180 > 2 * Math.PI) {
      this.orientation = 0;
    }
    this.orientation += v;
  }

  accelerate(v) {
    this.speed += v;
    if(this.speed < 0)
      this.speed = 0;
  }

  update(t) {
    this.y = 3 + Math.sin(t / 100 % 500) * 0.5;
    this.wingAngle = Math.PI / 8 * Math.sin(t / 100 % 500);
    this.x += Math.sin(this.orientation * Math.PI / 180) * this.speed;
    this.z += Math.cos(this.orientation * Math.PI / 180) * this.speed;
    this.acceleration -= 1000;
  }

  display(scene) {
    this.scene.pushMatrix();

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation * Math.PI / 180, 0,1,0);

    // Body
    this.scene.pushMatrix();
    //this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(1, 1, 1);
    this.cube.display();
    this.scene.popMatrix();
    //===============================

    // Wing 1
    this.scene.pushMatrix();
    //this.scene.translate(this.x, this.y, this.z);
    this.scene.translate(-0.65, 0, 0);
    this.scene.rotate(this.wingAngle, 0, 0, 1);
    this.scene.translate(-0.35, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.wing.display();
    this.scene.popMatrix();
    //=========
    // Wing 2
    this.scene.pushMatrix();
    //this.scene.translate(this.x, this.y, this.z);
    this.scene.translate(0.65, 0, 0);
    this.scene.rotate(-this.wingAngle, 0, 0, 1);
    this.scene.translate(0.35, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
