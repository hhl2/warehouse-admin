<template>


    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">

        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">告警联动</div>
        </div>


        <div class="gjld">
            <div class="xbt">
                <img src="@/assets/xbt.png" />
                <div class="xbt_text">仓库火灾应急方案</div>
            </div>

            <div class="gjld_text">
                <div>方案步骤：</div>
                <div> 1.根据人员分布情况计算最近避灾区域<br /> 2.打开广播，播报逃生指引<br /> 3.打开逃生门禁</div>
            </div>

        </div>

    </div>


</template>

<style scoped>
.gjld {
    margin: 24px 20px;
    background: transparent;
    height: calc(100vh - 250px);
    border: 1px solid #1C70D7;
    border-radius: 5px;
}

.gjld_text {
    font-family: Microsoft YaHei;
    font-weight: 500;
    font-size: 18px;
    color: #ECFFFF;
    padding: 12px;
    letter-spacing: 3px;
    line-height: 2;

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


</script>