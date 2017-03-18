function Spirit(className) {

	//如果参数为空，则停止执行以下代码
	if (!className) {
		return;
	}
	var self = this;
	self.gameBox = document.getElementById("game-box");

	self.ele = document.createElement("div");
	self.ele.className = className;
	self.gameBox.appendChild(self.ele);
}
