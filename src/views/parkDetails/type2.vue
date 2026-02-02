<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                    @keyup.enter="queryParkWeatherListPaginations" />
                <el-button type="primary" class="search-btn" @click="queryParkWeatherListPaginations">查询</el-button>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="deviceData">
                    <el-table-column prop="deviceName" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="deviceType" label="设备类型" />
                    <el-table-column prop="location" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="检测数值" />
                    <el-table-column prop="watchTime" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="runStatus" label="状态" width="60">
                    </el-table-column>
                    <el-table-column prop="alarmLevel" label="告警等级">
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMap[scope.row.alarmLevel]]">
                                {{ scope.row.alarmLevel }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip>

                    </el-table-column>



                </el-table>


            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">电力消耗热力图</div>
        </div>

        <div class="imgbox">
            <img src="@/assets/try/示意图.png" alt="">
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">水能路径图</div>
        </div>
        <div class="imgbox2">
            <img src="@/assets/try/图层34.png" alt="">
        </div>

    </div>

    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">
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

.inputwidth {
    width: 240px;
}

.imgbox2 {
    width: 410px;
    height: 380px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 10px;

}

.imgbox2 img {
    width: 100%;
    height: 100%;
}

.imgbox {
    width: 410px;
    height: 360px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.imgbox img {
    width: 100%;
    height: 100%;
}


.changewidth {
    margin: 5px 15px 10px 10px;
    display: flex;
    gap: 5px;
    align-items: center;
}

.search-btn {
    height: 32px;
    background: #476B9A;
    border: none;
    color: #fff;
    padding: 0 15px;
}

.search-btn:hover {
    background: rgba(0, 168, 255, 0.4);
    border-color: #00eaff;
    color: #fff;
}

.changleft {
    margin-left: 12px;

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

.my-spacing-table {
    height: 290px;
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
import { queryEnergyDeviceListPagination } from '@/api/user'

const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const deviceData = ref([]);
const ueResponseData = inject('ueResponseData')

const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}

const queryParkWeatherListPaginations = async () => {
    const res = await queryEnergyDeviceListPagination({ "pageNo": 1, "pageSize": 99, "deviceName": input3.value, })
    if (res?.code == 0) {
        const list = res.data?.list || [];
       const tyep={
            1:"水表",
            2:"电表"
        }
        deviceData.value = list.map(item => {
            return {
                ...item,
                deviceType:tyep[item.deviceType],
                
                watchTime: formatDate(item.watchTime)
            }
        });
    }
}

watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'nyjc') {
            showMenus.value = true

        }

    }
})

const handleClickOutside = (event) => {
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};



const statusClassMap = reactive({
    '紧急告警': 'status-urgent',
    '重要告警': 'status-normal',
    '一般告警': 'status-important'
})

const statusClassMaps = reactive({
    '1': 'status-urgent',
    '2': 'status-important',
    '3': 'status-normal'
})


// 生命周期
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    queryParkWeatherListPaginations()
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>