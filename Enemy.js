function Enemy(enemyType) {
	this.x = width;
	this.y = 100;
	this.enemyX = 55;
	this.enemyY = 55;
	
	this.dirx;
	this.diry;
	
	this.speed = 2;
	this.enemyType = enemyType;
	
	this.direction = 0;
	
	this.show = function () {
		fill(65,94,162);
		ellipse(this.x, this.y,this.enemyX,this.enemyY);
	}
	
	this.hits = function (fish) {
		if (fish.x + fish.fishx > this.x && fish.x < this.x + this.enemyX && fish.y + fish.fishy > this.y && fish.y < this.y + this.enemyY) {
			return true;
		}
	}
	
	this.update = function (fish) {
		if (this.enemyType == 0) {
			this.dirx = (fish.x + fish.fishx/2) - this.x;
			this.diry = (fish.y + fish.fishy/2) - this.y;
			
			this.hyp = sqrt(this.dirx*this.dirx + this.diry*this.diry);
			this.dirx = this.dirx/this.hyp;
			this.diry = this.diry/this.hyp;
			
			this.x += this.dirx*this.speed;
			this.y += this.diry*this.speed;
		}
		else if (this.enemyType == 1) {
			if (frameCount % 60 == 0) {
				this.direction = floor(random(8 - 1));
			}
			
			if (this.direction == 0) {
				this.x += this.speed;
			}
			else if (this.direction == 1) {
				this.x -= this.speed;
			}
			else if (this.direction == 2) {
				this.y += this.speed;
			}
			else if (this.direction == 3) {
				this.y -= this.speed;
			}
			else if (this.direction == 4) {
				this.y -= sqrt(this.speed);
				this.x -= sqrt(this.speed);
			}
			else if (this.direction == 5) {
				this.y -= sqrt(this.speed);
				this.x += sqrt(this.speed);
			}
			else if (this.direction == 6) {
				this.y += sqrt(this.speed);
				this.x -= sqrt(this.speed);
			}
			else if (this.direction == 7) {
				this.y += sqrt(this.speed);
				this.x += sqrt(this.speed);
			}

		}
		if (this.y > height - this.enemyY) {
			this.y = height - this.enemyY;
		}
		if (this.x > width - this.enemyX) {
			this.x = width - this.enemyX;
		}
		if (this.y < 0) {
				this.y = 0
		}
		if (this.x < 0) {
				this.x = 0
		}
	}
}