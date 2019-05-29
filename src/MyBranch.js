class MyBranch extends CGFobject {
  constructor(scene) {
    super(scene);
    this.branch = new MyQuad(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.scale(0.2, 1.7, 0.2);
    this.branch.display();
    this.scene.popMatrix();
  }
}