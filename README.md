## ygy_fouroperations

[TOC]



> author ygy
>
> 插件：js-big-decimal

## Build Setup

``` bash
npm i ygy_fouroperations
```

## quote

```javascript
import {fourOperationsResult} from "ygy_fouroperations";
```



## medthods

### fourOperationsResult

获取四则运算计算结果：支持复杂四则运算，包含加减乘除优先级，括号优先级，支持特殊类型字符“round()”,表达式中的某一段精度处理、“abs()”表达式中的某一段绝对值处理

这个方法是该插件的核心，其余方法都是对js-big-decimal的简单二次封装

  * @Param 
  * calculationExpression ：计算表达式 string
  * float ：数据精度
  * round：四舍五入开关

* @return 计算结果

```javascript
fourOperationsResult(calculationExpression,float，round)
```

案例

```javascript
     let str = 'round(1/round(3+4,2),2)+round(3/round(3/round(1+2,2),4),2)'// round  3.14
	//let str = 'round((1*2+3*4)/(5+6),2)' // 结果 1.27
    // let str = '1+abs(1-abs(1-abs(1-7)))+abs(2-1)' // abs   6.00
    // let str = 'abs(1-round(1+abs(1-2),3))+abs(3-5)'  // abs - round   结果 3.00
    //let str = 'round(1-round(1+abs(1-2),3))+abs(3-5)'  // abs - round   结果 2.00
     console.log(fourOperationsResult(str,2,true))
```

### negate

数值取反

* @Param 传入正数，返回负数，反之返回正数
* retrun 传入正数，返回负数，反之返回正数

```javascript
negate(str)
```

### ceil

返回最接近但不小于输入数字的整数

* @Param  str  string类型
* retrun 返回最接近但不小于输入数字的整数

```javascript
ceil(str)
```

### floor

返回最接近但不大于输入数字的整数

@Param  str  string类型

retrun 返回最接近但不大于输入数字的整数

```javascript
floor(str)
```

### getPrettyValue

数字格式化，默认情况下，它以标准数字格式返回数字，每三位数字后加逗号。两个参数，数字-要分组的（整数部分）位数，和分隔符-标记分隔的字符。例如，将16位数字格式化为信用卡

* @Param  
* str  string类型
* digits 处理位数单位
* separator 连接符
* retrun 格式化后结果

```javascript
getPrettyValue(str, digits, separator)
```

### round

将舍入值返回到指定精度（小数点后的位数）。即使未传递任何参数，默认精度设置为0，舍入模式设置为半舍五入。

* @Param  
* str  string类型
* float:精度  number类型
* retrun 四舍五入结果

```javascript
round(str, float)
```

### modulus

得到两个数的模，即当被除数除以除数时的余数。请注意，除数和被除数都必须是整数。

* @Param  
* str：  string类型
* str1 ：string类型
* retrun 取余数

```javascript
modulus(str, str1)
```

### add

两数加法

* @Param  
* str  string类型
* str1 ：string类型
* retrun 加法计算结果

```javascript
modulus(str, str1)
```

### subtract

两数减法

* @Param  
* str  string类型
* str1 ：string类型
* retrun 减法计算结果

```javascript
modulus(str, str1)
```

### multiply

两数乘法

* @Param  
* str  string类型
* str1 ：string类型
* retrun 乘法计算结果

```javascript
modulus(str, str1)
```

### divide

两数除法

* @Param  
* str  string类型
* str1 ：string类型
* float：精度
* retrun 除法计算结果

```javascript
modulus(str, str1，float)
```

### compareTo

比较大小

* @Param  
* str  string类型
* str1 ：string类型
* return -1(小于)， 0(等于)， 1(大于)

```javascript
compareTo(str, str1)
```

