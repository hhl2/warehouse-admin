/**
 * Mock Server 入口文件
 * 使用 json-server 启动本地 Mock 服务
 * 
 * 启动命令: npm run mock
 */
const jsonServer = require('json-server')
const warehouseData = require('./warehouse')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// 使用默认中间件（cors, static, etc）
server.use(middlewares)

// 解析 JSON body
server.use(jsonServer.bodyParser)

// 自定义响应格式
server.use((req, res, next) => {
    // 添加统一的响应包装
    res.jsonWrapper = (data, message = 'success') => {
        return res.json({
            code: 200,
            message,
            data,
            timestamp: Date.now()
        })
    }
    next()
})

// ========== 仓库相关接口 ==========

// 获取仓库列表
server.get('/api/warehouse/list', (req, res) => {
    const { page = 1, pageSize = 10, status, keyword } = req.query
    let list = [...warehouseData.warehouseList]

    // 状态筛选
    if (status) {
        list = list.filter(item => item.status === status)
    }

    // 关键词搜索
    if (keyword) {
        list = list.filter(item =>
            item.warehouseName.includes(keyword) ||
            item.warehouseCode.includes(keyword)
        )
    }

    // 分页
    const start = (page - 1) * pageSize
    const end = start + parseInt(pageSize)
    const pageList = list.slice(start, end)

    res.jsonWrapper({
        list: pageList,
        total: list.length,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
    })
})

// 获取仓库详情
server.get('/api/warehouse/:id', (req, res) => {
    const warehouse = warehouseData.warehouseList.find(
        item => item.id === parseInt(req.params.id)
    )
    if (warehouse) {
        res.jsonWrapper(warehouse)
    } else {
        res.status(404).json({ code: 404, message: '仓库不存在' })
    }
})

// 获取库位列表
server.get('/api/storage-location/list', (req, res) => {
    const { warehouseId, status, page = 1, pageSize = 20 } = req.query
    let list = [...warehouseData.storageLocationList]

    if (warehouseId) {
        list = list.filter(item => item.warehouseId === parseInt(warehouseId))
    }
    if (status) {
        list = list.filter(item => item.status === status)
    }

    const start = (page - 1) * pageSize
    const end = start + parseInt(pageSize)

    res.jsonWrapper({
        list: list.slice(start, end),
        total: list.length,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
    })
})

// 获取库存列表
server.get('/api/inventory/list', (req, res) => {
    const { warehouseId, category, keyword, page = 1, pageSize = 20 } = req.query
    let list = [...warehouseData.inventoryList]

    if (warehouseId) {
        list = list.filter(item => item.warehouseId === parseInt(warehouseId))
    }
    if (category) {
        list = list.filter(item => item.category === category)
    }
    if (keyword) {
        list = list.filter(item =>
            item.goodsName.includes(keyword) ||
            item.goodsCode.includes(keyword)
        )
    }

    const start = (page - 1) * pageSize
    const end = start + parseInt(pageSize)

    res.jsonWrapper({
        list: list.slice(start, end),
        total: list.length,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
    })
})

// 获取出入库记录
server.get('/api/inout-record/list', (req, res) => {
    const { type, warehouseId, startDate, endDate, page = 1, pageSize = 20 } = req.query
    let list = [...warehouseData.inOutRecordList]

    if (type) {
        list = list.filter(item => item.type === type)
    }
    if (warehouseId) {
        list = list.filter(item => item.warehouseId === parseInt(warehouseId))
    }

    const start = (page - 1) * pageSize
    const end = start + parseInt(pageSize)

    res.jsonWrapper({
        list: list.slice(start, end),
        total: list.length,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
    })
})

// 获取仓库统计数据
server.get('/api/warehouse/stats', (req, res) => {
    res.jsonWrapper(warehouseData.warehouseStats)
})

// 获取仓库概览（大屏用）
server.get('/api/warehouse/overview', (req, res) => {
    res.jsonWrapper({
        stats: warehouseData.warehouseStats,
        warehouseList: warehouseData.warehouseList.slice(0, 5),
        recentRecords: warehouseData.inOutRecordList.slice(0, 10)
    })
})

// 启动服务
const PORT = 3001
server.listen(PORT, () => {
    console.log(`
  ✅ Mock Server 已启动
  
  📡 接口地址: http://localhost:${PORT}
  
  📋 可用接口:
    GET  /api/warehouse/list          - 仓库列表
    GET  /api/warehouse/:id           - 仓库详情
    GET  /api/warehouse/stats         - 仓库统计
    GET  /api/warehouse/overview      - 仓库概览（大屏）
    GET  /api/storage-location/list   - 库位列表
    GET  /api/inventory/list          - 库存列表
    GET  /api/inout-record/list       - 出入库记录
  `)
})
