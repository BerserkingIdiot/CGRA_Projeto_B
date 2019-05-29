/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -0.5, -0.5, -0.5,  // 0
      -0.5, -0.5, 0.5,   // 1
      -0.5, 0.5, 0.5,    // 2
      -0.5, 0.5, -0.5,   // 3
      0.5, -0.5, 0.5,    // 4
      0.5, 0.5, 0.5,     // 5
      0.5, -0.5, -0.5,   // 6
      0.5, 0.5, -0.5,    // 7
      //--------------------
      -0.5, -0.5, -0.5,  // 0
      -0.5, -0.5, 0.5,   // 1
      -0.5, 0.5, 0.5,    // 2
      -0.5, 0.5, -0.5,   // 3
      0.5, -0.5, 0.5,    // 4
      0.5, 0.5, 0.5,     // 5
      0.5, -0.5, -0.5,   // 6
      0.5, 0.5, -0.5,    // 7
      //--------------------
      -0.5, -0.5, -0.5,  // 0
      -0.5, -0.5, 0.5,   // 1
      -0.5, 0.5, 0.5,    // 2
      -0.5, 0.5, -0.5,   // 3
      0.5, -0.5, 0.5,    // 4
      0.5, 0.5, 0.5,     // 5
      0.5, -0.5, -0.5,   // 6
      0.5, 0.5, -0.5,    // 7
    ];

    // Counter-clockwise reference of vertices
    this.indices = [
      0, 1, 2, 2, 3, 0, 2, 1, 4, 5, 2, 4, 5, 4, 6, 7, 5, 6,
      3, 6, 0, 7, 6, 3, 3, 2, 7, 2, 7, 5, 0, 1, 6, 1, 4, 6,
    ];

    this.normals = [
      -1, 0,  0, -1, 0, 0,  -1, 0,  0, -1, 0,  0, 1, 0, 0,  1, 0, 0,
      1,  0,  0, 1,  0, 0,  0,  -1, 0, 0,  -1, 0, 0, 1, 0,  0, 1, 0,
      0,  -1, 0, 0,  1, 0,  0,  -1, 0, 0,  1,  0, 0, 0, -1, 0, 0, 1,
      0,  0,  1, 0,  0, -1, 0,  0,  1, 0,  0,  1, 0, 0, -1, 0, 0, -1,
    ];

    let tmp = this.indices.slice(0);
    tmp.reverse();
    this.indices = this.indices.concat(tmp);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}