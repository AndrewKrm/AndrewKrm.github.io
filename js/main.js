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

function parseEinsum(input) {
    const einsumPattern = /([a-zA-Z,]+)->([a-zA-Z,]+)/;
    const match = input.match(einsumPattern);
    if (!match) {
        console.error("Invalid einsum operation: ", input);
        return null;
    }

    const inputOutput = match[0].split('->');
    const inputStr = inputOutput[0];
    const outputStr = inputOutput[1];

    const inputTensors = inputStr.split(',');
    const outputTensors = outputStr.split(',');

    return {
        inputTensors: inputTensors,
        outputTensors: outputTensors
    };
}

function processEinsumOperation() {
    const input = document.getElementById('einsum-input').value;
    console.log("Einsum Operation: ", input);
    //parse einsum operation
    const parsedEinsum = parseEinsum(input);
    if (!parsedEinsum){
        // display an error on webgl canvas by drawing a red rectangle
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }else{
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.log("Parsed Einsum: ", parsedEinsum);
    }
}

window.onload = main;
