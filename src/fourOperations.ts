/*
 * @Author GyYu
 * @Description //TODO 四则运算的基类
 * @Date 10:08 2021/2/26
 * @Param  支持(（a+b）*c)+（-d+f）/2
 * @return
 **/

let bigDecimal = require('js-big-decimal');
export default class fourOperations {
	private rounding = { maximumSignificantDigits: 1000, roundingMode: 'HALF_EVEN' };

	// round 是否进行精度处理
	constructor(private calculationExpression: string, private float?: number, private round?: boolean) {}

	/*
	 * @Author GyYu
	 * @Description //TODO 获取计算结果
	 * @Date 13:26 2021/2/26
	 **/
	public calculationResults(): string {
		let calculationExpression = this.rounds(this.calculationExpression);
		calculationExpression = this.absolute(calculationExpression);
		calculationExpression = this.subs(calculationExpression);
		// calculationExpression =this.include(calculationExpression)
		return this.operation(calculationExpression, this.float, this.round);
	}

	// 计算表达式中的字符串截取
	private subs(calculationExpression): string {
		if (calculationExpression.indexOf('sub(') == -1) {
			// 没有关键词，直接返回表达式
			return calculationExpression;
		}
		let reg = new RegExp(/(sub\([^\)]*\))/g); // 匹配abs(****),如果中间部分有） 则会出现abs右括号数据丢失情况 单独处理
		let matchArr: [] = calculationExpression.match(reg);
		if (matchArr) {
			for (let i = 0; i < matchArr.length; i++) {
				let item = matchArr[i] + '';
				let str = item
					.replace('sub(', '')
					.replace(')', '')
					.split(','); // 拆分表达式与精度
				let str1 = str[0].substring(parseInt(str[1]), parseInt(str[2]));
				str1 = this.subs(str1); // 确认一下，是否还存在subs
				calculationExpression = calculationExpression.replace(item, str1);
			}
			return calculationExpression;
		}
		return '';
	}

	// 计算表达式中的数据精度设置
	private rounds(calculationExpression): string {
		if (calculationExpression.indexOf('round(') == -1) {
			// 没有关键词，直接返回表达式
			// calculationExpression = this.absolute(calculationExpression) // 递归到最底层，再去确认一下，是否有abs
			return calculationExpression;
		}
		let reg = new RegExp(/(round\([^\)]*\))/g); // 匹配abs(****),如果中间部分有） 则会出现abs右括号数据丢失情况 单独处理
		let matchArr: [] = calculationExpression.match(reg);
		if (matchArr) {
			for (let i = 0; i < matchArr.length; i++) {
				let item = matchArr[i] + '';
				let leftKh = item.match(new RegExp(/\(/g));
				let rightKh = item.match(new RegExp(/\)/g));
				if (leftKh.length > rightKh.length) {
					// 里面还有表达式，走递归
					let c: number = leftKh.length - rightKh.length; // 左右括号相差的数量
					let d: number = this.findIndex(calculationExpression.split(item)[1], ')', c - 1); // 找到右括号的截止位置
					let str = item.replace('round(', '') + calculationExpression.split(item)[1].substring(0, d); // 上述描述扩回丢失情况在这里补
					let str1 = item + calculationExpression.split(item)[1].substring(0, d + 1); // 要替换的数据
					let str2 = this.absolute(str); // 如果包含abs 则处理一下待替换的str1
					let s = str2.lastIndexOf(','); // 查找逗号最后一次出现的位置
					calculationExpression = calculationExpression.replace(str1, str2); // 将表达式中的abs表达式，替换成具体数值
					calculationExpression = calculationExpression.replace(
						str2, // 替换round表达式
						this.operation(this.rounds(this.absolute(str2).substring(0, s)), parseInt(str2.substring(s + 1, str2.length)), this.round) // 绝对值处理
					); // 绝对值处理
				} else {
					//里面没有表达式了，走计算
					let arr = item
						.replace('round(', '')
						.replace(')', '')
						.split(','); // 拆分表达式与精度
					let str = this.operation(arr[0], parseInt(arr[1]), this.round);
					str = this.absolute(str); // 确认一下，是否还存在abs
					calculationExpression = calculationExpression.replace(item, this.operation(this.absolute(arr[0]), parseInt(arr[1]), this.round)); // 绝对值处理
				}
			}
			return calculationExpression;
		}
		return '';
	}

	// 取绝对值
	private absolute(calculationExpression): string {
		if (calculationExpression.indexOf('abs(') == -1) {
			// 没有关键词，直接返回表达式
			return calculationExpression;
		}
		let reg = new RegExp(/(abs\([^\)]*\))/g); // 匹配abs(****),如果中间部分有） 则会出现abs右括号数据丢失情况 单独处理
		let matchArr: [] = calculationExpression.match(reg);
		if (matchArr) {
			for (let i = 0; i < matchArr.length; i++) {
				let item = matchArr[i] + '';
				let leftKh = item.match(new RegExp(/\(/g));
				let rightKh = item.match(new RegExp(/\)/g));
				if (leftKh.length > rightKh.length) {
					let c: number = leftKh.length - rightKh.length; // 左右括号相差的数量
					let d: number = this.findIndex(calculationExpression.split(item)[1], ')', c - 1); // 找到右括号的截止位置
					let str = item.replace('abs(', '') + calculationExpression.split(item)[1].substring(0, d); // 上述描述扩回丢失情况在这里补
					let str1 = item + calculationExpression.split(item)[1].substring(0, d + 1); // 要替换的数据
					let str2 = this.rounds(str1); // 如果包含abs 则处理一下待替换的str1
					calculationExpression = calculationExpression.replace(str1, str2); // 将表达式中的abs表达式，替换成具体数值
					calculationExpression = calculationExpression.replace(
						str2,
						this.operation(this.absolute(this.rounds(str)), this.float, this.round).replace('-', '') // 绝对值处理
					); // 绝对值处理
				} else {
					let str = this.operation(item.replace('abs(', '').replace(')', ''), this.float, this.round).replace('-', '');
					str = this.rounds(str);
					calculationExpression = calculationExpression.replace(item, this.operation(this.rounds(str), this.float, this.round).replace('-', '')); // 绝对值处理
				}
			}
			return calculationExpression;
		}
		return '';
	}

	private findIndex(str, cha, num) {
		let s = str;
		let x = str.indexOf(cha);
		let d = str.indexOf(','); // 字符串中第一个逗号的位置
		if (d > 0) {
			// 如果逗号不在第一位
			s = str.split(',')[1]; // 待查字符串位置为逗号后边
		}
		for (let i = 0; i < num; i++) {
			// 扩回在逗号后边找
			x = s.indexOf(cha, x + 1);
		}
		if (d > 0) {
			// 如果逗号不在第一位，位置为逗号前的长度加上在逗号后的位置
			x = x + str.split(',')[0].length;
		}
		return x;
	}

	// 转化为对象
	private newBigdecimal(v: string): string {
		let reg = RegExp(/^(?:0|\-?(?:0\.\d*[0-9]|[0-9]\d*(?:\.\d*[0-9])?))$/); //  包括0.000000 所有实数
		return reg.test(v) ? new bigDecimal(v) : '0.00';
	}

	/*
	 * @Author GyYu
	 * @Description //TODO 计算连接符优先级
	 * @Date 13:27 2021/2/26
	 **/
	private compareYXJ(str: string): number {
		let yxj; //优先级
		switch (str) {
			case '*':
				yxj = 5;
				break;
			case '/':
				yxj = 5;
				break;
			case '+':
				yxj = 4;
				break;
			case '-':
				yxj = 4;
				break;
		}
		return yxj;
	}

	private verifyRealnumbers(n): boolean {
		let reg = RegExp(/^(?:0|\-?(?:0\.\d*[0-9]|[0-9]\d*(?:\.\d*[0-9])?))$/); //  包括0.000000 所有实数
		return reg.test(n);
	}

	/*
	 * @Author GyYu
	 * @Description //TODO 解析计算表达式
	 * @Date 13:27 2021/2/26
	 * str 表达式 float 2 保留几位小数
	 **/
	private operation(str: string, float: number = 2, round: boolean = true) {
		let reg = RegExp(/\+|\-|\*|\/|\(|（|\)|）/g); // 匹配计算连接符  +-*/()
		let strSplit = str.split(reg);
		let strMatch = str.match(reg);
		let newStr = [];
		for (var i = 0; i < strSplit.length; i++) {
			if (strSplit[i]) {
				newStr.push(strSplit[i]);
			}
			if (i != strSplit.length - 1) {
				newStr.push(strMatch[i]);
			}
		}
		let newStr1 = [];
		for (var i = 0; i < newStr.length; i++) {
			if (i == 0 && newStr[i] == '-') {
				newStr1.push(newStr[i] + newStr[i + 1]);
				i = i + 1;
			} else if (i - 1 >= 0 && newStr[i] == '-' && isNaN(newStr[i - 1]) && newStr[i - 1] != ')') {
				newStr1.push(newStr[i] + newStr[i + 1]);
				i = i + 1;
			} else {
				newStr1.push(newStr[i]);
			}
		}
		newStr = newStr1;
		// 创建一个栈
		let stack = new Stack();
		// 表示缓存数据区
		let list = new Array();
		for (let i: number = 0; i < newStr.length; i++) {
			// 只要是数字直接缓存区 //newStr[i] >= '0' && newStr[i] <= '9'
			if (!isNaN(newStr[i])) {
				list.push(newStr[i]);
			} else if (newStr[i] == '+' || newStr[i] == '-' || newStr[i] == '*' || newStr[i] == '/') {
				while (true) {
					if (stack.isEmpty() || stack.peek() == '(') {
						stack.push(newStr[i]);
						break;
					} else if (this.compareYXJ(newStr[i]) > this.compareYXJ(stack.peek())) {
						//当前运算符优先级大于s1栈顶运算符优先级
						stack.push(newStr[i]);
						break;
					} else {
						//小于等于
						let cc = stack.peek();
						stack.pop();
						list.push(cc);
					}
				}
			} else {
				if (newStr[i] == '(') {
					stack.push(newStr[i]);
				} else {
					while (stack.peek() != '(') {
						let ccc = stack.peek();
						if (!ccc) {
							break;
						}
						stack.pop();
						list.push(ccc);
					}
					stack.pop();
				}
			}
		}
		// 将剩下的全部追加在后面
		while (!stack.isEmpty()) {
			let cccc = stack.peek();
			if (!cccc) {
				break;
			}
			list.push(cccc);
			stack.pop();
		}
		stack = [];
		while (list.length > 0) {
			let flag = list.shift();
			let handleFlag = flag;
			if (isNaN(handleFlag)) {
				let num2 = stack.pop();
				let num1 = stack.pop();
				if (!this.verifyRealnumbers(num1) || !this.verifyRealnumbers(num2)) {
					console.log('参与计算的参数不合法！');
					break;
				}
				switch (flag) {
					case '+':
						stack.push(bigDecimal.add(num1, num2));
						break;
					case '-':
						stack.push(bigDecimal.subtract(num1, num2));
						break;
					case '*':
						stack.push(bigDecimal.multiply(num1, num2));
						break;
					case '/':
						if (this.verifyRealnumbers(num2) && num2 == 0) {
							stack.push(0);
						} else {
							stack.push(bigDecimal.divide(num1, num2, float + 20)); // 出发精度再细化
						}
						break;
				}
			} else {
				stack.push(handleFlag);
			}
		}
		let result = new bigDecimal(stack[0]);

		if (!round) {
			// 不进行精度处理，直接返回
			return stack[0];
		} else {
			return result ? result.round(float, bigDecimal.RoundingModes.HALF_UP)['value'] : '0.00';
		}
	}
}

function Stack() {
	let items = [];

	this.push = function(element) {
		items.push(element);
	};
	this.pop = function() {
		return items.pop();
	};
	this.peek = function() {
		return items[items.length - 1];
	};
	this.isEmpty = function() {
		return items.length === 0;
	};
	this.size = function() {
		return items.length;
	};
	this.clear = function() {
		items = [];
	};
	this.print = function() {
	};
}
