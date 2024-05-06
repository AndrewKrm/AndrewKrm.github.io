import { initWebGL2Context } from './webgl-utils.js';
import { loadShaders } from './shader.js';
import { createRectangles } from './geometry.js';

let gl, shaderProgram;

function main() {
    gl = initWebGL2Context('webglCanvas');
    if (!gl) {
        console.error('Failed to obtain WebGL context');
        return;
    }

    shaderProgram = loadShaders(gl);

    if (!shaderProgram) {
        console.error('Failed to load shaders');
        return;
    }
    initWebGL();

    document.getElementById('visualizeBtn').addEventListener('click', processEinsumOperation);

}

function initWebGL() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
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
function createHashMap(parsedEinsum) {
    const hashMap = {};
    let value = 2;

    const processTensor = tensor => {
        for (let char of tensor) {
            if (!hashMap.hasOwnProperty(char)) {
                hashMap[char] = value;
                value++;
            }
        }
    };

    parsedEinsum.inputTensors.forEach(processTensor);
    parsedEinsum.outputTensors.forEach(processTensor);

    return hashMap;
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
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const hashMap = createHashMap(parsedEinsum);
    console.log(hashMap);
    // Get the characters from the input tensors
    const firstInputChars = parsedEinsum.inputTensors[0].split('');
    const secondInputChars = parsedEinsum.inputTensors[1].split('');

    createRectangles(gl, shaderProgram,10,gl.canvas.height/2-gl.canvas.height/8, gl.canvas.width/4, gl.canvas.height/4, hashMap[firstInputChars[0]], hashMap[firstInputChars[1]]);
    createRectangles(gl, shaderProgram,gl.canvas.width/2-gl.canvas.width/8, 10, gl.canvas.width/4, gl.canvas.height/4, hashMap[secondInputChars[0]], hashMap[secondInputChars[1]]);

    console.log("Parsed Einsum: ", parsedEinsum);
    
}

window.onload = main;
