<template>
    <div>
        <div class="left">
            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">指标概况</div>
            </div>


            <div class="jcrwx">
                <div class="jcrwx_box_li" :class="{ active: changpd === 1 }" @click="changepdlist(1)">
                    <img :src="imageMap2[changpd === 1 ? 'active' : 'default']" alt="">
                    <div class="jcrwx_box_text">仓库作业</div>
                </div>

                <div class="jcrwx_box_li" :class="{ active: changpd === 2 }" @click="changepdlist(2)">
                    <img :src="imageMap2[changpd === 2 ? 'active' : 'default']" alt="">
                    <div class="jcrwx_box_text">入园任务</div>
                </div>
            </div>

            <div class="yySearch" style="margin: 0px 15px;">

                <div class="yySearch_left">
                    <div class="yylf_label yylf_color">统计周期</div>
                    <el-select size="small" v-model="value" placeholder="请选择" style="width: 105px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="yySearch_left" style="margin-left: 20px;">
                    <div class="yylf_label yylf_color">统计时间</div>
                    <el-date-picker style="width: 110px;" v-model="value1" type="date" placeholder="" size="small" />
                </div>

                <div class="yySearch_left">
                    <div class="yylf_search_box">查询</div>

                </div>
            </div>


            <div class="jcfx">
                <div class="jcfx_box">
                    <img src="@/assets/蓝牌.png" alt="">
                    <div class="jcfx_sum">
                        <div class="jcfx_texts1">0</div>
                        <!-- <div class="jcfx_texts2">单</div> -->
                    </div>
                    <div class="jcfx_text">安全交底单</div>
                </div>

                <div class="jcfx_box">
                    <img src="@/assets/黄牌.png" alt="">
                    <div class="jcfx_texts">0</div>
                    <div class="jcfx_text3">许可作业票</div>
                </div>


            </div>

            <div class="ckleft">
                <div class="ckleft_label">
                    <div class="ckleft_title">仓库作业总量</div>
                    <div class="ckleft_title ckleftwz"> 已完成仓库作业总量</div>
                </div>


                <div class="allBoxs">
                    <div class="allBoxs_left">
                        <div>
                            <div class="echartp" ref="chartDom1" style="width: 138px; height: 138px;">
                            </div>
                            <div class="chart_sum">
                                <div class="chart_snumber changeSize">0</div>
                            </div>
                        </div>
                        <div class="allBoxs_left_text">仓库作业总量</div>
                    </div>

                    <div class="ck_number">

                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">入库作业</div>
                                <div class="jcard__number">00%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">出库作业</div>
                                <div class="jcard__number">00%</div>
                            </div>
                        </div>

                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">入库作业</div>
                                <div class="jcard__number">00%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">出库作业</div>
                                <div class="jcard__number">00%</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">作业量趋势</div>
            </div>

            <div style="padding: 0px 20px;">
                <div ref="chartRef" style="width: 465px; height: 250px;"></div>
            </div>

        </div>
        <div class="right">

            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">告警管理</div>
            </div>

            <div class="gcrwx">
                <div class="gcrwx_box_li" :class="{ active: changpd1 === 1 }" @click="changepdlist1(1)">
                    <img :src="imageMap3[changpd1 === 1 ? 'active' : 'default']" alt="">
                    <div class="gcrwx_box_text">预约列表</div>
                </div>

                <div class="gcrwx_box_li" :class="{ active: changpd1 === 2 }" @click="changepdlist1(2)">
                    <img :src="imageMap3[changpd1 === 2 ? 'active' : 'default']" alt="">
                    <div class="gcrwx_box_text">安全交底</div>
                </div>
                <div class="gcrwx_box_li" :class="{ active: changpd1 === 3 }" @click="changepdlist1(3)">
                    <img :src="imageMap3[changpd1 === 3 ? 'active' : 'default']" alt="">
                    <div class="gcrwx_box_text" style="width: 60px;">作业票</div>
                </div>
            </div>



            <div class="yySearch">
                <el-input v-model="input3" style="width: 120px" size="small" placeholder="请输入名称"
                    :prefix-icon="Search" />
                <div class="yySearch_left">
                    <div class="yylf_label">业务类型</div>
                    <el-select size="small" v-model="value" placeholder="请选择" style="width: 82px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="yySearch_left">
                    <div class="yylf_label">当前状态</div>
                    <el-select size="small" v-model="value" placeholder="请选择" style="width: 82px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>


            <div class="yylf">

                <div class="yylf_left">
                    <div class="yylf_label">预约来访时间</div>
                    <el-date-picker style="width: 120px;" v-model="value1" type="date" placeholder="" size="small" />
                </div>
                <div class="yylf_search">
                    <div class="yylf_search_box">查询</div>
                    <div class="yylf_search_box">重置</div>
                </div>
            </div>

            <div class="gjboxs">
                <div class="gjbox">
                    <img src="@/assets/导出.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/叫号.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/过号.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/同步预约单.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/确认放行.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/同步签到记录.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/签到.png" alt="">
                </div>
                <div class="gjbox">
                    <img src="@/assets/离园.png" alt="">
                </div>
            </div>
            <div style="margin:10px 10px 0px 15px;">
                <el-table class="my-spacing-table" ref="tableRef" :data="data" height="500">
                    <el-table-column prop="countNums1" label="序号" width="40" />
                    <el-table-column prop="countNums11" label="预约号" width="70">
                        <template #default="scope">
                            <span class="status-normal"> {{ scope.row.countNums11 }}</span>

                        </template>
                    </el-table-column>

                    <el-table-column prop="countNums2" label="业务类型" width="70" />
                    <el-table-column prop="countNums3" label="姓名" width="60" />

                    <el-table-column prop="countNums5" label="车牌号" width="70">
                        <template #default="scope">
                            <span class="status-normal"> {{ scope.row.countNums5 }}</span>

                        </template>
                    </el-table-column>
                    <el-table-column prop="countNams6" label="装卸点" width="50">
                        <template #default="scope">
                            <span class="status-normal2"> {{ scope.row.countNums6 }}</span>


                        </template>
                    </el-table-column>
                    <el-table-column prop="countNums7" label="预约来访时间" show-overflow-tooltip />


                </el-table>


            </div>


        </div>

    </div>
</template>

<style scoped>
::v-deep(.el-select__placeholder) {
    color: #FBFBFB;
}

::v-deep(.el-select__wrapper) {
    background-color: #476B9A;
    box-shadow: 0 0 0 1px #409eff inset;
}

::v-deep(.el-input__wrapper) {
    height: 25px;
    background-color: #476B9A;
    box-shadow: 0 0 0 1px #409eff inset;
}

::v-deep(.el-input__icon) {
    color: #18A7DE;
}

::v-deep(.el-input__inner) {
    color: #FBFBFB;
}

.ckleft {
    margin: 10px 10px 0px 20px;
    background: url('@/assets/内框.png') no-repeat right top;
    background-size: 100% 100%;
    height: 300px;
}

.ckleft .ckleft_label {
    display: flex;
    padding: 20px 0px 0px 20px;
}

.ckleft .ckleft_title {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 23px;
    background: linear-gradient(0deg, #92CBFF 0%, #FAFAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.ckleft .ckleftwz {
    margin-left: 20px;
}

.allBoxs {
    padding: 16px 10px;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 15px;
    height: 100px;

}

.allBoxs .allBoxs_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.allBoxs_left .allBoxs_left_text {
    margin-top: 18px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 20px;
    color: #3BDCFF;

}

.allBoxs .echartp {
    width: 140px;
    height: 140px;
    border: 2px dashed #2DA9C0;
    border-radius: 50%;
}

.chart_sum {
    width: 85px;
    height: 85px;
    position: absolute;
    left: 28px;
    top: 28px;
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

}

.ck_number {
    display: flex;
    flex-direction: column;
    width: 230px;
}

.jcard_ckbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
}

.jcard_box {
    background: url('@/assets/图标10.png') no-repeat 0 0;
    background-size: 100% 100%;

    width: 82px;
    height: 72px;
    position: relative;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 15px;
    color: #4BDBFE;
    line-height: 125px;
    font-style: italic;


}

.jcard__unit {
    position: absolute;
    left: 15px;
    top: -55px;
}

.jcard__number {

    position: absolute;
    left: 25px;
    top: -35px;
    font-size: 17px;

}





.yySearch {
    display: flex;
    align-items: center;
    margin: 18px 20px;
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



.yylf {
    display: flex;
    justify-content: space-between;
    margin: 15px 20px 15px 20px;
}

.yylf_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.yylf .yylf_label {
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 14px;
    color: #FBFBFB;
    margin-right: 10px;

}

.yylf .yylf_search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
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
}

.status-normal {
    color: #51E4FF;
}

.status-normal2 {
    color: #E19168;
}

.gjboxs {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px 10px 20px;
}

.gjbox {
    width: 110px;
    height: 91px;
}

.gjbox img {
    width: 100%;
}

.gcrwx {
    display: flex;
    cursor: pointer;
    margin: 10px;
}

.gcrwx .gcrwx_box_li {
    position: relative;
    margin: 0px 10px;
}

.gcrwx .gcrwx_box_li img {
    width: 100%;
    height: 36px;
}

.gcrwx .gcrwx_box_li .gcrwx_box_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
    font-size: 18px;
    color: #C1E6FC;
}





.jcrwx {
    display: flex;
    cursor: pointer;
    margin: 5px 10px;
}

.jcrwx .jcrwx_box_li {
    position: relative;
}

.jcrwx .jcrwx_box_li img {
    width: 100%;
    height: 50px;
}

.jcrwx .jcrwx_box_li .jcrwx_box_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
    font-size: 18px;
    color: #C1E6FC;
}

.title_txet {
    font-size: 20px;
    top: 5px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* 标准属性 */
    background-clip: text;
    color: transparent;

}

.jcfx {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

}

.jcfx .jcfx_box {
    width: 130px;
    height: 154px;
    margin: 0px 25px;
    position: relative;
}

.jcfx .jcfx_box img {
    width: 100%;
}

.jcfx .jcfx_box .jcfx_text {

    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    position: absolute;
    bottom: 20px;
    left: 20px;

}

.jcfx .jcfx_box .jcfx_text3 {

    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    position: absolute;
    bottom: 20px;
    left: 30px;


}

.jcfx_sum {
    display: flex;
    position: absolute;
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

}

.jcfx_sum .jcfx_texts1 {

    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 25px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #2E86FC 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* 标准属性 */
    background-clip: text;
    color: transparent;



}

.jcfx_sum .jcfx_texts2 {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 14px;
    color: #429AEB;
}

.jcfx_texts {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 27px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #F8AE49 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* 标准属性 */
    background-clip: text;
    color: transparent;


    position: absolute;
    /* bottom: 55px;
    left: 38px; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

}

.yylf_color {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #04E9E9 !important;

}
</style>


<script setup>
import jcrw from '@/assets/jcrw.png'
import njcrw from '@/assets/njcrw.png'

import gjrw from '@/assets/gjrw.png'
import ngjrw from '@/assets/ngjrw.png'
import { Search } from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, computed, onBeforeUnmount } from 'vue';

const chartRef = ref(null);
let myChart = null;

const initChart = () => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);

        const option = {
            textStyle: {
                fontFamily: 'Adobe Heiti Std',
                fontWeight: 'normal',
                fontSize: 11,
                color: '#FBFBFB'
            },
            xAxis: {
                type: 'category',
                data: ['2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10', '2025-04-11'],
                axisLine: {
                    lineStyle: {
                        color: '#244D7B'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#244D7B'
                    }
                },
                axisLabel: {
                    color: '#FBFBFB'
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#244D7B'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#244D7B'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#244D7B',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color: '#FBFBFB'
                }
            },
            series: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0],
                    type: 'line',
                    lineStyle: {
                        color: '#06A7E5'
                    },
                    itemStyle: {
                        color: '#F9D33A'
                    }
                }
            ]
        };

        myChart.setOption(option);

    }

}



//消防检测
const chartDom1 = ref(null)
let myChart1 = null


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
                    borderWidth: 5, // 间隙宽度 - 调整这个值改变间隙大小
                    borderColor: 'transparent' // 透明间隙
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
                        value: 735, name: '',
                        itemStyle: {
                            color: '#42FFF9' // 第一个扇区的颜色
                        }
                    },
                    {
                        value: 1048, name: '',
                        itemStyle: {
                            color: '#F0B716' // 第二个扇区的颜色
                        }
                    }
                ]
            }
        ]
    };

    myChart1.setOption(option);
}

const handleResize = () => {
    if (myChart) {
        myChart.resize();
    }
    if (myChart1) {
        myChart1.resize();
    }

};

onMounted(() => {
    initChart();
    initChart2();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);

});

onUnmounted(() => {
    if (myChart) {
        myChart.dispose();
    }
    if (myChart1) {
        myChart1.dispose();
    }
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});

const changpd = ref(1)
const changepdlist = (id) => {
    changpd.value = id;
};

const imageMap2 = {
    active: njcrw,
    default: jcrw
};


const imageMap3 = {
    active: ngjrw,
    default: gjrw
};

const changpd1 = ref(1)
const changepdlist1 = (id) => {
    changpd1.value = id;
};

const value1 = ref('')
const value = ref('')
const options = [
    {
        value: 'Option1',
        label: '按天统计',
    },
    {
        value: 'Option2',
        label: '按月统计',
    },
    {
        value: 'Option3',
        label: '按年统计',
    },

]




var data = [
    {
        countNums1: "1",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "李强",
        countNums5: "粤A123Y45",
        countNums6: "1",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "2",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "3",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "4",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "5",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "6",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "7",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "8",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "9",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "10",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "11",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },
    {
        countNums1: "12",
        countNums11: "RYY080020",
        countNums2: "供应商送货",
        countNums3: "叶润林",
        countNums5: "粤A123Y45",
        countNums6: "4",
        countNums7: "2025-04-06 08:30:00",


    },

];


</script>