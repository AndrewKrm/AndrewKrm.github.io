import { initWebGL2Context } from './webgl-utils.js';
import { loadShaders } from './shader.js';

let gl, shaderProgram;

function main() {
    gl = initWebGL2Context('webglCanvas');
    if (!gl) return;

    shaderProgram = loadShaders(gl);
    initWebGL();
    
    document.getElementById('visualizeBtn').addEventListener('click', processEinsumOperation);
}

function initWebGL() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shaderProgram);
    // More initial WebGL setup, if necessary
}

function processEinsumOperation() {
    const input = document.getElementById('einsum-input').value;
    console.log("Einsum Operation: ", input);
    // Parse the input and visualize it here
    // This is where you'd handle matrix setup and operations based on the input
}

window.onload = main;
