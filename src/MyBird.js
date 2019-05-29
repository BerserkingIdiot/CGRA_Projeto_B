class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCube(scene);
    this.wing = new MyDiamond(scene);
    this.y = 1;
    this.wingAngle = 0;
  }

  update(t) {
    this.y = Math.sin(t / 100 % 500);
    this.wingAngle = Math.PI / 8 * Math.sin(t / 100 % 500);
  }

  display(scene) {
    this.scene.pushMatrix();

    this.scene.translate(0, this.y, 0);

    // Body
    this.scene.pushMatrix();
    this.scene.translate(0, 3, 0);
    this.scene.scale(1, 1, 1);
    this.cube.display();
    this.scene.popMatrix();
    //===============================

    // Wing 1

    this.scene.pushMatrix();
    this.scene.translate(-0.65, 3, 0);
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
    this.scene.translate(0.65, 3, 0);
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
