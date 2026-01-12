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

                    <el-table-column prop="countNams6" label="状态" width="50">

                        <template #default="scope">
                            <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                                {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="countNums5" label="告警时间" show-overflow-tooltip />

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
                    <el-table-column prop="" label="关联应急预案" show-overflow-tooltip>
                        <template #default="scope">
                            <img src="" alt="">

                        </template>
                    </el-table-column>




                </el-table>


            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_text_box">

                <div class="title_txets">立体仓库</div>
                <div class="title_txets">平置仓库</div>
                <div class="title_txets">堆场</div>
            </div>
        </div>


        <div class="inputbox">
            <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            <div class="yylf_search_box">查询</div>
        </div>

        <div class="changleft2">


            <el-table class="my-spacing-table2" ref="tableRef" :data="data2">
                <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="设备类型" />
                <el-table-column prop="countNums3" label="检测点位置" show-overflow-tooltip />

                <el-table-column prop="countNams6" label="状态" width="50">

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

.inputbox {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.yylf_search_box {
    width: 50px;

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



.spjkList_label {
    margin-top: 10px;
    color: #fff;
    font-size: 18px;

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

.imgbox {
    width: 390px;
    height: 360px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.title_text_box {
    position: absolute;
    top: -5px;
    left: 10px;
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.title_text_box .title_txets {
    font-size: 22px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

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

.context_tan {}

.my-spacing-table {
    height: 288px;
}

.my-spacing-table2 {
    height: 750px;
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

const showMenus = ref(false);
const menuRef = ref(null);
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'xfjc') {
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
        {},
        {},
        {},
        {}
    ]




const statusClassMap = reactive({
    '紧急告警': 'status-normal',
    '重要告警': 'status-important',
    '一般告警': 'status-urgent'
})

const statusClassMaps = reactive({
    '1': 'status-urgent',
    '2': 'status-important',
    '3': 'status-normal'
})

var data = [
    {
        countNums1: "烟感#1",
        countNums2: "消防检测",
        countNums3: "大厅1号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },
    {
        countNums1: "烟感#2",
        countNums2: "消防检测",
        countNums3: "大厅2号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "烟感#3",
        countNums2: "消防检测",
        countNums3: "大厅3号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "一般告警",
        countNums8: "烟雾浓度每米>3%",
        type: 1

    },

    {
        countNums1: "火灾预警器#1",
        countNums2: "消防检测",
        countNums3: "大厅4号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "一号区域火灾报警",
        type: 1

    },

    {
        countNums1: "火灾预警器#2",
        countNums2: "消防检测",
        countNums3: "大厅5号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "火灾预警器#3",
        countNums2: "消防检测",
        countNums3: "大厅6号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },



];

var data2 = [
    {
        countNums1: "烟感#1",
        countNums2: "消防检测",
        countNums3: "大厅1号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },
    {
        countNums1: "烟感#2",
        countNums2: "消防检测",
        countNums3: "大厅2号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "火灾预警器#1",
        countNums2: "消防检测",
        countNums3: "大厅4号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "一号区域火灾报警",
        type: 1

    },

    {
        countNums1: "火灾预警器#2",
        countNums2: "消防检测",
        countNums3: "大厅5号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "火灾预警器#3",
        countNums2: "消防检测",
        countNums3: "大厅6号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },
    {
        countNums1: "声光预警器#1",
        countNums2: "消防检测",
        countNums3: "大厅7号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "一号区域火灾报警",
        type: 1

    },
    {
        countNums1: "声光预警器#2",
        countNums2: "消防检测",
        countNums3: "大厅8号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },
    {
        countNums1: "声光预警器#3",
        countNums2: "消防检测",
        countNums3: "大厅9号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    }, {
        countNums1: "烟感#1",
        countNums2: "消防检测",
        countNums3: "大厅1号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2

    },
    {
        countNums1: "烟感#2",
        countNums2: "消防检测",
        countNums3: "大厅2号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1

    },

    {
        countNums1: "火灾预警器#1",
        countNums2: "消防检测",
        countNums3: "大厅4号监测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "一号区域火灾报警",
        type: 1

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