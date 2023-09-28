/**
 * 例2：
 * 甲乙丙87个球
 * 甲是乙的2倍少2个
 * 丙是甲的3倍多5个
 * 问甲乙丙各多少个
 * 
 * 答：
 * 假设甲为x
 * x + (x+2) / 2 + 3*x + 5 = 87
 * 2x + x + 2 + 6x + 10 = 174
 * 9x = 162
 * x = 18
 * 甲18个，乙10个，丙59个
 */


/**
 * 例3：
 * 甲乙丙丁和为549
 * 如果甲加上2，乙减少2，丙乘以2，丁除以2，则四个数相等
 * 问甲乙丙丁各多少
 * 
 * 答：
 * 假设甲为x，则乙为x + 4，丙为 (x+2) / 2，丁为 (x+2) * 2
 * x + x + 4 + (x+2) / 2 + (x+2) * 2 = 549
 * 2x + 4 + x/2 + 1 + 2x + 4 = 549
 * 4x + 8 + x + 2 + 4x + 8 = 1098
 * 9x = 1098 - 18
 * 9x = 1080
 * x = 120
 * 
 * 甲为120，乙为124，丙为61，丁为244
 * 
*/

/**
 * 例5:
 * 甲乙进行大战
 * 甲消灭了20个乙，此时甲是乙的2倍
 * 乙又消灭了90个甲，此时乙是甲的3倍
 * 那么开始时甲乙一共有多少？
 * 
 * 答：
 * 假设甲为x
 * (x - 90) * 3 = (x / 2)
 * 3x - 270 = x / 2
 * 6x - 540 = x
 * 5x = 540
 * x = 108
 * 甲为108，乙为 (108 / 2) + 20 = 74
 * 一共为182
*/