<template>

    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">环境监测</div>
            <div class="View_Details_tag" @click="changelist('type1')">查看详情</div>
        </div>
        <div class="parck_left">
            <div v-for="item in environmentData" :key="item.label" class="gjbox">
                <img :src="item.icon" alt="">
                <div class="gjlalel">{{ item.label }}</div>
                <div class="gjtext" :class="item.colorClass">
                    {{ item.value }}<div v-if="item.unit" class="gjtexts">{{ item.unit }}</div>
                </div>
            </div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">能源监测</div>
            <div class="View_Details_tag" @click="changelist('type2')">查看详情</div>
        </div>
        <div class="allBoxs nyjcPadding">
            <div ref="chartRef" class="nyjcchart"></div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">安防监测</div>
            <div class="View_Details_tag" @click="changelist('type3')">查看详情</div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart" ref="chartDom"></div>
            <div class="chart_sum">
                <div class="chart_snumber">{{ securityData.total }}</div>
            </div>
            <div class="left_number">
                <div v-for="item in securityData.items" :key="item.label" class="jcard">
                    <div class="jcard_box">
                        <div class="jcard_box_text">
                            <div class="jcard__units">个</div>
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
            <div class="title_txet">消防监测</div>
            <div class="View_Details_tag" @click="changelist('type4')">查看详情</div>
        </div>
        <div class="allBoxs">
            <div class="echartp changchart" ref="chartDom1"></div>
            <div class=" chart_sum">
                <div class="chart_snumber">{{ fireData.total }}</div>
            </div>
            <div class="left_number">
                <div v-for="item in fireData.items" :key="item.label" class="jcard">
                    <div class="jcard_box">
                        <div class="jcard_box_text">
                            <div class="jcard__units">个</div>
                            <div class="jcard__numbers" :class="{ leftColor: item.color === 'yellow' }">{{
                                item.value
                            }}</div>
                        </div>
                    </div>
                    <div class="jcard__values">{{ item.label }}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警管理</div>
            <div class="View_Details_tag" @click="changelist('type5')">查看详情</div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart" ref="chartDom2"></div>
            <div class=" chart_sum">
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

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">人员监测</div>
            <div class="View_Details_tag" @click="changelist('type6')">查看详情</div>
        </div>
        <div class="jcrys">
            <div class="jcrys_left">
                <div class="jcrys_left_box">
                    <img src="@/assets/图标8.png" alt="">
                    <div class="jcrys_lalel">当前在园人数</div>
                    <div class="jcrys__value">
                        <span class="jcrys__number">{{ personnelData.current }}</span>
                        <span class="jcrys__unit">人</span>
                    </div>
                </div>
            </div>
            <div class="jcry">
                <div v-for="stat in personnelData.stats" :key="stat.label" class="jcry_box">
                    <div class="jcry_box_lalel">{{ stat.label }}</div>
                    <div class="jcry_box_num">{{ stat.value }}</div>
                </div>
            </div>

        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">装卸作业</div>
            <div class="View_Details_tag" @click="changelist('type7')">查看详情</div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart" ref="chartDom3"></div>
            <div class=" chart_sum">
                <div class="chart_snumber changeSize">{{ loadingData.percentage }}</div>
            </div>
            <div class="right_numberss">
                <div v-for="item in loadingData.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ item.value }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">堆场作业</div>
            <div class="View_Details_tag" @click="changelist('type8')">查看详情</div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart" ref="chartDom4"></div>
            <div class=" chart_sum">
                <div class="chart_snumber changeSize">{{ yardData.percentage }}</div>
            </div>
            <div class="right_numberss">
                <div v-for="item in yardData.items" :key="item.label" class="card card--urgent">
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

<script setup>
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue';
import * as echarts from 'echarts';
import { useRouter, useRoute } from 'vue-router'
import { get_road_rank } from '@/api/user'


// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})


// 获取路由实例和当前路由对象
const router = useRouter();
const route = useRoute();
const changelist = (value) => {

    const type = {
        type1: "hjjc",
        type2: "nyjc",
        type3: "afjc",
        type4: "xfjc",
        type5: "gjgl",
        type6: "ryjc",
        type7: "zxzy",
        type8: "dczy",

    }

    ue5click(type[value])

    router.push({ name: value })
};



// 图表引用 - 保持原变量名
const chartRef = ref(null);
const chartDom = ref(null);
const chartDom1 = ref(null);
const chartDom2 = ref(null);
const chartDom3 = ref(null);
const chartDom4 = ref(null);

// 图表实例存储
let chartInstance = null;
let myChart = null;
let myChart1 = null;
let myChart2 = null;
let myChart3 = null;
let myChart4 = null;

// 数据结构定义 - 只定义结构，不包含具体数值
const environmentData = reactive([
    { icon: require('@/assets/温度.png'), label: '温度', value: '', unit: '°C', key: 'temperature' },
    { icon: require('@/assets/多云.png'), label: 'PM10', value: '', unit: 'PU/m3', colorClass: 'gjgreen', key: 'pm10' },
    { icon: require('@/assets/C02.png'), label: 'CO2', value: '', unit: 'PU/m3', colorClass: 'gjyellow', key: 'co2' },
    { icon: require('@/assets/湿度.png'), label: '湿度', value: '', unit: '%', key: 'humidity' },
    { icon: require('@/assets/多云.png'), label: 'PM2.5', value: '', unit: 'PU/m3', colorClass: 'gjgreen', key: 'pm25' },
    { icon: require('@/assets/C02.png'), label: 'SO2', value: '', unit: 'PU/m3', colorClass: 'gjyellow', key: 'so2' }
]);

const securityData = reactive({
    total: 0,
    items: [
        { label: '在线设备', value: 0, unit: '个', color: 'blue', key: 'online' },
        { label: '离线设备', value: 0, unit: '个', color: 'yellow', key: 'offline' }
    ]
});

const fireData = reactive({
    total: 0,
    items: [
        { label: '在线设备', value: 0, unit: '个', color: 'blue', key: 'online' },
        { label: '离线设备', value: 0, unit: '个', color: 'yellow', key: 'offline' }
    ]
});

const alertData = reactive({
    total: 0,
    items: [
        { label: '紧急告警', value: 0, unit: '个', color: 'blue', key: 'urgent' },
        { label: '重要告警', value: 0, unit: '个', color: 'yellow', key: 'important' },
        { label: '一般告警', value: 0, unit: '个', color: 'green', key: 'normal' }
    ]
});

const personnelData = reactive({
    current: 0,
    stats: [
        { label: '今日累计入园人数', value: 0, key: 'todayTotal' },
        { label: '今日累计入园任务量', value: 0, key: 'todayTasks' },
        { label: '当前在园任务量', value: 0, key: 'currentTasks' }
    ]
});

const loadingData = reactive({
    percentage: '0%',
    items: [
        { label: '已完成', value: 0, unit: '个', color: 'blue', key: 'completed' },
        { label: '作业中', value: 0, unit: '个', color: 'yellow', key: 'inProgress' },
        { label: '等待作业', value: 0, unit: '个', color: 'green', key: 'pending' }
    ]
});

const yardData = reactive({
    percentage: '0%',
    items: [
        { label: '待清理', value: 0, unit: '个', color: 'blue', key: 'pendingClean' },
        { label: '空闲', value: 0, unit: '个', color: 'yellow', key: 'idle' },
        { label: '占用', value: 0, unit: '个', color: 'green', key: 'occupied' }
    ]
});

// 模拟接口数据 - 实际项目中替换为真实的 API 调用
const mockApiData = {
    environment: {
        temperature: '22',
        pm10: '116',
        co2: '116',
        humidity: '75',
        pm25: '116',
        so2: '116'
    },
    security: {
        total: 35,
        online: 33,
        offline: 2
    },
    fire: {
        total: 14,
        online: 12,
        offline: 2
    },
    alert: {
        total: 8,
        urgent: 1,
        important: 2,
        normal: 5
    },
    personnel: {
        current: 12,
        todayTotal: 50,
        todayTasks: 12,
        currentTasks: 9
    },
    loading: {
        percentage: '95%',
        completed: 102,
        inProgress: 52,
        pending: 2
    },
    yard: {
        percentage: '78%',
        pendingClean: 2,
        idle: 6,
        occupied: 78
    }
};

// 数据更新函数
const updateEnvironmentData = (data) => {
    environmentData.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

const updateSecurityData = (data) => {
    securityData.total = data.total || 0;
    securityData.items.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

const updateFireData = (data) => {
    fireData.total = data.total || 0;
    fireData.items.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

const updateAlertData = (data) => {
    alertData.total = data.total || 0;
    alertData.items.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

const updatePersonnelData = (data) => {
    personnelData.current = data.current || 0;
    personnelData.stats.forEach(stat => {
        if (data[stat.key] !== undefined) {
            stat.value = data[stat.key];
        }
    });
};

const updateLoadingData = (data) => {
    loadingData.percentage = data.percentage || '0%';
    loadingData.items.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

const updateYardData = (data) => {
    yardData.percentage = data.percentage || '0%';
    yardData.items.forEach(item => {
        if (data[item.key] !== undefined) {
            item.value = data[item.key];
        }
    });
};

// 统一数据更新函数
const updateAllData = (apiData) => {
    updateEnvironmentData(apiData.environment);
    updateSecurityData(apiData.security);
    updateFireData(apiData.fire);
    updateAlertData(apiData.alert);
    updatePersonnelData(apiData.personnel);
    updateLoadingData(apiData.loading);
    updateYardData(apiData.yard);
};

// 模拟 API 调用
const fetchData = async () => {
    try {
        // 实际项目中替换为真实的 API 调用
        // const response = await fetch('/api/dashboard-data');
        // const data = await response.json();

        // 使用模拟数据
        const data = mockApiData;
        updateAllData(data);

        // 更新图表数据
        updateCharts();
    } catch (error) {
        console.error('获取数据失败:', error);
    }
};

// 定时更新数据（可选）
const startAutoRefresh = () => {
    // 每30秒更新一次数据
    setInterval(fetchData, 30000);
};

// 更新图表数据
const updateCharts = () => {
    // 重新设置饼图数据
    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();
};

// 初始化能源图表 - 保持原函数名
const initChart = () => {
    if (!chartRef.value) return;

    chartInstance = echarts.init(chartRef.value);

    const option = {
        title: {
            text: '',
            textStyle: {
                color: '#3CDFF3'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    color: '#3CDFF3'
                }
            },
            textStyle: {
                color: '#3CDFF3'
            }
        },
        legend: {
            data: ['水耗', '电耗'],
            textStyle: {
                color: '#3CDFF3'
            }
        },
        toolbox: {
            feature: {
            },
            iconStyle: {
                color: '#3CDFF3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#3CDFF3'
                    }
                },
                axisLabel: {
                    color: '#3CDFF3'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#3CDFF3',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    color: '#3CDFF3'
                },
                splitLine: {
                    lineStyle: {
                        color: '#3CDFF3',
                        type: 'solid',
                        opacity: 0.5
                    }
                }
            }
        ],
        series: [
            {
                name: '水耗',
                type: 'line',
                stack: 'Total',
                areaStyle: {
                    color: 'rgba(12, 229, 248, 0.3)'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: 'rgba(12, 229, 248, 0.6)'
                },
                itemStyle: {
                    color: 'rgba(12, 229, 248, 0.6)'
                },
                symbol: 'none',
                data: [120, 132, 101, 134, 190, 230, 210, 120, 132, 101, 134, 90]
            },
            {
                name: '电耗',
                type: 'line',
                stack: 'Total',
                areaStyle: {
                    color: 'rgba(248, 200, 12, 0.3)'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: 'rgba(248, 200, 12, 0.6)'
                },
                itemStyle: {
                    color: 'rgba(248, 200, 12, 0.6)'
                },
                symbol: 'none',
                data: [220, 182, 191, 234, 90, 330, 310, 210, 120, 132, 101, 134]
            }
        ]
    };

    chartInstance.setOption(option);
};

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

//消防检测 - 保持原函数名
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
                    }
                ]
            }
        ]
    };

    myChart1.setOption(option);
}

//告警管理 - 保持原函数名
const initChart3 = () => {

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

//装卸作业 - 保持原函数名
const initChart4 = () => {
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
                        value: loadingData.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: loadingData.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: loadingData.items[2].value, name: '',
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

//堆场作业 - 保持原函数名
const initChart5 = () => {
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
                        value: yardData.items[0].value, name: '',
                        itemStyle: {
                            color: '#42FFF9'
                        }
                    },
                    {
                        value: yardData.items[1].value, name: '',
                        itemStyle: {
                            color: '#F0B716'
                        }
                    },
                    {
                        value: yardData.items[2].value, name: '',
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

const handleResize = () => {
    if (chartInstance) {
        chartInstance.resize();
    }
    if (myChart) {
        myChart.resize();
    }
    if (myChart1) {
        myChart1.resize();
    }
    if (myChart2) {
        myChart2.resize();
    }
    if (myChart3) {
        myChart3.resize();
    }
    if (myChart4) {
        myChart4.resize();
    }
};
/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const ue5click = (type) => {
    console.log(type)
    console.log('点击触发', { "code": 1, "type": "btn", "data": { "id": type } });
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": type } });
}

onMounted(() => {
    // 初始化数据
    fetchData();

    // 初始化图表
    initChart();
    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();

    // 开始自动刷新（可选）
    // startAutoRefresh();

    // //全市道路排名
    // get_road_rank().then(res => {
    //     console.log('全市道路排名:', res)

    // }).catch(err => {
    //     console.error('获取全市道路排名失败1:', err)
    // });

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);
});

onUnmounted(() => {


    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }
    if (myChart) {
        myChart.dispose();
        myChart = null;
    }
    if (myChart1) {
        myChart1.dispose();
        myChart1 = null;
    }
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
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
});
</script>

<style scoped>
.View_Details_tag {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-60%);
    background-color: #1A6892;
    color: #78D0EF;
    font-size: 14px;
    padding: 2px 5px;
    border-radius: 5px;
    font-style: normal;
    cursor: pointer;
}

.parck_left {
    display: flex;
    flex-wrap: wrap;
}

.parck_left .gjbox {
    width: 153px;
    height: 78px;
    margin-top: 12px;
    position: relative;
}


.gjbox .gjlalel {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 21px;
    text-shadow: 1px 2px 0px rgba(17, 20, 22, 0.22);
    position: absolute;
    left: 80px;
    top: 15px;
}

.gjbox .gjtext {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 23px;
    color: #FFFFFF;
    font-style: italic;
    display: flex;
    align-items: flex-end;
    position: absolute;
    left: 70px;
    top: 38px;
}

.gjbox .gjtext {
    background: linear-gradient(80deg, #1D80E0 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gjtexts {
    display: inline-block;
    font-size: 12px;
}



.nyjcPadding {
    padding: 15px 0px;
    height: 190px;
}

.nyjcchart {
    width: 465px;
    height: 190px;

}



.allBoxs {
    height: 155px;
    padding: 16px 26px;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.allBoxs .echartp {
    width: 142px;
    height: 142px;
    border: 2px dashed #2DA9C0;
    border-radius: 50%;
}

















































.changchart {
    width: 138px;
    height: 138px;
}



.gjyellow {
    background: linear-gradient(80deg, #E0A21D 0%, #FFFFFF 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    color: transparent !important;
}

.gjgreen {
    background: linear-gradient(80deg, #00D4A8 0%, #FFFFFF 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    color: transparent !important;
}

.gjbox img {
    width: 100%;
}




.chart_sum {
    width: 90px;
    height: 90px;
    position: absolute;
    left: 55px;
    top: 48px;
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



.jcrys {
    padding: 10px;
    padding-left: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.jcry {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    margin-bottom: 5px;
}

.jcrys_left_box .jcrys_lalel {
    position: absolute;
    top: -10px;
    left: 25px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #F8FFFF;
}

.jcrys_left .jcrys_left_box {
    width: 173px;
    height: 61px;
    position: relative;
    background: url('@/assets/图标9.png') no-repeat 0 0;
    background-size: 100% 100%;
    margin-top: 20px;
    margin-bottom: 5px;
}

.jcrys_left .jcrys_left_box img {
    position: absolute;
    left: -60px;
    top: -30px;
    width: 75px;
}

.jcrys__value {
    position: absolute;
    left: 50px;
    top: 20px;
    display: flex;
    align-items: baseline;
    gap: 2px;
}

.jcrys__value .jcrys__number {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 30px;
    background: linear-gradient(0deg, #FAC611 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.jcrys__value .jcrys__unit {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #F8FFFF;
}

.jcry .jcry_box {
    background: url('@/assets/组1449.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 128px;
    height: 70px;
    position: relative;
}

.jcry .jcry_box .jcry_box_lalel {
    position: absolute;
    left: 30px;
    top: 7px;
    font-size: 10px;
    color: #75D1FB;
}

.jcry .jcry_box .jcry_box_num {
    position: absolute;
    left: 55px;
    bottom: 8px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 30px;
    color: #E8FEFF;
    background: linear-gradient(0deg, #F8A954 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

.left_number {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: Microsoft YaHei;
    font-weight: bold;
    width: 230px;
    height: 140px;
    margin-right: 10px;
    margin-top: 15px;
}

.jcard {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 120px;
    justify-content: space-around;
}

.jcard_box {
    background: url('@/assets/图标10.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 82px;
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
    font-weight: bold;
    font-size: 18px;
    color: #76CBFB;
}

.jcard__numberx {
    font-size: 30px;
    color: #FFFFFF;

}


.jcard__numbers {
    font-size: 30px;
    background: linear-gradient(0deg, #42FFF9 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
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
    font-size: 19px;
    color: #F8FFFF;
}

.right_numberss {
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #76CBFB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 205px;
    height: 130px;
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

.card__labels {
    font-size: 18px;
    color: #76CBFB;
    min-width: 60px;
}

.card__values {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 3px;
    font-weight: bold;
    width: 65px;
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

.card__numbers {
    font-size: 30px;
    font-weight: bold;
}

.card__units {
    font-weight: bold;
    font-size: 19px;
    color: #F8FFFF;
}
</style>