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
            <div class="echartp changchart">
                <div class="echart_pwidth" ref="chartDom"></div>
                <div class="chart_sum">
                    <div class="chart_snumber">{{ securityData.total }}</div>
                </div>
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
            <div class="echartp changchart">
                <div class="echart_pwidth" ref="chartDom1"></div>
                <div class=" chart_sum">
                    <div class="chart_snumber">{{ fireData.total }}</div>
                </div>
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
            <div class="echartp changchart">
                <div class="echart_pwidth" ref="chartDom2"></div>
                <div class=" chart_sum">
                    <div class="chart_snumber">{{ formatNumber(alertData.total) }}</div>
                </div>
            </div>
            <div class="right_numbers">
                <div v-for="item in alertData.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ formatNumber(item.value) }}</span>
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
                        <span class="jcrys__number">{{ personnelData.cumulativelyUser }}</span>
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
            <div class="echartp changchart">
                <div class="echart_pwidth" ref="chartDom3"></div>
                <div class=" chart_sum">
                    <div class="chart_snumber">{{ formatNumber(loadingData.percentage) }}</div>
                </div>
            </div>
            <div class="right_numbers">
                <div v-for="item in loadingData.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ formatNumber(item.value) }}</span>
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
            <div class="echartp changchart">
                <div class="echart_pwidth" ref="chartDom4"></div>
                <div class=" chart_sum">
                    <div class="chart_snumber">{{ formatNumber(yardData.percentage) }}</div>
                </div>
            </div>
            <div class="right_numbers">
                <div v-for="item in yardData.items" :key="item.label" class="card card--urgent">
                    <div class="card__badges" :class="`card__badges--${item.color}`"></div>
                    <div class="card__labels">{{ item.label }}</div>
                    <div class="card__values" :class="`card__values--${item.color}`">
                        <span class="card__numbers">{{ formatNumber(item.value) }}</span>
                        <span class="card__units">{{ item.unit }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, inject, nextTick, watch } from 'vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router';
import {
    queryParkWeatherListPagination,
    queryYardWarehouseRate,
    queryEnergyNumCount,
    queryMonitoringCount,
    queryEnvironmentCount,
    querySecurityAlarmCount,
    getSignInRecordInfo,
    getWorkOffNum
} from '@/api/user';

// --- Constants & Config ---
const ROUTE_TYPE_MAP = {
    type1: "hjjc", type2: "nyjc", type3: "afjc", type4: "xfjc",
    type5: "gjgl", type6: "ryjc", type7: "zxzy", type8: "dczy"
};

const PIE_COLORS = ['#42FFF9', '#F0B716', '#16B4F0'];

// --- Props & Inject ---
const props = defineProps({
    isPanelVisible: { type: Boolean, default: true }
});
const playerMethods = inject('playerMethods');
const router = useRouter();

// --- Template Refs ---
const chartRef = ref(null);
const chartDom = ref(null);
const chartDom1 = ref(null);
const chartDom2 = ref(null);
const chartDom3 = ref(null);
const chartDom4 = ref(null);

// --- Chart Instances ---
const instances = {
    energy: null,
    security: null,
    fire: null,
    alert: null,
    loading: null,
    yard: null
};

// --- Reactive Data (Initialized with Default/Mock values for Fault Tolerance) ---
const environmentData = reactive([
    { icon: require('@/assets/温度.png'), label: '温度', value: '0', unit: '°C', key: 'temperature' },
    { icon: require('@/assets/多云.png'), label: 'PM10', value: '0', unit: 'PU/m3', colorClass: 'gjgreen', key: 'pm10' },
    { icon: require('@/assets/C02.png'), label: '风向', value: '0', unit: '°', colorClass: 'gjyellow', key: 'windPower' },
    { icon: require('@/assets/湿度.png'), label: '湿度', value: '0', unit: '%', key: 'humidity' },
    { icon: require('@/assets/多云.png'), label: 'PM2.5', value: '0', unit: 'PU/m3', colorClass: 'gjgreen', key: 'pm25' },
    { icon: require('@/assets/C02.png'), label: '大气压', value: '0', unit: 'Pa', colorClass: 'gjyellow', key: 'atmospheric' }
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
    cumulativelyUser: 0,
    stats: [
        { label: '今日累计入园人数', value: 0, key: 'todayTotal' },
        { label: '今日累计入园任务量', value: 0, key: 'todayTasks' },
        { label: '当前在园任务量', value: 0, key: 'currentTasks' }
    ]
});

const loadingData = reactive({
    percentage: '0',
    items: [
        { label: '已完成', value: 0, unit: '个', color: 'blue', key: 'completed' },
        { label: '作业中', value: 0, unit: '个', color: 'yellow', key: 'inProgress' },
        { label: '等待作业', value: 0, unit: '个', color: 'green', key: 'pending' }
    ]
});

const yardData = reactive({
    percentage: '0',
    items: [
        { label: '待清理', value: 0, unit: '个', color: 'blue', key: 'pendingClean' },
        { label: '空闲', value: 0, unit: '个', color: 'yellow', key: 'idle' },
        { label: '占用', value: 0, unit: '个', color: 'green', key: 'occupied' }
    ]
});

// --- Helper Functions ---
const formatNumber = (val) => {
    if (val == null || val === '') return '0';
    const num = parseFloat(val);
    return isNaN(num) ? val : (Math.floor(num) === num ? num.toString() : num.toFixed(2));
};

const normalizeChartData = (values) => {
    const numbers = values.map(v => parseFloat(v) || 0);
    const total = numbers.reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        const evenValue = 100 / (numbers.length || 1);
        return numbers.map(() => evenValue);
    }
    const minValue = total * 0.01;
    return numbers.map(val => val === 0 ? minValue : val);
};

const getPieOption = (values, names = [], colors = PIE_COLORS) => ({
    tooltip: {
        trigger: 'item',
        confine: true,
        extraCssText: 'z-index: 10000;',
        formatter: (params) => {
            return `${params.marker}${params.name || '数值'}: ${formatNumber(params.value)}`;
        }
    },
    series: [{
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: { borderWidth: 5, borderColor: 'transparent' },
        label: { show: false },
        emphasis: { label: { show: false } },
        labelLine: { show: false },
        data: normalizeChartData(values).map((value, index) => ({
            value,
            name: names[index] || '',
            itemStyle: { color: colors[index] || PIE_COLORS[index] }
        }))
    }]
});

const updateChart = (key, dom, option) => {
    if (!dom) return;
    if (!instances[key]) {
        instances[key] = echarts.init(dom);
    }
    instances[key].setOption(option);
};

const ue5click = (type) => {
    const message = { "code": 1, "type": "btn", "data": { "id": type } };
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message);
    } else {
        console.error('UE5 Interaction: playerMethods not injected');
    }
};

const changelist = (value) => {
    // 先立即跳转路由
    router.push({ name: value });

    // 使用 setTimeout 确保 UE5 消息在下一个事件循环发送，完全不阻塞路由
    setTimeout(() => {
        ue5click(ROUTE_TYPE_MAP[value]);
    }, 0);
};

// --- Chart Rendering ---
const renderAllCharts = () => {
    // 能源监测 (立即刷新)
    const defWater = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const defElect = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    updateChart('energy', chartRef.value, getEnergyOption(defWater, defElect));
    // 安防监测
    updateChart('security', chartDom.value, getPieOption(
        securityData.items.map(i => i.value),
        securityData.items.map(i => i.label)
    ));
    // 消防监测
    updateChart('fire', chartDom1.value, getPieOption(
        fireData.items.map(i => i.value),
        fireData.items.map(i => i.label)
    ));
    // 告警管理
    updateChart('alert', chartDom2.value, getPieOption(
        alertData.items.map(i => i.value),
        alertData.items.map(i => i.label)
    ));
    // 装卸作业
    updateChart('loading', chartDom3.value, getPieOption(
        loadingData.items.map(i => i.value),
        loadingData.items.map(i => i.label)
    ));
    // 堆场作业
    updateChart('yard', chartDom4.value, getPieOption(
        yardData.items.map(i => i.value),
        yardData.items.map(i => i.label)
    ));
};

// --- API Functions with Fault Tolerance ---
const loadData = async () => {
    try {
        await Promise.allSettled([
            fetchWeather(),         // 环境监测
            fetchEnergy(),          // 能源监测
            fetchMonitoring(),      // 安防监测
            fetchSecurityAlarm(),   // 告警管理
            fetchYardRate(),        // 堆场作业
            fetchEnvironment(),     // 消防监测
            getSignInRecordInfos(), // 人员监测
            getWorkOffNums(),       // 装卸作业
        ]);
    } catch (err) {
        console.error('Data refreshing failed, showing existing data.', err);
    }
};

const fetchWeather = async () => {
    try {
        const res = await queryParkWeatherListPagination({ "pageNo": 1, "pageSize": 99 });
        if (res.code === '0' && res.data?.list?.length > 0) {
            const device = res.data.list[0];
            const mapping = { temperature: 'temperature', humidity: 'humidity', pm10: 'pmTen', pm25: 'pmTwoFive', windPower: 'windPower', 'atmospheric': 'atmospheric' };
            environmentData.forEach(item => {
                const apiField = mapping[item.key];
                if (apiField && device[apiField] != null) item.value = device[apiField];
            });
        }
    } catch (e) {
        console.warn('Weather API failed, showing defaults');
    }
};

const getEnergyOption = (water, electricity) => ({
    tooltip: {
        trigger: 'axis',
        confine: true,
        extraCssText: 'z-index: 10000;',
        axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985', color: '#3CDFF3' } }
    },
    legend: { data: ['水耗', '电耗'], textStyle: { color: '#3CDFF3' } },
    grid: { left: '0%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
        type: 'category', boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: { lineStyle: { color: '#3CDFF3' } },
        axisLabel: { color: '#3CDFF3' }
    },
    yAxis: {
        type: 'value',
        axisLine: { show: true, lineStyle: { color: '#3CDFF3' } },
        axisLabel: { color: '#3CDFF3' },
        splitLine: { lineStyle: { color: '#3CDFF3', opacity: 0.3 } }
    },
    series: [
        { name: '水耗', type: 'line', stack: 'Total', areaStyle: { color: 'rgba(12, 229, 248, 0.3)' }, symbol: 'none', data: water },
        { name: '电耗', type: 'line', stack: 'Total', areaStyle: { color: 'rgba(248, 200, 12, 0.3)' }, symbol: 'none', data: electricity }
    ]
});

const fetchEnergy = async () => {
    try {
        const year = new Date().getFullYear();
           // queryDate: year.toString()
        const res = await queryEnergyNumCount({ queryDate:  year.toString()});
     
        if (res.code === '0' && res?.data?.length > 0) {
            const newData = { water: new Array(12).fill(0), electricity: new Array(12).fill(0) };
            res.data.forEach(item => {
                const monthMatch = item.staticMonth?.match(/-(\d+)$/);
                if (monthMatch) {
                    const idx = parseInt(monthMatch[1]) - 1;
                    const val = parseFloat(item.readNum) || 0;
                    if ([1, '1'].includes(item.deviceType)) newData.water[idx] = val;
                    else if ([2, '2'].includes(item.deviceType)) newData.electricity[idx] = val;
                }
            });
            // 只有拿到真实数据才更新图表
            updateChart('energy', chartRef.value, getEnergyOption(newData.water, newData.electricity));
        }
    } catch (e) {
        console.warn('Energy API failed, kept showing defaults');
    }
};

const fetchMonitoring = async () => {
    try {
        const res = await queryMonitoringCount({});
        if (res.code == 0 && res.data) {
            securityData.total = res.data.total;
            securityData.items[0].value = res.data.onNum;
            securityData.items[1].value = res.data.offNum;
        }
    } catch (e) { console.warn('Monitoring API failed'); }
    updateChart('security', chartDom.value, getPieOption(
        securityData.items.map(i => i.value),
        securityData.items.map(i => i.label)
    ));
};

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
    updateChart('alert', chartDom2.value, getPieOption(
        alertData.items.map(i => i.value),
        alertData.items.map(i => i.label)
    ));
};

const fetchEnvironment = async () => {
    try {
        const res = await queryEnvironmentCount({});
        if (res.code == 0 && res.data) {
            fireData.total = res.data.total;
            fireData.items[0].value = res.data.onNum;
            fireData.items[1].value = res.data.offNum;
        }
    } catch (e) { console.warn('Environment API failed'); }
    updateChart('fire', chartDom1.value, getPieOption(
        fireData.items.map(i => i.value),
        fireData.items.map(i => i.label)
    ));
};

const fetchYardRate = async () => {
    try {
        const res = await queryYardWarehouseRate({       "bureauCode": "0318",
        "provinceCode": "03",
        "warehouseCode": "0318080",
        "warehouseId": "03180000020822"});
        if (res.code == 0 && res.data?.[0]) {
            const data = res.data[0];
            yardData.percentage = data.useWarehouseRate;
            yardData.items[0].value = data.useWarehouseRate;
            yardData.items[0].value = data.useWarehouseCount;
            yardData.items[1].value = data.freeWarehouseCount;
        }
    } catch (e) { console.warn('Yard API failed'); }
    updateChart('yard', chartDom4.value, getPieOption(
        yardData.items.map(i => i.value),
        yardData.items.map(i => i.label)
    ));
};

const getSignInRecordInfos = async () => {
    try {
        const res = await getSignInRecordInfo({ "bureauCode": "0318" });
        if (res.code == 0 && res.data) {
            personnelData.cumulativelyUser = Number(res.data.cumulativelyUser) || 0;
            personnelData.stats[0].value = Number(res.data.cumulativelyUser) || 0;  // 今日累计入园人数
            personnelData.stats[1].value = Number(res.data.cumulativelyTask) || 0;  // 今日累计入园任务量
            personnelData.stats[2].value = Number(res.data.onlineTask) || 0;        // 当前在园任务量
        }
    } catch (e) {
        console.warn("SignIn API failed", e);
    }
};


const getWorkOffNums = async () => {
    try {
        const res = await getWorkOffNum(        
            {
                "bureauCode": "0318",
                // "endVisitDate": "2025-11-01",
                // "startVisitDate": "2025-01-01"
            }
        );
        if (res.code == 0) {
            const done = Number(res.data.doneNum) || 0;
            const doing = Number(res.data.doingNum) || 0;
            const wait = Number(res.data.waitNum) || 0;
            const total = done + doing + wait;

            loadingData.items[0].value = done;   // 已完成
            loadingData.items[1].value = doing;  // 作业中
            loadingData.items[2].value = wait;   // 等待作业

            // 计算完成率
            loadingData.percentage = total === 0 ? '0' : Math.round((done / total) * 100).toString();

            // 更新图表
            updateChart('loading', chartDom3.value, getPieOption(
                loadingData.items.map(i => i.value),
                loadingData.items.map(i => i.label)
            ));
        }

    } catch (e) {
        console.warn("WorkOff API failed")
    }
}

// --- Lifecycle ---
const handleResize = () => {
    Object.values(instances).forEach(instance => instance?.resize());
};

onMounted(async () => {
    await nextTick();
    // 1. 先使用初始数据渲染图表，保证页面不空白
    renderAllCharts();
    // 2. 异步获取真实数据并更新
    loadData();

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
});

// 监听面板显隐，触发图表重绘（延迟执行以等待 CSS 过渡结束）
watch(() => props.isPanelVisible, () => {
    setTimeout(handleResize, 310);
});

onUnmounted(() => {
    Object.values(instances).forEach(instance => instance?.dispose());
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
});
</script>

<style scoped>
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



.gjtexts {
    display: inline-block;
    font-size: 12px;
}

.nyjcPadding {
    padding: 15px 0px;
    height: 175px;
    width: 442px;
    flex-shrink: 0;
}

.nyjcchart {
    width: 442px;
    height: 175px;
    flex-shrink: 0;
}


.allBoxs {
    height: 157px;
    padding: 15px 20px;
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    /* 禁止 Flex 压缩 */
}


.changchart {
    width: 138px;
    height: 138px;
}

.echart_pwidth {
    width: 100%;
    height: 100%;
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

.right_numbers {
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #76CBFB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 205px;
    height: 140px;
    margin-right: 10px;
    margin-top: 15px;
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