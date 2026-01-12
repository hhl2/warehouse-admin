<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">

                <el-table class="my-spacing-table" ref="tableRef" :data="data">
                    <el-table-column prop="countNums1" label="装卸区域" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="作业车辆" />
                    <el-table-column prop="countNums3" label="车辆进入时间" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="装卸开始时间" show-overflow-tooltip />
                    <el-table-column prop="countNums5" label="装卸结束时间" show-overflow-tooltip />
                    <el-table-column prop="" label="装卸作业进度" show-overflow-tooltip>
                        <template #default="scope">
                            <img src="" alt="">

                        </template>
                    </el-table-column>
                    <el-table-column prop="countNams6" label="状态" width="60">
                        <template #default="scope">
                            <span :class="[scope.row.countNums6 === '完成' ? 'status-normal' : '.status-important']">
                                {{ scope.row.countNums6 }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">装卸作业</div>
        </div>

        <div class="txzybox">
            <div class="chartBox">
                <div class="chartBoxs">
                    <div class="echartp" ref="chartDom1"></div>

                    <div class="chart_sum">
                        <div class="chart_snumber">{{ fireData.total }}</div>
                    </div>

                    <div class="txzy_text">装卸园区</div>


                </div>

            </div>


            <div class="txzyList">

                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao.png" alt="">
                        <div class="txzyimg_text">2</div>
                    </div>
                    <div class="txzy_text">等待作业</div>
                </div>



                <div class="txzyList_box">

                    <div class="txzyimg">
                        <img src="@/assets/tubiao2.png" alt="">
                        <div class="txzyimg_text green_label">10</div>
                    </div>
                    <div class="txzy_text">作业中</div>
                </div>


                <div class="txzyList_box">
                    <div class="txzyimg">
                        <img src="@/assets/tubiao1.png" alt="">
                        <div class="txzyimg_text yellow_label">5</div>
                    </div>
                    <div class="txzy_text">已完成</div>
                </div>



            </div>






        </div>


        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">装卸作业动画</div>
        </div>

        <div class="imgbox2">
            <img src="@/assets/try/type7.png" alt="">
        </div>
    </div>


</template>

<style scoped>
.testmian {
    padding: 25px 20px;
    background: url('@/assets/长框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1250px;
    height: 340px;
    position: fixed;
    bottom: 80px;
    z-index: 999;
    left: calc(100% - 1170px);

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


.imgbox2 {
    width: 430px;
    height: 311px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 10px;


}

.imgbox2 img {
    width: 100%;
    height: 100%;
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

.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}

.status-urgent {
    color: #FCDA1E;
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
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';
const showMenus = ref(false);
const menuRef = ref(null);
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'zxzy') {
            showMenus.value = true

        }

    }
})

const handleClickOutside = (event) => {
    // console.log(event, menuRef.value.contains(event.target))
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

const sorces =
    [
        {},
        {},
        {},
        {},

    ]




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

var data = [
    {
        countNums1: "装卸1区",
        countNums2: "粤A23456W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "装卸中",
        countNums7: "",
        countNums8: "",
        type: 2

    },

    {
        countNums1: "装卸1区",
        countNums2: "粤A23457W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "完成",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "装卸2区",
        countNums2: "粤A23459W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "装卸中",
        countNums7: "",
        countNums8: "",
        type: 4

    },

    {
        countNums1: "装卸2区",
        countNums2: "粤A23451W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "完成",
        countNums7: "",
        countNums8: "",
        type: 4

    },



    {
        countNums1: "装卸1区",
        countNums2: "粤A23452W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "装卸中",
        countNums7: "",
        countNums8: "",
        type: 5

    },
    {
        countNums1: "装卸3区",
        countNums2: "粤A23453W",
        countNums3: "2025-04-12 08:24",
        countNums4: "2025-04-12 08:24",
        countNums5: "2025-04-12 10:24",
        countNums6: "装卸中",
        countNums7: "",
        countNums8: "",
        type: 6

    },







];

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

};

const fireData = reactive({
    total: 17,
    items: [
        { label: '在线设备', value: 10, unit: '个', color: 'blue', key: 'online' },
        { label: '离线设备', value: 1, unit: '个', color: 'yellow', key: 'offline' },
        { label: '离线设备', value: 6, unit: '个', color: 'yellow', key: 'offline' }
    ]
});

// 生命周期
onMounted(() => {

    initChart2();
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
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('fullscreenchange', handleResize);
    document.removeEventListener('webkitfullscreenchange', handleResize);
    document.removeEventListener("click", handleClickOutside);
});

</script>