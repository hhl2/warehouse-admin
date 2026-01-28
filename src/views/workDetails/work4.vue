<template>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">仓库吞吐量</div>
        </div>

        <div class="changeTimeTypes">
            <div class="changeTimeType">
                <div class="changeTimeType_item" :class="{ 'active': timeType1 === 1 }" @click="timeType1 = 1">月</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType1 === 2 }" @click="timeType1 = 2">季</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType1 === 3 }" @click="timeType1 = 3">年</div>
            </div>
        </div>
        <div class="ck_list">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">{{ totalAmt }}</div>
                    <div class="jcfx_texts2">万元</div>
                </div>
                <div class="jcfx_text wzwidth">库存金额</div>
            </div>
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">{{ avgAmt }}</div>
                    <div class="jcfx_texts2">万元</div>
                </div>
                <div class="jcfx_text">平均库存金额</div>
            </div>
        </div>
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">储备物资周转率</div>
        </div>

        <div class="changeTimeTypes">
            <div class="changeTimeType">
                <div class="changeTimeType_item" :class="{ 'active': timeType2 === 1 }" @click="timeType2 = 1">月</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType2 === 2 }" @click="timeType2 = 2">季</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType2 === 3 }" @click="timeType2 = 3">年</div>
            </div>
        </div>

        <div class="ck_lists">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">{{ turnoverRate }}</div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text wzwidth2">储备物资周转率</div>
            </div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">平均库存下降率</div>
        </div>
        <div class="changeTimeTypes">
            <div class="changeTimeType">
                <div class="changeTimeType_item" :class="{ 'active': timeType3 === 1 }" @click="timeType3 = 1">月</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType3 === 2 }" @click="timeType3 = 2">季</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType3 === 3 }" @click="timeType3 = 3">年</div>
            </div>
        </div>
        <div class="ck_lists">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">{{ declineRate }}</div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text wzwidth2">平均库存下降率</div>
            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">生产效率</div>
        </div>

        <div class="changeTimeTypes">
            <div class="changeTimeType">
                <div class="changeTimeType_item" :class="{ 'active': timeType4 === 1 }" @click="timeType4 = 1">月</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType4 === 2 }" @click="timeType4 = 2">季</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType4 === 3 }" @click="timeType4 = 3">年</div>
            </div>
        </div>

        <div class="gjtj">
            <div v-for="stat in personnelData1.stats" :key="stat.label" class="sbgl_box">
                <img src="@/assets/图标.png" alt="">
                <div class="sbgl_box_title">{{ stat.label }}</div>
                <div class="sbgl_box_textss">{{ stat.value }}<div class="sbgl_box_label">{{ stat.unit }}</div>
                </div>
            </div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">安全库存预警</div>
        </div>

        <div class="changleft5">
            <el-table class="my-spacing-table2" ref="tableRef" :data="data1" >
                <el-table-column prop="materialName" label="物资名称" show-overflow-tooltip />
                <el-table-column prop="actualQty" label="库存数量" />
                <el-table-column prop="name" label="预警值" show-overflow-tooltip />
            </el-table>


        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">仓库呆滞率</div>
        </div>

        <div class="changeTimeTypes">
            <div class="changeTimeType">
                <div class="changeTimeType_item" :class="{ 'active': timeType5 === 1 }" @click="timeType5 = 1">月</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType5 === 2 }" @click="timeType5 = 2">季</div>
                <div class="changeTimeType_item" :class="{ 'active': timeType5 === 3 }" @click="timeType5 = 3">年</div>
            </div>
        </div>

        <div class="ck_lists">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">{{ lazyRate }}</div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text wzwidth3">呆滞率</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    queryWarehouseThroughputStatistic,
    queryTurnoverInfo,
    queryAvgDisDeclineRateInfo,
    queryProductionInfo,
    querySafeDistributionInfo,
    queryInventoryRateInfo
} from "@/api/user";
import { ref, reactive, onMounted, watch } from 'vue';

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },
})

const data1 = ref([]);

const timeType1 = ref(3);
const timeType2 = ref(3);
const timeType3 = ref(3);
const timeType4 = ref(3);
const timeType5 = ref(3);

const totalAmt = ref(0);
const avgAmt = ref(0);
const turnoverRate = ref(0);
const declineRate = ref(0);
const lazyRate = ref(0);

const personnelData1 = reactive({
    current: 0,
    stats: [
        { label: '入库金额', value: 0, key: 'todayTotal', unit: "万元" },
        { label: '出库金额', value: 0, key: 'todayTasks2', unit: "万元" },
        { label: '配送金额', value: 0, key: 'todayTasks4', unit: "万元" },
        { label: '万元物资配送成本', value: 0, key: 'todayTasks5', unit: "元" },
    ]
});

//仓库呆滞率
const queryInventoryRateInfos = () => {
    queryInventoryRateInfo({ timeType: timeType5.value }).then(res => {
        if (res?.data?.code == 200) {
            lazyRate.value = res?.data?.data?.inventoryRate || 0
        }
    })
}

//安全库存预警
const querySafeDistributionInfos = () => {
    querySafeDistributionInfo({ timeType: timeType1.value }).then(res => {
        if (res?.data?.code == 200) {

        data1.value=res.data.data.list
            // 处理数据
        }
    })
}

const serviceFund = ref(0)
const deliveryTransportAmt = ref(0)
const receiptAmt = ref(0)
const issueAmt = ref(0)

//生产效率
const queryProductionInfos = () => {
    queryProductionInfo({ timeType: timeType4.value }).then(res => {
        if (res?.data?.code == 200) {
            const resData = res?.data?.data
            serviceFund.value = resData?.serviceFund
            deliveryTransportAmt.value = resData?.deliveryTransportAmt
            receiptAmt.value = resData?.receiptAmt
            issueAmt.value = resData?.issueAmt

            // 更新 personnelData1.stats 中的显示值
            personnelData1.stats.forEach(stat => {
                if (stat.label === '入库金额') stat.value = resData?.receiptAmt || 0
                if (stat.label === '出库金额') stat.value = resData?.issueAmt || 0
                if (stat.label === '配送金额') stat.value = resData?.deliveryTransportAmt || 0
                if (stat.label === '万元物资配送成本') stat.value = resData?.serviceFund || 0
            })
        }
    })
}

//平均库存下降率
const queryAvgDisDeclineRateInfos = () => {
    queryAvgDisDeclineRateInfo({ timeType: timeType3.value }).then(res => {
        if (res?.data?.code == 200) {
            declineRate.value = res?.data?.data?.wareDropRate || 0
        }
    })
}

//库存周转率统计
const queryTurnoverInfos = () => {
    queryTurnoverInfo({ timeType: timeType2.value }).then(res => {
        if (res?.data?.code == 200) {
            turnoverRate.value = res?.data?.data?.revolveRate || 0
        }
    })
}

//仓库吞吐量统计
const queryWarehouseThroughputStatistics = () => {
    queryWarehouseThroughputStatistic({ timeType: timeType1.value }).then(res => {
        if (res?.data?.code == 200) {
            totalAmt.value = res?.data?.data?.inventoryAmount || 0
            avgAmt.value = res?.data?.data?.avgInventoryAmount || 0
        }
    })
}

onMounted(() => {
    // 调用数据接口
    queryWarehouseThroughputStatistics();
    queryTurnoverInfos();
    queryAvgDisDeclineRateInfos();
    queryProductionInfos();
    querySafeDistributionInfos();
    queryInventoryRateInfos();
})

watch(timeType1, () => {
    queryWarehouseThroughputStatistics();
});
watch(timeType2, () => {
    queryTurnoverInfos();
});
watch(timeType3, () => {
    queryAvgDisDeclineRateInfos();
});
watch(timeType4, () => {
    queryProductionInfos();
});
watch(timeType5, () => {
    queryInventoryRateInfos();
});
</script>

<style scoped>
.changleft5 {
    margin: 5px 15px;
}

.ck_lists {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    margin-bottom: 27px;
}

.ck_list {
    display: flex;
    justify-content: space-around;
    margin: 45px 20px 27px 0px;
}

.changeTimeTypes {
    display: flex;
    justify-content: flex-end;
    margin: 15px 20px 15px 0px;
}

.changeTimeType {
    display: flex;
    justify-content: space-between;
    width: 200px;
}

.changeTimeType .changeTimeType_item {
    background-color: #096BB4;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    padding: 5px 10px;
    cursor: pointer;
}

.changeTimeType .changeTimeType_item.active {
    background-color: #11B5EE;
}

.jcfx_sum {
    display: flex;
    position: absolute;
    align-items: baseline;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.jcfx_sum .jcfx_texts1 {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 28px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #2E86FC 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.jcfx_texts2 {
    font-size: 12px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #2E86FC 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.jcfx_box {
    width: 125px;
    height: 145px;
    position: relative;
}

.jcfx_box img {
    width: 100%;
    position: relative;
}

.jcfx_box .jcfx_text {
    width: 98px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 16px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.sbgl_box_textss {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: baseline;
    background: linear-gradient(0deg, #54D7F8 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    font-weight: bold;
    font-size: 25px;
}

.sbgl_box_textss .sbgl_box_label {
    font-size: 15px;
}

.wzwidth {
    width: 75px !important;
}

.wzwidth2 {
    width: 116px !important;
}

.wzwidth3 {
    width: 50px !important;
}
</style>