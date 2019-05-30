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

    this.speedFactor = 1;
    this.scaleFactor = 1;

    this.setUpdatePeriod(60);

    // Initialize LSystem objects
    this.axiom = 'X';
    this.ruleF = 'FF';
    this.ruleX = 'F[-X][X]F[-X]+FX';
    this.angle = 25.0;
    this.iterations = 3;
    this.scaleFactor = 0.5;

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.bird = new MyBird(this);
    this.lightning = new MyLightning(this);

    this.rulesX = [];
    this.rulesX.push('F-FF+[+F-F-F+X]-[-F+F+F-X-X+F+F]');
    this.rulesX.push('F-X+[+F-F-F+X]-[-F+F+F-X-X+F+F]');
    this.rulesX.push('FF+X+[+F-F-F+X]');
    this.rulesX.push('F+F+[+F-F-F+X+X]');
    this.rulesX.push('F+X-[+F-F-F+X+X]');


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

    this.doGenerate =
        function() {
      this.lightning.generate(
          this.axiom, {'F': [this.ruleF], 'X': this.rulesX}, this.angle,
          this.iterations, this.scaleFactor);
    }

        // do initial generation
        this.doGenerate();


    // Objects connected to MyInterface

    // shaders
    this.selectedShader = 0;

    this.shaderList = {
      'Texture Only': 0,
      'Gradient Only': 1,
      'Final Shader': 2,
    }
  }

  checkKeys() {
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
    // this.lightning.update(t);
    this.checkKeys();
  }

  onSpeedFactorChanged() {
    this.bird.updateSpeedFactor(this.speedFactor);
  }

  onScaleFactorChanged() {
    this.bird.updateScaleFactor(this.scaleFactor);
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
    // this.lightning.startAnimation();

    // ---- END Primitive drawing section
  }
}