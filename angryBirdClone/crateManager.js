class _CrateManager{
    size = {width: 80, height: 80};
    crates = [];
    constructor(){}
    createCrate(x, y){
        let crate = new Crate(
            createVector(x, y),
            {width: this.size.width, height: this.size.height},
            0,
            TextureHandler.cratesImg[Math.floor(random(TextureHandler.cratesImg.length))]
        )
        this.crates.push(crate);
        return crate.body;
    }

    draw(){
        for(let crate of this.crates){
            crate.draw();
        }
    }
}

var CrateManager = new _CrateManager();