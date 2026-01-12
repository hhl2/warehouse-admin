<template>
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">重点设备</div>
        </div>

        <div class="sblf">

            <el-input v-model="input3" style="width: 203px" placeholder="请输入设备名称" :prefix-icon="Search" />

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
                        <span>设备名称</span>
                        <span>下次检验日期</span>
                        <span>设备类型</span>
                        <span>子设备类型</span>
                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.deviceName }}</span>
                        <span>{{ value.nextInspectionDate }}</span>
                        <span>{{ value.deviceType }}</span>
                        <span>{{ value.subDeviceType }}</span>
                    </div>

                    <div class="sb_box_label">
                        <span>生产厂家</span>
                        <span>规格型号</span>
                        <span>运行状态</span>
                        <span>领用数量</span>
                    </div>

                    <div class="sb_box_label2">
                        <span>{{ value.manufacturer }}</span>
                        <span>{{ value.modelSpec }}</span>
                        <span>{{ value.status }}</span>
                        <span>{{ value.quantity || '' }}</span>
                    </div>

                </div>


            </div>

        </div>


    </div>
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">设备基本信息</div>
        </div>


        <div class="sbrwright">
            <div class="sbrws_box">
                <span class="sbrws_label">设备名称</span>
                <div class="sbrws_text">1号堆垛机</div>
                <span class="sbrws_label">设备型号</span>
                <div class="sbrws_text">
                    SFZRA-5000
                </div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">额定电压</span>
                <div class="sbrws_text">
                    22kv
                </div>
                <span class="sbrws_label">额定电流</span>
                <div class="sbrws_text">
                    25a
                </div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">生产厂家</span>
                <div class="sbrws_text">
                    GYCVV有限公司
                </div>

                <span class="sbrws_label">维护周期</span>
                <div class="sbrws_text">
                    6个月
                </div>
            </div>
            <div class="sbrws_box">

                <span class="sbrws_label">上一次维护时间</span>
                <div class="sbrws_text">
                    2025-11-21
                </div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">下一期维护时间</span>
                <div class="sbrws_text">
                    2026-06-01
                </div>

            </div>
        </div>


        <div class="sbpic">
            <img src="@/assets/try/device.png" alt="">
        </div>

        <div class="jcrwx">
            <div class="jcrwx_box_li" :class="{ active: activeTab === 1 }" @click="switchTab(1)">
                <img :src="imageMap2[activeTab === 1 ? 'active' : 'default']" alt="">
                <div class="jcrwx_box_text little_size">告警</div>
            </div>

            <div class="jcrwx_box_li" :class="{ active: activeTab === 2 }" @click="switchTab(2)">
                <img :src="imageMap2[activeTab === 2 ? 'active' : 'default']" alt="">
                <div class="jcrwx_box_text">运行时长</div>
            </div>
        </div>


        <div v-show="activeTab === 1" ref="chartRef" class="changechartwidth">
        </div>

        <div v-show="activeTab === 2" ref="chartRef2" class="changechartwidth"></div>

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
import jcrw from '@/assets/jcrw.png';
import njcrw from '@/assets/njcrw.png';
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;


const chartRef2 = ref(null);
let chartInstance2 = null;


const initChart2 = () => {
    if (!chartRef2.value) return;

    chartInstance2 = echarts.init(chartRef2.value);

    const option = {
        title: {
            text: '',
            textStyle: {
                color: '#85BEFD'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    color: '#85BEFD'
                }
            },
            textStyle: {
                color: '#85BEFD'
            }
        },
        legend: {
            data: ['水耗'],
            textStyle: {
                color: '#85BEFD'
            }
        },
        toolbox: {
            feature: {
                // 移除保存图片功能
            }
        },
        grid: {
            top: '4%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                axisLine: {
                    lineStyle: {
                        color: '#85BEFD'
                    }
                },
                axisLabel: {
                    color: '#85BEFD'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#85BEFD',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    color: '#85BEFD'
                },
                splitLine: {
                    lineStyle: {
                        color: '#4281B6',
                        type: 'solid',
                        opacity: 0.5
                    }
                }
            }
        ],
        series: [
            {
                type: 'line',
                stack: 'Total',
                areaStyle: {
                    color: 'RGBA(124, 109, 69, 0.6)'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: '#7E6E42'
                },
                itemStyle: {
                    color: 'rgba(12, 229, 248, 0.6)'
                },
                symbol: 'none',
                data: [120, 132, 101, 134, 190, 230, 210, 120, 132, 101, 134, 90]
            }
        ]
    };

    chartInstance2.setOption(option);
};



const initChart1 = () => {
    if (!chartRef.value) return;

    chartInstance = echarts.init(chartRef.value);

    const option = {
        title: {
            text: '',
            textStyle: {
                color: '#85BEFD'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    color: '#85BEFD'
                }
            },
            textStyle: {
                color: '#85BEFD'
            }
        },
        legend: {
            data: ['水耗'],
            textStyle: {
                color: '#85BEFD'
            }
        },
        toolbox: {
            feature: {
                // 移除保存图片功能
            }
        },
        grid: {
            top: '4%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                axisLine: {
                    lineStyle: {
                        color: '#85BEFD'
                    }
                },
                axisLabel: {
                    color: '#85BEFD'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#85BEFD',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    color: '#85BEFD'
                },
                splitLine: {
                    lineStyle: {
                        color: '#4281B6',
                        type: 'solid',
                        opacity: 0.5
                    }
                }
            }
        ],
        series: [
            {
                type: 'line',
                stack: 'Total',
                areaStyle: {
                    color: 'RGBA(124, 109, 69, 0.6)'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: '#7E6E42'
                },
                itemStyle: {
                    color: 'rgba(12, 229, 248, 0.6)'
                },
                symbol: 'none',
                data: [110, 400, 201, 104, 190, 130, 410, 420, 180, 121, 174, 90]
            }
        ]
    };

    chartInstance.setOption(option);
};
// 响应式数据
const activeTab = ref(1);
// 图片映射
const imageMap2 = {
    active: njcrw,
    default: jcrw
};

const source = [
    {
        deviceCode: '64BC256336654588523369814CVT3',
        deviceName: '堆垛机',
        nextInspectionDate: '2025-11-23',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '某某厂家',
        modelSpec: 'DZ-001',
        status: '在线',
        quantity: ''
    },
    {
        deviceCode: '74BC256336654588523369814CVT4',
        deviceName: 'AGV小车',
        nextInspectionDate: '2025-12-15',
        deviceType: '智能设备',
        subDeviceType: '运输设备',
        manufacturer: '智能科技',
        modelSpec: 'AGV-2023',
        status: '在线',
        quantity: '5'
    },
    {
        deviceCode: '84BC256336654588523369814CVT5',
        deviceName: '码垛机器人',
        nextInspectionDate: '2026-01-10',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '机器人公司',
        modelSpec: 'MD-500',
        status: '离线',
        quantity: '2'
    },
    {
        deviceCode: '94BC256336654588523369814CVT6',
        deviceName: '输送带',
        nextInspectionDate: '2025-10-20',
        deviceType: '智能设备',
        subDeviceType: '传输设备',
        manufacturer: '传输设备厂',
        modelSpec: 'SST-100',
        status: '在线',
        quantity: ''
    }
]


// 事件处理函数
const switchTab = (tabId) => {
    activeTab.value = tabId;
    // 切换时重新初始化对应的图表
    nextTick(() => {
        if (tabId === 1 && chartRef.value) {
            initChart1();
        } else if (tabId === 2 && chartRef2.value) {
            initChart2();
        }
    });
};


const input3 = ref('')
const handleAlertSearch = () => {

}
const handleAlertReset = () => {

}

const handleResize = () => {
    if (chartInstance) {
        chartInstance.resize();
    }
    if (chartInstance2) {
        chartInstance2.resize();
    }


};
onMounted(() => {

    initChart1();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    document.addEventListener('webkitfullscreenchange', handleResize);

});

onUnmounted(() => {


    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }
    if (chartInstance2) {
        chartInstance2.dispose();
        chartInstance2 = null;
    }
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);

})


</script>


<style scoped>
.changechartwidth {
    width: 465px;
    height: 280px;

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
    color: #fff;
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
    transform: translate(-40%, -50%);
    width: 80px;
    font-size: 18px;
    color: #C1E6FC;
}

.little_size {
    width: 40px !important;
}

.sbpic {
    width: 400px;
    height: 244px;
    margin: 20px 31px;
    background-color: burlywood;
}

.sbpic img {
    width: 100%;
    height: 100%;
}

.sblf {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.sbrwright {

    display: flex;
    flex-direction: column;
    gap: 1px;

    border-radius: 5px;
    margin: 20px;

}


.sbrwright .sbrws_box {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 15px;
    line-height: 1.6;
    background: #095DBE;
    /* background-color: #1C4A95; */
    /* background-color: rgba(93, 146, 237, 0.7); */
    padding: 2px 5px;
    margin-bottom: 12px;
}

.sbrwright .sbrws_label {

    /* color: #54B1FC; */
    color: #04E9E9;
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 500;
    font-size: 17px;

}

.sbrws_box .sbrws_text {
    color: #E9FBFF;
    flex: 1;
    min-width: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8;
    max-height: 2.8em;
    margin-left: 5px;
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
    color: #E9FBFF;
    font-size: 16px;
    padding: 5px 10px;



}

.sblf_box_title span {
    color: #54BAFF;

}

.margin_sb_box {
    margin: 0px 7px;
}

.sb_box_label {
    display: flex;
    padding: 5px 8px;
    font-size: 12px;
    /* background: #274A9D; */
    background: #095DBE;
    color: #04E9E9;
    /* background-color: rgba(93, 146, 237, 0.7); */
    /* color: #54B1FC; */

    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 5px;

}

.sb_box_label span {
    display: inline-block;
    width: 110px;
    text-align: center;
}

.sb_box_label span:first-child {
    text-align: left;
}


.sb_box_label2 {
    display: flex;

    padding: 5px 8px;
    /* background: #557FA4; */
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
    text-align: left;
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

.title_txet {
    font-size: 22px;
    top: 2px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>