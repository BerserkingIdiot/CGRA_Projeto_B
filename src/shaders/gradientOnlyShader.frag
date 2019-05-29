#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;


void main() {
	vec4 filter = texture2D(uSampler2, vTextureCoord);
	vec4 color = texture2D(uSampler3, vec2(0, 256.0 -filter.b));

    //color = color + vec4(filter.b,filter.b,filter.b,0.0)*0.2;
	
	
	gl_FragColor = color;
}