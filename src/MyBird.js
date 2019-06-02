class MyBird extends CGFobject {
  constructor(scene) {
    super(scene);
    this.cube = new MyUnitCubeQuad(scene);
    this.wing = new MyDiamond(scene);
    this.beak = new MyPyramid(scene, 3);
    this.x = 0;
    this.y = 8;
    this.z = 0;
    this.wingAngle = 0;
    this.orientation = 0;  // Angle around yy axis
    this.speed = 0;        // Movement speed
    this.maxSpeed = 20;
    this.speedFactor = 1;
    this.scaleFactor = 1;
    this.isInPickupAnimation = false;
    this.isDescending = false;
    this.pickupAnimationSpeed = (this.y - 4.5) / (1000/60);
    this.hasBranch = false;
    // this.acceleration = 0;
  }

  turn(v) {

    this.oldang = this.orientation;

    if (this.orientation * Math.PI / 180 > 2 * Math.PI) {
      this.orientation = 0;
    }
    this.orientation += v * this.speedFactor;

    if(this.scene.branches[0].isHeld){
      this.scene.branches[0].updateAngle((this.orientation - this.oldang)* Math.PI /180);}
    else if(this.scene.branches[1].isHeld){
      this.scene.branches[1].updateAngle((this.orientation - this.oldang)* Math.PI /180);}
    else if(this.scene.branches[2].isHeld){
      this.scene.branches[2].updateAngle((this.orientation - this.oldang)* Math.PI /180);}
  }

  accelerate(v) {
    this.speed += v;
    if (this.speed < 0) this.speed = 0;
  }

  reset() {
    this.x = 0;
    this.z = 0;
    this.orientation = 0;
    this.speed = 0;
  }

  updateSpeedFactor(factor) {
    this.speedFactor = factor;
  }

  updateScaleFactor(factor) {
    this.scaleFactor = factor;
  }

  initiatePickupAnimation(){
    this.isInPickupAnimation = true;
    this.isDescending = true;
  }

  pickupAndAscend(){
    this.isDescending = false;
    if(!this.hasBranch && !this.scene.nest.checkContact(this.x, this.y, this.z)){
      if(this.scene.branches[0].checkContact(this.x, this.y, this.z)){
        this.scene.branches[0].isHeld = true;
        this.hasBranch = true;}
      else if(this.scene.branches[1].checkContact(this.x, this.y, this.z)){
        this.scene.branches[1].isHeld = true;
        this.hasBranch = true;}
      else if(this.scene.branches[2].checkContact(this.x, this.y, this.z)){
        this.scene.branches[2].isHeld = true;
        this.hasBranch = true;}
    }
    else if(this.hasBranch && this.scene.nest.checkContact(this.x, this.y, this.z)){
      if(this.scene.branches[0].isHeld){
        this.scene.branches[0].isHeld = false;
        this.hasBranch = false;}
      else if(this.scene.branches[1].isHeld){
        this.scene.branches[1].isHeld = false;
        this.hasBranch = false;}
      else if(this.scene.branches[2].isHeld){
        this.scene.branches[2].isHeld = false;
        this.hasBranch = false;}    
    }
  }

  update(t) {
    this.oldx = this.x;
    this.oldy = this.y;
    this.oldz = this.z;
    if(!this.isInPickupAnimation){
      this.y = 8 + Math.sin(t / 100 * this.speedFactor % 1000) * 0.5;
    }
    else{
      if(this.isDescending){
        if(this.y <= 4.5){
          this.pickupAndAscend();
        }
        else{
          this.y -= this.pickupAnimationSpeed;
        }
          
      }
      else{
        if(this.y >= 8 + Math.sin(t / 100 * this.speedFactor % 500) * 0.5){
          this.isInPickupAnimation = false;
        }
        else{
          this.y += this.pickupAnimationSpeed;
        }
      }
    }
    this.wingAngle = Math.PI / 8 * Math.sin(t / 100 * this.speedFactor % 500);
    this.x += Math.sin(this.orientation * Math.PI / 180) * this.speed *
        this.speedFactor;
    this.z += Math.cos(this.orientation * Math.PI / 180) * this.speed *
        this.speedFactor;
    // this.acceleration -= 1000;
    
    if(this.scene.branches[0].isHeld){
      this.scene.branches[0].updatePosition(this.x-this.oldx, this.y-this.oldy, this.z-this.oldz);}
    else if(this.scene.branches[1].isHeld){
      this.scene.branches[1].updatePosition(this.x-this.oldx, this.y-this.oldy, this.z-this.oldz);}
    else if(this.scene.branches[2].isHeld){
      this.scene.branches[2].updatePosition(this.x-this.oldx, this.y-this.oldy, this.z-this.oldz);}
  }

  display() {
    this.scene.pushMatrix();

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation * Math.PI / 180, 0, 1, 0);
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

    // Body
    this.scene.pushMatrix();
    // this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(1, 1, 1);
    this.scene.bodyColor.apply();
    this.cube.display();
    this.scene.popMatrix();
    //===============================

    // Head
    this.scene.pushMatrix();
    this.scene.translate(0, 0.4, 0.2);
    this.scene.scale(0.7, 0.7, 0.7);
    this.cube.display();
    this.scene.popMatrix();

    // Beak
    this.scene.pushMatrix();
    this.scene.translate(0, 0.4, 0.4);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.05, 0.1, 0.05);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.beakColor.apply();
    this.beak.display();
    this.scene.popMatrix();

    // Eyes
    this.scene.pushMatrix();
    this.scene.eyeColor.apply();
    this.scene.translate(0.1, 0.45, 0.38);
    this.scene.scale(0.1, 0.1, 0.1);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.1, 0.45, 0.38);
    this.scene.scale(0.1, 0.1, 0.1);
    this.cube.display();
    this.scene.popMatrix();

    // Leg 1
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.3, 0.1);
    this.scene.translate(-1.7, -1, 1);
    this.cube.display();
    this.scene.popMatrix();

    // Leg 2
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.3, 0.1);
    this.scene.translate(1.7, -1, 1);
    this.cube.display();
    this.scene.popMatrix();


    // Wing 1
    this.scene.pushMatrix();
    // this.scene.translate(this.x, this.y, this.z);
    this.scene.translate(0.15, 0, 0);
    this.scene.rotate(this.wingAngle, 0, 0, 1);
    this.scene.translate(0.25, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.bodyColor.apply();
    this.wing.display();
    this.scene.popMatrix();
    //=========
    // Wing 2
    this.scene.pushMatrix();
    // this.scene.translate(this.x, this.y, this.z);
    this.scene.translate(-0.15, 0, 0);
    this.scene.rotate(-this.wingAngle, 0, 0, 1);
    this.scene.translate(-0.25, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.scale(0.2, 0.2, 0.2);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
