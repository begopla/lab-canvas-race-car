class Obstacles {
    constructor (canvas,ctx,positionX,positionY,width,height,gameSize){
       this.canvas = canvas;
        this.ctx = ctx;
        this.obstaclePos = {x:positionX, y: positionY};
        this.playerSize = {w: width, h: height};
        
        this.gameSize = gameSize;
        this.frames = 0;
    }

    addBarrier(){///add a counter to count how many times we call the function
        this.frames +=1; 
        if(this.frames %60 ===0){
            let minWidth=20;
            let maxWidth = 200;
            let width =  Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth)
            let minGap = 50;
            let maxGap = 200;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myObstacles.push(new Component(width, 10, 'red', 0, y));
            myObstacles.push(new Component(this.gameSize.w-width-gap, 10, 'red', 0, width + gap));

        }


    }
}