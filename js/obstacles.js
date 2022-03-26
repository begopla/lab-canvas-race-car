class Obstacles {
    constructor (ctx, width, height, color, x, y){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        // new speed properties
      this.speedX = 0;
      this.speedY = 0;
      
    }

    update(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height); 
    //     this.ctx.rect(250, 200, 50, 50);
    //     this.ctx.fill();
    //     this.ctx.strokeStyle = "black";
    //     this.ctx.stroke();
     }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }

