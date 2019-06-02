class MyLeaf extends CGFobject {
  constructor(scene) {
    super(scene);
    this.leaf = new MyTriangle(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.scale(2, 2, 2);
    this.scene.materialLeaf.apply();
    this.leaf.display();
    this.scene.popMatrix()
  }
}