<template>
    <div class="testmiansx" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmianx">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入设备名称" :prefix-icon="Search" clearable
                    @keyup.enter="fetchDevices" />
                <el-button type="primary" class="search-btn" @click="fetchDevices">查询</el-button>
                <!-- 类别切换 -->
                <div class="category-switch-list">
                    <div v-for="(item, index) in categoryItems" :key="index" class="category-switch-item"
                        :class="{ active: activeCategory === index }" @click="handleCategoryChange(index)">
                        {{ item.label }}
                    </div>
                </div>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="deviceData">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" show-overflow-tooltip />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="readNum" label="检测数值" show-overflow-tooltip />
                    <el-table-column prop="watchTime" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="runStatus" label="状态" width="60">
                        <template #default="scope">
                            <span :class="[scope.row.runStatus === '正常' ? 'status-normal' : '.status-important']">
                                {{ scope.row.runStatus === '正常' ? '正常' : '异常' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="alarmLevel" label="告警等级" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip>
                    </el-table-column>
                </el-table>


            </div>
        </div>
    </div>

    <!-- <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">电力消耗热力图</div>
        </div>

        <div class="imgbox">
            <img src="@/assets/try/diagram.png" alt="">
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">水能路径图</div>
        </div>
        <div class="imgbox2">
            <img src="@/assets/try/layer-34.png" alt="">
        </div>

    </div> -->

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

/* .testmian {
    padding: 25px 20px;
    background: url('@/assets/long-frame-center.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1250px;
    height: 340px;
    position: fixed;
    bottom: 80px;
    z-index: 999;
    left: calc(100% - 1170px);


} */

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
    background: url("@/assets/try/layer-popup.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 999;
}

.my-spacing-table {
    height: 308px;
}

.category-switch-list {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-left: 20px;
}

.category-switch-item {
    color: #A3D8FF;
    padding: 6px 20px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid transparent;
}

.category-switch-item:hover {
    color: #fff;
    background: rgba(45, 169, 192, 0.1);
}

.category-switch-item.active {
    color: #fff;
    background: linear-gradient(180deg, rgba(14, 88, 175, 0.8) 0%, rgba(30, 144, 255, 0.9) 100%);
    border: 1px solid rgba(89, 203, 255, 0.4);
    box-shadow: inset 0px -4px 10px rgba(0, 255, 255, 0.6);
}
</style>

<script setup>
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { queryEnergyDeviceListPagination } from '@/api/user';


/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const electricityData1 = {
    P01: 2,
    P02: 3,
    P03: 4,
    P04: 5,
    P05: [
        6, 7, 8, 9, 10, 11, 12],
    P06: [
        13, 14, 15, 16, 17, 18, 19],
    P07: [
        20, 14, 15, 16, 17, 18, 26],
    P08: [
        27, 28, 29, 30, 31, 32, 33, 34, 35],
    P09: [
        36, 37, 38, 39, 40, 41, 42],
    P10: 43,
    P11: 44,
    P12: 45,
    P13: [
        46, 47, 48, 49, 50, 51, 52],
    P14: [
        53, 54, 55, 56, 57, 58, 59],
    P15: [
        60, 61, 62, 63, 64, 65, 66],
    P16: [
        67, 68, 69, 70, 71, 72, 73, 74],
    P17: [
        75, 76, 77, 78, 79, 80, 81],

}

const electricityData2 = {
    P01: [82, 84],
    P02: 83,
    P03: 125,
    P04: [86, 87, 88],
    P05: [
        89, 90, 91, 92, 93, 94, 95],
    P06: [
        96, 97, 98, 99, 100, 101],
    P07: [
        102, 103, 104, 105, 106, 107, 108, 109],
    P08: [
        110, 111, 112, 113, 114, 115, 116],
    P09: [
        117, 118, 119, 120, 121, 122, 123],
    P10: 124,
    P11: 127,
    P12: 128,
    P13: 129,
    P14: [
        130, 131, 132, 133, 134],
    P15: [
        135, 138, 139, 140, 141],
    P16: [
        142, 143, 144, 145, 146, 147],
    P17: [
        148, 149, 150, 151, 152, 153, 154, 155],
    P18: [
        156, 157, 158, 159, 160, 161, 162, 163],
    P19: [
        164, 165, 166, 167, 168, 169, 170, 171],
    P20: [
        172, 173, 174, 175, 176, 177, 178],

}


// --- Props ---
const props = defineProps({
    isPanelVisible: { type: Boolean, default: true }
});

// --- Constants & Config ---
const DEVICE_TYPE_MAP = { 1: "电表", 2: "水表" };
const RUN_STATUS_MAP = { 0: "正常", 1: "异常" };
const MOCK_DEVICES = [
    { deviceName: '1号仓库水表', deviceType: '水表', location: '1号库房南侧', countNums4: '125.4', watchTime: '2026-02-02 10:15:22', runStatus: '正常', alarmLevel: '一般告警', alarmInfo: '正常运行' },
    { deviceName: '办公楼总电表', deviceType: '电表', location: '配电房', countNums4: '1452.8', watchTime: '2026-02-02 10:14:10', runStatus: '正常', alarmLevel: '重要告警', alarmInfo: '电压波动' },
    { deviceName: '3号装卸区水表', deviceType: '水表', location: '装卸平台', countNums4: '45.2', watchTime: '2026-02-02 09:55:01', runStatus: '异常', alarmLevel: '紧急告警', alarmInfo: '设备离线' },

    {
        "序号": 1,
        "id": 2,
        "deviceName": "P01电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 22351.2,
        "对端电箱": "配变进线开关"
    },
    {
        "序号": 2,
        "id": 3,
        "deviceName": "P02电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 4.2,
        "对端电箱": "联络开关"
    },
    {
        "序号": 3,
        "id": 4,
        "deviceName": "P03电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 0.4,
        "对端电箱": "补偿柜"
    },
    {
        "序号": 4,
        "id": 5,
        "deviceName": "P04电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 1.9,
        "对端电箱": "补偿柜"
    },
    {
        "序号": 5,
        "id": 6,
        "deviceName": "T1-P05-4051开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 1709.73,
        "对端电箱": "层照明配电箱\n1-1AL1"
    },
    {
        "序号": 6,
        "id": 7,
        "deviceName": "T1-P05-4052开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 9596.68,
        "对端电箱": "层照明配电箱\n1-1AL2、1-2AL2"
    },
    {
        "序号": 7,
        "id": 8,
        "deviceName": "T1-P05-4053开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 6680.52,
        "对端电箱": "层照明配电箱\n1-1AL3、1-2AL"
    },
    {
        "序号": 8,
        "id": 9,
        "deviceName": "T1-P05-4054开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 366.24,
        "对端电箱": "客梯配电箱\n1-2APDT"
    },
    {
        "序号": 9,
        "id": 10,
        "deviceName": "T1-P05-4055开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 156.36,
        "对端电箱": "货梯配电箱\n1-2APHT"
    },
    {
        "序号": 10,
        "id": 11,
        "deviceName": "T1-P05-4056开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 347.44,
        "对端电箱": "屏蔽消音室配电箱-PDX-1"
    },
    {
        "序号": 11,
        "id": 12,
        "deviceName": "T1-P05-4057开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 0.56,
        "对端电箱": "备用"
    },
    {
        "序号": 12,
        "id": 13,
        "deviceName": "T1-P06-4061开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 435.33,
        "对端电箱": "工位配电合箱1 PDX-A"
    },
    {
        "序号": 13,
        "id": 14,
        "deviceName": "T1-P06-4062开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 984.15,
        "对端电箱": "一次设备配电箱 PDX-3"
    },
    {
        "序号": 14,
        "id": 15,
        "deviceName": "T1-P06-4063开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 207.9,
        "对端电箱": "配电终端预处理区配电箱 \nPDX-4"
    },
    {
        "序号": 15,
        "id": 16,
        "deviceName": "T1-P06-4064开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-05 02:59:59",
        "readNum": 191.44,
        "对端电箱": "高，抵压开关温升工区配电箱 PDX-5"
    },
    {
        "序号": 16,
        "id": 17,
        "deviceName": "T1-P06-4065开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 64.78,
        "对端电箱": "环境试验工位配电箱 PDX-9"
    },
    {
        "序号": 17,
        "id": 18,
        "deviceName": "T1-P06-4066开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 0.16,
        "对端电箱": "备用"
    },
    {
        "序号": 18,
        "id": 19,
        "deviceName": "T1-P06-4067开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A1B1",
        "入库时间": "2026-02-06 11:59:58.963000",
        "readNum": 0.44,
        "对端电箱": "备用"
    },
    {
        "序号": 19,
        "id": 20,
        "deviceName": "T1-P07-4071开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 1104.8,
        "对端电箱": "检测中心配电箱PDX-10"
    },
    {
        "序号": 20,
        "id": 21,
        "deviceName": "T1-P07-4072开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 658.32,
        "对端电箱": "屏蔽消音室配电箱-PDX-11"
    },
    {
        "序号": 21,
        "id": 22,
        "deviceName": "T1-P07-4073开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 415.2,
        "对端电箱": "AGV充电间配电箱 PDX-12"
    },
    {
        "序号": 22,
        "id": 23,
        "deviceName": "T1-P07-4074开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-01 17:59:58.963000",
        "readNum": 821.98,
        "对端电箱": "气源室配电箱 PDX-13"
    },
    {
        "序号": 23,
        "id": 24,
        "deviceName": "T1-P07-4075开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 66.2,
        "对端电箱": "绝缘子力学性能检测平台配电箱 PDX-14"
    },
    {
        "序号": 24,
        "id": 25,
        "deviceName": "T1-P07-4076开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 0.24,
        "对端电箱": "备用"
    },
    {
        "序号": 25,
        "id": 26,
        "deviceName": "T1-P07-4077开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 26.28,
        "对端电箱": "备用"
    },
    {
        "序号": 26,
        "id": 27,
        "deviceName": "T1-P08-4081开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07.037000",
        "readNum": 0.12,
        "对端电箱": "开关房配电箱 \n1-ATXG"
    },
    {
        "序号": 27,
        "id": 28,
        "deviceName": "T1-P08-4082开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 644.08,
        "对端电箱": "电房配电箱 \n1-ATDF"
    },
    {
        "序号": 28,
        "id": 29,
        "deviceName": "T1-P08-4083开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 103.34,
        "对端电箱": "消防配电箱\n 1-1ATXF3"
    },
    {
        "序号": 29,
        "id": 30,
        "deviceName": "T1-P08-4084开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-04 17:59:58.963000",
        "readNum": 1.76,
        "对端电箱": "消防配电箱 \n1-1ATXF2"
    },
    {
        "序号": 30,
        "id": 31,
        "deviceName": "T1-P08-4085开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-02-06 14:59:58.963000",
        "readNum": 7.55,
        "对端电箱": "消防配电箱 \n1-1ATXF1"
    },
    {
        "序号": 31,
        "id": 32,
        "deviceName": "T1-P08-4086开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.48,
        "对端电箱": "备用"
    },
    {
        "序号": 32,
        "id": 33,
        "deviceName": "T1-P08-4087开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.2,
        "对端电箱": "备用"
    },
    {
        "序号": 33,
        "id": 35,
        "deviceName": "T1-P08-4088开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.8,
        "对端电箱": "备用"
    },
    {
        "序号": 34,
        "id": 36,
        "deviceName": "T1-P09-4091开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.96,
        "对端电箱": "室外显示屏用电"
    },
    {
        "序号": 35,
        "id": 37,
        "deviceName": "T1-P09-4092开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:59:59",
        "readNum": 0.42,
        "对端电箱": "备用"
    },
    {
        "序号": 36,
        "id": 38,
        "deviceName": "T1-P09-4093开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.42,
        "对端电箱": "备用"
    },
    {
        "序号": 37,
        "id": 39,
        "deviceName": "T1-P09-4094开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.16,
        "对端电箱": "备用"
    },
    {
        "序号": 38,
        "id": 40,
        "deviceName": "T1-P09-4095开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.35,
        "对端电箱": "备用"
    },
    {
        "序号": 39,
        "id": 41,
        "deviceName": "T1-P09-4096开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.96,
        "对端电箱": "备用"
    },
    {
        "序号": 40,
        "id": 42,
        "deviceName": "T1-P09-4097开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A2B2",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 1372.56,
        "对端电箱": "备用"
    },
    {
        "序号": 41,
        "id": 43,
        "deviceName": "T2-P10-4101开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-02-06 14:59:59",
        "readNum": 847.2,
        "对端电箱": "配变进线开关"
    },
    {
        "序号": 42,
        "id": 44,
        "deviceName": "T2-P11-4111G开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 6.3,
        "对端电箱": "补偿柜"
    },
    {
        "序号": 43,
        "id": 45,
        "deviceName": "T2-P12-4121G开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 1.2,
        "对端电箱": "补偿柜"
    },
    {
        "序号": 44,
        "id": 46,
        "deviceName": "T2-P13-4131开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 292.85,
        "对端电箱": "预留区配电箱 PDX-15"
    },
    {
        "序号": 45,
        "id": 47,
        "deviceName": "T2-P13-4132开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 1794.06,
        "对端电箱": "电力设备配电柜 PDX-16"
    },
    {
        "序号": 46,
        "id": 48,
        "deviceName": "T2-P13-4133开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 156.6,
        "对端电箱": "工位配电合箱2 PDX-B"
    },
    {
        "序号": 47,
        "id": 49,
        "deviceName": "T2-P13-4134开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 1.68,
        "对端电箱": "柔直监测工位配电箱"
    },
    {
        "序号": 48,
        "id": 50,
        "deviceName": "T2-P13-4135开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.24,
        "对端电箱": "备用"
    },
    {
        "序号": 49,
        "id": 51,
        "deviceName": "T2-P13-4136开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.28,
        "对端电箱": "备用"
    },
    {
        "序号": 50,
        "id": 52,
        "deviceName": "T2-P13-4137开关电表",
        "deviceType": "电表",
        "类型": 529,
        "网关号": 70000,
        "倍率": 1,
        "通道号": "A3B3",
        "入库时间": "2026-01-26 16:02:07",
        "readNum": 0.32,
        "对端电箱": "备用"
    },
];

// --- State ---
const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const allDeviceData = ref(MOCK_DEVICES); // full list
const deviceData = ref(MOCK_DEVICES); // filtered display
const ueResponseData = inject('ueResponseData');

// 类别切换
const activeCategory = ref(0);
const categoryItems = ref([
    { label: '全部', type: "all", type2: "" },
    { label: '水表', type: 'water', type2: "水表" },
    { label: '电表', type: 'electricity', type2: "电表" },
    { label: '热力图', type: 'electricity1', type2: "热力图" },
    { label: '水力图', type: 'electricity2', type2: "水力图" },
]);

const applyFilter = () => {
    const selected = categoryItems.value[activeCategory.value];
    if (!selected.type2) {
        deviceData.value = allDeviceData.value;
    } else {
        deviceData.value = allDeviceData.value.filter(d => d.deviceType === selected.type2);
    }
};

const handleCategoryChange = (index) => {
    activeCategory.value = index;
    applyFilter();
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": "nyjc", type: categoryItems.value[index].type } });
};

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
            allDeviceData.value = res.data.list.map(item => ({
                ...item,
                deviceType: DEVICE_TYPE_MAP[item.deviceType] || '未知',
                runStatus: RUN_STATUS_MAP[item.runStatus] || '未知',
                watchTime: formatDate(item.watchTime)
            }));
            applyFilter();
        } else if (input3.value) {
            allDeviceData.value = [];
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
    console.log("接受到的信息", newVal)
    if (newVal?.json?.type === 'nyjc') {
        // showMenus.value = true;
    }
    if (newVal?.json?.type === 'electricity') {

        activeCategory.value = 2;
        applyFilter();

        if (newVal?.json?.id && newVal?.json?.area === 'jczx') {
            const matchValue = electricityData1[newVal.json.id];
            if (matchValue !== undefined) {
                const targetIds = Array.isArray(matchValue) ? matchValue : [matchValue];
                deviceData.value = allDeviceData.value.filter(item => targetIds.includes(item.id));
            } else {
                deviceData.value = [];
            }
        }
        if (newVal?.json?.id && newVal?.json?.area === 'sbf') {
            const matchValue = electricityData2[newVal.json.id];
            if (matchValue !== undefined) {
                const targetIds = Array.isArray(matchValue) ? matchValue : [matchValue];
                deviceData.value = allDeviceData.value.filter(item => targetIds.includes(item.id));
            } else {
                deviceData.value = [];
            }
        }

    }
    if (newVal?.json?.type === 'water') {

        activeCategory.value = 1;
        applyFilter();


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