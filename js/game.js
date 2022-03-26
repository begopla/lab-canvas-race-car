let myObstacles = [];
const gameIntroElement = document.querySelector(".game-intro");
const gameOverElement = document.querySelector(".game-over");
const restartButton = gameOverElement
	.querySelector("button")
	.addEventListener("click", () => {new Game()});
//const restartButton = gameOverElement.querySelector("button").addEventListener("click", new Game())
class Game {
constructor(){
    this.canvas = null;
    this.ctx = null;
    this.gameSize = {w:null, h:null};
    this.carPlayer = null;
    this.background = null;
    this.frames = 0;
    this.obstacles = null;
    this.player = null;
    this.moveSpeed =3;
    this.score = 0;
    this.intervalId = 0;

    this.init();
}

init(){//* triggers the functions bellow in order
    console.log('GAME ON!')
    gameIntroElement.classList.add("hidden")
    gameOverElement.classList.add("hidden")
    this.reset();
    this.setCanvas();
    this.getSize();
    this.loadBackground()
    this.createPlayer();
    this.drawAll();
    this.setEventHandlers();
}

setCanvas(){//*create the canvas element
   this.canvas = document.querySelector('#canvas');
   this.ctx = canvas.getContext('2d');
   

}

getSize(){//* get size of the canvas
    this.gameSize = {
        w: this.canvas.width,
        h: this.canvas.height
    }
    //console.log(this.gameSize)
}

loadBackground(){

    this.background =new Background(this.canvas,this.ctx, this.moveSpeed);
    this.background.setImage();
    
    // this.roadImage.onload = function() {
    
    // this.ctx.drawImage(this.roadImage, 0, 0,350,450*(640/480));  
}

createPlayer(){ //*cretes a player, feeding it with the context (.ctx) and some values

    this.carPlayer = new CarPlayer (this.ctx, 220, 400,50,100,this.gameSize,this.moveSpeed)
    
}



drawAll(){//* it creates and interval in which 60 times a seconds clears the canvas and draws the next position of the player
    // setInterval(()=>{ 
    // },1000 / 60 )
    this.clear();
    this.frames ++; //add a counter to count how many times we call the function

    if(this.frames %10 ===0) {
        this.score +=3;
    }

    
    if(this.frames === 60){
        this.obstacles = new Obstacles(this.ctx,this.canvas);    
        myObstacles.push(this.obstacles)
        this.frames =0
    }
    //? we want to use only the refreshing rate of the user screen to lower computational power so instead we request the animation frame of the user:
    this.background.draw();
    this.background.move();
    this.carPlayer.draw();
   
    for (let i = 0; i < myObstacles.length; i++) {
    this.obstacles.newPos()
    this.obstacles.update();
  }     
    this.drawScore()
        
        
     if(this.collisionBetweenCarAndObstacle()){
            console.log("toucheed!!")
            gameOverElement.classList.remove("hidden");
            this.reset();
            return;
     }

       this.intervalId = requestAnimationFrame(()=>this.drawAll())
        
}

setEventHandlers(){ //* setting the event handlers on the coument calling the determinate moving function for the assigned keys 
    document.addEventListener('keydown',(event)=>{ //this is trigering an event ehnever a key is pressed
       // console.log(event);
       const key = event.key;
       key === "ArrowRight" ? this.carPlayer.moveRight(): null;
       key === "ArrowLeft" ? this.carPlayer.moveLeft(): null;
       key === "ArrowUp" ? this.carPlayer.moveTop(): null;
       key === "ArrowDown" ? this.carPlayer.moveBottom(): null;
    })
    }

clear(){
    this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
}

collisionBetweenCarAndObstacle(){ //if the car is inside the Y & X axis of the obstacle then we crashed
   let hasCollided = false
    for(let i=0; i<myObstacles.length; i++){
        //const anyObst = myObstacles[i]
        const withinX = this.carPlayer.playerPos.x +this.carPlayer.playerSize.w > this.obstacles.x && this.carPlayer.playerPos.x < this.obstacles.x+this.obstacles.width
        const withinY = this.obstacles.y + this.obstacles.height > this.carPlayer.playerPos.y && this.obstacles.y < this.carPlayer.playerPos.y + this.carPlayer.playerSize.h
        
        hasCollided = withinX && withinY

        if(hasCollided){
            break;

        }
    }
    return hasCollided;
}
drawScore() {
	this.ctx.fillStyle = "black";
	this.ctx.font = "32px sans-serif";
	this.ctx.fillText(`Score: ${this.score}`, 20, 50);
}


reset(){
    //clearTheInterval(intervalId); -- > for SetInterval()
    cancelAnimationFrame(this.intervalId);
    this.background = null;
    this.carPlayer= null;
    myObstacles = [];
    this.score = 0;
    this.frames = 0;
}
}