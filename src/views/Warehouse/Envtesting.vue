<template>
    <div class="testmians">
        <div class="testmian">
            <div style="margin:20px 15px 10px 20px;">
                <el-input v-model="input3" style="width: 280px" placeholder="请输入关键字" :prefix-icon="Search" />

            </div>


            <div style="margin-left: 20px;">

                <el-table class="my-spacing-table" ref="tableRef" :data="data" height="310">
                    <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="设备类型" />
                    <el-table-column prop="countNums3" label="检测点位置" />
                    <el-table-column prop="countNums4" label="检测数值" />
                    <el-table-column prop="countNums5" label="检查时间" show-overflow-tooltip />
                    <el-table-column prop="countNams6" label="状态" width="60">

                        <template #default="scope">
                            <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                                {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="" label="告警等级">
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMap[scope.row.countNums7]]">
                                {{ scope.row.countNums7 }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="" label="告警信息" show-overflow-tooltip>
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMaps[scope.row.type]]">
                                {{ scope.row.countNums8 }}
                            </span>
                        </template>
                    </el-table-column>



                </el-table>


            </div>





        </div>

    </div>


</template>

<style scoped>
.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}

.status-urgent {
    color: #FCDA1E;
}

::v-deep(.el-table__body) {
    -webkit-border-vertical-spacing: 2px;
    /* 设置行与列的间距 */
}




/* 修改输入框容器的背景色 */
::v-deep(.el-input__wrapper) {
    height: 25px;
    background-color: #476B9A;
    box-shadow: 0 0 0 1px #409eff inset;
}

::v-deep(.el-input__icon) {
    color: #18A7DE;
}

::v-deep(.el-input__inner) {
    color: #333;
}

::v-deep(.el-pagination) {
    --el-pagination-bg-color: transparent !important;
    --el-pagination-button-color: #fff !important;
    --el-pagination-button-disabled-bg-color: transparent !important;
}

::v-deep(.el-pager li.is-active,
    .el-pager li:hover) {
    color: #0BA8C0;

}

.testmians {
    margin: 0 auto;
}

.testmian {
    padding: 20px 15px;

    background: url('@/assets/框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 915px;
    height: 370px;
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;




}
</style>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'

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
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 2

    },
    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "1号检测点温度过高",
        type: 1

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "1号检测点温度过高",
        type: 3

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 3

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 1

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测点温度过高",
        type: 2

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 3

    },

    {
        countNums1: "温度传感器#1",
        countNums2: "环境检测",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "重要告警",
        countNums8: "1号检测点温度过高",
        type: 3

    },




];

</script>