import { createShader, createShaderProgram } from './webgl-utils.js';

const vertexShaderSrc = `
    attribute vec4 aPosition;
    void main() {
        gl_Position = aPosition;
    }
`;

const fragmentShaderSrc = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
    }
`;

export function loadShaders(gl) {
    return createShaderProgram(gl, vertexShaderSrc, fragmentShaderSrc);
}
