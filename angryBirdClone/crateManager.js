/**
 * CrateManager is a Factory of Bird(s).
 */
class CrateManager{
    /** Size of a single crate */
    size = {width: 80, height: 80};
    /** Collection of crates */
    crates = [];
    /** Instance of a Matter.Composite */
    composite;
    constructor(){
        this.composite = Matter.Composites.stack(
            600,
            100,
            3,
            6,
            0,
            0,
            (x, y) => {
                return this.createCrate(x, y)
            });
        World.add(engine.world, [this.composite]);
    }

    /**
     * Create a single crate. Delegate method used to create instances of crate.
     * @param x - x-position of the crate
     * @param y - y-position of the crate
     */
    createCrate(x, y){
        let crate = new Crate(
            createVector(
                x + random(0, 5), // add some randomness on the x-position of the crate
                y),
            {width: this.size.width, height: this.size.height},
            0,
            TextureHandler.cratesImg[Math.floor(random(TextureHandler.cratesImg.length))] //randomly choose one image
        );
        this.crates.push(crate);
        return crate.body;
    }

    /** Draw the composite on screen */
    draw(){
        //Array containing the bounds of the crates, used to calculate the crates' shadows
        let bounds = [];
        for(let i = this.crates.length - 1; i >= 0; i--){
            this.crates[i].draw();

            //if the current crate is out of the boundaries of the screen, destroy it
            if(
                this.crates[i].body.position.x  + this.crates[i].size.width < 0
                || this.crates[i].body.position.x - this.crates[i].size.width > width
            ){
                this.crates.splice(i, 1);
            }

            if(this.crates[i]){
                //bound is the crate extension on the x-axis
                let bound = {
                    min: this.crates[i].body.bounds.min.x,
                    max: this.crates[i].body.bounds.max.x
                };
                //add the bound of the current crate to the bounds collection
                this.mergeBounds(bounds, bound);
            }
        }
        // draw the crates' shadows
        noStroke();
        fill('rgba(32, 32, 32, 0.8)');
        ellipseMode(RADIUS);
        for(let bound of bounds){
            push();
            translate((bound.max + bound.min)/2, 580);
            this.drawShadow(0, 0, (bound.max -bound.min)/2, 25, 0, PI);
            pop();
        }
    }

    /**
     * Check whether bound overlaps any of the bounds already contained in the bounds collection.
     * If it does, merge all the overlapping bounds into a single one
     * @param bounds - Collection of bounds
     * @param bound - New bound to add to bounds
     */
    mergeBounds(bounds, bound){
        //Check whether the new bound overlaps with the already calculated bounds
        for(let i = 0; i< bounds.length; i++){
            //If the new bound overlaps with any of the existing bounds, merge them, to create a unique shadow
            if(this.rangeOverlap(bounds[i], bound)){
                //found an overlap. Now calculate the boundaries of the new merged bound
                bound.min = Math.min(bounds[i].min, bound.min);
                bound.max = Math.max(bounds[i].max, bound.max);

                //remove the old bound
                bounds.splice(i, 1);
                i--;
            }
        }
        //add the new merged bound
        bounds.push(bound);
    }

    /**
     *  Determine whether two ranges overlap
     *  return a boolean
     * @param range1
     * @param range2
     */
    rangeOverlap(range1, range2){
        return (range1.min < range2.min && range1.max > range2.min)
        ||  (range1.min < range2.max && range1.max > range2.max)
        ||  (range1.min > range2.min && range1.max < range2.max)
        ||  (range1.min < range2.min && range1.max > range2.max);
    }

    /**
     * Draw the shadow as an ellipse filled with a gradient.
     * The alpha decreases from a maximum value at the border of the ellipse, to a minimum value at the center
     * of the ellipse, making it blurry far from the center.
     * @param x - x-position of the centre of the shadow
     * @param y - y-position of the centre of the shadow
     * @param w - width of the shadow
     * @param h - height of the shadow
     * @param start - start angle for the arc of ellipse
     * @param stop - stop angle for the arc of ellipse
     */
    drawShadow(x, y, w, h, start, stop){
        /** Minimum value for alpha, close to the border of the arc */
        let alphaMin = 0;
        /** Maximum value for alpha, close to the centre of the arc */
        let alphaMax = 0.6;
        /** Current value of alpha. */
        let alpha = alphaMin;
        /** Radius value, relative to 0-w range, where the max alpha is */
        let radiusMax = 1;
        /** Radius value, relative to 0-w range, where the min alpha is */
        let radiusMin = 0.5
        /** How many concentric arcs are drawn to recreate the gradient.
         * The bigger value, the more precise the gradient, but the more expensive in terms of resources */
        let radiusNumStep = 5;
        /** Simulate some blurriness on the x-axis.
         * If >1, the actual width of the shadow is greater than the input w. */
        let widthDispersion = 1.5;
        /** Radius step size. Depending on radiusNumStep */
        let radiusStep = (radiusMax - radiusMin)/radiusNumStep;
        /** Alpha step size. Depending on radiusNumStep */
        let alphaStep = (alphaMax - alphaMin)/radiusNumStep;
        noStroke();
        for (let r = radiusMax; r > radiusMin; r-=radiusStep) {
            fill('rgba(32, 32, 32,' + alpha + ')');
            alpha += alphaStep;
            arc(x, y, w * r * widthDispersion, h * r, start, stop);
        }
    }
}
