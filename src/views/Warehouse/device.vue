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

        <div class="device-table-wrapper">
            <el-table class="device-custom-table" ref="tableRef" :data="source" highlight-current-row
                @row-click="handleRowClick">
                <el-table-column prop="name" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="code" label="设备编码" show-overflow-tooltip />
                <el-table-column prop="spec" label="规格型号" show-overflow-tooltip />
                <el-table-column prop="lastMaintainDate" label="上次维护时间" show-overflow-tooltip />
                <el-table-column prop="nextMaintainDate" label="下次维护时间" show-overflow-tooltip />
            </el-table>
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
                <div class="sbrws_text">{{ selectedRow.name }}</div>
                <span class="sbrws_label">设备代码</span>
                <div class="sbrws_text">{{ selectedRow.code }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">设备型号</span>
                <div class="sbrws_text">{{ selectedRow.spec }}</div>
                <span class="sbrws_label">生产日期</span>
                <div class="sbrws_text">{{ selectedRow.manufactureDate || '2025-01-01' }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">购买日期</span>
                <div class="sbrws_text">{{ selectedRow.purchaseDate || '2025-01-01' }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">上一次维护时间</span>
                <div class="sbrws_text">{{ selectedRow.lastMaintainDate || '2025-11-21' }}</div>
            </div>
            <div class="sbrws_box">
                <span class="sbrws_label">下一期维护时间</span>
                <div class="sbrws_text">{{ selectedRow.nextMaintainDate || '2025-11-21' }}</div>
            </div>
        </div>

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">设备告警信息</div>
        </div>

        <div class="device-table-wrapper">
            <el-table class="device-custom-table" ref="tableRef" :data="source2" highlight-current-row>
                <el-table-column prop="deviceName" label="报警设备名称" show-overflow-tooltip />
                <el-table-column prop="title" label="报警标题" show-overflow-tooltip />
                <el-table-column prop="type_dictText" label="报警类型" show-overflow-tooltip />
                <el-table-column prop="level_dictText" label="报警级别" show-overflow-tooltip />
                <el-table-column prop="cause" label="报警原因" show-overflow-tooltip />

            </el-table>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, onUnmounted, nextTick } from 'vue'
import { queryAlarmCurrent, queryManageList } from '@/api/user'

const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    }
})

const queryAlarmCurrents = () => {
    queryAlarmCurrent({ "pageSize": 100, "pageNo": 1 }).then(res => {
        console.log(res)
    })
}

const queryManageLists = () => {
    queryManageList({ "pageSize": 100, "pageNo": 1 }).then(res => {
        console.log(res)
    })
}
const source2 = [
    {
        "level_dictText": "错误报警",
        "cause": "测试原因1111111111111111112",
        "type_dictText": "硬件报警",
        "title": "测试标题11111111111112",
        "deviceName": "四向车002"
    },
    {
        "cause": "儿童退热贴",
        "title": null,
        "type_dictText": null,
        "level_dictText": null,
        "deviceName": "立体仓库001"
    },
    {
        "cause": "223232",
        "title": null,
        "type_dictText": null,
        "level_dictText": null,
        "deviceName": "四向车002"
    }
]
const source = [
    {
        code: '64BC256336654588523369814CVT3',
        name: '堆垛机',
        lastMaintainDate: '2025-11-23',
        nextMaintainDate: '2025-12-23',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '某某厂家',
        spec: 'DZ-001',
        status: '在线',
        quantity: ''
    },
    {
        code: '74BC256336654588523369814CVT4',
        name: 'AGV小车',
        lastMaintainDate: '2025-12-15',
        nextMaintainDate: '2025-12-23',
        deviceType: '智能设备',
        subDeviceType: '运输设备',
        manufacturer: '智能科技',
        spec: 'AGV-2023',
        status: '在线',
        quantity: '5'
    },
    {
        code: '84BC256336654588523369814CVT5',
        name: '码垛机器人',
        lastMaintainDate: '2026-01-10',
        nextMaintainDate: '2025-12-23',
        deviceType: '智能设备',
        subDeviceType: '作业设备',
        manufacturer: '机器人公司',
        spec: 'MD-500',
        status: '离线',
        quantity: '2'
    },
    {
        code: '94BC256336654588523369814CVT6',
        name: '输送带',
        lastMaintainDate: '2025-10-20',
        nextMaintainDate: '2025-12-23',
        deviceType: '智能设备',
        subDeviceType: '传输设备',
        manufacturer: '传输设备厂',
        spec: 'SST-100',
        status: '在线',
        quantity: ''
    }
]

// 响应式数据
const activeTab = ref(1);
const selectedRow = ref(source[0]);
const input3 = ref('')

const handleRowClick = (row) => {
    selectedRow.value = row;
};

const handleAlertSearch = () => { }
const handleAlertReset = () => { }

onMounted(() => {
    // 页面逻辑初始化
});

onUnmounted(() => {
    // 清理资源
})
</script>

<style scoped>
.left {
    display: flex;
    flex-direction: column;
}

.device-table-wrapper {
    flex: 1;
    margin: 10px 16px 0px 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.device-custom-table {
    width: 100%;
    height: 100%;
}

/* 针对此页面的表格自定义样式 */
::v-deep(.device-custom-table.el-table) {
    background-color: transparent !important;
}

::v-deep(.device-custom-table .el-table__header-wrapper th) {
    background-color: rgba(9, 93, 190, 0.9) !important;
    color: #04E9E9 !important;
    font-size: 14px !important;
    font-weight: normal !important;
    border-bottom: 2px solid #1C70D7;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

/* 确保表头内部 cell 也不换行 */
::v-deep(.device-custom-table .el-table__header-wrapper th .cell) {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

::v-deep(.device-custom-table .el-table__row) {
    background-color: rgba(9, 93, 190, 0.4) !important;
    cursor: pointer !important;
}

::v-deep(.device-custom-table .el-table__row td) {
    color: #E9FBFF !important;
    border-bottom: 1px solid rgba(28, 112, 215, 0.3);
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

::v-deep(.device-custom-table .cell) {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    word-break: break-all !important;
}

::v-deep(.device-custom-table.el-table--enable-row-hover .el-table__body tr:hover > td) {
    background-color: rgba(28, 112, 215, 0.6) !important;
}

::v-deep(.device-custom-table .el-table__body tr.current-row > td) {
    background-color: rgba(28, 112, 215, 0.9) !important;
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
    margin-bottom: 0px;
}

.sbrwright .sbrws_box {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 15px;
    line-height: 1.6;
    background: #095DBE;
    padding: 2px 5px;
    margin-bottom: 12px;
}

.sbrwright .sbrws_label {
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