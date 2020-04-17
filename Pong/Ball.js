class Ball {
    constructor() {
        this.x = canvas.width / 2 ;
        //this.x = 0 ;
        this.y = canvas.height / 2 ;
        this.diameter = scl * 20 ;
        
        this.maxXSpeed = 11 ;
        this.maxYSpeed = 15 ;
        this.xVel ;
        this.yVel ;
        
        this.history = [] ;
        this.trailLength = 10 ;
    }

    show() {
        this.showTrail() ;
        stroke(0) ;
        strokeWeight(2) ;
        fill(255) ;
        ellipse(this.x , this.y , this.diameter) ;
    }

    update() {
        this.wallBounce() ;

        this.updateHistory() ;
        this.move() ;
    }

    showTrail() {
        noStroke() ;
        fill(255 , 50) ;
        for (var i = this.history.length - 1 ; i >= 0 ; i--) {
            ellipse(this.history[i].x , this.history[i].y , this.diameter * (i + 5) / 15) ;
        }
    }

    move() {
        this.x += this.xVel ;
        this.y += this.yVel ;
    }

    updateHistory() {
        var v = createVector(this.x , this.y) ;
        this.history.push(v) ;
        if (this.history.length > this.trailLength) {
            this.history.splice(0 , 1) ;
        }
    }

    service(side) {

        if (side == 'L') {
            this.xVel = -this.maxXSpeed * scl ;
        }
        else {
            this.xVel = this.maxXSpeed * scl ;
        }
        this.yVel = random(-2.5 , 2.5) * scl ;
    }

    wallBounce() {
        if (this.y - scl * 10 - scl * 5 <= scl * 30 || this.y + scl * 10 + scl * 5 >= canvas.height - scl * 30) {
            this.yVel = -this.yVel ;
        }
        if (this.x <= scl * 30 || this.x >= canvas.width - scl * 30) {
            this.xVel = 0 ;
            this.yVel = 0 ;
        }
    }
}