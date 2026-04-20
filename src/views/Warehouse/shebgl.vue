<template>


    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">{{ activeCategory || '重点设备' }}</div>
        </div>

        <div class="sblf">
            <el-input v-model="input3" class="inputwidth" placeholder="请输入设备名称" :prefix-icon="Search" />
            <div class="sblf_search">
                <el-button type="primary" class="search-btn" @click="handleAlertSearch">查询</el-button>
                <el-button type="primary" class="search-btn" @click="handleAlertReset">重置</el-button>
            </div>
        </div>

        <div class="card-list-wrapper sblf_list">
            <div class="card-item" v-for="(value, index) in source" :key="value.deviceCode"
                :class="{ 'card-active': selectedRow?.deviceCode === value.deviceCode }"
                @click="handleCardClick(value, index + 1)">
                <div class="card-header">
                    <span class="card-title">
                        <span class="card-index">{{ index + 1 }}</span>
                        <span class="card-code">设备编码: {{ value.deviceCode }}</span>
                    </span>
                    <span class="card-status status-normal">{{ value.status }}</span>
                </div>
                <div class="card-body">
                    <div class="card-row">
                        <div class="card-cell">
                            <span class="card-label">设备名称:</span>
                            <el-tooltip :content="value.deviceName" placement="top" :show-after="300"
                                popper-class="custom-tooltip" effect="dark">
                                <span class="card-value">{{ value.deviceName }}</span>
                            </el-tooltip>
                        </div>
                        <div class="card-cell">
                            <span class="card-label">设备类型:</span>
                            <span class="card-value">{{ value.deviceType }}</span>
                        </div>
                    </div>
                    <div class="card-row">
                        <div class="card-cell">
                            <span class="card-label">子类型:</span>
                            <span class="card-value">{{ value.subDeviceType || '暂无' }}</span>
                        </div>
                        <div class="card-cell">
                            <span class="card-label">规格型号:</span>
                            <span class="card-value">{{ value.modelSpec || '未知' }}</span>
                        </div>
                    </div>
                    <div class="card-row">
                        <div class="card-cell" style="width: 100%;">
                            <span class="card-label">生产厂家:</span>
                            <el-tooltip :content="value.manufacturer" placement="top" :show-after="300"
                                popper-class="custom-tooltip" effect="dark" v-if="value.manufacturer">
                                <span class="card-value">{{ value.manufacturer }}</span>
                            </el-tooltip>
                            <span class="card-value" v-else>未知</span>
                        </div>
                    </div>
                    <div class="card-row">
                        <div class="card-cell" style="width: 100%;">
                            <span class="card-label">下次检验时间:</span>
                            <span class="card-value">{{ value.nextInspectionDate || '无' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="source.length === 0" class="empty-data">暂无设备数据</div>
        </div>


        <!-- <div class="sbglx">

            <div class="sbglx_boxs">
                <template v-for="value in sorces">
                    <div class="sbglx_box" @click="changelist(value)">
                        <img :src="value.icon" alt="" @click.stop="changelist(value)">
                        <div class="sbglx_label">{{ value.text }}</div>
                        <div class="sbglx_text">{{ value.num }}</div>
                    </div>

                </template>



</div>

</div> -->



    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">设备基本信息</div>
        </div>

        <div class="sbrwright">
            <div class="sbrws_box">
                <span class="sbrws_label">设备编码</span>
                <div class="sbrws_text">{{ selectedRow.deviceCode }}</div>

            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">设备名称</span>
                <div class="sbrws_text">{{ selectedRow.deviceName }}</div>
                <span class="sbrws_label">生产厂家</span>
                <div class="sbrws_text">{{ selectedRow.manufacturer || '' }}</div>

            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">设备型号</span>
                <div class="sbrws_text">{{ selectedRow.modelSpec }}</div>
                <span class="sbrws_label">生产日期</span>
                <div class="sbrws_text">{{ selectedRow.manufactureDate || '' }}</div>
            </div>

            <div class="sbrws_box">
                <span class="sbrws_label">购买日期</span>
                <div class="sbrws_text">{{ selectedRow.purchaseDate || '' }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">上一次维护时间</span>
                <div class="sbrws_text">{{ selectedRow.lastMaintainDate || '' }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">下一期维护时间</span>
                <div class="sbrws_text">{{ selectedRow.nextMaintainDate || '' }}</div>
            </div>
        </div>


    </div>


</template>

<style scoped>
.margin_sb_box {
    margin: 0px 7px;
}

.left {
    display: flex;
    flex-direction: column;
}

.sbglx {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
    min-height: 0;
}

.sbglx_box {
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
}

.sbglx_box:hover {
    transform: translateY(-5px);
    filter: brightness(1.1);
}

.sbglx_text {
    position: absolute;

    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 30px;
    color: #FFFFFF;

    background: linear-gradient(-3deg, #68ADFC 0%, #E7F0FD 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    right: 12px;
    top: 75px;







}

.sbglx_label {
    position: absolute;
    right: 12px;
    top: 30px;

    font-family: Microsoft YaHei;
    font-weight: 300;
    font-size: 18px;
    color: #FFFFFF;
}


.sbglx_box img {
    width: 210px;
    height: 138px;



}

.sbglx_boxs {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: space-evenly;
    /* 关键：平分剩余的所有垂直空间 */
    justify-items: center;
}

.sbglx_boxs hr {
    width: 300px;
    height: 1px;
    display: flex;
    justify-content: center;

    background: #3EB2FF;
}







.title_txet {
    font-size: 22px;
    top: 2px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.sblf {
    margin: 10px 15px 0px 15px;
    display: flex;
    justify-content: space-between;
}

.right {
    display: flex;
    flex-direction: column;
    overflow: hidden !important;
}

.card-list-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 5px;
    margin-top: 10px;
    scrollbar-width: thin;
    scrollbar-color: rgba(16, 168, 253, 0.15) transparent;
}

.card-item {
    background: rgba(16, 168, 253, 0.15);
    border: 1px solid rgba(16, 168, 253, 0.6);
    box-shadow: inset 0 0 10px rgba(16, 168, 253, 0.2);
    border-radius: 6px;
    margin: 0 10px 12px 10px;
    padding: 12px;
    transition: all 0.3s;
}

.card-item:hover,
.card-item.card-active {
    background: rgba(0, 240, 255, 0.25);
    border-color: rgba(0, 240, 255, 0.9);
    box-shadow: inset 0 0 15px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3);
    transform: translateY(-2px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(16, 168, 253, 0.2);
    padding-bottom: 8px;
    margin-bottom: 8px;
    flex-wrap: nowrap;
}

.card-title {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1;
    margin-right: 10px;
}

.card-index {
    display: inline-block;
    width: 22px;
    min-width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background: #06A7E5;
    color: #fff;
    border-radius: 4px;
    font-size: 13px;
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
}

.card-code {
    font-size: 14px;
    color: #ffffff;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-status {
    font-size: 13px;
    color: #06A7E5;
    padding: 2px 8px;
    background: rgba(6, 167, 229, 0.1);
    border-radius: 4px;
    white-space: nowrap;
    flex-shrink: 0;
}

.status-normal {
    color: #51E4FF;
}

.card-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
}

.card-row:last-child {
    margin-bottom: 0;
}

.card-cell {
    width: 48%;
    display: flex;
    align-items: center;
}

.card-label {
    color: #8ED0FF;
    font-size: 13px;
    margin-right: 8px;
    white-space: nowrap;
}

.card-value {
    color: #E6F2FF;
    font-size: 13px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.empty-data {
    text-align: center;
    color: #8ED0FF;
    padding: 30px 0;
    font-size: 14px;
}

.sblf_search {
    display: flex;
    align-items: center;
    gap: 8px;
}


.inputwidth {
    width: 203px;
}

.testmian {
    padding: 20px 15px;

    background: url('@/assets/try/layer-56.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 815px;
    height: 370px;
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;




}
</style>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { getDeviceList, getCountOnlinSum, getEnergyDeviceList, getParkWeatherStationList, getVideoPointList, getDisplayDeviceList, getBuildingDeviceList } from '@/api/user'

import sb2 from '@/assets/shebei/smart-equipment.png';
import sb3 from '@/assets/shebei/special-equipment.png';
import sb1 from '@/assets/shebei/security-equipment.png';
import sb4 from '@/assets/shebei/patrol-equipment.png';
import sb5 from '@/assets/shebei/environmental-equipment.png';
import sb6 from '@/assets/shebei/fire-fighting-equipment.png';
import sb7 from '@/assets/shebei/tool-equipment.png';
import sb8 from '@/assets/shebei/metering-equipment.png';

const playerMethods = inject('playerMethods')
const ueResponseData = inject('ueResponseData')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const MOCK_DEVICES = [
    {
        deviceCode: '64BC256336654588523369814CVT3',
        deviceName: '堆垛机',
        nextInspectionDate: '2025-11-23',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '堆垛机厂家',
        modelSpec: 'DZ-001',
        status: '在线',
        quantity: '',
        manufactureDate: '2025-10-20',
        purchaseDate: '2025-10-30',
        lastMaintainDate: '2025-11-1'
    },
    {
        deviceCode: '64BC256336654588523369814CVT4',
        deviceName: 'AGV小车',
        nextInspectionDate: '2025-12-15',
        deviceType: '智能设备',
        subDeviceType: '运输设备',
        manufacturer: '智能科技',
        modelSpec: 'AGV-2023',
        status: '在线',
        quantity: '5',
        manufactureDate: '2025-10-10',
        purchaseDate: '2025-10-8',
        lastMaintainDate: '2025-11-2'
    },
    {
        deviceCode: '64BC256336654588523369814CVT5',
        deviceName: '码垛机器人',
        nextInspectionDate: '2026-01-10',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '机器人公司',
        modelSpec: 'MD-500',
        status: '离线',
        quantity: '2',
        manufactureDate: '2025-10-13',
        purchaseDate: '2025-10-11',
        lastMaintainDate: '2025-11-1'
    },
    {
        deviceCode: '64BC256336654588523369814CVT6',
        deviceName: '输送带',
        nextInspectionDate: '2025-10-20',
        deviceType: '智能设备',
        subDeviceType: '传输设备',
        manufacturer: '传输设备厂',
        modelSpec: 'SST-100',
        status: '在线',
        quantity: '',
        manufactureDate: '2025-10-24',
        purchaseDate: '2025-10-18',
        lastMaintainDate: '2025-11-3'
    }
];

const source = ref(MOCK_DEVICES);
const selectedRow = ref(MOCK_DEVICES[0]);
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: { type: Boolean, default: true }
});

const input3 = ref('');
const activeCategory = ref('');

const fetchCurrentCategoryList = () => {
    const category = activeCategory.value;
    let apiMethod = getDeviceList; // 默认查询园区设备

    if (category.includes('环境')) {
        apiMethod = getParkWeatherStationList;
    } else if (category.includes('安防') || category.includes('消防') || category.includes('视频')) {
        apiMethod = getVideoPointList;
    } else if (category.includes('能耗') || category.includes('水浸') || category.includes('火灾')) {
        apiMethod = getEnergyDeviceList;
    } else if (category.includes('智能')) {
        apiMethod = getDisplayDeviceList;
    } else if (category.includes('建筑')) {
        apiMethod = getBuildingDeviceList;
    }

    fetchDeviceData(apiMethod, category || '园区设备');
};

const changelist = (value) => {
    if (!value || !value.text) return;
    console.log('点击设备分类:', value.text);

    activeCategory.value = value.text;
    input3.value = ''; // 清空搜索框

    fetchCurrentCategoryList();
};

const fetchCountOnlinSums = async () => {
    // 图标数组
    const icons = [sb1, sb2, sb3, sb4, sb5, sb6, sb7, sb8];
    // 模拟数据测试（根据用户要求添加）
    const mockRes = {
        code: "0",
        data: {
            sum: [{
                "安防设备": "0/20",
                "智能设备": "0/20",
                "能耗设备": "0/2",
                "园区设备": "4/20",
                "建筑设备": "1/20",
                "环境设备": "0/16"
            }]
        }
    };


    await getCountOnlinSum().then(res => {
        if (res.code == 0) {
            mockRes.data = res.data
            // 将 API 返回的字段映射到组件需要的字段

        }
    }).catch(err => {
        console.error('获取设备列表失败:', err);
    });


    if (mockRes.code == "0" && mockRes.data.sum && mockRes.data.sum.length > 0) {
        const sumData = mockRes.data.sum[0];
        const newSorces = [];

        Object.keys(sumData).forEach((key, index) => {
            newSorces.push({
                text: key,
                num: sumData[key],
                icon: icons[index] || icons[0] // 按顺序分配图标
            });
        });

        sorces.value = newSorces;
        return; // 测试时直接返回，不走接口
    }
}

// 通用的获取设备列表数据方法
const fetchDeviceData = (apiMethod, categoryName) => {
    apiMethod({
        "pageSize": 100,
        "pageNo": 1,
        "name": input3.value
    }).then(res => {
        if (res.code == 0) {
            // 将 API 返回的字段映射到组件需要的字段
            source.value = res.data.map(item => ({
                deviceCode: item.deviceCode,
                deviceName: item.name,
                nextInspectionDate: item.nextMaintainDate,
                // 根据当前的分类指定没有返回时的默认设备类型
                deviceType: item.deviceType || categoryName,
                subDeviceType: item.subDeviceType || '',
                manufacturer: item.manufacturer || '',
                modelSpec: item.spec || '',
                status: item.status || '在线',
                quantity: item.quantity || ''
            }));
        }
    }).catch(err => {
        console.error(`获取${categoryName}列表失败:`, err);
    });
};

const handleCardClick = (item, index) => {
    selectedRow.value = item;
    // 向 UE5 发送消息
    const message = {
        "code": 1,
        "type": "poi",
        "data": {
            "id": index.toString(),
            "type": "agv" // 按照要求拼写为 avg
        }
    };
    console.log('点击设备卡片，向 UE5 发送消息:', message);
    callParentMethod(message);
};

const handleAlertSearch = () => {
    fetchCurrentCategoryList();
};

const handleAlertReset = () => {
    input3.value = '';
    fetchCurrentCategoryList();
};

const sorces = ref([
    { text: '智能设备', num: "0/34", icon: sb1 },
    { text: '环境设备', num: "0/15", icon: sb2 },
    { text: '安防设备', num: "0/15", icon: sb3 },
    { text: '能耗设备', num: "0/6", icon: sb4 },
    { text: '园区设备', num: "0/21", icon: sb5 },
    { text: '建筑设备', num: "0/21", icon: sb6 },
    // { text: '工具器设备', num: "0/1", icon: sb7 },
    // { text: '计量设备', num: "0/1", icon: sb8 }
]);

onMounted(() => {
    // fetchCountOnlinSums();
    // fetchCurrentCategoryList(); // 默认加载列表，可以通过 activeCategory 指定初始展示的分类
});
watch(ueResponseData, (newVal) => {
    if (newVal && newVal.json) {
        console.log('接收到新数据:', newVal)
        // 支持多种类型的触发，例如 AGV
        if (newVal.json.type === 'AGV' || newVal.json.type === 'target') {
            const targetId = newVal.json.targetId || newVal.json.id;
            if (targetId >= 1 && targetId <= source.value.length) {
                console.log('自动高亮列表项:', targetId);
                selectedRow.value = source.value[targetId - 1];
            }
        }
    }
}, { deep: true });


</script>

<style>
/* Custom Scrollbar for cards (non-scoped to ensure pseudo-elements work) */
div.card-list-wrapper::-webkit-scrollbar {
    width: 3px !important;
}

div.card-list-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(16, 168, 253, 0.15) !important;
    border-radius: 2px !important;
}

div.card-list-wrapper::-webkit-scrollbar-track {
    background-color: transparent !important;
}

.sbrws_box .sbrws_text {
    color: #E9FBFF;
    flex: 1;
    min-width: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8;
    max-height: 2.8em;
    margin-left: 5px;
}

.sbrwright {
    display: flex;
    flex-direction: column;
    gap: 1px;
    border-radius: 5px;
    margin: 20px;
    margin-bottom: 0px;
}

.sbrwright .sbrws_box {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 15px;
    line-height: 1.6;
    background: rgba(16, 168, 253, 0.15);
    border: 1px solid rgba(16, 168, 253, 0.6);
    border-radius: 4px;
    box-shadow: inset 0 0 10px rgba(16, 168, 253, 0.2);
    padding: 2px 5px;
    margin-bottom: 12px;
}

.sbrwright .sbrws_label {
    color: #8ED0FF;
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 500;
    font-size: 17px;
}
</style>
