/**
 * MyPyramid
 * @constructor
 */
class MyCylinder extends CGFobject {
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

        for (let i = 0; i < this.slices + 2; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different
            let sa = Math.sin(ang);
            let saa = Math.sin(ang + alphaAng);
            let ca = Math.cos(ang);
            let caa = Math.cos(ang + alphaAng);

            this.vertices.push(ca, 0, sa);
            this.vertices.push(ca, 1, sa);

            var normal= [
                Math.cos(ang),
                0,
                Math.sin(ang)
            ];

            // normalization
            /*
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;
            */

            this.normals.push(...normal);
            this.normals.push(...normal);

            this.texCoords.push(1/this.slices*(i-1),1);
            this.texCoords.push(1/this.slices*(i-1),0);

            if (i == 0) continue;
            if (i == 1) this.indices.push(2,0,1,3,2,1);
            
            else {
                this.indices.push(
                    this.indices[6*(i-2)]+2,
                    this.indices[6*(i-2)+1]+2,
                    this.indices[6*(i-2)+2]+2,
                    this.indices[6*(i-2)+3]+2,
                    this.indices[6*(i-2)+4]+2,
                    this.indices[6*(i-2)+5]+2
                )
            }
            

            ang += alphaAng;
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