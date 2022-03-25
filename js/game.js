class Game {
constructor(){
    this.canvas = null;
    this.ctx = null;
    this.gameSize = {w:null, h:null};
    this.carPlayer = null;
    this.background = null;
    this.obstacles = null;

    this.init();
}

init(){//* triggers the fucntions bellow in order
    console.log('GAME ON!')
    this.setCanvas();
    this.getSize();
    this.loadBackground()
    this.createPlayer();
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

createObstacles(){
    this.obstacles = new Obstacles (this.canvas, this.ctx, 0,0,200,5,this.gameSize);
    this.obstacles.addBarrier();
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

        requestAnimationFrame(()=>this.drawAll())
}

setEventHandlers(){ //* setting the event handlers on the coument calling the determinate moving function for the assigned keys 
    document.addEventListener('keydown',(event)=>{ //this is trigering an event ehnever a key is pressed
        //console.log(event);
       const key = event.key;
       key === "ArrowRight" ? this.carPlayer.moveRight(): null;
       key === "ArrowLeft" ? this.carPlayer.moveLeft(): null;
    })
    }

clear(){
    this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
}
}