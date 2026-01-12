<template>
    <div>
        <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">指标概况</div>
            </div>

            <div class="jcrwx">
                <div class="jcrwx_box_li" :class="{ active: activeTab === 1 }" @click="switchTab(1)">
                    <img :src="imageMap2[activeTab === 1 ? 'active' : 'default']" alt="">
                    <div class="jcrwx_box_text">仓库作业</div>
                </div>

                <div class="jcrwx_box_li" :class="{ active: activeTab === 2 }" @click="switchTab(2)">
                    <img :src="imageMap2[activeTab === 2 ? 'active' : 'default']" alt="">
                    <div class="jcrwx_box_text">入园任务</div>
                </div>
            </div>

            <div class="yySearch setyySearch">
                <div class="yySearch_left changeyySearch_left">
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

            <div class="jcfx">
                <div class="jcfx_box">
                    <img src="@/assets/蓝牌.png" alt="">
                    <div class="jcfx_sum">
                        <div class="jcfx_texts1">{{ overviewData.safetyBriefings }}</div>
                    </div>
                    <div class="jcfx_text">安全交底单</div>
                </div>

                <div class="jcfx_box">
                    <img src="@/assets/黄牌.png" alt="">
                    <div class="jcfx_texts">{{ overviewData.workPermits }}</div>
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
                            <div class="echartp changechart" ref="warehouseChartRef"></div>
                            <div class="chart_sum">
                                <div class="chart_snumber changeSize">{{ warehouseData.completionRate }}</div>
                            </div>
                        </div>
                        <div class="allBoxs_left_text">仓库作业总量</div>
                    </div>

                    <div class="ck_number">
                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">入库作业</div>
                                <div class="jcard__number">{{ warehouseData.inboundRate }}%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">出库作业</div>
                                <div class="jcard__number">{{ warehouseData.outboundRate }}%</div>
                            </div>
                        </div>

                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">入库作业</div>
                                <div class="jcard__number">{{ warehouseData.inboundCompleted }}%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">出库作业</div>
                                <div class="jcard__number">{{ warehouseData.outboundCompleted }}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">作业量趋势</div>
            </div>

            <div style="" class="chartpadding">
                <div ref="trendChartRef" class="changelistChart"></div>
            </div>
        </div>

        <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">作业信息</div>
            </div>

            <div class="gcrwx">
                <div class="gcrwx_box_li" :class="{ active: activeAlertTab === 1 }" @click="switchAlertTab(1)">
                    <img :src="imageMap3[activeAlertTab === 1 ? 'active' : 'default']" alt="">
                    <div class="gcrwx_box_text">预约列表</div>
                </div>
                <div class="gcrwx_box_li" :class="{ active: activeAlertTab === 3 }" @click="switchAlertTab(3)">
                    <img :src="imageMap3[activeAlertTab === 3 ? 'active' : 'default']" alt="">
                    <div class="gcrwx_box_text gcrwx_zy">作业票</div>
                </div>
            </div>

            <div class="yySearch">
                <el-input v-model="alertFilterParams.keyword" size="small" placeholder="请输入名称" :prefix-icon="Search" />
                <div class="yySearch_left">
                    <div class="yylf_label">业务类型</div>
                    <el-select size="small" class="yewuwidth" v-model="alertFilterParams.businessType"
                        placeholder="请选择">
                        <el-option v-for="item in businessTypeOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <div class="yySearch_left">
                    <div class="yylf_label">当前状态</div>
                    <el-select size="small" class="yewuwidth" v-model="alertFilterParams.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>

            <div class="yylf">
                <div class="yylf_left">
                    <div class="yylf_label">预约来访时间</div>
                    <el-date-picker v-model="alertFilterParams.visitDate" type="date" placeholder="" size="small" />
                </div>
                <div class="yylf_search">
                    <div class="yylf_search_box" @click="handleAlertSearch">查询</div>
                    <div class="yylf_search_box" @click="handleAlertReset">重置</div>
                </div>
            </div>
            <div class="change_table">
                <el-table class="my-spacing-table" ref="tableRef" :data="tableData">
                    <el-table-column prop="index" label="序号" width="40" />
                    <el-table-column prop="reservationNo" label="预约号" width="100" show-overflow-tooltip>
                        <template #default="scope">
                            <span class="status-normal">{{ scope.row.reservationNo }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="businessType" label="业务类型" width="100" show-overflow-tooltip />
                    <el-table-column prop="name" label="姓名" width="60" />
                    <el-table-column prop="licensePlate" label="车牌号" width="100" show-overflow-tooltip>
                        <template #default="scope">
                            <span class="status-normal">{{ scope.row.licensePlate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loadingPoint" label="装卸点" width="60">
                        <template #default="scope">
                            <span class="status-normal2">{{ scope.row.loadingPoint }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="visitTime" label="预约来访时间" width="120" show-overflow-tooltip />
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import * as echarts from 'echarts';

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})


// 图片资源
import jcrw from '@/assets/jcrw.png';
import njcrw from '@/assets/njcrw.png';
import gjrw from '@/assets/gjrw.png';
import ngjrw from '@/assets/ngjrw.png';
// import exportIcon from '@/assets/导出.png';
// import callIcon from '@/assets/叫号.png';
// import skipIcon from '@/assets/过号.png';
// import syncReservationIcon from '@/assets/同步预约单.png';
// import confirmIcon from '@/assets/确认放行.png';
// import syncRecordIcon from '@/assets/同步签到记录.png';
// import signInIcon from '@/assets/签到.png';
// import leaveIcon from '@/assets/离园.png';

// 图表引用
const trendChartRef = ref(null);
const warehouseChartRef = ref(null);
let trendChart = null;
let warehouseChart = null;

// 响应式数据
const activeTab = ref(1);
const activeAlertTab = ref(1);

// 筛选参数
const filterParams = reactive({
    period: '',
    date: ''
});

const alertFilterParams = reactive({
    keyword: '',
    businessType: '',
    status: '',
    visitDate: ''
});

// 数据选项
const periodOptions = [
    { value: 'day', label: '按天统计' },
    { value: 'month', label: '按月统计' },
    { value: 'year', label: '按年统计' }
];

const businessTypeOptions = [
    { value: 'delivery', label: '供应商送货' },
    { value: 'pickup', label: '客户提货' }
];

const statusOptions = [
    { value: 'pending', label: '待处理' },
    { value: 'processing', label: '处理中' },
    { value: 'completed', label: '已完成' }
];

// 操作按钮
const actionButtons = [
    //     { type: 'export', label: '导出', icon: exportIcon },
    //     { type: 'call', label: '叫号', icon: callIcon },
    //     { type: 'skip', label: '过号', icon: skipIcon },
    //     { type: 'syncReservation', label: '同步预约单', icon: syncReservationIcon },
    //     { type: 'confirm', label: '确认放行', icon: confirmIcon },
    //     { type: 'syncRecord', label: '同步签到记录', icon: syncRecordIcon },
    //     { type: 'signIn', label: '签到', icon: signInIcon },
    //     { type: 'leave', label: '离园', icon: leaveIcon }
];

// 图片映射
const imageMap2 = {
    active: njcrw,
    default: jcrw
};

const imageMap3 = {
    active: ngjrw,
    default: gjrw
};

// 模拟数据 - 实际项目中从接口获取
const overviewData = reactive({
    safetyBriefings: 0,
    workPermits: 0
});

const warehouseData = reactive({
    completionRate: 0,
    inboundRate: 0,
    outboundRate: 0,
    inboundCompleted: 0,
    outboundCompleted: 0
});

const tableData = reactive([]);

// 初始化数据
const initData = () => {
    // 模拟从接口获取数据
    Object.assign(overviewData, {
        safetyBriefings: 5,
        workPermits: 3
    });

    Object.assign(warehouseData, {
        completionRate: 85,
        inboundRate: 45,
        outboundRate: 40,
        inboundCompleted: 90,
        outboundCompleted: 80
    });

    // 表格数据
    tableData.splice(0, tableData.length, ...generateTableData());
};

// 生成表格数据
const generateTableData = () => {
    return Array.from({ length: 20 }, (_, index) => ({
        index: index + 1,
        reservationNo: `RYY0800${(index + 20).toString().padStart(2, '0')}`,
        businessType: '供应商送货',
        name: index % 2 === 0 ? '李强' : '叶润林',
        licensePlate: `粤A123Y${(45 + index).toString().padStart(2, '0')}`,
        loadingPoint: (index % 4) + 1,
        visitTime: `2025-04-06 08:${30 + index}`
    }));
};

// 初始化趋势图表
const initTrendChart = () => {
    if (!trendChartRef.value) return;

    trendChart = echarts.init(trendChartRef.value);

    const option = {
        textStyle: {
            fontFamily: 'Adobe Heiti Std',
            fontWeight: 'normal',
            fontSize: 11,
            color: '#FBFBFB'
        },
        grid: {
            left: '0%',
            right: '5%',
            bottom: '5%',
            top: '10%',
            containLabel: true
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
                data: [120, 132, 101, 134, 90, 230],
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

    trendChart.setOption(option);
};

// 初始化仓库作业图表
const initWarehouseChart = () => {
    if (!warehouseChartRef.value) return;

    warehouseChart = echarts.init(warehouseChartRef.value);

    const option = {
        tooltip: {
            trigger: 'item'
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
                        value: warehouseData.inboundCompleted,
                        name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: warehouseData.outboundCompleted,
                        name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    }
                ]
            }
        ]
    };

    warehouseChart.setOption(option);
};

// 事件处理函数
const switchTab = (tabId) => {
    activeTab.value = tabId;
    // 这里可以添加切换tab时的数据加载逻辑
    loadTabData(tabId);
};

const switchAlertTab = (tabId) => {
    activeAlertTab.value = tabId;
    // 这里可以添加切换告警tab时的数据加载逻辑
    loadAlertTabData(tabId);
};

const handleSearch = () => {
    // 处理查询逻辑
    console.log('查询参数:', filterParams);
    // 调用接口获取数据
    loadData();
};

const handleAlertSearch = () => {
    // 处理告警查询逻辑
    console.log('告警查询参数:', alertFilterParams);
    // 调用接口获取数据
    loadAlertData();
};

const handleAlertReset = () => {
    // 重置告警筛选条件
    Object.assign(alertFilterParams, {
        keyword: '',
        businessType: '',
        status: '',
        visitDate: ''
    });
    // 重新加载数据
    loadAlertData();
};

const handleAction = (actionType) => {
    // 处理操作按钮点击
    console.log('执行操作:', actionType);
    // 根据actionType执行相应的业务逻辑
};

// 数据加载函数
const loadTabData = (tabId) => {
    // 根据tabId加载对应的数据
    console.log('加载tab数据:', tabId);
};

const loadAlertTabData = (tabId) => {
    // 根据告警tabId加载对应的数据
    console.log('加载告警tab数据:', tabId);
};

const loadData = () => {
    // 加载主要数据
    initData();
    initTrendChart();
    initWarehouseChart();
};

const loadAlertData = () => {
    // 加载告警数据
    console.log('加载告警数据');
};

// 响应式调整
const handleResize = () => {
    if (trendChart) {
        trendChart.resize();
    }
    if (warehouseChart) {
        warehouseChart.resize();
    }
};

// 生命周期
onMounted(() => {
    initData();
    initTrendChart();
    initWarehouseChart();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
});

onUnmounted(() => {
    if (trendChart) {
        trendChart.dispose();
    }
    if (warehouseChart) {
        warehouseChart.dispose();
    }
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});
</script>

<style scoped>
::v-deep(.el-input) {
    width: 120px !important;
}

::v-deep(.el-select--small) {
    width: 115px;
}

::v-deep(.el-date-editor.el-input,
    .el-date-editor.el-input__wrapper) {
    width: 115px;
}

::v-deep(.yewuwidth.el-select--small) {
    width: 88px !important;
}

::v-deep(.yewuwidth.el-date-editor.el-input,
    .yewuwidth.el-date-editor.el-input__wrapper) {
    width: 88px !important;
}




.chartpadding {
    padding: 0px 20px;

}

.change_table {
    margin: 10px 10px 0px 10px;
}

.changelistChart {
    width: 465px;
    height: 260px;

}

.my-spacing-table {
    height: calc(100vh - 355px);
}

.changechart {
    width: 138px;
    height: 138px;
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
    font-weight: bold;
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
    margin-right: 10px;
    margin-top: 10px;
}

.setyySearch {
    margin: 0px 15px;

}

.yySearch_left {
    display: flex;
    align-items: center;
    margin-left: 5px;
}

.changeyySearch_left {
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
    cursor: pointer;
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
    cursor: pointer;
}

.gjbox img {
    width: 100%;
}

.gcrwx {
    display: flex;
    cursor: pointer;
    margin: 10px 10px;
    margin-bottom: 5px;
}

.gcrwx .gcrwx_box_li {
    position: relative;
    margin: 0px 10px;
}

.gcrwx .gcrwx_box_li img {
    width: 100%;
    height: 36px;
}

.gcrwx .gcrwx_zy {
    width: 62px !important;

}

.gcrwx .gcrwx_box_li .gcrwx_box_text {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -48%);
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
    transform: translate(-48%, -54%);
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
    left: 20px;
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
    background-clip: text;
    color: transparent;
    position: absolute;
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