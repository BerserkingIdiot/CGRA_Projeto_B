


class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//top face
			-0.5, 0.5, 0.5,	    //0
			0.5, 0.5, 0.5,		//1
			-0.5, 0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
			//front face
			-0.5, 0.5, -0.5,	//4
			0.5, 0.5, -0.5,		//5
			-0.5, -0.5, -0.5,	//6
			0.5, -0.5, -0.5,	//7
			//bottom face
			-0.5, -0.5, -0.5,	//8
			0.5, -0.5, -0.5,	//9
			-0.5, -0.5, 0.5,	//10
			0.5, -0.5, 0.5,		//11
			//left face
			-0.5, 0.5, 0.5,	    //12
			-0.5, 0.5, -0.5,	//13
			-0.5, -0.5, 0.5,	//14
			-0.5, -0.5, -0.5,	//15
			//right face
			0.5, 0.5, -0.5,		//16
			0.5, 0.5, 0.5,		//17
			0.5, -0.5, -0.5,	//18
			0.5, -0.5, 0.5,		//19
			//back face
			0.5, 0.5, 0.5,		//20
			-0.5, 0.5, 0.5,	    //21
			0.5, -0.5, 0.5,		//22
			-0.5, -0.5, 0.5		//23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//top face
			0, 2, 1,
			1, 2, 3,
			//front face
			5, 4, 6,
			5, 6, 7,
			//down face
			9, 8, 10,
			9, 10, 11,
			//left face
			13, 12, 14,
			13, 14, 15,
			//right face
			17, 16, 18,
			17, 18, 19,
			//back face
			21, 20, 22,
			21, 22, 23
		];

		this.normals = [
			Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	    //0
			-Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	//1
			Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//2
			-Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//3
			//front face
			Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//4
			-Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//5
			Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//6
			-Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//7
			//bottom face
			Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//8
			-Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//9
			Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3),		//10
			-Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3),		//11
			//left face
			Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	    //12
			Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//13
			Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3),		//14
			Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//15
			//right face
			-Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3),		//16
			-Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	//17
			-Math.sqrt(3), Math.sqrt(3), Math.sqrt(3),		//18
			-Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3),		//19
			//back face
			-Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	//20
			Math.sqrt(3), -Math.sqrt(3), -Math.sqrt(3),	    //21
			-Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3),		//22
			Math.sqrt(3), Math.sqrt(3), -Math.sqrt(3)		//23
			
		];

		this.texCoords = [
			//top face
			0.251, 0,		//0
			0.499, 0,		//1
			0.251, 0.334,	//2
			0.499, 0.334,	//3
			//front face
			0.25, 0.334,	//4
			0.5, 0.334,		//5
			0.25, 0.666,	//6
			0.5, 0.666,		//7
			//down face
			0.251, 0.666,	//8
			0.499, 0.666,	//9
			0.251, 1,		//10
			0.499, 1,		//11
			//left face
			0, 0.334,		//12
			0.25, 0.334,	//13
			0, 0.666,		//14
			0.25, 0.666,	//15
			//right face
			0.5, 0.334,		//16
			0.75, 0.334,	//17
			0.5, 0.666,		//18
			0.75, 0.666,	//19
			//back face
			0.75, 0.334,	//20
			1, 0.334,		//21
			0.75, 0.666,	//22
			1, 0.666		//23
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}