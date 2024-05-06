import { createShader, createShaderProgram } from './webgl-utils.js';

// Vertex Shader Source
const vertexShaderSrc = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 aPosition;

// Used to pass in the resolution of the canvas
uniform vec2 uResolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = aPosition / uResolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

// Fragment Shader Source
const fragmentShaderSrc = `#version 300 es
precision highp float;
uniform vec4 uColor;
out vec4 fragColor; // Define own output instead of using gl_FragColor
void main() {
    fragColor = uColor;
}`;



export function loadShaders(gl) {
    return createShaderProgram(gl, vertexShaderSrc, fragmentShaderSrc);
}
