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

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new Plane(this, 32);
    this.bird = new MyBird(this);

    this.initMatsTextures();

    // Objects connected to MyInterface
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

  initMatsTextures() {
    this.terrainMat = new CGFappearance(this);
    this.terrainMat.setAmbient(0.3, 0.3, 0.3, 1);
    this.terrainMat.setDiffuse(0.7, 0.7, 0.7, 1);
    this.terrainMat.setSpecular(0.0, 0.0, 0.0, 1);
    this.terrainMat.setShininess(120);

    this.terrainTexture1 = new CGFtexture(this, 'images/terrain.jpg');
    this.terrainMat.setTexture(this.terrainTexture1);
    this.terrainMat.setTextureWrap('REPEAT', 'REPEAT');
    this.terrainTexture2 = new CGFtexture(this, 'images/heightmapWithPlat.jpg');
    this.terrainTexture3 = new CGFtexture(this, 'images/altimetry.png');

    // shaders
    this.selectedShader = 0;

    this.terrainShaders = [
      new CGFshader(
          this.gl, 'shaders/planeShader.vert',
          'shaders/textureOnlyShader.frag'),
      new CGFshader(
          this.gl, 'shaders/planeShader.vert',
          'shaders/gradientOnlyShader.frag'),
      new CGFshader(
          this.gl, 'shaders/planeShader.vert', 'shaders/planeShader.frag'),
    ];

    this.terrainShaders[0].setUniformsValues({uSampler2: 1});
    this.terrainShaders[1].setUniformsValues({uSampler2: 1, uSampler3: 2});
    this.terrainShaders[2].setUniformsValues({uSampler2: 1, uSampler3: 2});

    this.shaderList = {
      'Texture Only': 0,
      'Gradient Only': 1,
      'Final Shader': 2,
    }
  }

  update(t) {
    this.bird.update(t);
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

    this.terrainMat.apply();
    this.setActiveShader(this.terrainShaders[this.selectedShader]);
    this.pushMatrix();

    this.terrainTexture2.bind(1);
    this.terrainTexture3.bind(2);

    this.gl.texParameteri(
        this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(
        this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

    // ---- BEGIN Primitive drawing section
    this.pushMatrix();


    this.rotate(-0.5 * Math.PI, 1, 0, 0);
    this.scale(60, 60, 10);
    this.plane.display();
    this.popMatrix();

    this.popMatrix();

    // restore default shader (will be needed for drawing the axis in next
    // frame)
    this.setActiveShader(this.defaultShader);

    this.bird.display();

    // ---- END Primitive drawing section
  }
}