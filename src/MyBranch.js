class MyBranch extends CGFobject {
  constructor(scene) {
    super(scene);
    this.branch = new MyCylinder(scene, 6, 0.5, 1);
  }
  display() {
    this.scene.wood.apply();
    this.branch.display();
  }
}