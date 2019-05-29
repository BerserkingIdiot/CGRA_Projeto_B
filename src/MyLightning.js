class MyLightning extends MyLSystem {
  constructor(scene) {
    super(scene);
  }

  initGrammar() {
    this.grammar = {X: new MyBranch(this.scene), F: new MyBranch(this.scene)};
  }
}
