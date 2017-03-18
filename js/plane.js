//我方飞机
//组合继承
function MyPlane(className,number) {
	
	Spirit.call(this,className);
	
	var self = this; //临时变量要重新声明，Spirit()里面的是看不到的
	
	self.difficulty = number;
	
	//子弹数组
	self.bulletArray = [];

	//初始位置
	self.ele.style.left = (self.gameBox.offsetWidth - self.ele.offsetWidth) / 2 + "px";
	self.ele.style.top = document.body.clientHeight - self.ele.offsetHeight + "px";
	
	//拖拽
	self.drag();
	
	//发射子弹
	self.shot();
}
//原型链
MyPlane.prototype = new Spirit();

//拖拽
MyPlane.prototype.drag = function() {
	var self = this;
	self.ele.onmousedown = function(evt) {
		var oEvent = evt || event;
		self.disX = oEvent.offsetX;
		self.disY = oEvent.offsetY;
		
		onmousemove = function(evt) {
			var oEvent = evt || event;
			self.ele.style.left = oEvent.clientX - self.gameBox.offsetLeft - self.disX + "px";
			self.ele.style.top = oEvent.clientY - self.gameBox.offsetTop - self.disY + "px";
			
			//不能超出左右边界
			if (self.ele.offsetLeft < 0) {
				self.ele.style.left = 0;
			}else if (self.ele.offsetLeft >= self.gameBox.offsetWidth - self.ele.offsetWidth) {
				self.ele.style.left = self.gameBox.offsetWidth - self.ele.offsetWidth + "px";
			}
		};
		
		onmouseup = function() {
			onmousemove = null;
			onmouseup = 0;
		};
	}; 
	
};

//发射子弹
MyPlane.prototype.shot = function() {
	var self = this;
	self.bulletTimer = setInterval(function() {
		//创建子弹对象
		//子弹初始位置
		var initX = self.ele.offsetLeft + self.ele.offsetWidth / 2 - 4;
		var initY = self.ele.offsetTop - 9;
		var bullet = new Bullet("bullet", initX, initY);
		
		self.bulletArray.push(bullet);
		
	},(self.difficulty + 1) * 100);
};

//飞机摧毁
MyPlane.prototype.destroy = function(callBack) {

	var self = this;
	var myPlaneBgcCount = 1;
	self.destroyTimer = setInterval(function() {
		
		//判断放前面可以让最后一层代码延迟一次
		if (myPlaneBgcCount >= 4) {
			clearInterval(self.destroyTimer);
			callBack();
			return;
		}
		self.ele.style.backgroundImage = "url(img/me_die" + myPlaneBgcCount + ".png)";
		myPlaneBgcCount++;
		
	},30);
};
