class Obstacles {
  constructor (ctx, canvas,  ){
    this.ctx = ctx;
    this.canvas = canvas;
    this.moveSpeed = 3;
    this.x = Math.floor(Math.random() * (this.canvas.width / 2));
		this.width = Math.floor(Math.random() * (this.canvas.width / 2)) + 50;
		this.height = 10;
		this.y = 0;
  
}

update(){
  this.ctx.fillStyle = "blue";
  this.ctx.fillRect(this.x, this.y,
     this.width, this.height); 
//     this.ctx.rect(250, 200, 50, 50);
//     this.ctx.fill();
//     this.ctx.strokeStyle = "black";
//     this.ctx.stroke();
}

newPos() {
  // this.x += this.speedX;
  this.y += (this.moveSpeed);
}    

    }

