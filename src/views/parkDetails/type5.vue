<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data">
                    <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="设备类型" />
                    <el-table-column prop="countNums3" label="检测点位置" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="检测数值" />
                    <el-table-column prop="countNums5" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="countNams6" label="状态" width="60">
                        <template #default="scope">
                            <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                                {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="" label="告警等级">
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMap[scope.row.countNums7]]">
                                {{ scope.row.countNums7 }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="" label="告警信息" show-overflow-tooltip>
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMaps[scope.row.type]]">
                                {{ scope.row.countNums8 }}
                            </span>
                        </template>
                    </el-table-column>



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
                    <div class="echartp" ref="chartDom1"></div>

                    <div class="chart_sum">
                        <div class="chart_snumber">{{ fireData.total }}</div>
                    </div>
                </div>

            </div>


            <div class="txzyList">

                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao.png" alt="">
                        <div class="txzyimg_text">2</div>
                    </div>
                    <div class="txzy_text">一般告警</div>
                </div>



                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao2.png" alt="">
                        <div class="txzyimg_text green_label">10</div>
                    </div>
                    <div class="txzy_text">重要告警</div>
                </div>


                <div class="txzyList_box">
                    <div class="txzyimg">
                        <img src="@/assets/tubiao1.png" alt="">
                        <div class="txzyimg_text yellow_label">5</div>
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
    left: 35px;
    top: 36px;
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
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
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
            showMenus.value = true

        }

    }
})

var data = [
    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 2

    },
    {
        countNums1: "温度传感器#2",
        countNums2: "环境检测",
        countNums3: "室内2号检测点",
        countNums4: "75°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "1号检测点温度过高",
        type: 3

    },

    {
        countNums1: "PM2.5传感器#1",
        countNums2: "环境检测",
        countNums3: "室内3号检测点",
        countNums4: "116pg/m3",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "PM2.5传感器#2",
        countNums2: "环境检测",
        countNums3: "室内4号检测点",
        countNums4: "116pg/m3",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "PM10传感器#1",
        countNums2: "环境检测",
        countNums3: "室内5号检测点",
        countNums4: "35pg/m3",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "PM10传感器#2",
        countNums2: "环境检测",
        countNums3: "室内5号检测点",
        countNums4: "35pg/m3",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },






];

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
                    },
                    {
                        value: fireData.items[2].value, name: '',
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

    if (myChart1) {
        myChart1.resize();
    }
    if (trendChart) {
        trendChart.resize();
    }
    if (trendChart1) {
        trendChart1.resize();
    }
    if (trendChart2) {
        trendChart2.resize();
    }

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
    initChart2();
    initTrendChart();
    initTrendChart1();
    initTrendChart2();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
    document.addEventListener("click", handleClickOutside);

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