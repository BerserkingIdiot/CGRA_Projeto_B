/**
 * MyPyramid
 * @constructor
 */
class MyPrism extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;
        let alphaAng = 2 * Math.PI / this.slices;

        for (let i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different
            let sa = Math.sin(ang);
            let saa = Math.sin(ang + alphaAng);
            let ca = Math.cos(ang);
            let caa = Math.cos(ang + alphaAng);

            // Declare vertices of one of the prism's sides
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 1, -saa);

            // Define each vertex's normal
            let normal = [
                Math.cos(ang + (alphaAng / 2)),
                0,
                -Math.sin(ang + (alphaAng / 2)),
            ];

            // Normalize the normals
            let nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(4 * i);
            this.indices.push(4 * i + 1);
            this.indices.push(4 * i + 2);
            this.indices.push(4 * i + 3);
            this.indices.push(4 * i + 2);
            this.indices.push(4 * i + 1);

            ang += alphaAng;

            this.texCoords.push(1/this.slices*i,1);
            this.texCoords.push(1/this.slices*(i+1),1);
            this.texCoords.push(1/this.slices*i,0);
            this.texCoords.push(1/this.slices*(i+1),0);
        
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}