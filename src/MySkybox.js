class MySkybox extends CGFobject {
    constructor(scene){
        super(scene);
        this.skyboxCube = new MyCubeMap(this.scene);

        this.skyboxMat = new CGFappearance(this.scene);
        this.skyboxMat.setAmbient(1, 1, 1, 1);
        this.skyboxMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.skyboxMat.setSpecular(0.1, 0.1, 0.1, 1);
        this.skyboxMat.setShininess(10.0);
        this.skybox_day = new CGFtexture(this.scene, 'images/cloudtop_skybox.png');
        this.skyboxMat.setTexture(this.skybox_day);
    }

    display(){
        this.scene.pushMatrix();
        this.skyboxMat.apply();
        this.scene.scale(60, 60, 60);
        this.skyboxCube.display();
        this.scene.popMatrix();
    }
}