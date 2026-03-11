<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
                <el-button type="primary" class="search-btn" @click="fetchDevices">查询</el-button>
            </div>
            <div class="changleft">
                <!-- 告警编号、告警类型、告警等级、告警内容、告警时间、告警处理过程、告警处理结果 -->
                <!-- warnCode：告警编号、warnType：告警类型、alarmLevel：告警等级、alarmInfo：告警内容、watchTime：告警时间、alarmPrecess：告警处理过程、warnResult：告警处理结果 -->
                <el-table class="my-spacing-table" ref="tableRef" :data="warnData">
                    <el-table-column prop="warnCode" label="告警编号" show-overflow-tooltip />
                    <el-table-column prop="warnType" label="告警类型" />
                    <el-table-column prop="alarmLevel" label="告警内容" show-overflow-tooltip />
                    <el-table-column prop="alarmInfo" label="告警等级" />
                    <el-table-column prop="watchTime" label="告警时间" show-overflow-tooltip />
                    <el-table-column prop="alarmPrecess" label="告警处理过程" show-overflow-tooltip />
                    <el-table-column prop="warnResult" label="告警处理结果" show-overflow-tooltip />
                </el-table>

            </div>
        </div>
    </div>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警等级</div>
        </div>


        <div class="txzybox">
            <div class="chartBox">
                <div class="chartBoxs">
                    <div class="echartp">
                        <div class="echart_pwidth" ref="chartDom1"></div>
                        <div class="chart_sum">
                            <div class="chart_snumber">{{ formatNumber(alertData.total) }}</div>
                        </div>
                    </div>
                </div>

            </div>


            <div class="txzyList">

                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao.png" alt="">
                        <div class="txzyimg_text"> {{ formatNumber(alertData.items[2].value) }}</div>
                    </div>
                    <div class="txzy_text">一般告警</div>
                </div>



                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao2.png" alt="">
                        <div class="txzyimg_text green_label">{{ formatNumber(alertData.items[1].value) }}</div>
                    </div>
                    <div class="txzy_text">重要告警</div>
                </div>


                <div class="txzyList_box">
                    <div class="txzyimg">
                        <img src="@/assets/tubiao1.png" alt="">
                        <div class="txzyimg_text yellow_label">{{ formatNumber(alertData.items[0].value) }}</div>
                    </div>
                    <div class="txzy_text">紧急告警</div>
                </div>



            </div>






        </div>


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警分类</div>
        </div>

        <div class="yylf">
            <div class="yylf_search">
                <div :class="{ 'yylf_search_box': true, 'active': isactive === '1' }" @click="toggleActive('1')">今日
                </div>
                <div :class="{ 'yylf_search_box': true, 'active': isactive === '2' }" @click="toggleActive('2')">本周
                </div>
            </div>
        </div>
        <div class="chartref">
            <div ref="trendChartRef2" class="changechart"></div>
        </div>


    </div>
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警区域</div>
        </div>

        <div class="yylf">
            <div class="yylf_search">
                <div :class="{ 'yylf_search_box': true, 'active': isactive2 === '1' }" @click="toggleActive2('1')">今日
                </div>
                <div :class="{ 'yylf_search_box': true, 'active': isactive2 === '2' }" @click="toggleActive2('2')">本周
                </div>
            </div>
        </div>


        <div class="chartref">
            <div ref="trendChartRef1" class="changechart"></div>
        </div>



        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警设备</div>
        </div>

        <div class="yylf">
            <div class="yylf_search">
                <div :class="{ 'yylf_search_box': true, 'active': isactive1 === '1' }" @click="toggleActive1('1')">今日
                </div>
                <div :class="{ 'yylf_search_box': true, 'active': isactive1 === '2' }" @click="toggleActive1('2')">本周
                </div>
            </div>
        </div>


        <div class="chartref">
            <div ref="trendChartRef" class="changechart"></div>
        </div>

    </div>
    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">
        </div>
    </div>



</template>

<style scoped>
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

.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}

.status-urgent {
    color: #FCDA1E;
}

.yylf {
    display: flex;
    flex-direction: row-reverse;

    margin: 5px 20px;
}

.yylf_search_box.active {
    background-color: #10A8FD;
    color: white;
}

.yylf_search {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 120px;
}

.yylf_search_box {
    margin-left: 20px;
    font-weight: bold;
    color: #76CBFB;
    font-size: 15px;
    height: 22px;
    line-height: 22px;
    width: 45px;
    padding: 0px 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;

}

.my-spacing-table {
    height: 288px;
}

.inputwidth {
    width: 240px;
}

.changewidth {
    margin: 5px 15px 10px 10px;

}

.changleft {
    margin-left: 10px;

}

.changleft2 {
    margin-left: 20px;
    margin-right: 5px;

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







.chartBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;

}

.chart_sum {
    width: 115px;
    height: 115px;
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
    font-size: 38px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #F8AE49 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.txzybox {
    margin: 25px 20px;
}

.txzyList {
    display: flex;
    justify-content: space-between;
    margin: 0px 15px;

}

.txzyList_box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.txzy_text {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    color: #76CBFB;
    margin-top: 20px;
}

.txzyimg {
    width: 97px;
    height: 86px;
    position: relative;
}

.txzyimg img {
    width: 100%;
    height: 100%;
}

.txzyimg_text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 55px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 30px;
    color: #F0B716;
    background: linear-gradient(0deg, #29A1FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.green_label {
    font-weight: bold;
    font-size: 30px;
    color: #42FFF9;
    background: linear-gradient(0deg, #42FFF9 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;


}

.yellow_label {
    font-weight: bold;
    font-size: 30px;
    color: #F0B716;
    background: linear-gradient(0deg, #FAC611 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;


}

.chartBoxs {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.echartp {
    width: 180px;
    height: 182px;
    border: 2px dashed #2DA9C0;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-shrink: 0;
}

.echart_pwidth {
    width: 100%;
    height: 100%;
}

.chartref {
    margin: 15px 20px;
}

.changechart {
    width: 434px;
    height: 351px;

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
import { reactive, ref, inject, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts';
import request from '@/utils/request'


import {
    querySecurityAlarmCount
} from '@/api/user';

const input3 = ref('')

const formatNumber = (val) => {
    if (val == null || val === '') return '0';
    const num = parseFloat(val);
    return isNaN(num) ? val : (Math.floor(num) === num ? num.toString() : num.toFixed(2));
};

const alertData = reactive({
    total: 17,
    items: [
        { label: '紧急告警', value: 2, unit: '个', color: 'blue', key: 'urgent' },
        { label: '重要告警', value: 10, unit: '个', color: 'yellow', key: 'important' },
        { label: '一般告警', value: 5, unit: '个', color: 'green', key: 'normal' }
    ]
});
const warnCode = ref('');

const fetchSecurityAlarm = async () => {
    try {
        const res = await querySecurityAlarmCount({ dealState: "2" });
        if (res.code == 0) {
            alertData.total = res.data.alramTotal;
            alertData.items[0].value = res.data.oneLevelNum;
            alertData.items[1].value = res.data.towLevelNum;
            alertData.items[2].value = res.data.threeLevelNum;
        }
    } catch (e) { console.warn('Alert API failed'); }
    // updateChart('alert', chartDom2.value, getPieOption(alertData.items.map(i => i.value)));
};
const queryWarnListPagination = async () => {
    try {
        const res = await request({
            url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryWarnListPagination',
            method: 'post',
            data: {
                "warnCode": warnCode.value, "watchTime": ""
            },
            skipGlobalParams: true
        });
        if (res.code == 0) {
            warnData.value = res.data?.list || [];

        } else {
            warnData.value = []

        }

        // visitordata.value=response.data.data.list
    } catch (error) {
        console.error('获取监控点列表失败:', error);
    }
}
const queryWarnGroupCount = async () => {
    try {
        const response = await request({
            url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryWarnGroupCount',
            method: 'post',
            data: {
                "startDate": "2025-01-01 00:00:00",
                "endDate": "2026-01-30 23:59:59"
            },
            skipGlobalParams: true
        });
        console.log(response);
        // visitordata.value=response.data.data.list
    } catch (error) {
        console.error('获取监控点列表失败:', error);
    }
}

const trendChartRef = ref(null);

const trendChartRef1 = ref(null);
const trendChartRef2 = ref(null);


let trendChart = null;
let trendChart1 = null;
let trendChart2 = null;


// 初始化趋势图表
const initTrendChart = () => {
    if (!trendChartRef.value) return;

    trendChart = echarts.init(trendChartRef.value);

    const option = {

        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        backgroundColor: 'rgba(33, 70, 126, 0.6)',
        textStyle: {
            color: '#DAE6FF'
        },
        grid: {
            top: '10%',
            right: '5%',
            bottom: '10%',
            left: '10%'
        },
        xAxis: [
            {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                axisLine: {
                    lineStyle: {
                        color: '#203D72'
                    }
                },
                axisLabel: {
                    color: '#DAE6FF'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#203D72'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#203D72'
                    }
                },
                axisLabel: {
                    color: '#DAE6FF'
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
                itemStyle: {
                    color: '#74B2FE'
                }
            },

        ]

    };

    trendChart.setOption(option);
};
const initTrendChart1 = () => {
    if (!trendChartRef1.value) return;

    trendChart1 = echarts.init(trendChartRef1.value);
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        grid: {
            top: '10%',
            right: '5%',
            bottom: '10%',
            left: '5%'
        },
        xAxis: [
            {
                type: 'category',
                data: ['立体仓库', '平置仓库', '堆场', '指挥中心'],
                axisLine: {
                    lineStyle: {
                        color: '#203D72'
                    }
                },
                axisLabel: {
                    color: '#76CBFB' // 修改下方文字颜色
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#1E89E4',
                        width: 2
                    }
                },
                splitNumber: 4 // 减少横线数量
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: '30%',
                data: [
                    2.0, 4.9, 7.0, 3.2,
                ],
                itemStyle: {
                    color: '#52FFFD'
                }
            }
        ]
    };

    trendChart1.setOption(option);
};
const initTrendChart2 = () => {
    if (!trendChartRef2.value) return;

    trendChart2 = echarts.init(trendChartRef2.value);

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        grid: {
            top: '10%',
            right: '5%',
            bottom: '10%',
            left: '5%'
        },
        xAxis: [
            {
                type: 'category',
                data: ['安防检测', '人员检测', '环境检测', '环境检测'],
                axisLine: {
                    lineStyle: {
                        color: '#203D72'
                    }
                },
                axisLabel: {
                    color: '#76CBFB' // 修改下方文字颜色
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#1E89E4',
                        width: 2
                    }
                },
                splitNumber: 4 // 减少横线数量
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: '30%',
                data: [
                    2.0, 4.9, 7.0, 3.2,
                ],
                itemStyle: {
                    color: '#0769DC'
                }
            }
        ]
    };

    trendChart2.setOption(option);
};
const showMenus = ref(false);
const menuRef = ref(null);

const isactive = ref('1')
const isactive1 = ref('1')
const isactive2 = ref('1')
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'gjjc') {
            // showMenus.value = true

        }

    }
})

const warnData = ref([
])

const toggleActive = (selected) => {
    isactive.value = selected
}
const toggleActive1 = (selected) => {
    isactive1.value = selected
}
const toggleActive2 = (selected) => {
    isactive2.value = selected
}


const chartDom1 = ref(null);
let myChart1 = null;


const initChart2 = () => {
    if (!chartDom1.value) return;

    myChart1 = echarts.init(chartDom1.value);

    const option = {
        tooltip: {
            trigger: 'item',
            confine: true,
            extraCssText: 'z-index: 10000;',
            formatter: (params) => {
                return `${params.marker}${params.name || '数值'}: ${formatNumber(params.value)}`;
            }
        },
        legend: {
            show: false
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
                        show: false
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: alertData.items[0].value, name: alertData.items[0].label,
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: alertData.items[1].value, name: alertData.items[1].label,
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: alertData.items[2].value, name: alertData.items[2].label,
                        itemStyle: {
                            color: '#16B4F0'
                        }
                    }
                ]
            }
        ]
    };

    myChart1.setOption(option);
}
const handleResize = () => {
    nextTick(() => {
        if (myChart1) myChart1.resize();
        if (trendChart) trendChart.resize();
        if (trendChart1) trendChart1.resize();
        if (trendChart2) trendChart2.resize();
    });
};

const fireData = reactive({
    total: 17,
    items: [
        { label: '在线设备', value: 10, unit: '个', color: 'blue', key: 'online' },
        { label: '离线设备', value: 1, unit: '个', color: 'yellow', key: 'offline' },
        { label: '离线设备', value: 6, unit: '个', color: 'yellow', key: 'offline' }
    ]
});

const statusClassMap = reactive({
    '紧急告警': 'status-urgent',
    '重要告警': 'status-important',
    '一般告警': 'status-normal'
})

const statusClassMaps = reactive({
    '1': 'status-urgent',
    '2': 'status-important',
    '3': 'status-normal'
})



const handleClickOutside = (event) => {
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};
// 生命周期
onMounted(() => {
    fetchSecurityAlarm();//告警等级
    queryWarnListPagination();
    queryWarnGroupCount();
    initChart2();
    initTrendChart();
    initTrendChart1();
    initTrendChart2();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
    document.addEventListener("click", handleClickOutside);

});

// 监听面板显隐状态，触发图表自适应重绘
watch(() => props.isPanelVisible, () => {
    // 延迟约 300ms，等待侧边栏过渡动画彻底结束后再刷新图表尺寸
    setTimeout(handleResize, 310);
});

onUnmounted(() => {
    if (myChart1) {
        myChart1.dispose();
        myChart1 = null;
    }
    if (trendChart) {
        trendChart.dispose();
    }
    if (trendChart1) {
        trendChart1.dispose();
    }
    if (trendChart2) {
        trendChart2.dispose();
    }

    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
    document.removeEventListener("click", handleClickOutside);
});


</script>