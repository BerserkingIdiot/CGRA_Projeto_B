class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.prism = new MyPrism(scene, 6);
        this.pyramid = new MyPyramid(scene, 4);

        this.roofTexture = new CGFtexture(this.scene, 'images/roof.jpg');
        this.pillarTexture = new CGFtexture(this.scene, 'images/pillarMetal.png');
        this.wallTexture = new CGFtexture(this.scene, 'images/wall.jpg');
        this.doorTexture = new CGFtexture(this.scene, 'images/door.jpg');
        this.windowTexture = new CGFtexture(this.scene, 'images/window2.jpg');

        this.roofMat = new CGFappearance(this.scene);
        this.roofMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMat.setSpecular(0, 0, 0, 1);
        this.roofMat.setShininess(10.0);
        this.roofMat.setTexture(this.roofTexture);

        this.pillarMat = new CGFappearance(this.scene);
        this.pillarMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillarMat.setDiffuse(0.3, 0.3, 0.3, 1);
        this.pillarMat.setSpecular(0.9, 0.9, 0.9, 1);
        this.pillarMat.setShininess(10.0);
        this.pillarMat.setTexture(this.pillarTexture);

        this.wallMat = new CGFappearance(this.scene);
        this.wallMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.wallMat.setDiffuse(1, 1, 1, 1);
        this.wallMat.setSpecular(0, 0, 0, 1);
        this.wallMat.setShininess(10.0);
        this.wallMat.setTexture(this.wallTexture);

        this.doorMat = new CGFappearance(this.scene);
        this.doorMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.doorMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.doorMat.setSpecular(0.3, 0.3, 0.3, 1);
        this.doorMat.setShininess(10.0);
        this.doorMat.setTexture(this.doorTexture);

        this.windowMat = new CGFappearance(this.scene);
        this.windowMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.windowMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.windowMat.setSpecular(0.3, 0.3, 0.3, 1);
        this.windowMat.setShininess(10.0);
        this.windowMat.setTexture(this.windowTexture);
    }   

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 4, -3);

        //base cube  
        this.wallMat.apply();

        this.scene.pushMatrix();
        this.scene.scale(4,2,4);
        this.scene.translate(0,0.25,0);
        this.cube.display();
        this.scene.popMatrix();

        //WINDOW 1
        this.windowMat.apply();

        this.scene.pushMatrix();
        this.scene.scale(1,1,2.5);
        this.scene.translate(0.77,0.6,0);
        this.cube.display();
        this.scene.popMatrix();

        //window 2
        this.scene.pushMatrix();
        this.scene.scale(1,1,2.5);
        this.scene.translate(-0.77,0.6,0);
        this.cube.display();
        this.scene.popMatrix();

        ///////

        //DOOR
        this.doorMat.apply();
        this.scene.pushMatrix();
        this.scene.scale(1,1.7,1);
        this.scene.translate(0,0.25,0.77);
        this.cube.display();
        this.scene.popMatrix();

        //pillars
        this.pillarMat.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(7,0,7);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(-7,0,-7);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(7,0,-7);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(-7,0,7);
        this.prism.display();
        this.scene.popMatrix();

        //roof

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.translate(0,1,0);
        this.scene.scale(2.25,1.25,2.25);
        this.roofMat.apply();
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}