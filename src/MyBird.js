class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCube(scene);
    this.wing = new MyDiamond(scene);
    this.y = 1;
  }

  update(t) {
    this.y = Math.sin(t / 100 % 500);
  }

  display(scene) {
    this.scene.pushMatrix();

    this.scene.translate(0, this.y, 0);

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

    this.scene.popMatrix();
  }
}
