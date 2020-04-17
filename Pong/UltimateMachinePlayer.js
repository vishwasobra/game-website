class UltimateMachinePlayer {
    constructor(side) {
        if (side == 'L') {
            this.x = scl * 60 ;
        }
        else {
            this.x = canvas.width - scl * 60 ;
        }
        this.y = canvas.height / 2 ;

        this.width = scl * 24 ;
        this.height = scl * 100 ;
        this.speed = playerSpeed ;

        this.side = side ;
    }

    show() {
        stroke(0) ;
        fill(255) ;
        rect(this.x - this.width / 2 , this.y - this.height / 2 , this.width , this.height , this.width / 2) ;
    }

    update() {
        this.move() ;
        this.hit() ;
    }

    move() {
        // Logic : Predict the trajectory of the ball based on its current velocity
        var y = this.calculatePosition() ;

        // ...And bring the ends of player to the ball
        if (y >= scl * 30 && y <= canvas.height / 2) {
            if (y < (this.y - this.height / 2.35)) {
                this.y -= this.speed ;
            }
            if (Math.abs(y - (this.y - this.height / 2.35)) >= this.speed) {
                if (y > (this.y - this.height / 2.35)) {
                    this.y += this.speed ;
                }
            }
        }
        else {
            if (y > (this.y + this.height / 2.35)) {
                this.y += this.speed ;
            }
            if (Math.abs(y - (this.y + this.height / 2.35)) >= this.speed) {
                if (y < (this.y + this.height / 2.35)) {
                    this.y -= this.speed ;
                }
            }
        }

        

        this.y = constrain(this.y , scl * 30 + this.height / 2 , canvas.height - scl * 30 - this.height / 2) ;
    }

    hit() {
        if (ball.y > this.y - this.height / 2 && ball.y < this.y + this.height / 2) {
            if (this.side == 'L' && ball.x - ball.diameter / 2 <= this.x + this.width / 2 && ball.x > this.x) {
                ball.xVel = ball.maxXSpeed * scl ;
                ball.yVel = ((ball.y - this.y) / (this.height / 2)) * ball.maxYSpeed * scl ;
            }
            else if (this.side == 'R' && ball.x + ball.diameter / 2 >= this.x - this.width / 2 && ball.x < this.x) {
                ball.xVel = -ball.maxXSpeed * scl ;
                ball.yVel = ((ball.y - this.y) / (this.height / 2)) * ball.maxYSpeed * scl ;
            }
        }
    }

    calculatePosition() {
        if (!ball.history[ball.trailLength - 1]) {
            return this.y ;
        }

        if (this.side == 'L') {
            var x1 = this.x + this.width / 2 + ball.diameter / 2 ;
        }
        else {
            var x1 = this.x - this.width / 2 - ball.diameter / 2 ;
        }

        var x3 = ball.history[ball.trailLength - 1].x ;
        var y3 = ball.history[ball.trailLength - 1].y ;
        var x4 = ball.x ;
        var y4 = ball.y ;
        
        var m2 = (y3 - y4) / (x3 - x4) ;
        var c1 = -x1 ;
        var c2 = (x3 * y4 - x4 * y3) / (x3 - x4) ;

        var y = (c2 - m2 * c1) ;

        if (y < scl * 30) {
            y = scl * 30 - y ;
            if (Math.floor(y / (canvas.height - 2 * scl * 30)) % 2 == 0) {
                y %= (canvas.height - 2 * scl * 30) ;
                y += scl * 30 ;
            }
            else {
                y %= (canvas.height - 2 * scl * 30) ;
                y = (canvas.height - scl * 30) - y ;
            }
        }
        else if (y > canvas.height - scl * 30) {
            y -= canvas.height - scl * 30 ;
            if (Math.floor(y / (canvas.height - 2 * scl * 30)) % 2 == 0) {
                y %= (canvas.height - 2 * scl * 30) ;
                y = (canvas.height - scl * 30) - y ;
            }
            else {
                y %= (canvas.height - 2 * scl * 30) ;
                y += scl * 30 ;
            }
        }

        return y ;
    }
}