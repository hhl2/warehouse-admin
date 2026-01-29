<template>
    <div class="testmiansx" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmianx">
            <div class="changewidth">
                <el-input v-model="deviceName" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                    @keyup.enter="queryParkWeatherListPaginations" />
                <el-button type="primary" class="search-btn" @click="queryParkWeatherListPaginations">查询</el-button>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="deviceData">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="检测数值" />
                    <el-table-column prop="watchTime" label="检查时间" show-overflow-tooltip />
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
    background: url('@/assets/长框中间.png') no-repeat 0 0;
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

.changewidth {
    margin: 5px 15px 10px 10px;
    display: flex;
    gap: 5px;
    align-items: center;
}

.search-btn {
    height: 32px;
    background: #476B9A;
    border: none;
    color: #fff;
    padding: 0 15px;
}

.search-btn:hover {
    background: rgba(0, 168, 255, 0.4);
    border-color: #00eaff;
    color: #fff;
}

.changleft {
    margin-left: 12px;
}

.context-menu {
    width: 584px;
    height: 246px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("@/assets/try/图层弹窗.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 999;
}

.my-spacing-table {
    height: 308px;
}
</style>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { queryParkWeatherListPagination } from '@/api/user'

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },
})

const showMenus = ref(false);
const menuRef = ref(null);
const deviceName = ref('');
const ueResponseData = inject('ueResponseData')

watch(ueResponseData, (newVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)
        if (newVal?.json.type === 'hjjc') {
            showMenus.value = true
        }
    }
})

const deviceData = ref([
    {
        deviceName: "温度传感器#1",
        deviceType: "环境检测",
        location: "室内1号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "重要告警",
        alarmInfo: "1号监测点温度过高",
        type: 2
    },
    {
        deviceName: "温度传感器#2",
        deviceType: "环境检测",
        location: "室内2号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "一般告警",
        alarmInfo: "2号监测点温度过高",
        type: 3
    },
    {
        deviceName: "温度传感器#3",
        deviceType: "环境检测",
        location: "室内3号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "一般告警",
        alarmInfo: "3号监测点温度过高",
        type: 3
    },
    {
        deviceName: "温度传感器#4",
        deviceType: "环境检测",
        location: "室内4号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "重要告警",
        alarmInfo: "4号监测点温度过高",
        type: 2
    },
    {
        deviceName: "温度传感器#5",
        deviceType: "环境检测",
        location: "室内5号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "重要告警",
        alarmInfo: "5号监测点温度过高",
        type: 2
    },
    {
        deviceName: "温度传感器#6",
        deviceType: "环境检测",
        location: "室内6号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "紧急告警",
        alarmInfo: "6号监测点温度过高",
        type: 1
    },
    {
        deviceName: "温度传感器#7",
        deviceType: "环境检测",
        location: "室内7号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "重要告警",
        alarmInfo: "7号监测点温度过高",
        type: 2
    },
    {
        deviceName: "温度传感器#8",
        deviceType: "环境检测",
        location: "室内8号监测点",
        countNums4: "65°C",
        watchTime: "2025-04-12 10:24:15",
        runStatus: "在线",
        alarmLevel: "重要告警",
        alarmInfo: "8号监测点温度过高",
        type: 2
    },
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
    if (res?.code == 200) {
        const list = res.data?.list || [];
        deviceData.value = list.map(item => {
            return {
                ...item,
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