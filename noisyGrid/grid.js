class Grid{
    gridArray = [];
    /** Position of the grid respect to its container */
    position; //
    /** Number of rows */
    rows;
    /** Number of columns */
    columns;
    /** Size of each element in the grid */
    stepSize;
    /** Scaling factor for the noise X-axis */
    nXFactor = 0.1;
    /** Scaling factor for the noise Y-axis */
    nYFactor = 0.1;
    /** Scaling factor for the noise Z-axis */
    nZFactor = 0.005;
    /** Time t = 0.
     * Used in the calculation of the scaling parameters in order to make the transition smooth while moving the mouse
     * */
    t0 = 0; // t=0
    /** Initial space at t = 0.
     * Used in the calculation of the scaling parameters in order to make the transition smooth while moving the mouse
     * */
    sa0 = 0;
    /** Speed at instant a. See below for more details.
     * Used in the calculation of the scaling parameters in order to make the transition smooth while moving the mouse
     * */
    va = 1; //speed at instant a
    /** Minimum value for mouse-controlled speed */
    minSpeed = 1;
    /** Maximum value for mouse-controlled speed */
    maxSpeed = 10;

    constructor(position, rows, columns, stepSize){
        this.position = position;
        this.rows = rows;
        this.columns = columns;
        this.stepSize = stepSize;

        for(let i = 0; i < this.columns; i++){
            let column = [];
            for(let j = 0; j < this.rows; j++){
                let nodePosition = p5.Vector.add(
                    this.position,
                    createVector(
                        Math.floor(i * this.stepSize),
                        Math.floor(j * this.stepSize)
                    )
                );
                column.push(new GridNode(nodePosition, this.stepSize, this.stepSize));
            }
            this.gridArray.push(column);
        }
    }

    drawColorGrid(){
        // stroke(0);
        noStroke();
        //Transformation to make the color transition smooth when mouse position changes
        //Initial conditions:
        //frameCount is the time variable when traveling along noise's Z-axis
        //MouseX determines the speed of traveling along noise's z-axis.
        //The value we are after is the position along the z-axis.
        //Changing mouseX without doing adjustments would mean an abrupt change in position along noise's z-axis.
        //The equation is S(t) = s0 + v*t where:
        //s(0) start position; v is the speed (mouse controlled); t is the frameCount (properly scaled)
        //Changing speed from va to vb I need to ensure that the current position does not change along the z-axis
        //This means calculating the proper s0
        //Fixing time to t1, the equation in terms of va (speed a) is Sa(t1) = Sa0 + Va * t1
        //whereas the equation in terms of vb (speed b) is Sb(t1) = Sb(0) + Vb * t1
        //Smooth transition is obtained when Sa(t1) = Sb(t1)
        //Doing the math comes Sb0 = Sa0 + t1(Va-Vb)
        let t1 = frameCount * this.nZFactor; //t1
        let vb = constrain(map(mouseX, 0, this.rows * this.stepSize, this.maxSpeed, this.minSpeed), this.minSpeed, this.maxSpeed); // Vb - new speed
        let sb0 = this.sa0 + t1 * (this.va - vb) ; //Sb0
        let sb = sb0 + vb * t1; // new expression of space along the z-axis in terms of vb (preserving the current location along the z-axis)

        // console.log(`sa:${this.sa0  + this.va * this.t0}; sb:${sb}`);

        for(let i = 0; i < this.columns; i++){
            for(let j = 0; j < this.rows; j++) {
                let n = noise(i * this.nXFactor, j * this.nYFactor, sb);
                this.gridArray[i][j].drawColorGrid(n);
            }
        }
        this.t0 = t1; // saving the current initial time
        this.va = vb; // saving the current speed
        this.sa0 = sb0; //saving the current start position
    }

    drawCompassGrid(){
        for(let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.gridArray[i][j].drawCompassGrid();
            }
        }
    }
}