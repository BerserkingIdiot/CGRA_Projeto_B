class MyLightning extends MyLSystem {
  constructor(scene) {
    super(scene);
    this.initialTime = 0;
    this.depth = 0;
    this.printLightning = false;

    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(1, 1, 1, 1);
    this.material.setSpecular(0, 0, 0, 1);
    this.material.setShininess(100);
  }

  initGrammar() {
    this.grammar = {X: new MyBranch(this.scene), F: new MyBranch(this.scene)};
  }

  startAnimation(t) {
    this.iterate();
    this.initialTime = t;
    this.depth = 0;
    this.printLightning = true;
  }

  update(t) {
    console.log('Depth: ' + this.depth);
    console.log('t: ' + t);
    console.log('Initial time: ' + this.initialTime);
    this.depth = (t - this.initialTime) / 100;
  }

  display() {
    this.scene.pushMatrix();
    this.material.apply();
    this.scene.scale(this.scale, this.scale, this.scale);
    this.scene.translate(1, 30, 1);
    this.scene.rotate(Math.PI, 0, 0, 1);

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
          if (primitive && i < this.depth && this.printLightning) {
            primitive.display();
            this.scene.translate(0, 1, 0);
          } else if (this.depth > 10) {
            console.log('oi');
            this.printLightning = false;
          }
          break;
      }
    }
    this.scene.popMatrix();
  }
}
