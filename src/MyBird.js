class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCubeQuad(scene);
    this.wing = new MyDiamond(scene);
    this.beak = new MyPyramid(scene, 3);
    this.x = 0;
    this.y = 3;
    this.z = 0;
    this.wingAngle = 0;
    this.orientation = 0;  // Angle around yy axis
    this.speed = 0;        // Movement speed
    this.maxSpeed = 20;
    this.speedFactor = 1;
    this.scaleFactor = 1;
    // this.acceleration = 0;
  }

  turn(v) {
    if (this.orientation * Math.PI / 180 > 2 * Math.PI) {
      this.orientation = 0;
    }
    this.orientation += v * this.speedFactor;
  }

  accelerate(v) {
    this.speed += v;
    if (this.speed < 0) this.speed = 0;
  }

  reset() {
    this.x = 0;
    this.z = 0;
    this.orientation = 0;
    this.speed = 0;
  }

  updateSpeedFactor(factor) {
    this.speedFactor = factor;
  }

  updateScaleFactor(factor) {
    this.scaleFactor = factor;
  }

  update(t) {
    this.y = 8 + Math.sin(t / 100 * this.speedFactor % 500) * 0.5;
    this.wingAngle = Math.PI / 8 * Math.sin(t / 100 * this.speedFactor % 500);
    this.x += Math.sin(this.orientation * Math.PI / 180) * this.speed *
        this.speedFactor;
    this.z += Math.cos(this.orientation * Math.PI / 180) * this.speed *
        this.speedFactor;
    // this.acceleration -= 1000;
  }

  display(scene) {
    this.scene.pushMatrix();

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation * Math.PI / 180, 0, 1, 0);
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

    // Body
    this.scene.pushMatrix();
    // this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(1, 1, 1);
    this.cube.display();
    this.scene.popMatrix();
    //===============================

    // Head
    this.scene.pushMatrix();
    this.scene.translate(0, 0.85, 0.5);
    this.scene.scale(0.7, 0.7, 0.7);
    this.cube.display();
    this.scene.popMatrix();

    // Beak
    this.scene.pushMatrix();
    this.scene.translate(0, 0.7, 0.8);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.2, 0.4, 0.2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);

    this.beak.display();
    this.scene.popMatrix();

    // Eyes
    this.scene.pushMatrix();
    this.scene.eyeColor.apply();
    this.scene.translate(0.1, 1, 0.65);
    this.scene.scale(0.2, 0.2, 0.2);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.1, 1, 0.65);
    this.scene.scale(0.2, 0.2, 0.2);
    this.cube.display();
    this.scene.popMatrix();

    // Legs
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.3, 0.1);
    this.scene.translate(-2, -2, 2);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.3, 0.1);
    this.scene.translate(2, -2, 2);
    this.cube.display();
    this.scene.popMatrix();


    // Wing 1
    this.scene.pushMatrix();
    // this.scene.translate(this.x, this.y, this.z);
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
    // this.scene.translate(this.x, this.y, this.z);
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
