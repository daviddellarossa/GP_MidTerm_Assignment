/**
 * CrateManager is a Factory of the Slingshot system (slingshot + bird).
 */
class SlingshotManager {
    /** location of the slingshot */
    location;
    /** size of the slingshot */
    size;
    /** angle of the slingshot */
    angle;
    /** image used for the slingshot */
    image;
    /** Instance of Slingshot */
    slingshot;
    /** Instance of Bird */
    bird;

    /**
     * Create a new instance of SlingshotManager
     * @param location - location where the Slingshot is drawn on the screen
     */
    constructor(location) {
        this.location = location;
        this.size = {width: 60, height: 150};
        this.angle = 0;
        this.image = TextureHandler.slingshotImg;
        this.bird = BirdManager.createBird(location.x, location.y, false, true);
        this.slingshot = new Slingshot(
            createVector(location.x, location.y),
            {width: 60, height: 150},
            0,
            TextureHandler.slingshotImg,
            this.bird.body
        );
    }

    /** draw the slingshot system */
    draw() {
        push();
        translate(this.location.x, this.location.y);
        rotate(this.angle);

        stroke(84, 39, 15);
        strokeWeight(8);

        if (this.slingshot.body.bodyB != null) {
            //back side of the spring, partially hidden by the bird, if present
            line(
                this.bird.body.position.x - this.location.x,
                this.bird.body.position.y - this.location.y,
                20,
                18);
        } else {
            //if there is no bird
            line(-14, 24, 20, 18);
        }

        //The next push-translate-pop is needed because the bird translates to its origin starting from the current
        //position, which is the slingshot position, not the (0,0) as the bird expects. So, translate back to origin.
        push()
        translate(-this.location.x, -this.location.y);
        this.bird.draw();
        pop()

        //front side of the spring
        if (this.slingshot.body.bodyB != null) {
            line(
                -14,
                24,
                this.bird.body.position.x - this.location.x,
                this.bird.body.position.y - this.location.y);
        }

        image(
            this.image,
            -this.size.width / 2,
            0,
            this.size.width,
            this.size.height
        );

        pop();
    }

    /** Release the constraint. Triggered by mouseReleased */
    releaseConstraint() {
        this.slingshot.body.bodyB = null;
        this.slingshot.body.pointA = {x: 0, y: 0};
    }

    /** Reset the constraint */
    reset() {
        BirdManager.destroyBird(this.bird, false, true);
        this.bird = BirdManager.createBird(this.location.x, this.location.y, false, true);
        this.slingshot.body.bodyB = this.bird.body;
        this.slingshot.body.pointA = {x: this.location.x, y: this.location.y};
    }
}