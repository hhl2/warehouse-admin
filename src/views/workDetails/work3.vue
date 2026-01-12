<template>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警信息</div>
        </div>
        <div class="sblf">
            <el-input v-model="input3" style="width: 203px" placeholder="请输入设备名称" :prefix-icon="Search" />
            <div class="sblf_search">
                <div class="sblf_search_box" @click="handleAlertSearch">查询</div>
                <div class="sblf_search_box" @click="handleAlertReset">更多</div>
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
                        <span>告警名称</span>
                        <span>告警级别</span>
                        <span>告警时间</span>
                        <span>告警分类</span>
                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.alertName }}</span>
                        <span>{{ value.alertLevel }}</span>
                        <span>{{ value.alertTime }}</span>
                        <span>{{ value.alertCategory }}</span>
                    </div>

                    <div class="sb_box_label">
                        <span>告警恢复</span>
                        <span>告警描述</span>
                        <span></span>
                        <span></span>

                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.alertRecovery }}</span>
                        <span>{{ value.alertDesc || '' }}</span>
                        <span></span>
                        <span></span>
                    </div>

                </div>


            </div>

        </div>
    </div>
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">指标概览</div>
        </div>
        <div class="yySearch">
            <div class="yySearch_left">
                <div class="yylf_label yylf_color">统计周期</div>
                <el-select size="small" v-model="filterParams.period" placeholder="请选择">
                    <el-option v-for="item in periodOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="yySearch_left">
                <div class="yylf_label yylf_color">统计时间</div>
                <el-date-picker v-model="filterParams.date" type="date" placeholder="" size="small" />
            </div>
            <div class="yySearch_left">
                <div class="yylf_search_box" @click="handleSearch">查询</div>
            </div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom2"></div>
                <div class="chart_text">作业风险</div>
            </div>
            <div class="chart_sum">
                <div class="chart_snumber">{{ alertData.total }}</div>
            </div>

            <div class="right_numberss">
                <div v-for="item in alertData.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ item.value }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="allBoxs">
            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom3"></div>
                <div class="chart_text text_type3">作业票</div>
            </div>
            <div class="chart_sum">
                <div class="chart_snumber">{{ alertData2.total }}</div>
            </div>

            <div class="right_numberss">
                <div v-for="item in alertData2.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ item.value }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="allBoxs">

            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom4"></div>
                <div class="chart_text text_type3">告警数</div>
            </div>
            <div class="chart_sum">
                <div class="chart_snumber">{{ alertData3.total }}</div>
            </div>

            <div class="right_numberss">
                <div v-for="item in alertData3.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ item.value }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="allBoxs">
            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom5"></div>
                <div class="chart_text">安全交底单</div>
            </div>
            <div class="chart_sum">
                <div class="chart_snumber">{{ alertData4.total }}</div>
            </div>

            <div class="right_numberss">
                <div v-for="item in alertData4.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ item.value }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>

    </div>


</template>

<style scoped>
::v-deep(.el-select--small) {
    width: 105px !important;
}

::v-deep(.el-date-editor.el-input,
    .el-date-editor.el-input__wrapper) {
    width: 105px !important;
}

/* 保持原有的所有样式不变 */
::v-deep(.el-select__placeholder) {
    color: #FBFBFB;
}

::v-deep(.el-select__wrapper) {
    background-color: #476B9A;
    box-shadow: 0 0 0 1px #409eff inset;
}

.margin_sb_box {
    margin: 0px 7px;
}

.right_numberss {
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #76CBFB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 205px;
    height: 115px;
    margin-right: 10px;
}

.card {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
}

.card__badges {
    width: 15px;
    height: 15px;
}


.card__badges--blue {
    background: #42FFF9;
}

.card__badges--yellow {
    background: #F0B716;
}

.card__badges--green {
    background: #16B4F0;
}

.card__values {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 3px;
    font-weight: bold;
    width: 72px;
}

.card__labels {
    width: 130px;
}

.card__numbers {
    font-size: 30px;
}

.card__values--blue .card__numbers {
    color: #42FFF9;
}

.card__values--yellow .card__numbers {
    color: #F0B716;
}

.card__values--green .card__numbers {
    color: #16B4F0;
}

.allBoxs {
    height: 175px;
    margin: 12px 24px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;


}

.allBoxs:not(:last-child) {
    border-bottom: 1px solid #088AD1;
}

.allBoxs .echartp {
    width: 140px;
    height: 140px;
    border: 2px dashed #2DA9C0;
    border-radius: 50%;
    position: relative;

}

.echartp .chartpwidth {
    width: 140px;
    height: 140px;

}

.chart_text {
    font-size: 16px;
    position: absolute;
    left: 50%;
    transform: translateX(-40%);
    bottom: -30px;
    color: #fff;
    width: 100px;

}

.text_type3 {
    width: 60px !important;
}

.chart_sum {
    width: 85px;
    height: 85px;
    position: absolute;
    left: 30px;
    top: 45px;
    background: #193F8E;
    z-index: 9999;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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

.changeSize {
    font-size: 30px !important;
}


.changewidth_left {
    margin-left: 20px;

}

.yylf_search_box {
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
    cursor: pointer;
}

.yySearch {
    display: flex;
    align-items: center;
    margin: 10px 15px;
}

.yySearch_left {
    display: flex;
    align-items: center;
    margin-left: 5px;
}

.yySearch_left .yylf_label {
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 14px;
    color: #FBFBFB;
    margin-right: 5px;
}

.sblf {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.sblf_box {
    width: 438px;
    height: 190px;

    border: 1px solid #1C70D7;
    border-radius: 5px;
    margin: 0px 15px;
    margin-bottom: 16px;

}

.sblf_box_title {
    color: #fff;
    font-size: 16px;
    padding: 5px 10px;



}

.sblf_box_title span {
    color: #F06262;

}

.sb_box_label {
    display: flex;
    padding: 5px 5px;
    font-size: 12px;
    padding: 5px 8px;
    /* background: #274A9D;
    color: #65D0F2; */
    /* background-color: rgba(93, 146, 237, 0.7); */
    background: #095DBE;
    color: #04E9E9;
    /* color: #54B1FC; */
    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 5px;

}

.sb_box_label span {
    display: inline-block;
    width: 100px;
    text-align: center;
}

.sb_box_label span:first-child {
    /* text-align: left; */
}


.sb_box_label2 {
    display: flex;
    padding: 5px 5px;
    background-color: rgba(9, 93, 190, 0.6);
    /* background-color: rgba(116, 154, 205, 0.7); */
    color: #DFF3FA;
    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 5px;
}

.sb_box_label2 span {
    display: inline-block;
    width: 100px;
    text-align: center;
}

.sb_box_label2 span:first-child {
    /* text-align: left; */
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
</style>

<script setup>
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})

import * as echarts from 'echarts';
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, onUnmounted, nextTick } from 'vue'
const source = [
    {
        deviceCode: '64BC256336654588523369814CVT3',
        alertName: 'ABS22',
        alertLevel: '一般警告',
        alertTime: '2025-11-23',
        alertCategory: '安防告警',
        alertRecovery: '未恢复',
        alertDesc: ''
    },
    {
        deviceCode: '74BC256336654588523369814CVT4',
        alertName: 'TEMP01',
        alertLevel: '严重警告',
        alertTime: '2026-01-08',
        alertCategory: '温度告警',
        alertRecovery: '已恢复',
        alertDesc: '温度过高'
    },
    {
        deviceCode: '84BC256336654588523369814CVT5',
        alertName: 'PWR03',
        alertLevel: '一般警告',
        alertTime: '2026-01-01',
        alertCategory: '电力告警',
        alertRecovery: '未恢复',
        alertDesc: ''
    },
    {
        deviceCode: '94BC256336654588523369814CVT6',
        alertName: 'NET05',
        alertLevel: '提示',
        alertTime: '2025-12-28',
        alertCategory: '网络告警',
        alertRecovery: '已恢复',
        alertDesc: '网络延迟'
    }
]
const input3 = ref('')
onMounted(() => {
    initChart2();
    initChart3();
    initChart4();
    initChart5()
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);



});

const handleResize = () => {

    if (myChart2) {
        myChart2.resize();
    }
    if (myChart3) {
        myChart3.resize();
    }
    if (myChart4) {
        myChart4.resize();
    }
    if (myChart5) {
        myChart5.resize();
    }



};
onUnmounted(() => {



    if (myChart2) {
        myChart2.dispose();
        myChart2 = null;
    }
    if (myChart3) {
        myChart3.dispose();
        myChart3 = null;
    }
    if (myChart4) {
        myChart4.dispose();
        myChart4 = null;
    }
    if (myChart5) {
        myChart5.dispose();
        myChart5 = null;
    }

    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});

// 更新图表数据
const updateCharts = () => {
    // 重新设置饼图数据

    initChart2();

};

const chartDom2 = ref(null);

const chartDom3 = ref(null);

const chartDom4 = ref(null);
const chartDom5 = ref(null);




let myChart2 = null;

let myChart3 = null;

let myChart4 = null;
let myChart5 = null;




// 作业风险
const initChart2 = () => {
    if (!chartDom2.value) return;
    myChart2 = echarts.init(chartDom2.value);
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
                        value: alertData.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: alertData.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: alertData.items[2].value, name: '',
                        itemStyle: {
                            color: '#16B4F0'
                        }
                    }
                ]
            }
        ]
    };

    myChart2.setOption(option);
}

//作业票
const initChart3 = () => {
    if (!chartDom3.value) return;
    myChart3 = echarts.init(chartDom3.value);
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
                        value: alertData2.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: alertData2.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: alertData2.items[2].value, name: '',
                        itemStyle: {
                            color: '#16B4F0'
                        }
                    }
                ]
            }
        ]
    };

    myChart3.setOption(option);
}
//告警数
const initChart4 = () => {
    if (!chartDom4.value) return;
    myChart4 = echarts.init(chartDom4.value);
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
                        value: alertData3.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: alertData3.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: alertData3.items[2].value, name: '',
                        itemStyle: {
                            color: '#16B4F0'
                        }
                    }
                ]
            }
        ]
    };

    myChart4.setOption(option);
}
const initChart5 = () => {
    if (!chartDom5.value) return;
    myChart5 = echarts.init(chartDom5.value);
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
                        value: alertData4.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },

                    {
                        value: alertData4.items[1].value, name: '',
                        itemStyle: {
                            color: '#16B4F0'
                        }
                    }
                ]
            }
        ]
    };

    myChart5.setOption(option);
}




const alertData = reactive({
    total: 8,
    items: [
        { label: '高风险', value: 1, unit: '次', color: 'blue', key: 'urgent' },
        { label: '中风险', value: 2, unit: '次', color: 'yellow', key: 'important' },
        { label: '低风险', value: 5, unit: '次', color: 'green', key: 'normal' }
    ]
});


const alertData2 = reactive({
    total: 7,
    items: [
        { label: 'A类', value: 1, unit: '票', color: 'blue', key: 'urgent' },
        { label: 'B类', value: 2, unit: '票', color: 'yellow', key: 'important' },
        { label: 'c类', value: 4, unit: '票', color: 'green', key: 'normal' }
    ]
});


const alertData3 = reactive({
    total: 6,
    items: [
        { label: '紧急告警', value: 1, unit: '个', color: 'blue', key: 'urgent' },
        { label: '重大告警', value: 2, unit: '个', color: 'yellow', key: 'important' },
        { label: '一般告警', value: 3, unit: '个', color: 'green', key: 'normal' }
    ]
});

const alertData4 = reactive({
    total: 4,
    items: [
        { label: '仓储作业类', value: 1, unit: '个', color: 'blue', key: 'urgent' },
        // { label: '重大告警', value: 2, unit: '个', color: 'yellow', key: 'important' },
        { label: '施工作业类', value: 3, unit: '个', color: 'green', key: 'normal' }
    ]
});




// 筛选参数
const filterParams = reactive({
    period: '',
    date: ''
});

const sorces =
    [
        { text: '智能设备', num: "7/34" },
        { text: '特种设备', num: "0/2" },
        { text: '安防设备', num: "2/15" },
        { text: '巡更设备', num: "0/6" },
        { text: '环境设备', num: "0/21" },
        { text: '消防设备', num: "0/21" },
        { text: '工具器设备', num: "0/1" },
        { text: '计量设备', num: "0/1" }
    ]

onUnmounted(() => {




})


</script>
