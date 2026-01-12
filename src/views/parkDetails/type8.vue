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
                    <div class="biaodian_text">空间</div>
                </div>
            </div>

            <div class="hwbox">
                <div class="hwbox_list">
                    <template v-for="value in hwbox">
                        <div class="hwbox_tip" v-if="value.tip == 1"></div>
                        <div class="hwbox_tip2" v-if="value.tip == 2"></div>

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
    background: #fff;
    border-radius: 5px;
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
    background: linear-gradient(0deg, #D09292, #C82270);
}

.biaodian_lable2 {
    width: 16px;
    height: 15px;
    background: linear-gradient(0deg, #43EA80, #38F8D4) !important;

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
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue'


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