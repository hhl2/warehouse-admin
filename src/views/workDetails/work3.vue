<template>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">指标概览</div>
        </div>
        <div class="yySearch">
            <!-- <div class="yySearch_left">
                <div class="yylf_label yylf_color">统计周期</div>
                <el-select size="small" v-model="filterParams.period" placeholder="请选择">
                    <el-option v-for="item in periodOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div> -->
            <div class="yySearch_left">
                <div class="yylf_label yylf_color">开始时间</div>
                <el-date-picker v-model="filterParams.startTime" type="datetime" placeholder="选择开始时间" size="small" />
            </div>
            <div class="yySearch_left">
                <div class="yylf_label yylf_color">结束时间</div>
                <el-date-picker v-model="filterParams.endTime" type="datetime" placeholder="选择结束时间" size="small" />
            </div>
            <div class="yySearch_left">
                <div class="yylf_search_box" @click="handleSearch">查询</div>
            </div>
        </div>
        <div class="allBoxs">
            <div class="echartp changechart">
                <div class="chartpwidth" ref="chartDom2"></div>
                <div class="chart_text text_type2">作业风险</div>
                <div class="chart_sum">
                    <div class="chart_snumber">{{ alertData.total }}</div>
                </div>
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
                <div class="chart_sum">
                    <div class="chart_snumber">{{ alertData2.total }}</div>
                </div>
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
                <div class="chart_sum">
                    <div class="chart_snumber">{{ alertData3.total }}</div>
                </div>
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
                <div class="chart_sum">
                    <div class="chart_snumber">{{ alertData4.total }}</div>
                </div>
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
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警信息</div>
        </div>
        <div class="sblf">
            <el-input v-model="input3" class="inputwidth2" placeholder="请输入设备名称" :prefix-icon="Search" />
            <div class="sblf_search">
                <div class="sblf_search_box" @click="handleAlertSearch">查询</div>
                <div class="sblf_search_box" @click="handleAlertReset">重置</div>
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


</template>

<style scoped>
.inputwidth2 {
   width: 203px;
}

::v-deep(.el-select--small) {
    width: 105px !important;
}

::v-deep(.el-date-editor.el-input,
    .el-date-editor.el-input__wrapper) {
    width: 105px !important;
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
    margin: 0px 24px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-top: 5px;


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
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-shrink: 0;
    /* 禁止 Flex 压缩，防止图表显示不全 */
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
    color: #fff;
    width: 100px;

}

.text_type2 {
    width: 80px !important;
}

.text_type3 {
    width: 60px !important;
}

.chart_sum {
    width: 88px;
    height: 88px;
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
    margin: 10px 15px;
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
import { onMounted, reactive, ref, onUnmounted, nextTick, watch } from 'vue'
import { queryWorkArrangementCountByQY, queryAlarmLevelNumCount, queryAlarmInfoList } from '@/api/user';
const source = ref([
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
])
const input3 = ref('')

const fetchAlarmInfoList = async () => {
    try {
        const infoRes = await queryAlarmInfoList({
            bureauCode: "0318",
            pageNo: 1,
            pageSize: 25,
            alarmDevice: input3.value || undefined
        });
        
        if (infoRes && (infoRes.code === '0' || infoRes.code === 0) && infoRes.data && infoRes.data.list) {
            const levelMap = { '1': '紧急', '2': '重大', '3': '一般' };
            const typeMap = { '1': '安防告警', '2': '温度告警', '3': '电力告警', '4': '网络告警' }; // Example mapping fallback map
            
            const formatDate = (timestamp) => {
                if (!timestamp) return '';
                const d = new Date(timestamp);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
            };
            
            source.value = infoRes.data.list.map(item => ({
                deviceCode: item.alarmCode || item.primaryValue || '未知设备', 
                alertName: item.alarmName || '未知告警',
                alertLevel: levelMap[item.alarmLevel?.toString()] || item.alarmLevel || '一般',
                alertTime: formatDate(item.alarmTime),
                alertCategory: typeMap[item.alarmType?.toString()] || item.alarmType || '其它告警',
                alertRecovery: item.alarmStatus || (item.dealState === 1 ? '已处理' : '未恢复'), 
                alertDesc: item.alarmDescription || ''
            }));
        } else {
             source.value = [];
        }
    } catch (error) {
        console.error('获取作业告警列表失败:', error);
    }
};

const handleAlertSearch = () => {
    fetchAlarmInfoList();
};

const handleAlertReset = () => {
    input3.value = '';
    fetchAlarmInfoList();
};

const handleSearch = () => {
    fetchWorkArrangementCount();
};

onMounted(() => {
    initChart2();
    initChart3();
    initChart4();
    initChart5()
    fetchWorkArrangementCount();
    fetchAlarmInfoList();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);



});

// 监听面板显隐，触发图表重绘（延迟执行以等待 CSS 过渡结束）
watch(() => props.isPanelVisible, () => {
    setTimeout(handleResize, 310);
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
    total: 0,
    items: [
        { label: '高风险', value: 0, unit: '次', color: 'blue', key: 'urgent' },
        { label: '中风险', value: 0, unit: '次', color: 'yellow', key: 'important' },
        { label: '低风险', value: 0, unit: '次', color: 'green', key: 'normal' }
    ]
});


const alertData2 = reactive({
    total: 0,
    items: [
        { label: 'A类', value: 0, unit: '票', color: 'blue', key: 'urgent' },
        { label: 'B类', value: 0, unit: '票', color: 'yellow', key: 'important' },
        { label: 'c类', value: 0, unit: '票', color: 'green', key: 'normal' }
    ]
});


const alertData3 = reactive({
    total: 0,
    items: [
        { label: '紧急告警', value: 0, unit: '个', color: 'blue', key: 'urgent' },
        { label: '重大告警', value: 0, unit: '个', color: 'yellow', key: 'important' },
        { label: '一般告警', value: 0, unit: '个', color: 'green', key: 'normal' }
    ]
});

const alertData4 = reactive({
    total: 0,
    items: [
        { label: '仓储作业类', value: 0, unit: '个', color: 'blue', key: 'urgent' },
        // { label: '重大告警', value: 2, unit: '个', color: 'yellow', key: 'important' },
        { label: '施工作业类', value: 0, unit: '个', color: 'green', key: 'normal' }
    ]
});


const fetchWorkArrangementCount = async () => {
    // Format times into ISO strings if they exist
    const formatToISO = (dateVal) => {
        if (!dateVal) return undefined;
        // Check if already string or Date object
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return undefined;
        return d.toISOString();
    };

    const startTimeISO = formatToISO(filterParams.startTime);
    const endTimeISO = formatToISO(filterParams.endTime);

    try {
        const response = await queryWorkArrangementCountByQY({
            bureauCode: "0318",
            startTime: startTimeISO,
            endTime: endTimeISO
        });
        if (response && (response.code === '0' || response.code === 0) && response.data) {
            const data = response.data;
            
            // 1. 处理高、中、低风险 -> alertData
            const height = Number(data.heigthQty || 0);
            const medium = Number(data.mediumQty || 0);
            const low = Number(data.lowQty || 0);
            
            alertData.items[0].value = height;
            alertData.items[1].value = medium;
            alertData.items[2].value = low;
            alertData.total = height + medium + low;
            
            // 2. 处理 A、B、C 类作业 -> alertData2
            const aQty = Number(data.aQty || 0);
            const bQty = Number(data.bQty || 0);
            const cQty = Number(data.cQty || 0);
            
            alertData2.items[0].value = aQty;
            alertData2.items[1].value = bQty;
            alertData2.items[2].value = cQty;
            alertData2.total = aQty + bQty + cQty;
            
            // 3. 处理仓储作业、施工作业 -> alertData4
            const issueQty = Number(data.issueQty || 0);
            const workQty = Number(data.workQty || 0);
            
            alertData4.items[0].value = issueQty;
            alertData4.items[1].value = workQty;
            alertData4.total = issueQty + workQty;

            // Re-render pie charts with new datav
            initChart2();
            initChart3();
            initChart5();
        }
    } catch (error) {
        console.error('获取作业统计数据失败:', error);
    }
    
    // 4. 处理 告警数 -> alertData3
    try {
        const alarmRes = await queryAlarmLevelNumCount({
            bureauCode: "0318",
            startAlarmTime: startTimeISO,
            endAlarmTime: endTimeISO
        });
        
        if (alarmRes && (alarmRes.code === '0' || alarmRes.code === 0)) {
            const list = alarmRes.data || [];
            let total = 0;
            // Defaults to 0 correctly when mapping fails
            const typeMap = { '1': 0, '2': 0, '3': 0 };
            list.forEach(item => {
                if (item.alarmLevel) {
                    typeMap[item.alarmLevel.toString()] = Number(item.numCount || 0);
                }
            });
            
            alertData3.items[0].value = typeMap['1'];
            alertData3.items[1].value = typeMap['2'];
            alertData3.items[2].value = typeMap['3'];
            alertData3.total = typeMap['1'] + typeMap['2'] + typeMap['3'];
            initChart4();
        }
    } catch (error) {
         console.error('获取告警数数据失败:', error);
    }
};




// 筛选参数
const filterParams = reactive({
    period: '',
    startTime: '',
    endTime: ''
});



onUnmounted(() => {




})


</script>
