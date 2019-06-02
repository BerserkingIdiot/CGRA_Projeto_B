class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(this.scene, 6);
        this.baseQuad = new MyQuad(this.scene);
        this.x = 5;
        this.y = 4;
        this.z = 5;

        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.nestMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.nestMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.nestMaterial.setShininess(120);

        this.nestTexture = new CGFtexture(this.scene, 'images/nest.jpg');
        this.nestMaterial.setTexture(this.nestTexture);
    }

    setCylinder(){
        this.scene.translate(1, 0.25, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 1, 0.25);
        this.scene.translate(0, -0.5, 0);
    }

    display(){
        
        this.scene.pushMatrix();
        
        this.scene.translate(this.x,this.y,this.z);
        this.nestMaterial.apply();

        //display base
        this.scene.pushMatrix();
        this.scene.scale(1.75, 1, 1.75);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.baseQuad.display();
        this.scene.popMatrix();

        //dsplay border
        //1
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //2
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //3
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //4
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //5
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //6
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //7
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();
        //8
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.pushMatrix();
        this.setCylinder();
        this.cylinder.display();
        this.scene.popMatrix();

        this.setCylinder();
        this.scene.popMatrix();
    }
}