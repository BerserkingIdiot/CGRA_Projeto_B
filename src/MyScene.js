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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);

        this.initMatsTextures();

        //Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
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
        
        this.terrainTexture1 = new CGFtexture(this, "images/terrain.jpg");
		this.terrainMat.setTexture(this.terrainTexture1);
        this.terrainMat.setTextureWrap('REPEAT', 'REPEAT');
        this.terrainTexture2 = new CGFtexture(this, "images/heightmap.jpg");

        this.terrainShader = new CGFshader(this.gl, "shaders/planeShader.vert", "shaders/planeShader.frag");
        this.terrainShader.setUniformsValues({ uSampler2: 1 });
    }

    update(t){

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        this.terrainMat.apply();
        this.setActiveShader(this.terrainShader);

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();

        this.terrainTexture2.bind(1);

        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}