<template>
    <div class="testmiansx" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmianx">
            <div class="title">
                <img src="@/assets/title_bgs.png" alt="">
                <div class="title_txet">货物总览</div>
            </div>
            <div class="biaodian">
                <div class="biaodian_box">
                    <div class="biaodian_lable"></div>
                    <div class="biaodian_text">占用</div>
                </div>
                <div class="biaodian_box">
                    <div class="biaodian_lable2 "></div>
                    <div class="biaodian_text">空闲</div>
                </div>
            </div>

            <div class="hwbox">
                <div class="hwbox_list">
                    <!-- <template v-for="value in hwbox">
                        <div class="hwbox_tip" v-if="value.tip == 1"></div>
                        <div class="hwbox_tip2" v-if="value.tip == 2"></div>

                    </template> -->


                    <template v-for="value in hwboxs">
                        <div class="hwbox_tip2" v-if="value.isUsed == 1"></div>
                        <div class="hwbox_tip" v-else></div>


                    </template>

                </div>




            </div>


        </div>
    </div>




</template>

<style scoped>
.hwbox_tip {
    width: 18px;
    height: 34px;
    background-color: #C56843;
    margin: 5px 6px;

}

.hwbox_tip2 {
    width: 18px;
    height: 34px;
    background-color: #518670;
    margin: 5px 6px;

}

.hwbox {
    width: 1240px;
    height: 270px;
    margin: 10px 20px;
    /* 玻璃质感：渐变背景 + 背景模糊 */
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    /* 边缘高光 */
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15),
        inset 0 0 10px rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
}

.hwbox_list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;

}

.biaodian {

    display: flex;
    align-items: center;
    position: absolute;
    justify-content: space-between;
    width: 180px;
    right: 20px;
    top: 15px;
}

.biaodian_box {
    display: flex;
    align-items: center;
}

.biaodian_lable {
    width: 16px;
    height: 15px;
    background-color: #518670;
}

.biaodian_lable2 {
    width: 16px;
    height: 15px;
    background-color: #C56843;
}


.biaodian_text {
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    color: #04E9E9;
    background: linear-gradient(0deg, #A1C4FD 0%, #C2E9FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 10px;


}




.testmiansx {
    padding: 20px 15px;
    background: url('@/assets/长框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1287px;
    height: 351px;
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
</style>

<script setup>
import {
    queryYardWarehouseInfo,

} from "@/api/user";
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue'


onMounted(() => {
    queryYardWarehouseInfos();

})


const queryYardWarehouseInfos = () => {
    queryYardWarehouseInfo().then(res => {

        if (res?.code == 0) {
            hwboxs.value = res.data?.list || []

        } else {
            hwboxs.value = []

        }
        console.log(res)
    })
}



const hwboxs = ref([{
    "warehouseId": "51B52B0938154D9B83021E75E10A7D58",
    "warehouseName": "1层2列",
    "warehouseCode": "031864T64T003001001002",
    "warehouseFullName": "清远检储配专用仓库/闲置库房/堆场区/01/1层2列",
    "isUsed": 1
},
{
    "warehouseId": "640f57e42a1d44e4abe0d58b4935b426",
    "warehouseName": "A11",
    "warehouseCode": "031864T64V64R0101",
    "warehouseFullName": "清远检储配专用仓库/报废库房/601出货区/0101/A11",
    "isUsed": 1
},
{
    "warehouseId": "6C63F961516A444193DB7CBC4AC3ED9C",
    "warehouseName": "1层3列",
    "warehouseCode": "031864T64T003001001003",
    "warehouseFullName": "清远检储配专用仓库/闲置库房/堆场区/01/1层3列",
    "isUsed": 1
},])



const hwbox = ref([
    { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 },
    { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 },
    { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 2 }, { "tip": 1 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
    { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 }, { "tip": 2 }, { "tip": 1 },
])


</script>