let rectangleBuffer;
let countRect = 0;
function populateRectangleBuffer(gl, rectangles) {
    // Create a buffer for the rectangle's positions.
    rectangleBuffer = gl.createBuffer();

    // Select the rectangleBuffer as the one to apply buffer operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer);

    // Now create an array of positions for the rectangles.
    const positions = [];
    rectangles.forEach(({x, y, width, height}) => {
        positions.push(
            x, y,
            x + width, y,
            x, y + height,
            x, y + height,
            x + width, y,
            x + width, y + height,
        );
    });
    console.log("Positions array:", positions);
    // Now pass the list of positions into WebGL to build the shape.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function drawRectangles(gl, shaderProgram, rectangleCount) {
    // Set the shader program to use
    gl.useProgram(shaderProgram);

    // Get the attribute location
    const positionLocation = gl.getAttribLocation(shaderProgram, 'aPosition');

    // Enable the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Tell the attribute how to get data out of rectangleBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get the uniform location
    console.log(`Canvas resolution: ${gl.canvas.width} x ${gl.canvas.height}`);
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "uResolution");
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    // Set the color
    const colorLocation = gl.getUniformLocation(shaderProgram, 'uColor');
    if (countRect % 3 == 0){
        gl.uniform4f(colorLocation, 1, 0, 0, 1); // Red color
    }
    else if (countRect % 3 == 1){
        gl.uniform4f(colorLocation, 0, 1, 0, 1); // Green color
    }
    else if (countRect % 3 == 2){
        gl.uniform4f(colorLocation, 0, 0, 1, 1); // Green color
    }
    countRect++;
    
    // Log drawing parameters
    console.log(`Drawing rectangles, count: ${rectangleCount}`);
    // Draw the rectangles.
    gl.drawArrays(gl.TRIANGLES, 0, rectangleCount * 6);
}

export function createRectangles(gl, shaderProgram, gridX, gridY, totalWidth, totalHeight, row, col) {
    const rectangles = [];
    const spacing = 2;
    const rectangleWidth = (totalWidth - (col + spacing) * 1) / col;
    const rectangleHeight = (totalHeight - (row + spacing) * 1) / row;

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            const x = gridX+i * (rectangleWidth + spacing);
            const y = gridY+j * (rectangleHeight + spacing);
            rectangles.push({x, y, width: rectangleWidth, height: rectangleHeight});
        }
    }

    populateRectangleBuffer(gl, rectangles);
    drawRectangles(gl, shaderProgram, row*col);
}