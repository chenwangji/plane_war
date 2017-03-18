onload = function() {
	//获取难度
	var difficultyArr = document.getElementsByTagName("li");
	
	for (var i = 0; i < difficultyArr.length; i++) {
		//用闭包保存难度变量
		difficultyArr[i].onclick = (function (number) {
			//点击难度选项后创建一个导演
			function startEction() {
				var director = new Director(number);	
			}
			return startEction; //后面不能加括号
		})(i);
	}
};

/*
 *游戏的三个要素：
 * 导演：控制游戏进程
 * 场景：各个场景
 * 精灵：游戏角色，元素
 * 
 * 
 * 飞机大战思路：
 * 1. 结构
 * 2. 开始界面样式
 * 3. 封装导演类，将所有的主逻辑放到该类的属性和方法中，通过事件队列，计时器事件完成后callBack依次执行
 * 4. 封装飞机，子弹的父类原型
 * 5. 继承，并且扩展我方飞机，子弹，敌机的属性和方法
 * 
 */