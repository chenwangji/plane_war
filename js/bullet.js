function Bullet(className, x, y) {
	
	Spirit.call(this,className);
	
	var self = this;
	
	//将子弹的初始位置保存到子弹对象中
	self.startPositionX = x;
	self.startPositionY = y;
	
	//让子弹飞
	self.move();

}

//原型链
//Bullet.prototype = new Bullet(); //把原型并到原型链就会产生空对象，判断了没用------为什么？

//子弹飞行
Bullet.prototype.move = function() {
	var self = this;
	//初始位置
	self.ele.style.left = self.startPositionX + "px";
	self.ele.style.top = self.startPositionY + "px";
	self.speedY = -20;
	
	self.bulletMoveTimer = setInterval(function() {
		self.ele.style.top = self.speedY + self.ele.offsetTop + "px";
		//如果子弹超出屏幕并且子弹没被移除出HTML文档
		if (self.ele.offsetTop < -self.ele.offsetHeight && self.ele.parentNode) {
			clearInterval(self.bulletMoveTimer);
			//超出屏幕移除子弹
			self.gameBox.removeChild(self.ele); //该怎么从子弹数组中移除？----这应该是卡的原因
		}
	},30);
};

//子弹摧毁
Bullet.prototype.destroy = function() {
	var self = this;
	var bulletBgcCount = 1;
	
	//因为子弹爆炸后变大，故要改样式，比较好的办法是在样式表里改，然后更换className
	self.ele.className = "bullet-boom";
	
	self.bulletDestroyTimer = setInterval(function() {
		
		if (bulletBgcCount == 3 && self.ele.parentNode) {
			clearInterval(self.bulletDestroyTimer);
			
			//移除子弹元素和运动计时器
			self.gameBox.removeChild(self.ele);
			clearInterval(self.bulletMoveTimer);
		}
	
		self.ele.style.backgroundImage = "url(img/die" + bulletBgcCount + ".png)";
		bulletBgcCount++;

	},30);
};

