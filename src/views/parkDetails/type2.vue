<template>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data">
                    <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="设备类型" />
                    <el-table-column prop="countNums3" label="检测点位置" show-overflow-tooltip />
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

const showMenus = ref(false);
const menuRef = ref(null);
const input3 = ref('');
const ueResponseData = inject('ueResponseData')
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

var data = [
    {
        countNums1: "电表#1",
        countNums2: "环境检测",
        countNums3: "电井1号电表",
        countNums4: "65kw",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },
    {
        countNums1: "电表#2",
        countNums2: "环境检测",
        countNums3: "电井2号电表",
        countNums4: "69kw",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "电表#3",
        countNums2: "环境检测",
        countNums3: "电井3号电表",
        countNums4: "85kw",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "1号检测点温度过高",
        type: 2

    },

    {
        countNums1: "水表#1",
        countNums2: "环境检测",
        countNums3: "水泵房1号水表",
        countNums4: "15t",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "水表#2",
        countNums2: "环境检测",
        countNums3: "水泵房1号水表",
        countNums4: "20t",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

    },

    {
        countNums1: "水表#3",
        countNums2: "环境检测",
        countNums3: "水泵房1号水表",
        countNums4: "25t",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3

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