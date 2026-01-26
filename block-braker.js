# BLOCK-BRAKER
//BLOCK BREAKER

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

// CLASE FATHER

class Game {
    constructor(x, y, width, height, colour){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    render(){
        ctx.clearRect(0, 0, 800, 800);
        screen.screenColouring();
        paddle.movePaddle();
        paddle.drawPaddle();
        ball.moveBall();
        ball.drawBall();
        requestAnimationFrame(() => {this.render()}) 
    }
}

class Paddle extends Game {
    constructor(x, y, width, height, colour, speed, derecha, izquierda){
        super(x, y, height, width, colour);
        this.speed = speed;
        this.derecha = derecha;
        this.izquierda = izquierda;
        document.addEventListener("keydown", (k) => {
            if(k.key === "d") this.derecha = true;
            if(k.key === "a") this.izquierda = true;
        });
        document.addEventListener("keyup", (t) => {
            if(t.key === "d") this.derecha = false;
            if(t.key === "a") this.izquierda = false;
        });
    }

        movePaddle(){
            if(this.derecha && this.x + this.width < 800) this.x += this.speed;
            if(this.izquierda && this.x > 0) this.x -= this.speed;    
        }

         drawPaddle(){
            ctx.fillStyle = this.colour
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }  
}

class Ball extends Game {
    constructor(x, y, radio, velX, velY, colour, start){
        super(x, y);
        this.radio = radio;
        this.velX = velX;
        this.velY = velY;
        this.start = start;
        this.colour = colour;
        document.addEventListener ("keydown", (w) => {
            if(w.key === "w") this.start = true
        })
        document.addEventListener ("keydown", (r) => {
            if(r.key === "r") this.start = false
        })
    }

    moveBall(){
        if(this.start){
            if(this.x + this.radio + this.velX >= 800 || this.x - this.radio + this.velX <= 0) {
                this.velX = -this.velX;
            } else {this.x += this.velX};
            if(this.y + this.radio + this.velY >= 800 || this.y - this.radio + this.velY <= 0) {
                this.velY = -this.velY
            } else {this.y += this.velY} 
        }

        if(this.start = false){
            
        }
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
    
}

class Screen extends Game {
    constructor(x, y, width, height, colour){
        super(x, y, width, height, colour);
    }

    screenColouring(){
        ctx.fillStyle = this.colour;
        ctx.fillRect (this.x, this.y, this.width, this.height);
    }
}

const game = new Game ()

const ball = new Ball (400, 750, 10, 3, 3, "white")

const screen = new Screen(0, 0, 800, 800, "black");

const paddle = new Paddle(350, 770, 20, 100, "white", 3);

game.render();
