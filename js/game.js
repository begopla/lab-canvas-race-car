const myObstacles = [];
class Game {
constructor(){
    this.canvas = null;
    this.ctx = null;
    this.gameSize = {w:null, h:null};
    this.carPlayer = null;
    this.background = null;
    this.frames = 0;
    this.obstacles = null;
    this.obstacles2 = null;
    this.player = null;

    this.init();
}

init(){//* triggers the functions bellow in order
    console.log('GAME ON!')
    this.setCanvas();
    this.getSize();
    this.loadBackground()
    this.createPlayer();
    //this.createSquare();
    this.createObstacles();
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

    this.background =new Background(this.canvas,this.ctx);
    this.background.setImage();
    
     
    // this.roadImage.onload = function() {
    
    // this.ctx.drawImage(this.roadImage, 0, 0,350,450*(640/480));
    //     };
    
}

createPlayer(){ //*cretes a player, feeding it with the context (.ctx) and some values

    this.carPlayer = new CarPlayer (this.ctx, 220, 400,50,100,this.gameSize)
    
}

// createSquare(){
//     this.player = new  Obstacles(this.ctx,30, 30, 'red', 0, 110);
   
// }

createObstacles(){
    
    this.frames +=1; //add a counter to count how many times we call the function
   
        let y = this.gameSize.w;
        let x = this.gameSize.h;
        let minWidth = 20;
        let maxWidth = 200;
        let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        this.obstacles = new Obstacles(this.ctx,width, 10, 'red', 0.08*this.gameSize.w, 0.1*y);
        
        myObstacles.push(this.obstacles);
        this.obstacles2 = new Obstacles (this.ctx,(y - width -gap), 10, 'red',  width + gap, 0.1*y)
      
        myObstacles.push(this.obstacles2);
        console.log(myObstacles)
    
    
}

drawAll(){//* it creates and interval in which 60 times a seconds clears the canvas and draws the next position of the player
    // setInterval(()=>{ 
    //     //this.clear()
    //     this.clear();
    //     this.carPlayer.draw();
    //    // this.carPlayer.moveRight(); //! we should move only when pressing a key, using the DOM   
    // },1000 / 60 )
    //? we want to use only the refreshing rate of the user screen to lower computational power so instead we request the animation frame of the user:
        this.clear();
        this.background.draw();
        this.background.move();
        this.carPlayer.draw();
        //this.player.update();
        for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].y += +0.5;
        this.obstacles.update();
      }
        
        
        


        requestAnimationFrame(()=>this.drawAll())
}

setEventHandlers(){ //* setting the event handlers on the coument calling the determinate moving function for the assigned keys 
    document.addEventListener('keydown',(event)=>{ //this is trigering an event ehnever a key is pressed
        //console.log(event);
       const key = event.key;
       key === "ArrowRight" ? this.carPlayer.moveRight(): null;
       key === "ArrowLeft" ? this.carPlayer.moveLeft(): null;
       key === "ArrowRight" ? this.carPlayer.moveRight(): null;
       key === "ArrowLeft" ? this.carPlayer.moveLeft(): null;
    })
    }

clear(){
    this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
}
}