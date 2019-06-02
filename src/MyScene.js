/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);

    this.birdSpeedFactor = 1;
    this.birdScaleFactor = 1;

    this.setUpdatePeriod(60);


    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.bird = new MyBird(this);
    this.lightning = new MyLightning(this);
    this.nest = new MyNest(this);
    this.branches = [
      new MyMovableBranch(this, -5 , 3.5, 5, Math.PI/3),
      new MyMovableBranch(this, 5 , 3.5, -5, 0),
      new MyMovableBranch(this, -5 , 3.5, -5, Math.PI/2),
    ]



    // this.rulesX.push('FF+[+F-F-F]-[-F+F+F]');
    /*
    this.rulesX.push('F[-X][X]F[-X]+X');
    this.rulesX.push('F[-X][x]+X');
    this.rulesX.push('F[+X]-X');
    this.rulesX.push('F[/X][X]F[\\X]+X');
    this.rulesX.push('F[\X][X]/X');
    this.rulesX.push('F[/X]\X');
    this.rulesX.push('F[^X][X]F[&X]^X');
    this.rulesX.push('F[^X]&X');
    this.rulesX.push('F[&X]^X');
    */



    // do initial generation


    this.axiom = 'X';   // "X"; //
    this.ruleF = 'FF';  // "FF"; //
    this.ruleX = 'F[-X][X]F[-X]+FX';
    this.angle = 30.0;
    this.iterations = 4;
    this.scaleFactor = 0.5;
    this.plant = new MyLSPlant(this);

    this.wood = new CGFappearance(this);
    this.wood.setShininess(10.0);
    this.wood.setAmbient(0.1, 0.1, 0.1, 1);
    this.wood.setSpecular(0.1, 0.1, 0.1, 1);
    this.wood.setDiffuse(0.9, 0.9, 0.9, 1);
    this.wood.loadTexture('images/wood.jpeg');

    this.materialLeaf = new CGFappearance(this);
    this.materialLeaf.setAmbient(0.9, 0.9, 0.9, 1);
    this.materialLeaf.setDiffuse(0.9, 0.9, 0.9, 1);
    this.materialLeaf.setSpecular(0.9, 0.9, 0.9, 1);
    this.materialLeaf.setShininess(10.0);
    this.materialLeaf.loadTexture('images/leaf.jpg');

    this.eyeColor = new CGFappearance(this);
    this.eyeColor.setAmbient(0.9, 0.9, 0.9, 1);
    this.eyeColor.setDiffuse(0.9, 0.9, 0.9, 1);
    this.eyeColor.setSpecular(0.9, 0.9, 0.9, 1);
    this.eyeColor.setShininess(10.0);
    this.eyeColor.loadTexture('images/black.jpeg');

    this.rulesX = [];
    this.rulesX.push('F[-X][X]F[-X]+X');
    this.rulesX.push('F[-X][x]+X');
    this.rulesX.push('F[+X]-X');
    this.rulesX.push('F[/X][X]F[\\X]+X');
    this.rulesX.push('F[\X][X]/X');
    this.rulesX.push('F[/X]\X');
    this.rulesX.push('F[^X][X]F[&X]^X');
    this.rulesX.push('F[^X]&X');
    this.rulesX.push('F[&X]^X');

    this.doGenerate = () => {
      this.plant.generate(
          this.axiom, {'F': [this.ruleF], 'X': this.rulesX}, this.angle,
          this.iterations, this.scaleFactor);
    };

    this.doGenerate();

    // Objects connected to MyInterface

    // shaders
    this.selectedShader = 2;

    this.shaderList = {
      'Texture Only': 0,
      'Gradient Only': 1,
      'Final Shader': 2,
    }
  }

  checkKeys(t) {
    let text = 'Keys pressed: ';
    let keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed('KeyW')) {
      text += ' W ';
      keysPressed = true;
      this.bird.accelerate(0.01);
    }

    if (this.gui.isKeyPressed('KeyS')) {
      text += ' S ';
      keysPressed = true;
      this.bird.accelerate(-0.01);
    }

    if (this.gui.isKeyPressed('KeyA')) {
      text += ' A ';
      keysPressed = true;
      this.bird.turn(3);
    }

    if (this.gui.isKeyPressed('KeyD')) {
      text += ' D ';
      keysPressed = true;
      this.bird.turn(-3);
    }

    if (this.gui.isKeyPressed('KeyR')) {
      text += ' R ';
      keysPressed = true;
      this.bird.reset();
    }

    if (this.gui.isKeyPressed('KeyL')) {
      text += ' L ';
      keysPressed = true;
      this.lightning.startAnimation(t);
    }

    if (keysPressed) {
      console.log(text);
    }
  }


  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
        0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }



  update(t) {
    this.bird.update(t);
    this.lightning.update(t);
    this.checkKeys(t);
  }

  onSpeedFactorChanged() {
    this.bird.updateSpeedFactor(this.birdSpeedFactor);
  }

  onScaleFactorChanged() {
    this.bird.updateScaleFactor(this.birdScaleFactor);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to
    // the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    // Apply default appearance
    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
    this.terrain.display(this.selectedShader);

    this.bird.display();

    this.lightning.display();
    this.pushMatrix();
    this.translate(1, 4, 3);
    this.scale(1.25, 1.25, 1.25);
    this.plant.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1, 4, -13);
    this.scale(2, 2, 2);
    this.plant.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(8, 4, 1);
    this.plant.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(8, 4, 7);
    this.plant.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-17, 4, 7);
    this.plant.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-8, 4, -7);
    this.scale(2, 2, 2);
    this.plant.display();
    this.popMatrix();

    this.nest.display();

    this.branches[0].display();
    this.branches[1].display();
    this.branches[2].display();

    // ---- END Primitive drawing section
  }
}