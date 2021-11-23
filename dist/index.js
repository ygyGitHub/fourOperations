"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareTo = exports.divide = exports.multiply = exports.subtract = exports.add = exports.modulus = exports.round = exports.getPrettyValue = exports.floor = exports.ceil = exports.negate = exports.fourOperationsResult = void 0;
/**
  * @Description:四则运算入口
  * @author GyYU
  * @Date 2021-11-23 3:26:54 ?F10: PM?
  */
var fourOperations_1 = __importDefault(require("./fourOperations"));
var bigDecimal = require('js-big-decimal');
/*
 * @Author GyYu
 * @Description
 * @Date 2021-11-23 3:33:25 ?F10: PM?
 * @Param
 * calculationExpression ：计算表达式
 * float ：数据精度
 * round：四舍五入开关
 * @return
 */
function fourOperationsResult(calculationExpression, float, round) {
    return new fourOperations_1.default(calculationExpression, float, round).calculationResults();
}
exports.fourOperationsResult = fourOperationsResult;
/*
 * @Author GyYu
 * @Description 数值取反
 * @Date 2021-11-10 1:49:05 ?F10: PM?
 * @Param 传入正数，返回负数，反之返回正数
 * @return
 */
function negate(str) {
    return bigDecimal.negate(str);
}
exports.negate = negate;
/*
 * @Author GyYu
 * @Description 返回最接近但不小于输入数字的整数
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return
 */
function ceil(str) {
    return bigDecimal.ceil(str);
}
exports.ceil = ceil;
/*
 * @Author GyYu
 * @Description 返回最接近但不大于输入数字的整数
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return
 */
function floor(str) {
    return bigDecimal.floor(str);
}
exports.floor = floor;
/*
 * @Author GyYu
 * @Description 默认情况下，它以标准数字格式返回数字，每三位数字后加逗号。两个参数，数字-要分组的（整数部分）位数，和分隔符-标记分隔的字符。例如，将16位数字格式化为信用卡
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return
 */
function getPrettyValue(str, digits, separator) {
    return bigDecimal.getPrettyValue(str, digits, separator);
}
exports.getPrettyValue = getPrettyValue;
/*
 * @Author GyYu
 * @Description 将舍入值返回到指定精度（小数点后的位数）。即使未传递任何参数，默认精度设置为0，舍入模式设置为半舍五入。
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return
 */
function round(str, float) {
    if (float === void 0) { float = 0; }
    return bigDecimal.round(str, float);
}
exports.round = round;
/*
 * @Author GyYu
 * @Description 得到两个数的模，即当被除数除以除数时的余数。请注意，除数和被除数都必须是整数。
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return 余数
 */
function modulus(str, str1) {
    return bigDecimal.modulus(str, str1);
}
exports.modulus = modulus;
/*
 * @Author GyYu
 * @Description 加法
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return 加法结果
 */
function add(str, str1) {
    return bigDecimal.add(str, str1);
}
exports.add = add;
/*
 * @Author GyYu
 * @Description 减法
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return 减法结果
 */
function subtract(str, str1) {
    return bigDecimal.subtract(str, str1);
}
exports.subtract = subtract;
/*
 * @Author GyYu
 * @Description 乘法
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return 乘法结果
 */
function multiply(str, str1) {
    return bigDecimal.multiply(str, str1);
}
exports.multiply = multiply;
/*
 * @Author GyYu
 * @Description 除法
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param
 * @return 除法结果
 */
function divide(str, str1, float) {
    return bigDecimal.divide(str, str1, float);
}
exports.divide = divide;
/*
 * @Author GyYu
 * @Description 比较大小
 * @Date 2021-11-10 1:54:44 ?F10: PM?
 * @Param -1  0  1
 * @return 小于  等于  大于
 */
function compareTo(str, str1) {
    return bigDecimal.compareTo(str, str1);
}
exports.compareTo = compareTo;
