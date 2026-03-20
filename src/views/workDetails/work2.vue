<template>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">作业推演</div>
        </div>
        <div class="allBoxs">

            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom"></div>
                <div class="chart_text ">入库作业总数</div>
                <div class="chart_sum">
                    <div class="chart_snumber">{{ securityData.total }}</div>
                </div>
            </div>
            <div class="left_number">
                <div v-for="item in securityData.items" :key="item.label" class="jcard">
                    <div class="jcard_box">
                        <div class="jcard_box_text">
                            <div class="jcard__units">{{ item.unit }}</div>
                            <div class="jcard__numbers" :class="{ leftColor: item.color === 'yellow' }">{{
                                item.value
                            }}</div>
                        </div>
                    </div>
                    <div class="jcard__values">{{ item.label }}</div>
                </div>
            </div>

        </div>


        <div class="allBoxs">

            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom1"></div>
                <div class="chart_text ">出库作业总数</div>
                <div class="chart_sum">
                    <div class="chart_snumber">{{ fireData.total }}</div>
                </div>
            </div>
            <div class="left_number">
                <div v-for="item in fireData.items" :key="item.label" class="jcard">
                    <div class="jcard_box">
                        <div class="jcard_box_text">
                            <div class="jcard__units">{{ item.unit }}</div>
                            <div class="jcard__numbers" :class="{ leftColor: item.color === 'yellow' }">{{
                                item.value
                            }}</div>
                        </div>
                    </div>
                    <div class="jcard__values">{{ item.label }}</div>
                </div>
            </div>

        </div>



        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">推演参数设置</div>
        </div>


        <div class="tycs">
            <div class="tycs_label">单位：分钟</div>
            <div class="tycs_button">
                重置
            </div>
        </div>

        <div class="tycsList">
            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">入库推演参数</div>
            </div>

            <div class="tycsbox">
                <div class="tycsbox_lalel">人工叉车至输送线</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr ? detectProgressStr + '%' : 0 }">
                    </div>
                </div>
            </div>
            <div class="tycsbox">
                <div class="tycsbox_lalel">输送线至堆垛机</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr2 ? detectProgressStr2 + '%' : 0 }">
                    </div>
                </div>
            </div>
            <div class="tycsbox">
                <div class="tycsbox_lalel">堆垛机至立库货位</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr3 ? detectProgressStr3 + '%' : 0 }">
                    </div>
                </div>
            </div>

        </div>
        <div class="tycsList">
            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">出库推演参数</div>
            </div>

            <div class="tycsbox">
                <div class="tycsbox_lalel"> 立库货位至堆垛机</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr ? detectProgressStr + '%' : 0 }">
                    </div>
                </div>
            </div>
            <div class="tycsbox">
                <div class="tycsbox_lalel">堆垛机至输送线</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr2 ? detectProgressStr2 + '%' : 0 }">
                    </div>
                </div>
            </div>
            <div class="tycsbox">
                <div class="tycsbox_lalel"> 输送线至人工叉车</div>
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: detectProgressStr3 ? detectProgressStr3 + '%' : 0 }">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">入库作业</div>
        </div>



        <div class="changleft">
            <el-table class="my-spacing-table" ref="tableRef" :data="fetchData2">
                <el-table-column prop="receiptCode" label="单号" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="入库货位" show-overflow-tooltip/>
                <!-- <el-table-column prop="createTime" label="入库单创建时间" show-overflow-tooltip /> -->
                <el-table-column prop="countNums3" label="入库类型" />
                <el-table-column prop="countNums5" label="预计作业时长" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">出库作业</div>
        </div>

        <div class="changleft">
            <el-table class="my-spacing-table" ref="tableRef" :data="fetchData1">
                <el-table-column prop="IssueCode" label="单号" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="出库货位" show-overflow-tooltip />
                <!-- <el-table-column prop="createTime" label="出库单创建时间" show-overflow-tooltip /> -->
                <el-table-column prop="countNums3" label="出库类型" />
                <el-table-column prop="countNums5" label="预计作业时长" show-overflow-tooltip >
                </el-table-column>
            </el-table>
        </div>


    </div>


</template>

<style scoped>
.left_number {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: Microsoft YaHei;
    font-weight: bold;
    width: 250px;
    height: 140px;
    margin-right: 10px;
    margin-top: 18px;
}

.jcard {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 120px;
    justify-content: space-around;
}

.jcard_box {
    background: url('@/assets/icon-10.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 87px;
    height: 72px;
    position: relative;
}

.jcard_box_text {
    position: absolute;
    left: 18px;
    top: -15px;
    display: flex;
    align-items: baseline;
    flex-direction: row-reverse;
}

.jcard__values {
    font-family: Microsoft YaHei;

    font-size: 18px;
    color: #76CBFB;
}



.jcard__numbers {
    font-size: 28px;
    background: linear-gradient(0deg, #42FFF9 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.allBoxs {
    height: 180px;
    padding: 8px 24px;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.allBoxs .echartp {
    width: 140px;
    height: 140px;
    border: 2px dashed #2DA9C0;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-shrink: 0;
}

.echartp .chartpwidth {
    width: 100%;
    height: 100%;
}

.chart_text {
    font-size: 16px;
    position: absolute;
    left: 50%;
    transform: translateX(-40%);
    bottom: -35px;
    color: #76CBFB;
    width: 120px;

}



.chart_sum {
    width: 85px;
    height: 85px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #193F8E;
    z-index: 10;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.chart_snumber {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 35px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #F8AE49 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.tycsbox {
    display: flex;
    align-items: center;
    margin: 15px 20px;
}

.tycsbox_lalel {
    width: 150px;
    font-family: Microsoft YaHei;
    font-weight: 500;
    font-size: 18px;
    color: #E9FBFF;
}

.progress-container {
    width: 226px;
    height: 7px;
    background-color: #1C71B4;
    border-radius: 3px;
    overflow: hidden;
    margin: 0px 10px;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #96FFBA, #6fd88a);
    border-radius: 3px;
    width: 60%;
    transition: width 0.5s ease;
}

.tycsList {
    width: 423px;
    height: 182px;
    margin: 5px 10px 5px 20px;
    /* background: #84a8df; */
    border: 1px solid #1C70D7;
    border-radius: 3px;

}

.tycs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 30px 8px 20px;
}

.tycs_label {
    font-family: Adobe Heiti Std;
    font-weight: bold;
    font-size: 18px;
    color: #92D8FF;

}

.tycs_button {

    width: 95px;
    height: 27px;
    background: linear-gradient(0deg, #209CFF, #68E0CF);
    font-size: 18px;
    color: #FFFFFF;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    line-height: 25px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}


::v-deep(.el-table__body) {
    -webkit-border-vertical-spacing: 2px;
    /* 设置行与列的间距 */
}

.changleft {
    margin-left: 20px;
    margin-right: 15px;
    margin-top: 10px;

}

.my-spacing-table {
    height: calc(100vh - 672px);
}


.leftColor {
    font-size: 30px;
    background: linear-gradient(0deg, #FAC611 0%, #FFFFFF 100%) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    color: transparent !important;
}

.jcard__units {
    font-size: 15px;
    color: #F8FFFF;
}
</style>

<script setup>


// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})

import { Search } from '@element-plus/icons-vue'
import { reactive, ref, inject, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
    queryIssueTaskInfoPagination,
    queryReceiptTaskInfoPagination,
    queryTaskStatisticInfo


} from "@/api/user";
import * as echarts from 'echarts';
const detectProgressStr = ref(55)
const detectProgressStr2 = ref(70)
const detectProgressStr3 = ref(80)
const chartDom = ref(null);
const chartDom1 = ref(null);

let myChart = null;
let myChart1 = null;

//安防检测 - 保持原函数名
const initChart1 = () => {
    if (!chartDom.value) return;

    myChart = echarts.init(chartDom.value);

    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['75%', '90%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: 'transparent'
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: securityData.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: securityData.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    }
                ]
            }
        ]
    };

    myChart.setOption(option);
}


const initChart2 = () => {
    if (!chartDom1.value) return;

    myChart1 = echarts.init(chartDom1.value);

    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['75%', '90%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: 'transparent'
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: fireData.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: fireData.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    }
                ]
            }
        ]
    };

    myChart1.setOption(option);
}


const securityData = reactive({
    total: 0,
    items: [
        { label: '统计入库作业时长', value: 0, unit: '分钟', color: 'blue', key: 'online' },
        { label: '入库货位', value: 0, unit: '个', color: 'yellow', key: 'offline' }
    ]
});
const fireData = reactive({
    total: 0,
    items: [
        { label: '统计出库作业时长', value: 0, unit: '分钟', color: 'blue', key: 'online' },
        { label: '出库货位', value: 0, unit: '个', color: 'yellow', key: 'offline' }
    ]
});

const handleResize = () => {
    nextTick(() => {
        if (myChart) myChart.resize();
        if (myChart1) myChart1.resize();
    });
};
const fetchData1 = ref([{
    receiptCode: "RK001",
    countNums2: "A001",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK002",
    countNums2: "A002",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK003",
    countNums2: "A003",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK004",
    countNums2: "A004",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK005",
    countNums2: "A005",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK006",
    countNums2: "A006",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK007",
    countNums2: "A007",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK008",
    countNums2: "A008",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK009",
    countNums2: "A009",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK0010",
    countNums2: "A010",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK0011",
    countNums2: "A010",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

},])
const fetchData2 = ref([{
    receiptCode: "RK001",
    countNums2: "A001",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK002",
    countNums2: "A002",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK003",
    countNums2: "A003",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "完成",

}, {
    receiptCode: "RK004",
    countNums2: "A004",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK005",
    countNums2: "A005",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK006",
    countNums2: "A006",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK007",
    countNums2: "A007",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK008",
    countNums2: "A008",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK009",
    countNums2: "A009",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK0010",
    countNums2: "A010",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

}, {
    receiptCode: "RK0011",
    countNums2: "A010",
    countNums3: "10:45",
    createTime: "10:49",
    countNums5: "",

},])

// 时间戳（毫秒）转格式化字符串
const formatTimestamp = (ts) => {
    if (!ts) return ''
    const d = new Date(ts)
    const pad = n => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const queryIssueTaskInfoPaginations=()=>{
        queryIssueTaskInfoPagination({
           "bureauCode": "0318",
              "provinceCode": "03",
        "warehouseCode": "0318080",
        "warehouseId": "03180000020822"
}).then(res => {
        if (res?.code == 0) {
            const list = (res?.data?.list || []).map(item => ({
                ...item,
                createTime: formatTimestamp(item.createTime)
            }))
            fetchData1.value = list 
            }
        }

    ).catch(err => {
        console.error('实时库存接口调用失败:', err);
    })

}
const queryReceiptTaskInfoPaginations=()=>{
        queryReceiptTaskInfoPagination({
        "bureauCode": "0318",
        "provinceCode": "03",
        "warehouseCode": "0318080",
        "warehouseId": "03180000020822"
        }).then(res => {
        if (res?.code == 0) {
            const list = (res?.data?.list || []).map(item => ({
                ...item,
                createTime: formatTimestamp(item.createTime)
            }))
            fetchData2.value = list 
            }
        }

    ).catch(err => {
        console.error('实时库存接口调用失败:', err);
    })

}
const queryTaskStatisticInfos=()=>{
        queryTaskStatisticInfo({
        "bureauCode": "0318",
        "provinceCode": "03",
        "warehouseCode": "0318080",
        "warehouseId": "03180000020822"
        }).then(res => {
        if (res?.code == 0) {
            const d = res.data[0] || {}
            securityData.total = d.receiptTaskCount        // 入库任务数量
            fireData.total = d.issueTaskCount              // 出库任务数量
            securityData.items[1].value = d.receiptWarehouseCount  // 入库货位数量
            fireData.items[1].value = d.issueWarehouseCount        // 出库货位数量
            }
        }

    ).catch(err => {
        console.error('实时库存接口调用失败:', err);
    })

}


onMounted(() => {
    initChart1();
    initChart2();
    queryIssueTaskInfoPaginations();
    queryReceiptTaskInfoPaginations();
    queryTaskStatisticInfos();

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
});

// 监听面板显隐状态，触发图表自适应重绘
watch(() => props.isPanelVisible, () => {
    // 延迟约 300ms，等待侧边栏过渡动画彻底结束后再刷新图表尺寸
    setTimeout(handleResize, 310);
});

onUnmounted(() => {

    if (myChart) {
        myChart.dispose();
        myChart = null;
    }
    if (myChart1) {
        myChart1.dispose();
        myChart1 = null;
    }

    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});

</script>
