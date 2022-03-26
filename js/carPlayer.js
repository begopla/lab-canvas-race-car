class CarPlayer{
    constructor(ctx,positionX,positionY,width,height,gameSize,moveSpeed){
        this.ctx = ctx;
        this.playerPos = {x:positionX, y: positionY};
        this.playerSize = {w: width, h: height};
        this.playerImage = null;
        this.gameSize = gameSize;
        this.moveSpeed = moveSpeed
        this.init()
    }

    init(){ //* creates a new image and set the source of the image to the corresponding file
        this.playerImage = new Image();
        this.playerImage.src  = "./images/car.png";
    }

    draw(){  //*if we have and image we are going to draw a image in a determinate position
        if(this.playerImage){

            this.ctx.drawImage(
                this.playerImage,
                this.playerPos.x,
                this.playerPos.y,
                this.playerSize.w,
                this.playerSize.h
                );
            }

           
    }

    moveLeft(){
       if(this.playerPos.x>this.gameSize.w*0.1){

        this.playerPos.x -=this.moveSpeed;
       }
      }
    
    moveRight(){
        if(this.playerPos.x <this.gameSize.w*0.8)
        this.playerPos.x +=this.moveSpeed;
    }

    moveTop(){
        if(this.playerPos.y>0)
        this.playerPos.y -=this.moveSpeed;
    }
    moveBottom(){
        if(this.playerPos.y <this.gameSize.h-this.playerSize.h)
        this.playerPos.y +=this.moveSpeed;
    }
   
   
}