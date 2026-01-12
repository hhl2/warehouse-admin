<template>
    <div class="testmiansx" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmianx">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data">
                    <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="设备类型" />
                    <el-table-column prop="countNums3" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="检测数值" />
                    <el-table-column prop="countNums5" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="countNums6" label="状态" width="60">
                    </el-table-column>

                    <el-table-column prop="" label="告警等级">
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMap[scope.row.countNums7]]">
                                {{ scope.row.countNums7 }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="countNums8" label="告警信息" show-overflow-tooltip>

                    </el-table-column>



                </el-table>


            </div>
        </div>
    </div>

    <div v-if="showMenus" class="context-menu" ref="menuRef">
        <div class="context_tan">
        </div>
    </div>


</template>

<style scoped>
.testmiansx {
    padding: 25px 20px;
    background: url('@/assets/长框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1344px;
    height: 354px;
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;
}

.testmiansx.panel-collapsed {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
    pointer-events: none;
}

.testmianx {
    position: relative;
}

.inputwidth {
    width: 240px;
}

.changewidth {
    margin: 5px 15px 10px 10px;

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
    height: 308px;
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

const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'hjjc') {
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
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号监测点温度过高",
        type: 2

    },
    {
        countNums1: "温度传感器#2",
        countNums2: "环境检测",
        countNums3: "室内2号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "2号监测点温度过高",
        type: 3

    },

    {
        countNums1: "温度传感器#3",
        countNums2: "环境检测",
        countNums3: "室内3号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "3号监测点温度过高",
        type: 3

    },

    {
        countNums1: "温度传感器#4",
        countNums2: "环境检测",
        countNums3: "室内4号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "4号监测点温度过高",
        type: 2

    },

    {
        countNums1: "温度传感器#5",
        countNums2: "环境检测",
        countNums3: "室内5号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "5号监测点温度过高",
        type: 2

    },

    {
        countNums1: "温度传感器#6",
        countNums2: "环境检测",
        countNums3: "室内6号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "6号监测点温度过高",
        type: 1

    },

    {
        countNums1: "温度传感器#7",
        countNums2: "环境检测",
        countNums3: "室内7号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "7号监测点温度过高",
        type: 2

    },

    {
        countNums1: "温度传感器#8",
        countNums2: "环境检测",
        countNums3: "室内8号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "8号监测点温度过高",
        type: 2

    },




];

// 生命周期
onMounted(() => {
    document.addEventListener("click", handleClickOutside);

});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>