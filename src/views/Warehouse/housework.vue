<template>
    <div>
        <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">指标概况</div>
            </div>


            <div class="changeTimeTypes">
                <div class="custom-segmented-control">
                    <div class="control-item" :class="{ 'active': timeType1 === 1 }" @click="timeType1 = 1">月</div>
                    <div class="control-item" :class="{ 'active': timeType1 === 2 }" @click="timeType1 = 2">季</div>
                    <div class="control-item" :class="{ 'active': timeType1 === 3 }" @click="timeType1 = 3">年</div>
                </div>
            </div>

            <div class="jcfx">
                <div class="jcfx_box">
                    <img src="@/assets/blue-plate.png" alt="">
                    <div class="jcfx_sum">
                        <div class="jcfx_texts1">{{ overviewData.safetyBriefings }}</div>
                    </div>
                    <div class="jcfx_text">安全交底单</div>
                </div>

                <div class="jcfx_box">
                    <img src="@/assets/yellow-plate.png" alt="">
                    <div class="jcfx_texts">{{ overviewData.workPermits }}</div>
                    <div class="jcfx_text3">许可作业票</div>
                </div>
            </div>

            <div class="ckleft">
                <div class="ckleft_label">
                    <div class="ckleft_title" :class="{ 'active_title': activeWorkType === 1 }"
                        @click="switchWorkType(1)">运行中仓库作业总数</div>
                    <div class="ckleft_title ckleftwz" :class="{ 'active_title': activeWorkType === 2 }"
                        @click="switchWorkType(2)"> 完成仓库作业总数</div>
                </div>

                <div class="allBoxs">
                    <div class="allBoxs_left">
                        <div class="echartp changechart">
                            <div class="echart_pwidth" ref="warehouseChartRef"></div>
                            <div class="chart_sum">
                                <div class="chart_snumber changeSize" v-if="activeWorkType === 1">{{
                                    warehouseData.AB11 }}</div>
                                <div class="chart_snumber changeSize" v-if="activeWorkType === 2">{{
                                    warehouseData.AB12 }}</div>
                            </div>
                        </div>
                        <div class="allBoxs_left_text">{{ activeWorkType === 1 ? '仓库作业总数' : '仓库作业总数' }}</div>
                    </div>

                    <div class="ck_number" v-if="activeWorkType === 1">
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
                                <div class="jcard__unit">移库作业</div>
                                <div class="jcard__number">{{ warehouseData.inboundCompleted }}%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">盘库作业</div>
                                <div class="jcard__number">{{ warehouseData.outboundCompleted }}%</div>
                            </div>
                        </div>
                    </div>

                    <div class="ck_number" v-if="activeWorkType === 2">
                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">入库作业</div>
                                <div class="jcard__number">{{ warehouseData.inboundRate1 }}%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">出库作业</div>
                                <div class="jcard__number">{{ warehouseData.outboundRate1 }}%</div>
                            </div>
                        </div>

                        <div class="jcard_ckbox">
                            <div class="jcard_box">
                                <div class="jcard__unit">移库作业</div>
                                <div class="jcard__number">{{ warehouseData.inboundCompleted1 }}%</div>
                            </div>
                            <div class="jcard_box">
                                <div class="jcard__unit">盘库作业</div>
                                <div class="jcard__number">{{ warehouseData.outboundCompleted1 }}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">作业量趋势</div>
            </div>

            <div class="chartpadding">
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
                <el-input v-model="alertFilterParams.visitor" size="small" placeholder="请输入姓名" :prefix-icon="Search"
                    clearable @clear="handleAlertSearch" @keyup.enter="handleAlertSearch" />
                <template v-if="activeAlertTab === 1">
                    <div class="yySearch_left">
                        <div class="yylf_label">业务类型</div>
                        <el-select size="small" class="yewuwidth" v-model="alertFilterParams.businessType"
                            placeholder="请选择" @change="handleAlertSearch" clearable @clear="handleAlertSearch">
                            <el-option v-for="item in businessTypeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="yySearch_left">
                        <div class="yylf_label">当前状态</div>
                        <el-select size="small" class="yewuwidth" v-model="alertFilterParams.status" placeholder="请选择"
                            @change="handleAlertSearch" clearable @clear="handleAlertSearch">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </template>
                <template v-else-if="activeAlertTab === 3">
                    <div class="yySearch_left">
                        <div class="yylf_label">作业票类型</div>
                        <el-select size="small" class="yewuwidth" v-model="alertFilterParams.ticketType"
                            placeholder="请选择" @change="handleAlertSearch" clearable @clear="handleAlertSearch">
                            <el-option v-for="item in ticketTypeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="yySearch_left">
                        <div class="yylf_label">是否提交</div>
                        <el-select size="small" class="yewuwidth" v-model="alertFilterParams.isSubmit" placeholder="请选择"
                            @change="handleAlertSearch" clearable @clear="handleAlertSearch">
                            <el-option v-for="item in isSubmitOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </template>
            </div>

            <div class="yylf">
                <div class="yylf_left">
                    <div class="yylf_label">{{ activeAlertTab === 1 ? '预约开始时间' : '计划开始时间' }}</div>
                    <el-date-picker v-model="alertFilterParams.visitDate" type="date" placeholder="" size="small"
                        @change="handleAlertSearch" clearable @clear="handleAlertSearch" />
                </div>
                <div class="yylf_search">
                    <div class="yylf_search_box" @click="handleAlertSearch">查询</div>
                    <div class="yylf_search_box" @click="handleAlertReset">重置</div>
                </div>
            </div>
            <div class="change_table">
                <transition name="fade" mode="out-in">
                    <el-table class="my-spacing-table" ref="tableRef" :data="tableData" v-if="activeAlertTab === 1"
                        v-loading="loading">
                        <el-table-column prop="index" label="序号" width="60" />
                        <el-table-column prop="reservationCode" label="预约号" width="100" show-overflow-tooltip>
                            <template #default="scope">
                                <span class="status-normal">{{ scope.row.reservationCode }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="billType" label="业务类型" width="100" show-overflow-tooltip />
                        <el-table-column prop="visitor" label="姓名" width="60" />
                        <el-table-column prop="carNumber" label="车牌号" width="100" show-overflow-tooltip>
                            <template #default="scope">
                                <span class="status-normal">{{ scope.row.carNumber }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="装卸点" width="60">
                            <template #default="scope">
                                <span class="status-normal2">{{ scope.row.address }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startVisitDate" label="预约开始时间" width="120" show-overflow-tooltip />
                    </el-table>

                    <el-table class="my-spacing-table" ref="tableRef" :data="tableData" v-else-if="activeAlertTab === 3"
                        v-loading="loading">
                        <el-table-column prop="index" label="序号" width="50" />
                        <el-table-column prop="arrangementCode" label="作业票编码" width="120" show-overflow-tooltip />
                        <el-table-column prop="visitor" label="来访人" width="70" />
                        <el-table-column prop="guardian" label="工作负责人" width="85"  show-overflow-tooltip />
                        <el-table-column prop="ticketType" label="作业票类型" width="85" />
                        <el-table-column prop="teams" label="单位和班组" width="100" show-overflow-tooltip />
                        <el-table-column prop="arriveTime" label="入园时间" width="100" show-overflow-tooltip />
                        <el-table-column prop="startWorkPlanDate" label="计划开始时间" width="110" show-overflow-tooltip />
                        <el-table-column prop="endWorkPlanDate" label="计划结束时间" width="110" show-overflow-tooltip />
                        <el-table-column prop="billType" label="业务类型" width="80" show-overflow-tooltip />
                        <el-table-column prop="isSubmit" label="当前状态" width="80" />
                    </el-table>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import {
    queryWarehouseJobNum,
    queryParkReservationListPaginations,
    queryWarWorkArrangementListPagination

} from "@/api/user";


// const warehouseCode = '0318080022';
// const warehouseId = '';
const warehouseCode   = "03180800KS"
const warehouseId= "aebf01bd6fae4f63a1d2bbb4c8208e0c"

const timeType1 = ref(1);
const loading = ref(false);

const queryParkReservationListPaginationsParams = () => {
    loading.value = true;
    queryParkReservationListPaginations({
        visitor: alertFilterParams.visitor,
        sendType: alertFilterParams.status, // 当前状态
        billType: alertFilterParams.businessType, // 业务类型
        pageNo: 1,
        pageSize: 999,
        warehouseCode,
        warehouseId
    }).then(res => {
        if (res && res.code == 0 && res.data) {
            // 格式化数据：时间戳转换和业务类型转换
            const typeMap = {};
            businessTypeOptions.forEach(opt => {
                typeMap[opt.value] = opt.label;
            });

            tableData.value = (res.data.list || []).map((item, index) => {
                return {
                    ...item,
                    index: index + 1,
                    startVisitDate: item.startVisitDate ? formatDate(item.startVisitDate) : '',
                    billType: typeMap[item.billType] || item.billType
                };
            });
        }
    }).finally(() => {
        loading.value = false;
    });
};

const queryWarWorkArrangementListPaginationsParams = () => {
    loading.value = true;
    queryWarWorkArrangementListPagination({
        visitor: alertFilterParams.visitor,
        isSubmit: alertFilterParams.isSubmit,
        ticketType: alertFilterParams.ticketType,
        pageNo: 1,
        pageSize: 99,
        warehouseCode,
        warehouseId
    }).then(res => {
        if (res && res.code == 0 && res.data) {
            const ticketMap = {};
            ticketTypeOptions.forEach(opt => { ticketMap[opt.value] = opt.label; });
            const submitMap = {};
            isSubmitOptions.forEach(opt => { submitMap[opt.value] = opt.label; });
            const bizMap = {};
            businessTypeOptions.forEach(opt => { bizMap[opt.value] = opt.label; });

            tableData.value = (res.data.list || []).map((item, index) => {
                return {
                    ...item,
                    index: index + 1,
                    ticketType: ticketMap[item.ticketType] || item.ticketType,
                    isSubmit: submitMap[item.isSubmit] || item.isSubmit,
                    billType: bizMap[item.billType] || item.billType,
                    arriveTime: item.arriveTime ? formatDate(item.arriveTime) : '',
                    startWorkPlanDate: item.startWorkPlanDate ? formatDate(item.startWorkPlanDate) : '',
                    endWorkPlanDate: item.endWorkPlanDate ? formatDate(item.endWorkPlanDate) : ''
                };
            });
        }
    }).finally(() => {
        loading.value = false;
    });
};

// 辅助函数：格式化时间戳
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const queryWarehouseStatusPaginations = () => {
    queryWarehouseJobNum({ timeType: timeType1.value, warehouseCode,warehouseId }).then(res => {
        if (res && res.code == 0 && res.data) {
            overviewData.safetyBriefings = res.data.E10 || 0;
            overviewData.workPermits = res.data.AB01 || 0;

            // 映射仓库作业数据
            warehouseData.AB12 = res.data.AB12 || 0;
            warehouseData.AB11 = res.data.AB11 || 0;

            if (res.data.warehouse_job_code) {
                const running = res.data.warehouse_job_code.running || [];
                const completed = res.data.warehouse_job_code.completed || [];

                running.forEach(item => {
                    if (item.code === 'AB03') warehouseData.inboundRate = item.rate;
                    if (item.code === 'AB04') warehouseData.outboundRate = item.rate;
                    if (item.code === 'AB05') warehouseData.inboundCompleted = item.rate;
                    if (item.code === 'AB06') warehouseData.outboundCompleted = item.rate;
                });

                completed.forEach(item => {
                    if (item.code === 'AB07') warehouseData.inboundRate1 = item.rate;
                    if (item.code === 'AB08') warehouseData.outboundRate1 = item.rate;
                    if (item.code === 'AB09') warehouseData.inboundCompleted1 = item.rate;
                    if (item.code === 'AB10') warehouseData.outboundCompleted1 = item.rate;
                });
            }

            // 动态图表数据：日期 x 轴和对应的作业量
            const xAxisData = res.data.date || [];
            const seriesData = res.data.warehouse_job_quantity_code || [];
            // 只有当有真实数据时才传入，否则 initTrendChart 内部会使用兜底默认值
            initTrendChart(xAxisData, seriesData);
            updateWarehouseChart(); // 接口返回后更新饼图数据
        } else {
            initTrendChart(); // 接口返回异常时显示默认图表
        }
    }).catch(err => {
        console.error('获取仓库状态数据失败:', err);
        initTrendChart(); // 接口连不通时显示默认图表
    });
}

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})


// 图片资源
import gjrw from '@/assets/gjrw.png';
import ngjrw from '@/assets/ngjrw.png';


// 图表引用
const trendChartRef = ref(null);
const warehouseChartRef = ref(null);
let trendChart = null;
let warehouseChart = null;

// 响应式数据
const activeAlertTab = ref(1);
const activeWorkType = ref(1);


const alertFilterParams = reactive({
    keyword: '',
    businessType: '',
    status: '',
    visitDate: '',
    visitor: "",
    isSubmit: '',
    ticketType: ''
});

const imageMap3 = {
    active: ngjrw,
    default: gjrw
};

const businessTypeOptions = [
    { value: '0', label: '供应商送货' },
    { value: '1', label: '访客' },
    { value: '2', label: '施工' },
    { value: '3', label: '领料' },
    { value: '4', label: '承运商提货' }
];

const statusOptions = [
    { value: '0', label: '未下发' },
    { value: '1', label: '未签到' },
    { value: '2', label: '部分下发' },
    { value: '3', label: '已签到' },
    { value: '4', label: '部分签到' },
    { value: '5', label: '排队中' },
    { value: '6', label: '已叫号/装卸货/施工中' },
    { value: '7', label: '已过号' },
    { value: '8', label: '安全交底（作业票）' },
    { value: '9', label: '装卸货' },
    { value: '10', label: '离园' }
];

const isSubmitOptions = [
    { value: '0', label: '新建' },
    { value: '1', label: '未提交' },
    { value: '2', label: '已提交' }
];

const ticketTypeOptions = [
    { value: '1', label: 'A类' },
    { value: '2', label: 'B类' },
    { value: '3', label: 'C类' }
];

// 模拟数据 - 实际项目中从接口获取
const overviewData = reactive({
    safetyBriefings: 0,
    workPermits: 0
});

const warehouseData = reactive({
    AB12: 0,
    AB11: 0,
    inboundRate: 0,
    outboundRate: 0,
    inboundCompleted: 0,
    outboundCompleted: 0,
    inboundRate1: 0,
    outboundRate1: 0,
    inboundCompleted1: 0,
    outboundCompleted1: 0
});

const tableData = ref([]);

// 初始化数据
const initData = () => {
    // 模拟从接口获取数据
    Object.assign(overviewData, {
        safetyBriefings: 0,
        workPermits: 0
    });

    Object.assign(warehouseData, {
        AB12: 0,
        AB11: 0,
        inboundRate: 0,
        outboundRate: 0,
        inboundCompleted: 0,
        outboundCompleted: 0,
        inboundRate1: 0,
        outboundRate1: 0,
        inboundCompleted1: 0,
        outboundCompleted1: 0
    });

    // 表格数据
    tableData.value = generateTableData();
};

// 生成表格数据
const generateTableData = () => {
    return Array.from({ length: 20 }, (_, index) => ({
        index: index + 1,
        reservationCode: `RYY0800${(index + 20).toString().padStart(2, '0')}`,
        businessType: '供应商送货',
        visitor: index % 2 === 0 ? '李强' : '叶润林',
        carNumber: `粤A123Y${(45 + index).toString().padStart(2, '0')}`,
        address: (index % 4) + 1,
        startVisitDate: `2025-04-06 08:${30 + index}`
    }));
};

// 初始化趋势图表
const initTrendChart = (xAxisData = [], seriesData = []) => {
    if (!trendChartRef.value) return;

    if (!trendChart) {
        trendChart = echarts.init(trendChartRef.value);
    }

    const option = {
        tooltip: {
            trigger: 'axis'
        },
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
            data: xAxisData.length > 0 ? xAxisData : ['2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10', '2025-04-11'],
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
                data: seriesData.length > 0 ? seriesData : [120, 132, 101, 134, 90, 230],
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
                visitor: '',
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
                        value: warehouseData.inboundCompleted,
                        visitor: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: warehouseData.outboundCompleted,
                        visitor: '',
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

const updateWarehouseChart = () => {
    if (!warehouseChart) return;
    const isRunning = activeWorkType.value === 1;
    const data = [
        {
            value: isRunning ? warehouseData.inboundCompleted : warehouseData.inboundCompleted1,
            itemStyle: { color: '#42FFF9' }
        },
        {
            value: isRunning ? warehouseData.outboundCompleted : warehouseData.outboundCompleted1,
            itemStyle: { color: '#F0B716' }
        }
    ];
    warehouseChart.setOption({
        series: [{ data }]
    });
};

const switchWorkType = (type) => {
    activeWorkType.value = type;
    updateWarehouseChart();
    // 如果后续需要在这里调用接口，可以写在这里，上面两行代码会确保页面先切换
};

// 事件处理函数
const switchAlertTab = (tabId) => {
    activeAlertTab.value = tabId;
    tableData.value = []; // 先清空表格数据，保证不管接口快慢，标签页都能立刻切换
    handleAlertReset();
};

const handleAlertSearch = () => {
    if (activeAlertTab.value === 1) {
        queryParkReservationListPaginationsParams();
    } else if (activeAlertTab.value === 3) {
        queryWarWorkArrangementListPaginationsParams();
    }
};

const handleAlertReset = () => {
    Object.assign(alertFilterParams, {
        keyword: '',
        businessType: '',
        status: '',
        visitDate: '',
        visitor: "",
        isSubmit: '',
        ticketType: ''
    });
    handleAlertSearch();
};

const handleAction = (actionType) => {
    // 处理操作按钮点击
    console.log('执行操作:', actionType);
    // 根据actionType执行相应的业务逻辑
};

const loadAlertTabData = (tabId) => {
    // 根据告警tabId加载对应的数据
    console.log('加载告警tab数据:', tabId);
};

const loadData = () => {
    // 加载主要数据
    initData();
    queryWarehouseStatusPaginations();
    initWarehouseChart();
};

const loadAlertData = () => {
    // 加载告警数据
    console.log('加载告警数据');
};

// 响应式调整
const handleResize = () => {
    nextTick(() => {
        if (trendChart) trendChart.resize();
        if (warehouseChart) warehouseChart.resize();
    });
};

// 生命周期
onMounted(() => {
    initData();
    queryWarehouseStatusPaginations();
    queryParkReservationListPaginationsParams();
    initWarehouseChart();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
});

watch(timeType1, () => {
    queryWarehouseStatusPaginations();
})

// 监听面板显隐状态，触发图表自适应重绘
watch(() => props.isPanelVisible, () => {
    // 延迟约 300ms，等待侧边栏过渡动画彻底结束后再刷新图表尺寸
    setTimeout(handleResize, 310);
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
    width: 100px !important;
}

::v-deep(.yewuwidth.el-select--small) {
    width: 90px !important;
}

::v-deep(.yewuwidth.el-date-editor.el-input,
    .yewuwidth.el-date-editor.el-input__wrapper) {
    width: 130px !important;
}

::v-deep(.el-input__inner) {
    font-size: 14px !important;

}




::v-deep(.el-loading-mask) {
    background-color: rgba(0, 0, 0, 0.7) !important;
}

.changeTimeTypes {
    display: flex;
    justify-content: flex-end;
    margin: 10px 20px 0px 0px;
}

/* 
::v-deep(.el-select--small .el-input__wrapper),
::v-deep(.el-select--small .el-select__wrapper),
::v-deep(.el-date-editor--small.el-input__wrapper),
::v-deep(.el-input--small .el-input__wrapper) {
    height: 24px !important;
    line-height: 24px !important;
} */

/* 
::v-deep(.el-table thead tr) {
    background: #095DBE !important;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 16px !important;
    color: #04E9E9 !important;
} */

/* ::v-deep(.el-table th.el-table__cell) {
    background-color: transparent !important;
}

::v-deep(.el-table tr) {
    font-size: 15px !important;
}

::v-deep(.el-select--small) {
    width: 115px;
}

::v-deep(.el-date-editor.el-input,
    ::v-deep(.el-date-editor.el-input__wrapper)) {
    width: 115px;
} */





.chartpadding {
    padding: 0px 20px;

}

.change_table {
    margin: 10px 10px 0px 10px;
}

.changelistChart {
    width: 465px;
    height: 260px;
    flex-shrink: 0;

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
    background: url('@/assets/inner-frame.png') no-repeat right top;
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
    cursor: pointer;
}

.ckleft .active_title {
    color: #4BDBFE;
    -webkit-text-fill-color: #4BDBFE;
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
    background: url('@/assets/icon-10.png') no-repeat 0 0;
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
    margin: 15px 10px;
    margin-top: 10px;
    gap: 8px;
}



.yySearch_left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.yySearch_left .yylf_label {
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 14px;
    color: #FBFBFB;
    margin-right: 5px;
    white-space: nowrap;
    line-height: 24px;
}

.yylf {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px 0px 20px;
}

.yylf_left {
    display: flex;
    align-items: center;
}

.yylf .yylf_label {
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 14px;
    color: #FBFBFB;
    margin-right: 8px;
    white-space: nowrap;
    line-height: 24px;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>