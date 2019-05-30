class MyLightning extends MyLSystem {
  constructor(scene) {
    super(scene);
    this.initialTime;
    this.depth;
  }

  initGrammar() {
    this.grammar = {X: new MyBranch(this.scene), F: new MyBranch(this.scene)};
  }

  startAnimation(t) {
    this.iterate();
    this.initialTime = t;
    this.depth = 0;
  }

  update(t) {
    this.depth += t - this.initialTime;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(this.scale, this.scale, this.scale);

    let i;

    // percorre a cadeia de caracteres
    for (i = 0; i < this.axiom.length; ++i) {
      // verifica se sao caracteres especiais
      switch (this.axiom[i]) {
        case '+':
          // roda a esquerda
          this.scene.rotate(this.angle, 0, 0, 1);
          break;

        case '-':
          // roda a direita
          this.scene.rotate(-this.angle, 0, 0, 1);
          break;

        case '[':
          // push
          this.scene.pushMatrix();
          break;

        case ']':
          // pop
          this.scene.popMatrix();
          break;
        case '/':
          // roda a direita
          this.scene.rotate(-this.angle, 1, 0, 0);
          break;
        case '\\':
          this.scene.rotate(this.angle, 1, 0, 0);
          break;

        // processa primitiva definida na gramatica, se existir
        default:
          let primitive = this.grammar[this.axiom[i]];

          if (primitive && i < this.depth) {
            primitive.display();
            this.scene.translate(0, 1, 0);
          }
          break;
      }
    }
  }
}
