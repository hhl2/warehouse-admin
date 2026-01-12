<template>

    <div class="lefts" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title" style="margin-top: 10px;">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">货物模型</div>
        </div>
        <div class="imgbox2">
            <img src="@/assets/try/work5.png" alt="">
        </div>
    </div>


    <div>

    </div>

    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data">
                    <el-table-column prop="countNums1" label="入库单号" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="入库时间" />
                    <el-table-column prop="countNums3" label="货位编码" show-overflow-tooltip />
                    <el-table-column prop="countNums4" label="物资编码" />
                    <el-table-column prop="countNums5" label="物资名称" show-overflow-tooltip />
                    <el-table-column prop="countNams6" label="数量" width="60">
                    </el-table-column>
                </el-table>


            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">摄像头</div>
        </div>
        <div class="imgbox3">
            <img src="@/assets/try/work51.png" alt="">
        </div>

        <div class="changleft">
            <el-table class="my-spacing-table2" ref="tableRef" :data="data1">
                <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="设备类型" />
                <el-table-column prop="countNums3" label="监测点位置" show-overflow-tooltip />

                <el-table-column prop="countNams4" label="状态" width="60">
                    <template #default="scope">
                        <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                            {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>


        </div>
    </div>


</template>

<style scoped>
.testmians.panel-collapsed {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
    pointer-events: none;
}

.lefts.panel-collapsed {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
}

.right {

    height: calc(100vh - 185px);

}

.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}



.changewidth {
    margin: 5px 15px 10px 10px;

}

.inputwidth {
    width: 240px;
}


.changleft {
    margin-left: 10px;
    margin-right: 5px;

}

.my-spacing-table2 {

    height: 420px;
}


.my-spacing-table {
    height: 250px;
}

.imgbox3 {
    width: 420px;
    height: 294px;
    background-color: #fff;
    margin: 15px 10px 15px 20px;
}

.imgbox3 img {
    width: 100%;
    height: 100%;
}



.imgbox2 {
    width: 436px;
    height: 248px;
    background-color: #fff;
    margin: 15px 10px 10px 20px;
}

.imgbox2 img {
    width: 100%;
    height: 100%;
}

.lefts {
    width: 485px;
    height: 354px;
    position: absolute;
    z-index: 31;
    background: url('@/assets/try/小框左.png') no-repeat right top;
    background-size: 100% 100%;
    left: 15px;
    bottom: 80px;
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 transparent;


}






.testmians {
    margin: 0 auto;
}

.testmian {
    padding: 20px 15px;
    background: url('@/assets/框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 855px;
    height: 300px;
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    z-index: 999;

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
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'poi') {
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

const data = ref([
    {
        countNums1: "CK001",
        countNums3: "A3001",
        countNums4: "012223001",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "12台",
    },
    {
        countNums1: "CK002",
        countNums3: "A3002",
        countNums4: "012223001",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "10台",
    },
    {
        countNums1: "CK003",
        countNums3: "A3003",
        countNums4: "012223003",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "8台",
    },
    {
        countNums1: "CK004",
        countNums3: "A3004",
        countNums4: "012223004",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "4台",
    },
    {
        countNums1: "CK006",
        countNums3: "A3006",
        countNums4: "012223006",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "12台",
    },

    {
        countNums1: "CK001",
        countNums3: "A3001",
        countNums4: "012223001",
        countNums2: "2025-04-12 10:24",
        countNums5: "变压器",
        countNams6: "12台",
    },




]);

const data1 = ref([{
    countNums1: "摄像头#1",
    countNums2: "球机",
    countNums3: "ADD",
    countNums4: "在线",

}, {
    countNums1: "摄像头#2",
    countNums2: "球机",
    countNums3: "ADD2",
    countNums4: "在线",

}, {
    countNums1: "摄像头#3",
    countNums2: "球机",
    countNums3: "ADD3",
    countNums4: "在线",

}, {
    countNums1: "摄像头#4",
    countNums2: "球机",
    countNums3: "ADD4",
    countNums4: "在线",

}, {
    countNums1: "摄像头#5",
    countNums2: "球机",
    countNums3: "ADD5",
    countNums4: "在线",

}, {
    countNums1: "摄像头#6",
    countNums2: "球机",
    countNums3: "ADD6",
    countNums4: "在线",

}, {
    countNums1: "摄像头#7",
    countNums2: "球机",
    countNums3: "ADD7",
    countNums4: "在线",

}, {
    countNums1: "摄像头#8",
    countNums2: "球机",
    countNums3: "ADD8",
    countNums4: "在线",

}, {
    countNums1: "摄像头#9",
    countNums2: "球机",
    countNums3: "ADD9",
    countNums4: "在线",

}, {
    countNums1: "摄像头#10",
    countNums2: "球机",
    countNums3: "ADD10",
    countNums4: "在线",

}])
// 生命周期
onMounted(() => {
    document.addEventListener("click", handleClickOutside);

});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>