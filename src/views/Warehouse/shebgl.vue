<template>


    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">设备概览</div>
        </div>


        <div class="sbglx">

            <div class="sbglx_boxs">
                <template v-for="value in sorces">
                    <div class="sbglx_box" @click="changelist(value)">
                        <img :src="value.icon" alt="" @click.stop="changelist(value)">
                        <div class="sbglx_label">{{ value.text }}</div>
                        <div class="sbglx_text">{{ value.num }}</div>
                    </div>

                </template>



            </div>

        </div>



    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">{{ activeCategory || '园区设备' }}</div>
        </div>

        <div class="sblf">
            <el-input v-model="input3" class="inputwidth" placeholder="请输入设备名称" :prefix-icon="Search" />
            <div class="sblf_search">
                <el-button type="primary" class="search-btn" @click="handleAlertSearch">查询</el-button>
                <el-button type="primary" class="search-btn" @click="handleAlertReset">重置</el-button>
            </div>
        </div>

        <div class="sblf_list">
            <div v-for="(value, index) in source" :key="index">
                <div class="sblf_box">
                    <div class="sblf_box_title">
                        设备编码：
                        <span>{{ value.deviceCode }}</span>
                    </div>

                    <div class="margin_sb_box">
                        <div class="sb_box_label">
                            <span>设备名称</span>
                            <span>下次检验时间</span>
                            <span>设备类型</span>
                            <span>子设备类型</span>
                        </div>

                        <div class="sb_box_label2">
                            <el-tooltip :content="value.deviceName" placement="top" :show-after="300"
                                popper-class="custom-tooltip" effect="dark">
                                <span class="ellipsis-text">{{ value.deviceName }}</span>
                            </el-tooltip>
                            <span>{{ value.nextInspectionDate }}</span>
                            <span>{{ value.deviceType }}</span>
                            <span>{{ value.subDeviceType }}</span>
                        </div>

                        <div class="sb_box_label">
                            <span>生产厂家</span>
                            <span>规格型号</span>
                            <span>运行状态</span>
                            <span></span>
                        </div>

                        <div class="sb_box_label2">
                            <el-tooltip :content="value.manufacturer" placement="top" :show-after="300"
                                popper-class="custom-tooltip" effect="dark" v-if="value.manufacturer">
                                <span class="ellipsis-text">{{ value.manufacturer }}</span>
                            </el-tooltip>
                            <span v-else></span>
                            <span>{{ value.modelSpec }}</span>
                            <span>{{ value.status }}</span>
                            <span></span>
                        </div>

                    </div>


                </div>

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

.sblf_list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 transparent;
}

.sblf_list::-webkit-scrollbar {
    width: 8px;
}

.sblf_list::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
}

.sblf_list::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
}

.sblf_list:hover::-webkit-scrollbar-thumb {
    background: #c1c1c1;
}

.sblf_box {
    width: 438px;
    height: 190px;

    border: 1px solid #1C70D7;
    border-radius: 5px;
    margin: 16px 15px;
    margin-bottom: 16px;

}

.sblf_box_title {
    color: #E9FBFF;
    font-size: 16px;
    padding: 5px 10px;



}

.sblf_box_title span {
    color: #54BAFF;

}

.sb_box_label {
    display: flex;

    font-size: 12px;
    padding: 5px 8px;
    background: #095DBE;
    color: #04E9E9;
    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 5px;

}

.sb_box_label span {
    display: inline-block;
    width: 110px;
    text-align: center;
}

.sb_box_label span:first-child {
    text-align: left;
}


.sb_box_label2 {
    display: flex;
    padding: 5px 8px;
    background-color: rgba(9, 93, 190, 0.6);
    color: #DFF3FA;
    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 5px;
}

.sb_box_label2 span:first-child {
    text-align: left;
}

.sb_box_label2 span {
    display: inline-block;
    width: 100px;
    text-align: center;
}

.ellipsis-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
import { onMounted, ref } from 'vue'
import { getDeviceList, getCountOnlinSum, getEnergyDeviceList, getParkWeatherStationList, getVideoPointList, getDisplayDeviceList, getBuildingDeviceList } from '@/api/user'

import sb2 from '@/assets/shebei/smart-equipment.png';
import sb3 from '@/assets/shebei/special-equipment.png';
import sb1 from '@/assets/shebei/security-equipment.png';
import sb4 from '@/assets/shebei/patrol-equipment.png';
import sb5 from '@/assets/shebei/environmental-equipment.png';
import sb6 from '@/assets/shebei/fire-fighting-equipment.png';
import sb7 from '@/assets/shebei/tool-equipment.png';
import sb8 from '@/assets/shebei/metering-equipment.png';

const MOCK_DEVICES = [
    {
        deviceCode: '64BC256336654588523369814CVT3',
        deviceName: '堆垛机',
        nextInspectionDate: '2025-11-23',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '某某厂家',
        modelSpec: 'DZ-001',
        status: '在线',
        quantity: ''
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
        quantity: '5'
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
        quantity: '2'
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
        quantity: ''
    }
];

const source = ref(MOCK_DEVICES);

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
    fetchCountOnlinSums();
    fetchCurrentCategoryList(); // 默认加载列表，可以通过 activeCategory 指定初始展示的分类
});



</script>
