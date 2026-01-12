<template>


    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">智能设备</div>
        </div>

        <div class="sblf">

            <el-input v-model="input3" style="width: 203px" placeholder="请输入设备名称" :prefix-icon="Search" />

            <div class="sblf_search">
                <div class="sblf_search_box" @click="handleAlertSearch">查询</div>
                <div class="sblf_search_box" @click="handleAlertReset">重置</div>
            </div>
        </div>

        <div v-for="(value, index) in source" :key="index">
            <div class="sblf_box">
                <div class="sblf_box_title">
                    设备编码：
                    <span>{{ value.deviceCode }}</span>
                </div>

                <div class="margin_sb_box">
                    <div class="sb_box_label">
                        <span>设备名称</span>
                        <span>下次检验日期</span>
                        <span>设备类型</span>
                        <span>子设备类型</span>
                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.deviceName }}</span>
                        <span>{{ value.nextInspectionDate }}</span>
                        <span>{{ value.deviceType }}</span>
                        <span>{{ value.subDeviceType }}</span>
                    </div>

                    <div class="sb_box_label">
                        <span>生产厂家</span>
                        <span>规格型号</span>
                        <span>运行状态</span>
                        <span>领用数量</span>
                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.manufacturer }}</span>
                        <span>{{ value.modelSpec }}</span>
                        <span>{{ value.status }}</span>
                        <span>{{ value.quantity || '' }}</span>
                    </div>

                </div>


            </div>

        </div>


    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">设备概览</div>
        </div>


        <div class="sbglx">

            <div class="sbglx_boxs">
                <template v-for="value in sorces">
                    <div class="sbglx_box">
                        <img :src="value.icon" alt="">
                        <div class="sbglx_label">{{ value.text }}</div>
                        <div class="sbglx_text">{{ value.num }}</div>
                    </div>

                </template>



            </div>

        </div>
    </div>


</template>

<style scoped>
.margin_sb_box {
    margin: 0px 7px;
}

.sbglx {
    margin: 52px 15px 0px 15px;


}

.sbglx_box {
    position: relative;
    margin-bottom: 65px;

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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
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
    margin: 10px 15px;
    display: flex;
    justify-content: space-between;
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
    /* background-color: rgba(93, 146, 237, 0.7); */
    /* color: #54B1FC; */
    /* background: #274A9D; */
    /* color: #65D0F2; */
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
    /* background: #557FA4;
    color: #DFF3FA; */
    background-color: rgba(9, 93, 190, 0.6);
    /* background-color: rgba(116, 154, 205, 0.7); */
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

.sblf_search {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 110px;
}

.sblf_search_box {
    margin-left: 10px;
    color: #E6F2FF;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    font-size: 15px;
    height: 25px;
    line-height: 25px;
    width: 45px;
    background-color: #10A8FD;
    border-radius: 3px;
    text-align: center;
}



.testmians {
    /* margin: 0 auto; */
}

.testmian {
    padding: 20px 15px;

    background: url('@/assets/try/图层56.png') no-repeat 0 0;
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
import sb1 from '@/assets/shebei/智能设备.png';
import sb2 from '@/assets/shebei/特种设备.png';

import sb3 from '@/assets/shebei/安防设备.png';

import sb4 from '@/assets/shebei/巡更设备.png';

import sb5 from '@/assets/shebei/环境设备.png';

import sb6 from '@/assets/shebei/消防设备.png';

import sb7 from '@/assets/shebei/工具设备.png';

import sb8 from '@/assets/shebei/计量设备.png';



import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, onUnmounted, nextTick } from 'vue'
const source = [
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
]
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})

const input3 = ref('')
onMounted(() => {



});

const sorces =
    [
        { text: '智能设备', num: "7/34", icon: sb1 },
        { text: '特种设备', num: "0/2", icon: sb2 },
        { text: '安防设备', num: "2/15", icon: sb3 },
        { text: '巡更设备', num: "0/6", icon: sb4 },
        { text: '环境设备', num: "0/21", icon: sb5 },
        { text: '消防设备', num: "0/21", icon: sb6 },
        { text: '工具器设备', num: "0/1", icon: sb7 },
        { text: '计量设备', num: "0/1", icon: sb8 }
    ]

onUnmounted(() => {




})


</script>
