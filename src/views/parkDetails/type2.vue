<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                    @keyup.enter="fetchDevices" />
                <el-button type="primary" class="search-btn" @click="fetchDevices">查询</el-button>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="deviceData">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="readNum" label="检测数值" />
                    <el-table-column prop="watchTime" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="runStatus" label="状态" width="60">
                        <template #default="scope">
                            <span :class="[scope.row.runStatus === '正常' ? 'status-normal' : '.status-important']">
                                {{ scope.row.runStatus === '正常' ? '正常' : '异常' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="alarmLevel" label="告警等级">
                    </el-table-column>
                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip>
                    </el-table-column>
                </el-table>


            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">电力消耗热力图</div>
        </div>

        <div class="imgbox">
            <img src="@/assets/try/示意图.png" alt="">
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">水能路径图</div>
        </div>
        <div class="imgbox2">
            <img src="@/assets/try/图层34.png" alt="">
        </div>

    </div>

    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">
        </div>
    </div>


</template>

<style scoped>
.testmian {
    padding: 25px 20px;
    background: url('@/assets/长框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1250px;
    height: 340px;
    position: fixed;
    bottom: 80px;
    z-index: 999;
    left: calc(100% - 1170px);


}

.inputwidth {
    width: 240px;
}

.imgbox2 {
    width: 410px;
    height: 380px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 10px;

}

.imgbox2 img {
    width: 100%;
    height: 100%;
}

.imgbox {
    width: 410px;
    height: 360px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.imgbox img {
    width: 100%;
    height: 100%;
}



.changleft {
    margin-left: 10px;

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
    height: 290px;
}
</style>

<script setup>
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { queryEnergyDeviceListPagination } from '@/api/user';

// --- Props ---
const props = defineProps({
    isPanelVisible: { type: Boolean, default: true }
});

// --- Constants & Config ---
const DEVICE_TYPE_MAP = { 1: "水表", 2: "电表" };
const RUN_STATUS_MAP = { 0: "异常", 1: "正常" };

const statusClassMap = {
    '紧急告警': 'status-urgent',
    '重要告警': 'status-important',
    '一般告警': 'status-normal'
};

const MOCK_DEVICES = [
    { deviceName: '1号仓库水表', deviceType: '水表', location: '1号库房南侧', countNums4: '125.4', watchTime: '2026-02-02 10:15:22', runStatus: '正常', alarmLevel: '一般告警', alarmInfo: '正常运行' },
    { deviceName: '办公楼总电表', deviceType: '电表', location: '配电房', countNums4: '1452.8', watchTime: '2026-02-02 10:14:10', runStatus: '正常', alarmLevel: '重要告警', alarmInfo: '电压波动' },
    { deviceName: '3号装卸区水表', deviceType: '水表', location: '装卸平台', countNums4: '45.2', watchTime: '2026-02-02 09:55:01', runStatus: '异常', alarmLevel: '紧急告警', alarmInfo: '设备离线' }
];

// --- State ---
const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const deviceData = ref(MOCK_DEVICES); // Start with mock data
const ueResponseData = inject('ueResponseData');

// --- Helper Functions ---
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
};

const fetchDevices = async () => {
    try {
        const res = await queryEnergyDeviceListPagination({
            pageNo: 1,
            pageSize: 99,
            deviceName: input3.value
        });

        if (res?.code === '0' && res.data?.list?.length > 0) {
            deviceData.value = res.data.list.map(item => ({
                ...item,
                deviceType: DEVICE_TYPE_MAP[item.deviceType] || '未知',
                runStatus: RUN_STATUS_MAP[item.runStatus] || '未知',
                watchTime: formatDate(item.watchTime)
            }));
        } else if (input3.value) {

            deviceData.value = [];
        }
    } catch (err) {
        console.warn('Energy device API failed, showing defaults');
        if (!input3.value) deviceData.value = MOCK_DEVICES;
    }
};

const handleClickOutside = (event) => {
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

// --- Watchers ---
watch(ueResponseData, (newVal) => {
    if (newVal?.json?.type === 'nyjc') {
        // showMenus.value = true;
    }
});

// --- Lifecycle ---
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    fetchDevices();
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>