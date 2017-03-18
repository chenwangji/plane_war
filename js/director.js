//导演构造函数
function Director(number) {
	var self = this;
	
	//因为界面上的元素节点要经常用到，所以保存到导演对象属性中
	self.difficulty = number; //0 1 2 3
	self.difficultyArr = document.getElementsByTagName("li");
	self.gameBox = document.getElementById("game-box");
	self.difficultyBox = document.getElementsByTagName("ul")[0];
	self.scoreNode = document.getElementsByClassName("score-board")[0];
	
	//存储敌机的一个数组
	self.enemyArray = [];
	
	//分数
	self.score = 0;
	
	self.startMovie(function() { //回调函数
		
		//-------执行完startMmovie()中待代码就来到了这里
		//删除logo和进度条
		self.gameBox.removeChild(self.logoEle);
		self.gameBox.removeChild(self.loadingEle);
		
		//背景向下移动
		self.backgroundMoveTimer = setInterval(function() {
			self.gameBox.style.backgroundPositionY = parseInt(getComputedStyle(self.gameBox,null).backgroundPositionY) + 1 + "px";
		},100);
		
		//显示记分牌
		self.scoreNode.style.display = "block";
		
		//创建飞机对象
		//我方飞机
		self.myPlane = new MyPlane("my-plane", self.difficulty);
		
		//敌机
		self.enemyApearTimer = setInterval(function() {
			
			//随机一个数，判断其大小，决定出现的是哪种飞机，以获得不同概率
			var chance = Math.random();
			
			if (chance < 0.6) {
				self.enemy = new Enemy("small-plane", 10, 1);
				
				//保存背景最大值到对象
				self.enemy.maxBgcNum = 3;
				
				//保存敌机类型
				self.enemy.type = 1;
				
			}else if (chance < 0.9) {
				self.enemy = new Enemy("middle-plane", 5, 3);
				
				self.enemy.maxBgcNum = 4;
				self.enemy.type = 2;
				
			}else {
				self.enemy = new Enemy("big-plane", 2, 10);
				
				self.enemy.maxBgcNum = 6;
				self.enemy.type = 3;
				
			}
			
			//将所有敌机保存到导演的一个数组属性中
			self.enemyArray.push(self.enemy);
			
		},1200);
		
		//检测碰撞
		self.seekHitTimer = setInterval(function() {
//			console.log(self.enemyArray.length);
			for (var i = 0; i < self.enemyArray.length; i++) {
				
			//将飞出屏幕和被击落的敌机移除----即没有父元素，游离于HTML文档之外的节点
				if (!self.enemyArray[i].ele.parentNode) {

					self.enemyArray.splice(i,1);
					continue;
				}
				//判断碰撞
				if (self.isHit(self.enemyArray[i].ele,self.myPlane.ele) && (!self.myPlane.hasBoomed)) {

					//我方飞机摧毁
					self.myPlane.hasBoomed = true;
					
					self.myPlane.destroy(function() {
						
						alert("game over");//为什么出现两次alert()? ----因为代码在没执行一遍外层计时器又重新执行了，故只能让他执行一次						
						//重启开始页面
						location.reload(); 
					});
					
				}
				
				//检测敌机碰撞子弹
				for (var j = 0; j < self.myPlane.bulletArray.length; j++) {
					
					//将游离的子弹元素从数组中清除
//					console.log(self.myPlane.bulletArray.length);
					if (!self.myPlane.bulletArray[j].ele.parentNode) {
						self.myPlane.bulletArray.splice(j,1);
					}
					
					if (self.isHit(self.enemyArray[i].ele,self.myPlane.bulletArray[j].ele) && (!self.myPlane.bulletArray[j].hasBoomed)) {
						//子弹摧毁
						self.myPlane.bulletArray[j].hasBoomed = true; //因为代码在没执行一遍外层计时器又重新执行了，故只能让他执行一次		
						self.myPlane.bulletArray[j].destroy();					
						//敌机血条减少
						self.enemyArray[i].hurt(function() {
							//敌机摧毁
							self.enemyArray[i].destroy();
							//分数改变
							self.score = self.score + self.enemyArray[i].scorePerPlane;
							self.scoreNode.innerHTML = self.score;

						});
						
					}
				}
			}
				
		},30);
	});
}




//加载开始动画
Director.prototype.startMovie = function (callBack) {
	var self = this;
	
	//删除难度列表
	self.gameBox.removeChild(self.difficultyBox);
	
	//创建logo和动画
	self.logoEle = document.createElement("div");
	self.loadingEle = document.createElement("div");
	
	self.logoEle.className = "logo";
	self.loadingEle.className = "loading-bar";
	
	self.gameBox.appendChild(self.logoEle);
	self.gameBox.appendChild(self.loadingEle);
	
	//加载条变化
	self.loadingImageCount = 2;
	self.loadingTimter = setInterval(function() {
		self.loadingEle.style.backgroundImage = "url(img/loading" + self.loadingImageCount + ".png)";
		self.loadingImageCount++;
		if(self.loadingImageCount == 5) {
			clearInterval(self.loadingTimter);
			
			//用回调函数将动作返回到主逻辑区
			callBack();
		}
	},300);
}

//判断两元素是否碰撞
Director.prototype.isHit = function(Node1,Node2) {
	
	var left1 = Node1.offsetLeft;
	var width1 = Node1.offsetWidth;
	var top1 = Node1.offsetTop;
	var height1 = Node1.offsetHeight;
	
	var left2 = Node2.offsetLeft;
	var width2 = Node2.offsetWidth;
	var top2 = Node2.offsetTop;
	var height2 = Node2.offsetHeight;
	
	//两个块的中心之和小于两个块的尺寸一半的和的时候，两个块有重叠
	//也可以判断两元素是否重叠，通过left和width / top和height
	if ( Math.abs((left2 + width2 / 2) - (width1 / 2 + left1)) < (width1 + width2) / 2 - 3 && Math.abs((top2 + height2 / 2) - (height1 / 2 + top1)) < (height1 + height2) / 2 - 3) {
		return true;
	}
	return false;
};
