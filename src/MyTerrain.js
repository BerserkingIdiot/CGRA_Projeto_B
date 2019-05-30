class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new Plane(this.scene, 32);

        this.initMatsTextures();

    }

    initMatsTextures() {
        this.terrainMat = new CGFappearance(this.scene);
        this.terrainMat.setAmbient(0.3, 0.3, 0.3, 1);
        this.terrainMat.setDiffuse(0.7, 0.7, 0.7, 1);
        this.terrainMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.terrainMat.setShininess(120);
    
        this.terrainTexture1 = new CGFtexture(this.scene, 'images/terrain.jpg');
        this.terrainMat.setTexture(this.terrainTexture1);
        this.terrainMat.setTextureWrap('REPEAT', 'REPEAT');
        this.terrainTexture2 = new CGFtexture(this.scene, 'images/heightmapWithPlat.jpg');
        this.terrainTexture3 = new CGFtexture(this.scene, 'images/altimetry.png');
    
        
    
        this.terrainShaders = [
          new CGFshader(
              this.scene.gl, 'shaders/planeShader.vert',
              'shaders/textureOnlyShader.frag'),
          new CGFshader(
              this.scene.gl, 'shaders/planeShader.vert',
              'shaders/gradientOnlyShader.frag'),
          new CGFshader(
              this.scene.gl, 'shaders/planeShader.vert', 'shaders/planeShader.frag'),
        ];
    
        this.terrainShaders[0].setUniformsValues({uSampler2: 1});
        this.terrainShaders[1].setUniformsValues({uSampler2: 1, uSampler3: 2});
        this.terrainShaders[2].setUniformsValues({uSampler2: 1, uSampler3: 2});
    
        
      }

      display(shader){
        this.terrainMat.apply();
        this.scene.setActiveShader(this.terrainShaders[shader]);
        this.scene.pushMatrix();
    
        this.terrainTexture2.bind(1);
        this.terrainTexture3.bind(2);
    
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
    
        this.scene.pushMatrix();
    
    
        this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 10);
        this.plane.display();
        this.scene.popMatrix();
    
        this.scene.popMatrix();

        // restore default shader (will be needed for drawing the axis in next
        // frame)
        this.scene.setActiveShader(this.scene.defaultShader);
      }
}