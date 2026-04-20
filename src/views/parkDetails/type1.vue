<template>
    <div class="testmiansx" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmianx">
            <div class="changewidth">
                <el-input v-model="deviceName" class="inputwidth" placeholder="请输入设备名称" :prefix-icon="Search" clearable
                    @keyup.enter="queryParkWeatherListPaginations" />
                <el-button type="primary" class="search-btn" @click="queryParkWeatherListPaginations">查询</el-button>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="deviceData" :row-class-name="tableRowClassName"
                    @row-click="handleRowClick">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column label="监测数值" show-overflow-tooltip>
                        <template #default="scope">
                            {{ formatEnvironmentData(scope.row) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="watchTime" label="监测时间" show-overflow-tooltip />
                    <el-table-column prop="runStatus" label="状态" width="60">
                    </el-table-column>
                    <el-table-column prop="alarmLevel" label="告警等级" show-overflow-tooltip />
                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip />
                </el-table>
            </div>
        </div>
    </div>

    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">
        </div>
    </div>
</template>

<style scoped>
.testmiansx {
    padding: 25px 20px;
    background: url('@/assets/long-frame-center.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1344px;
    height: 354px;
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;
}

.testmiansx.panel-collapsed {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
    pointer-events: none;
}

.testmianx {
    position: relative;
}

.inputwidth {
    width: 240px;
}


.search-btn:hover {
    background: rgba(16, 168, 253, 0.8);
    color: #fff;
}

.changleft {
    margin-left: 10px;
}

.context-menu {
    width: 584px;
    height: 246px;
    z-index: 999;
}

.my-spacing-table {
    height: 308px;
}
</style>

<style>
/* 高亮行样式（非scoped，确保覆盖el-table默认样式） */
.el-table .highlight-row td.el-table__cell {
    background: rgba(0, 240, 255, 0.25) !important;
    border-color: rgba(0, 240, 255, 0.4) !important;
}

.el-table .highlight-row td.el-table__cell .cell {
    color: #00f0ff !important;
    font-weight: bold;
}
</style>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { queryParkWeatherListPagination } from '@/api/user'
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },
})
const RUN_STATUS_MAP = { 0: "正常", 1: "异常" };
const showMenus = ref(false);
const menuRef = ref(null);
const deviceName = ref('');
const ueResponseData = inject('ueResponseData')

const highlightId = ref('');

watch(ueResponseData, (newVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)
        if (newVal?.json.type === 'hjjc') {
            const targetId = newVal?.json.id;
            if (targetId) {
                highlightId.value = targetId;
            }
            // showMenus.value = true
        }
    }
})

const tableRowClassName = ({ row }) => {
    if (row.id && row.id === highlightId.value) {
        return 'highlight-row';
    }
    return '';
};

const handleRowClick = (row) => {
    const isSameRow = highlightId.value === row.id;
    highlightId.value = isSameRow ? '' : row.id;

    if (!isSameRow) {
        // 选中新行，发送消息
        const ll = {
            code: 1,
            type: "poi",
            data: { id: row.pid }
        };
        console.log(ll, "222");
        callParentMethod(ll);
    } else {
        callParentMethod({
            "code": 1, "type": "btn", "data": { "id": 'hjjc' }

        })
        // 取消选中，可以发送取消消息或不发送
        console.log("取消高亮", row.id);
    }
};


// 环境数据映射配置（字段名对应接口返回的实际字段）
const environmentDataMap = {
    temperature: { label: '温度', unit: '°C' },
    humidity: { label: '湿度', unit: '%' },
    windDirection: { label: '风向', unit: '°' },
    windPower: { label: '风力', unit: '级' },
    atmospheric: { label: '大气压', unit: 'Pa' },
    pmTwoFive: { label: 'PM2.5', unit: 'PU/m³' },
    pmTen: { label: 'PM10', unit: 'PU/m³' }
};

// 格式化环境数据函数
const formatEnvironmentData = (row) => {
    if (!row || typeof row !== 'object') return '';

    const formattedParts = [];

    // 遍历环境数据映射配置
    for (const [fieldName, config] of Object.entries(environmentDataMap)) {
        const value = row[fieldName];
        // 只显示有值的字段（排除null、undefined、空字符串）
        if (value !== null && value !== undefined && value !== '') {
            formattedParts.push(`${config.label}：${value}${config.unit}`);
        }
    }

    return formattedParts.join('，');
};

const pidList = [
    "EN-JC1-401", "EN-JC2-401", "EN-JC1-101", "EN-JC1-102", "EN-JC1-103",
    "EN-JC2-102", "EN-JC2-103", "EN-JC2-104", "EN-JC2-105", "EN-JC2-106"
];

const deviceData = ref([
    { id: "EN-JC1-401", pid: "EN-JC1-401", deviceName: "EN-JC1-401工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-401", pid: "EN-JC2-401", deviceName: "EN-JC2-401工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC1-101", pid: "EN-JC1-101", deviceName: "EN-JC1-101工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC1-102", pid: "EN-JC1-102", deviceName: "EN-JC1-102工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC1-103", pid: "EN-JC1-103", deviceName: "EN-JC1-103工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-102", pid: "EN-JC2-102", deviceName: "EN-JC2-102工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-103", pid: "EN-JC2-103", deviceName: "EN-JC2-103工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-104", pid: "EN-JC2-104", deviceName: "EN-JC2-104工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-105", pid: "EN-JC2-105", deviceName: "EN-JC2-105工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
    { id: "EN-JC2-106", pid: "EN-JC2-106", deviceName: "EN-JC2-106工业气体", deviceType: "环境监测", location: "1号楼", watchTime: "2026-04-01 17:49:48", runStatus: "正常", alarmLevel: "正常", alarmInfo: "正常" },
]);

const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}

const queryParkWeatherListPaginations = async () => {
    const res = await queryParkWeatherListPagination({ "pageNo": 1, "pageSize": 99, "deviceName": deviceName.value, })
    if (res?.code == 0) {
        const list = res.data?.list || [];
        console.log(list)
        deviceData.value = list.map((item, index) => {
            return {
                ...item,
                pid: pidList[index % pidList.length], // 循环分配 pid
                runStatus: RUN_STATUS_MAP[item.runStatus] || '未知',
                watchTime: formatDate(item.watchTime)
            }
        });
    }
}

const handleClickOutside = (event) => {
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    queryParkWeatherListPaginations()
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>
