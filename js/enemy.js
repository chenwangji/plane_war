function Enemy(className,speed,blood) {
	Spirit.call(this,className);
	var self = this;
	//飞行速度
	self.speed = speed;
	//血条
	self.blood = blood;
	self.scorePerPlane = blood;
	
	//让飞机飞
	self.fly();
}

//原型链
Enemy.prototype = new Spirit();

Enemy.prototype.fly = function() {
	var self = this;
	//初始位置
	self.ele.style.top = -self.ele.offsetHeight + "px";
	self.ele.style.left = parseInt(Math.random() * (self.gameBox.offsetWidth - self.ele.offsetWidth)) + "px";
	
	//飞机移动
	self.enemyFlyTimer = setInterval(function() {
		
		self.ele.style.top = self.ele.offsetTop + self.speed + "px";

		if(self.ele.offsetTop > self.gameBox.offsetHeight + 200 && self.ele.parentNode) {
			clearInterval(self.enemyFlyTimer);
			
			//移除飞机
			self.gameBox.removeChild(self.ele); //和子弹一样，怎么把不是毁坏的飞机从数组中移除？
		}
	},30);	
};

//敌机受伤
Enemy.prototype.hurt = function(callBack) {
	var self = this;
	self.blood--;
	if (self.blood == 0) {
		callBack();
	}
};

Enemy.prototype.destroy = function(callBack) {

	var self = this;
	self.enemyBgcCount = 1;
	self.enemyDestroyTimer = setInterval(function() {

		self.ele.style.background = "url(img/plane" + self.type + "_die" + self.enemyBgcCount + ".png)";
		
		self.enemyBgcCount++;

		if (self.enemyBgcCount > self.maxBgcNum && self.ele.parentNode) {

			clearInterval(self.enemyDestroyTimer);

			self.gameBox.removeChild(self.ele);

		}
		

	},30);
};
