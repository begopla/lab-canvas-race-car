class Background {
	constructor(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = null;
		this.moveSpeed = 2;
		this.y = 0;
	}

	setImage() {
		this.image = new Image();
		this.image.src = "./images/road.png";
	}

	draw() {
		if (this.image) { 
			this.ctx.drawImage( //* we are going to draw the background twice on top of each other to have the illusion of a looping backgroun
				this.image,
				0,
				this.y,
				this.canvas.width,
				this.canvas.height
			);
			this.ctx.drawImage(
				this.image,
				0,
				this.y - this.canvas.height, //*wherever we are minus height of cavas
				this.canvas.width,
				this.canvas.height
			);
		}
	}

	move() {
		this.y += this.moveSpeed; //**moving down adding the defined speed */
		this.y %= this.canvas.height; //*this is returning and assigning to y a value between 0 and the canvas height
	}
}
