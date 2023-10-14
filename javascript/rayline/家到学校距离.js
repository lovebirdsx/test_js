/**
 * 如果每分钟走60m，就会迟到5分钟
 * 如果每分钟走75m，就会提前2分钟
 * 问：家到学校的距离是多少？
 * 
 * 设：走到学校需要x分钟
 * 则：60 * (x + 5) = 75 * (x - 2)
 * 60x + 300 = 75x - 150
 * 15x = 450
 * x = 30
 * 学校距离家：60 * (30 + 5) = 60 * 35 = 2100m
*/

/**
 * 飞机距离4500m处有一座1500m高的山
 * 飞机离地500m
 * 飞机上升速度为每小时60km
 * 飞机飞越该山的最大速度为多少？
 * 
 * 爬升到山顶需要：(1500 - 500) / (60 / 60 * 1000) = 1分钟
 * 则1分钟内飞机飞行距离不能超过4500m
 * 飞机飞行的最大速度为：4500 / 1 = 4500m/min = 270km/h
 */