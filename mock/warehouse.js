/**
 * 仓库 Mock 数据
 * 使用 Mock.js 生成仿真数据
 */
const Mock = require('mockjs')

// 生成仓库列表数据
const warehouseList = Mock.mock({
    'list|20': [{
        'id|+1': 1,
        'warehouseName': '@ctitle(2, 4)仓库',
        'warehouseCode': /WH[A-Z]{2}\d{4}/,
        'location': '@city(true)',
        'address': '@county(true)@ctitle(3,5)路@natural(1, 200)号',
        'area|500-5000': 1000,                    // 面积（平方米）
        'totalCapacity|1000-10000': 5000,         // 总容量
        'usedCapacity|100-4500': 2000,            // 已用容量
        'availableCapacity': function () {         // 剩余容量
            return this.totalCapacity - this.usedCapacity
        },
        'usageRate': function () {                 // 使用率
            return Math.round((this.usedCapacity / this.totalCapacity) * 100)
        },
        'status|1': ['正常', '维护中', '已满', '空闲'],
        'type|1': ['普通仓库', '冷链仓库', '危险品仓库', '高架仓库', '智能仓库'],
        'manager': '@cname',                      // 仓库管理员
        'managerPhone': /1[3-9]\d{9}/,            // 联系电话
        'temperature|15-30': 25,                  // 温度（摄氏度）
        'humidity|40-80': 60,                     // 湿度（%）
        'deviceCount|5-50': 20,                   // 设备数量
        'alarmCount|0-5': 0,                      // 告警数量
        'todayInbound|0-100': 50,                 // 今日入库数
        'todayOutbound|0-100': 30,                // 今日出库数
        'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        'updateTime': '@now("yyyy-MM-dd HH:mm:ss")'
    }]
}).list

// 生成库位数据
const storageLocationList = Mock.mock({
    'list|100': [{
        'id|+1': 1,
        'locationCode': /KW[A-Z]\d{2}-\d{2}-\d{2}/,  // 库位编码 如 KWA01-02-03
        'warehouseId|1-20': 1,
        'zone|1': ['A区', 'B区', 'C区', 'D区'],
        'shelf|1-10': 1,                             // 货架号
        'layer|1-5': 1,                              // 层数
        'position|1-10': 1,                          // 位置
        'capacity|10-100': 50,
        'usedCapacity|0-50': 25,
        'status|1': ['空闲', '占用', '锁定', '维护'],
        'goodsName': '@ctitle(2, 4)',
        'goodsCode': /GD\d{6}/,
        'quantity|0-500': 100,
        'unit|1': ['件', '箱', '托', '个', '千克'],
        'lastOperation': '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
}).list

// 生成库存数据
const inventoryList = Mock.mock({
    'list|50': [{
        'id|+1': 1,
        'goodsCode': /GD\d{6}/,
        'goodsName': '@ctitle(2, 6)',
        'category|1': ['电子产品', '机械设备', '原材料', '成品', '半成品', '包装材料'],
        'specification': '@ctitle(3, 6)',
        'unit|1': ['件', '箱', '托', '个', '千克', '米'],
        'quantity|10-1000': 100,
        'safeStock|50-200': 100,                  // 安全库存
        'warehouseId|1-20': 1,
        'warehouseName': '@ctitle(2, 4)仓库',
        'locationCode': /KW[A-Z]\d{2}-\d{2}-\d{2}/,
        'batchNo': /BN\d{8}/,                     // 批次号
        'productionDate': '@date("yyyy-MM-dd")',
        'expirationDate': '@date("2026-MM-dd")',
        'supplier': '@cword(4, 8)有限公司',
        'price|10-1000.2': 100,                   // 单价
        'totalValue': function () {
            return (this.quantity * this.price).toFixed(2)
        },
        'status|1': ['正常', '待检', '冻结', '过期预警'],
        'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
}).list

// 生成出入库记录
const inOutRecordList = Mock.mock({
    'list|100': [{
        'id|+1': 1,
        'recordNo': /IO\d{12}/,
        'type|1': ['入库', '出库'],
        'goodsCode': /GD\d{6}/,
        'goodsName': '@ctitle(2, 6)',
        'quantity|1-100': 50,
        'unit|1': ['件', '箱', '托', '个'],
        'warehouseId|1-20': 1,
        'warehouseName': '@ctitle(2, 4)仓库',
        'locationCode': /KW[A-Z]\d{2}-\d{2}-\d{2}/,
        'operator': '@cname',
        'reason|1': ['采购入库', '生产入库', '退货入库', '销售出库', '生产领料', '调拨出库'],
        'relatedOrder': /PO\d{10}/,
        'remark': '@csentence(5, 15)',
        'operateTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        'status|1': ['已完成', '进行中', '待审核']
    }]
}).list

// 生成仓库统计数据
const warehouseStats = {
    totalWarehouses: 20,
    totalArea: 85000,
    totalCapacity: 150000,
    usedCapacity: 98500,
    usageRate: 65.67,
    todayInbound: 1258,
    todayOutbound: 892,
    alarmCount: 3,
    inventoryValue: 12580000.00,
    goodsCategories: 156,

    // 近7天出入库统计
    weeklyStats: Mock.mock({
        'list|7': [{
            'date': function () {
                const d = new Date()
                d.setDate(d.getDate() - (6 - this.id))
                return d.toISOString().split('T')[0]
            },
            'id|+1': 0,
            'inbound|50-200': 100,
            'outbound|30-150': 80
        }]
    }).list,

    // 仓库容量分布
    capacityDistribution: [
        { name: 'A区', value: 35000 },
        { name: 'B区', value: 28000 },
        { name: 'C区', value: 22000 },
        { name: 'D区', value: 15000 }
    ],

    // 库存分类统计
    categoryStats: [
        { name: '电子产品', value: 45000 },
        { name: '机械设备', value: 32000 },
        { name: '原材料', value: 28000 },
        { name: '成品', value: 18000 },
        { name: '其他', value: 12000 }
    ]
}

module.exports = {
    warehouseList,
    storageLocationList,
    inventoryList,
    inOutRecordList,
    warehouseStats
}
