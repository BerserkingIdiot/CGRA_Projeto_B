class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCube(scene);
    this.wing = new MyDiamond(scene);
  }

  display(scene) {
    this.scene.pushMatrix();
    this.scene.translate(0, 3, 0);
    this.scene.scale(1, 1, 1);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.7, 0.7, 0.7);
    this.scene.translate(-1, 4.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.7, 0.7, 0.7);
    this.scene.translate(1, 4.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.wing.display();
    this.scene.popMatrix();
  }
}
