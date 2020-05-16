
class _TextureHandler{
    background;
    propellerImg;
    cratesImg = [];
    birdsImg = [];
    constructor() {

    }
    init(){
        this.background = loadImage('assets/background_1000.png');

        this.propellerImg = loadImage('assets/propeller_200x25.png');

        this.cratesImg.push(loadImage('assets/crate0_80.png'));
        this.cratesImg.push(loadImage('assets/crate0_80_rot.png'));
        this.cratesImg.push(loadImage('assets/crate1_80.png'));
        this.cratesImg.push(loadImage('assets/crate1_80_rot.png'));
        this.cratesImg.push(loadImage('assets/crate3_80.png'));
        this.cratesImg.push(loadImage('assets/crate3_80_rot.png'));
        this.cratesImg.push(loadImage('assets/crate4_80.png'));
        this.cratesImg.push(loadImage('assets/crate4_80_rot.png'));

        this.birdsImg.push(loadImage('assets/bird0.png'));
        this.birdsImg.push(loadImage('assets/bird1.png'));
        this.birdsImg.push(loadImage('assets/bird2.png'));
        this.birdsImg.push(loadImage('assets/bird4.png'));
        this.birdsImg.push(loadImage('assets/bird5.png'));

    }
}


const TextureHandler = new _TextureHandler();
