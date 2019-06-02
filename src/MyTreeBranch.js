class MyTreeBranch extends CGFobject {
    constructor(scene, x, y, z, ang){
        super(scene);
        this.branch = new MyBranch(this.scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.angle = ang;
        this.isHeld = false;
    }

    updateAngle(ang){
        this.angle += ang;
    }

    updatePosition(x, y, z){
        this.x += x;
        this.y += y;
        this.z += z;
    }

    checkContact(x, y, z){
        if( x < this.x + 0.5 && x > this.x - 0.5 &&
            z < this.z + 0.5 && z > this.z - 0.5)
            return true;
        else
            return false;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(0.1, 1, 0.1);
        this.branch.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);

        this.scene.translate(0.4, 0.5, 0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(0.05, 0.5, 0.05);
        this.branch.display();
        this.scene.popMatrix();
    }
}