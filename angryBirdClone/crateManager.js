class CrateManager{
    size = {width: 80, height: 80};
    crates = [];
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
    }
    createCrate(x, y){
        let crate = new Crate(
            createVector(
                x + random(0, 5),
                y),
            {width: this.size.width, height: this.size.height},
            0,
            TextureHandler.cratesImg[Math.floor(random(TextureHandler.cratesImg.length))]
        )
        this.crates.push(crate);
        return crate.body;
    }

    draw(){
        //Array containing the bounds of the crates, used to calculate the crates' shadows
        let bounds = [];
        for(let crate of this.crates){
            crate.draw();
            //bound is the crate extension on the x-axis
            let bound = {
                min: crate.body.bounds.min.x, max: crate.body.bounds.max.x
            };
            //add the bound of the current crate to the bounds collection
            this.mergeBounds(bounds, bound);
        }
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
        return
        (range1.min < range2.min && range1.max > range2.min)
        ||  (range1.min < range2.max && range1.max > range2.max)
        ||  (range1.min > range2.min && range1.max < range2.max)
        ||  (range1.min < range2.min && range1.max > range2.max);
    }

    drawShadow(x, y, w, h, start, stop){
        let alphaMin = 0;
        let alphaMax = 0.6;
        let alpha = alphaMin;
        let radiusMax = 1;
        let radiusMin = 0.5
        let radiusNumStep = 5;
        let widthDispersion = 1.5;
        let radiusStep = (radiusMax - radiusMin)/radiusNumStep;
        let alphaStep = (alphaMax - alphaMin)/radiusNumStep;
        noStroke();
        for (let r = radiusMax; r > radiusMin; r-=radiusStep) {
            fill('rgba(32, 32, 32,' + alpha + ')');
            alpha += alphaStep;
            arc(x, y, w * r * widthDispersion, h * r, start, stop);
        }
    }
}
