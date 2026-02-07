<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                    @keyup.enter="fetchDevices" />
                <el-button type="primary" class="search-btn" @click="fetchDevices">查询</el-button>
            </div>
            <div class="device-table-wrapper">
                <el-table class="device-custom-table" ref="tableRef" :data="data" height="100%">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="runStatus" label="状态" width="50">
                    </el-table-column>
                    <el-table-column prop="watchTime" label="告警时间" show-overflow-tooltip />
                    <el-table-column prop="alarmLevel" label="告警等级">
                    </el-table-column>
                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="linkageName" label="关联应急预案" show-overflow-tooltip>
                        <template #default="scope">
                            <span @click="handleLinkage(scope.row)">{{ scope.row.linkageName }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <!-- <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_text_box">
                <div class="title_txets">立体仓库</div>
                <div class="title_txets">平置仓库</div>
                <div class="title_txets">堆场</div>
            </div>
        </div> -->

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">消防设备列表</div>
        </div>


        <div class="inputbox">
            <el-input v-model="input4" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                @keyup.enter="fetchDevices" />
            <el-button type="primary" class="search-btn" @click="fetchDevices">查询</el-button>
        </div>

        <div class="device-table-wrapper">
            <el-table class="device-custom-table" ref="tableRef" :data="data2" height="100%">
                <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="deviceType" label="设备类型" />
                <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                <el-table-column prop="runStatus" label="状态" width="50">
                </el-table-column>
            </el-table>
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
    display: flex;
    flex-direction: column;
}

.inputbox {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-btn {
    height: 32px;
    background: #10A8FD;
    border: none;
    color: #fff;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 16px;
}

.search-btn:hover {
    background: rgba(16, 168, 253, 0.8);
    color: #fff;
}



.spjkList_label {
    margin-top: 10px;
    color: #fff;
    font-size: 18px;

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

.imgbox {
    width: 390px;
    height: 360px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.title_text_box {
    position: absolute;
    top: -5px;
    left: 10px;
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.title_text_box .title_txets {
    font-size: 22px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}



.changewidth {
    margin: 5px 15px 10px 15px;
    display: flex;
    gap: 10px;
    align-items: center;
}

/* 表格样式已移至 main.css */

.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}

.status-urgent {
    color: #FCDA1E;
}

/* .search-btn styles moved and unified above */
.left,
.right {
    overflow: hidden !important;
}
</style>

<script setup>
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: { type: Boolean, default: true }
});

import { Search } from '@element-plus/icons-vue';
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue';
import request from '@/utils/request';

// --- Constants & Mock Data ---
const ALARM_STATUS_MAP = {
    '紧急告警': 'status-normal',
    '重要告警': 'status-important',
    '一般告警': 'status-urgent'
};

const MOCK_DATA = [
    { deviceName: "烟感#1", deviceType: "消防检测", countNums3: "大厅1号监测点", countNums4: "65°C", countNums5: "2025-04-12 10:24:15", countNums6: "在线", countNums7: "", countNums8: "", type: 2 },
    { deviceName: "烟感#2", deviceType: "消防检测", countNums3: "大厅2号监测点", countNums4: "65°C", countNums5: "2025-04-12 10:24:15", countNums6: "在线", countNums7: "", countNums8: "", type: 1 },
    { deviceName: "烟感#3", deviceType: "消防检测", countNums3: "大厅3号监测点", countNums4: "65°C", countNums5: "2025-04-12 10:24:15", countNums6: "在线", countNums7: "一般告警", countNums8: "烟雾浓度每米>3%", type: 1 }
];

const MOCK_DATA2 = [
    { deviceName: "火灾预警器#1", deviceType: "消防检测", countNums3: "大厅4号监测点", countNums4: "65°C", countNums5: "2025-04-12 10:24:15", countNums6: "在线", countNums7: "", countNums8: "一号区域火灾报警", type: 1 },
    { deviceName: "声光预警器#1", deviceType: "消防检测", countNums3: "大厅7号监测点", countNums4: "65°C", countNums5: "2025-04-12 10:24:15", countNums6: "在线", countNums7: "", countNums8: "二号区域警报", type: 1 }
];

// --- State ---
const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const data = ref(MOCK_DATA);
const data2 = ref(MOCK_DATA2);
const ueResponseData = inject('ueResponseData');
const input4 = ref('');
const statusClassMap = reactive(ALARM_STATUS_MAP);
const statusClassMaps = reactive({ '1': 'status-urgent', '2': 'status-important', '3': 'status-normal' });
// /api/qydigital-park-service/qyQueryDeviceInfo/queryLinkageListPagination
// --- API Functions ---
const fetchDevices = async () => {
    try {
        const res = await request({
            url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryEnvironmentDeviceListPagination',
            method: 'post',
            data: {
                pageNo: 1,
                pageSize: 999,
                deviceName: input4.value,
                deviceId: ""
            },
            skipGlobalParams: true
        });

        if (res?.code === '0' && res.data?.list?.length > 0) {

            data2.value = res.data.list;

        }
    } catch (error) {
        console.error('环境设备列表请求失败:', error);
    }
};
const fetchDevices2 = async () => {
    try {
        const res = await request({
            url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryEnvironmentMonitorListPagination',
            method: 'post',
            data: {
                pageNo: 1,
                pageSize: 999,
                deviceName: input3.value,
                deviceId: ""
            },
            skipGlobalParams: true
        });

        if (res?.code === '0' && res.data?.list?.length > 0) {

            data.value = res.data.list;
        }
    } catch (error) {
        console.error('环境设备列表请求失败:', error);
    }
};

// 参数说明：linkageName：预案名称，linkageCode：预案编码
// 返回参数说明：linkageCode：预案编号、linkageName：预案名称、linkageCanvas：预案动画
const fetchDevices3 = async () => {
    try {
        const res = await request({
            url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryLinkageListPagination',
            method: 'post',
            data: {
                "pageNo": 1, "pageSize": 25, "linkageName": "", "linkageCode": ""
            },
            skipGlobalParams: true
        });

        if (res?.code === '0' && res.data?.list?.length > 0) {

        }
    } catch (error) {
        console.error('环境设备列表请求失败:', error);
    }
};

const handleLinkage = (row) => {
    console.log(row);
}


const handleClickOutside = (event) => {
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

// --- Watchers ---
watch(ueResponseData, (newVal) => {
    if (newVal?.json?.type === 'xfjc') {
        showMenus.value = true;
    }
});

// --- Lifecycle ---
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    fetchDevices();
    fetchDevices2();
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>