<template>


    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">仓库吞吐量</div>
        </div>

        <div class="jcry">
            <div v-for="stat in personnelData.stats" :key="stat.label" class="jcry_box">
                <div class="jcry_box_lalel">{{ stat.label }}</div>
                <div class="jcry_box_num">{{ stat.value }} <div class="jcry_box_nums">万元</div>
                </div>
            </div>
        </div>

        <div style="" class="changetrendChartRef">
            <div ref="trendChartRef" class="changechart"></div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">储备物资周转率</div>
        </div>

        <div style="display: flex;justify-content: flex-end ">
            <div class="xbts">
                <img src="@/assets/小标题内.png" />
                <div class="xbt_texts">物资周转率TOP5</div>
            </div>

        </div>

        <div class="ck_list">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">99
                    </div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text wzwidth">储备物资周转率</div>
            </div>
            <div class="jcfr_box">
                <div v-for="data in personnelData3.stats" :key="data.key">
                    <div class="jcfr_label">
                        <div>{{ data.label }}</div>
                        <div>{{ data.value }}</div>
                    </div>

                </div>

            </div>

        </div>



        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">平均库存下降率</div>
        </div>

        <div style="display: flex;justify-content: flex-end ">
            <div class="xbts">
                <img src="@/assets/小标题内.png" />
                <div class="xbt_texts">平均库存下降率TO5</div>
            </div>

        </div>

        <div class="ck_list">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">99
                    </div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text wzwidth">平均库存下降率</div>
            </div>
            <div class="jcfr_box">
                <div v-for="data in personnelData3.stats" :key="data.key">
                    <div class="jcfr_label">
                        <div>{{ data.label }}</div>
                        <div>{{ data.value }}</div>
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">生产效率</div>
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

        <div style="display: flex;justify-content: flex-end ">
            <div class="xbts">
                <img src="@/assets/小标题内.png" />
                <div class="xbt_texts">安全库存预警TOP5</div>
            </div>

        </div>

        <div class="ck_list">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">22
                    </div>
                    <div class="jcfx_texts2">类</div>
                </div>
                <div class="jcfx_text">预警物资数量</div>
            </div>
            <div class="jcfr_box">
                <div v-for="data in personnelData3.stats" :key="data.key">
                    <div class="jcfr_label">
                        <div>{{ data.label }}</div>
                        <div>{{ data.value }}</div>
                    </div>

                </div>

            </div>

        </div>


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">仓库呆滞率</div>
        </div>

        <div style="display: flex;justify-content: flex-end ">
            <div class="xbts">
                <img src="@/assets/小标题内.png" />
                <div class="xbt_texts">物资呆滞率TOP5</div>
            </div>

        </div>

        <div class="ck_list">
            <div class="jcfx_box">
                <img src="@/assets/蓝牌.png" alt="">
                <div class="jcfx_sum">
                    <div class="jcfx_texts1">99
                    </div>
                    <div class="jcfx_texts2">%</div>
                </div>
                <div class="jcfx_text" style="width: 50px;">呆滞率</div>
            </div>
            <div class="jcfr_box">
                <div v-for="data in personnelData3.stats" :key="data.key">
                    <div class="jcfr_label">
                        <div>{{ data.label }}</div>
                        <div>{{ data.value }}</div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
const trendChartRef = ref(null);

let trendChart = null;

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
                name: '水耗',
                type: 'bar',
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
                itemStyle: {
                    color: '#74B2FE'
                }
            },
            {
                name: '电耗',
                type: 'bar',
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 0
                ],
                itemStyle: {
                    color: '#ABFFFF'
                }
            }
        ]

    };

    trendChart.setOption(option);
};
const personnelData = reactive({
    current: 0,
    stats: [
        { label: '库存金额', value: 0, key: 'todayTotal' },
        { label: '平均库存金额', value: 0, key: 'todayTasks' },

    ]
});


const personnelData1 = reactive({
    current: 0,
    stats: [
        { label: '入库金额', value: 3201, key: 'todayTotal', unit: "万元" },
        { label: '入库平均时长', value: 2, key: 'todayTasks1', unit: "小时" },
        { label: '出库金额', value: 1390, key: 'todayTasks2', unit: "万元" },
        { label: '出库平均时长', value: 3.5, key: 'todayTasks3', unit: "小时" },
        { label: '配送金额', value: 456, key: 'todayTasks4', unit: "万元" },
        { label: '万元物资配送成本', value: 2.8, key: 'todayTasks5', unit: "元" },

    ]
});

const personnelData3 = reactive({
    current: 0,
    stats: [
        { label: 'xx物资1', value: '95%', key: 'todayTotal', unit: "万元" },
        { label: 'xx物资2', value: '93%', key: 'todayTasks1', unit: "小时" },
        { label: 'xx物资3', value: '92%', key: 'todayTasks2', unit: "万元" },
        { label: 'xx物资4', value: '91%', key: 'todayTasks3', unit: "小时" },
        { label: 'xx物资5', value: '90%', key: 'todayTasks4', unit: "万元" },

    ]
});
// 响应式调整
const handleResize = () => {
    if (trendChart) {
        trendChart.resize();
    }

};

onMounted(() => {
    initTrendChart();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
})

onUnmounted(() => {
    if (trendChart) {
        trendChart.dispose();
    }
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});



</script>

<style scoped>
.changechart {
    width: 400px;
    height: 285px;

}


.jcfr_label {
    display: flex;
    justify-content: space-between;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    border-bottom: 1px solid #1580D2;
    padding: 3px 20px;
}

.jcfr_box {
    width: 265px;
    display: flex;
    flex-direction: column;
}

.xbts {
    width: 100%;
    position: relative;

}

.xbts img {
    width: 320px;
    height: 38px;
    margin-left: 150px;

}

.xbt_texts {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-0%, -50%);
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
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

.ck_list {
    margin: 0px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
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

.jcry {

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    margin-bottom: 5px;
    margin: 18px 35px;
}

.jcry .jcry_box {
    background: url('@/assets/组1449.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 172px;
    height: 83px;
    position: relative;
}

.jcry .jcry_box .jcry_box_lalel {
    position: absolute;
    left: 45px;
    top: 7px;
    font-size: 18px;
    color: #F4F5F7;
}

.jcry .jcry_box .jcry_box_num {
    position: absolute;
    left: 55px;
    bottom: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 30px;
    gap: 2px;
    color: #E8FEFF;
    background: linear-gradient(0deg, #54D7F8 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    background-clip: text;
    color: transparent;
    display: flex;
    align-items: baseline;
}

.jcry .jcry_box .jcry_box_nums {

    font-size: 15px;
}

.wzwidth {
    width: 125px !important;
}

.changetrendChartRef {
    padding: 0px 35px;

}
</style>