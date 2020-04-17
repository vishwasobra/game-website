class MachinePlayer {
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
        // Logic : Follow Ball
        if (Math.abs(ball.y - this.y) >= this.speed) {
            if (ball.y < this.y) {
                this.y -= this.speed ;
            }
            else if (ball.y > this.y) {
                this.y += this.speed ;
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
}