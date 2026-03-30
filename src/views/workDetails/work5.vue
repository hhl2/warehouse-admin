﻿<template>

    <!-- <div class="lefts" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title" style="margin-top: 10px;">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">货物模型</div>
        </div>
        <div class="imgbox2">
            <img :src="lstPicture" alt="">
        </div>
    <!-- </div> -->
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <!-- 货架切换栏 -->
            <div class="shelf-switch-container">
                <div class="shelf-switch-list">
                    <div class="shelf-switch-label">货架切换</div>
                    <div v-for="(item, index) in shelfItems" :key="index" class="shelf-switch-item"
                        :class="{ active: activeShelf === index }" @click="activeShelfChange(index)">
                        {{ item }}
                    </div>
                </div>
            </div>

            <div class="changewidth">
                <!-- <el-input v-model="input3" class="inputwidth inputwidth2" placeholder="请输入关键字" :prefix-icon="Search" /> -->
                <!-- 类别切换栏与搜索框同一行 -->
                <div class="category-switch-list">
                    <div v-for="(item, index) in categoryItems" :key="index" class="category-switch-item"
                        :class="{ active: activeCategory === index }" @click="activeCategorys(index)">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="workdata" style="cursor: pointer;"
                    @row-click="handleInventoryRowClick">
                    <el-table-column prop="receiptCode" label="入库单号" show-overflow-tooltip />
                    <el-table-column prop="receiptTime" label="入库时间" />
                    <el-table-column prop="uniqueWarehouseCode" label="货位编码" show-overflow-tooltip />
                    <el-table-column prop="materialId" label="物资编码" />
                    <el-table-column prop="materialName" label="物资名称" show-overflow-tooltip />
                    <el-table-column prop="actualQty" label="数量" width="60">
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
        <div class="imgbox3" @click="openVideoPopup" style="cursor: pointer;">
            <div class="context_tans">
                <!-- 加载中状态 -->
                <div v-if="isLoadingVideo" class="loading-container">
                    <div class="spinner"></div>
                    <span class="loading-text">加载中...</span>
                </div>
                <!-- 视频播放 -->
                <div v-else-if="currentCamera.videoUrl" ref="videoElementSingle" style="width: 100%; height: 100%">
                </div>
                <!-- 无视频信号 -->
                <div v-else class="no-video">
                    <span>暂无视频信号</span>
                </div>
            </div>
        </div>

        <div class="changleft" style="flex: 1; display: flex; flex-direction: column; margin-bottom: 10px; overflow: hidden;">
            <el-table class="my-spacing-table2" ref="tableRef" :data="data1" @row-click="handleRowClick" height="100%">
                <el-table-column prop="cn" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="manufacturer" label="设备类型" />
                <el-table-column prop="cn" label="监测点位置" show-overflow-tooltip />

                <el-table-column prop="online" label="状态" width="50">
                    <template #default="scope">
                        <span class='status-normal'>{{ scope.row.online }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>


        </div>
    </div>



    <!-- 弹窗（遮罩层已禁用） -->
    <Transition name="fade">
        <div v-if="showSingleVideoPopup" class="context-menus" ref="menuRefSingle">
            <div class="sxtmName">
                <span>{{ currentCamera.name || '摄像头' }}</span>
                <span class="camera-status-single" :class="currentCamera.status || 'online'">●</span>
                <div class="close-popup" @click.stop="closeSingleVideoPopup">×</div>
            </div>
            <div class="context_tans_popup">
                <!-- 加载中状态 -->
                <div v-if="isLoadingVideo" class="loading-container">
                    <div class="spinner"></div>
                    <span class="loading-text">加载中...</span>
                </div>
                <!-- 视频播放 -->
                <div v-else-if="currentCamera.videoUrl" ref="videoElementPopup" style="width: 100%; height: 100%">
                </div>
                <!-- 无视频信号 -->
                <div v-else class="no-video">
                    <span>暂无视频信号</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.testmian {
    position: relative;
    padding: 25px 20px;
    background: url('@/assets/long-frame-center.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 1250px;
    height: 330px;
    position: fixed;
    bottom: 80px;
    z-index: 999;
    left: calc(100% - 1170px);
}

.right {
    height: calc(100vh - 185px);
    display: flex;
    flex-direction: column;
}

.status-normal {
    color: #8AFC67;

}

.status-important {
    color: #E9333D;
}




.inputwidth {
    width: 240px;
}


.changleft {
    margin-left: 10px;
    margin-right: 5px;

}

.my-spacing-table2 {
    flex: 1;
}


.my-spacing-table {
    height: 285px;
}

.imgbox3 {
    width: 432px;
    height: 248px;
    background-color: #fff;
    margin: 15px 10px 15px 20px;
    overflow: hidden;
}

.context_tans {
   width: 432px;
    height: 248px;
    background: transparent;
    border: none;
    overflow: hidden;
}

/* 无视频占位 */
.no-video {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #6c7a89;
    font-size: 16px;
}

/* 加载中容器 */
.loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(97, 179, 255, 0.2);
    border-top-color: #61B3FF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text {
    margin-top: 20px;
    color: #61B3FF;
    font-size: 16px;
    font-weight: 500;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

/* 弹窗相关样式 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.context-menus {
    width: 675px;
    height: 433px;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translate(-50%);
    background: url("@/assets/animation-popup.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 1001;
}

.context_tans_popup {
    width: 615px;
    height: 340px;
    background: transparent;
    border: none;
    margin: 5px 0px 0px 30px;
    overflow: hidden;
    border-radius: 4px;
}

.sxtmName {
    font-family: "Microsoft YaHei", sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #61B3FF 0.4%, rgba(255, 255, 255, 0.11) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 45px;
    position: relative;
    cursor: pointer;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;
}

.camera-status-single {
    font-size: 12px;
    margin-left: 10px;
    -webkit-text-fill-color: currentColor;
}

.camera-status-single.online {
    color: #52c41a;
    animation: blink 2s infinite;
}

.camera-status-single.offline {
    color: #ff4d4f;
}

@keyframes blink {

    0%,
    50%,
    100% {
        opacity: 1;
    }

    25%,
    75% {
        opacity: 0.5;
    }
}

.close-popup {
    position: absolute;
    right: 5px;
    top: -10px;
    width: 34px;
    height: 34px;
    line-height: 20px;
    border-radius: 50%;
    background: rgba(255, 100, 100, 0.8);
    color: #fff;
    -webkit-text-fill-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 1002;
}

.close-popup:hover {
    background: rgba(255, 60, 60, 1);
    transform: scale(1.1);
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

.imgbox2 img {
    width: 100%;
    height: 100%;
}






.shelf-switch-container {
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    background: rgba(26, 103, 191, 0.8);
    border: 1px solid rgba(45, 169, 192, 0.5);
    border-radius: 4px;
    padding: 2px 10px;
    z-index: 1000;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.shelf-switch-label {
    color: #4ed5ff;
    font-size: 16px;
    font-weight: bold;
    margin-right: 25px;
    position: relative;
    padding: 8px 0;
}

.shelf-switch-label::after {
    content: '';
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 14px;
    background: rgba(45, 169, 192, 0.5);
}

.shelf-switch-list {
    display: flex;
    gap: 5px;
}

.shelf-switch-item {
    color: #FBFBFB;
    padding: 5px 14px;
    cursor: pointer;
    border-radius: 0px;
    transition: all 0.2s;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.shelf-switch-item:hover {
    color: #fff;
    background: rgba(45, 169, 192, 0.3);
}

.shelf-switch-item.active {
    color: #fff;
    background: #093C85;
    font-weight: bold;
    box-shadow: inset 0 0 8px rgba(78, 213, 255, 0.5);
}

.changewidth {
    margin-bottom: 10px;
    margin-top: 0px;
    margin-left: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
}

.category-switch-list {
    display: flex;
    gap: 30px;
    align-items: center;
}

.category-switch-item {
    color: #A3D8FF;
    padding: 6px 20px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid transparent;
}

.category-switch-item:hover {
    color: #fff;
    background: rgba(45, 169, 192, 0.1);
}

.category-switch-item.active {
    color: #fff;
    background: linear-gradient(180deg, rgba(14, 88, 175, 0.8) 0%, rgba(30, 144, 255, 0.9) 100%);
    border: 1px solid rgba(89, 203, 255, 0.4);
    box-shadow: inset 0px -4px 10px rgba(0, 255, 255, 0.6);
}
</style>

<script setup>
import {
    queryDistributionInfoPagination,
    queryDistributionPicture


} from "@/api/user";
import request from '@/utils/request'

// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, inject, watch, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import defaultImg from '@/assets/try/work5.png'

const showMenus = ref(false);
const input3 = ref("");
const menuRef = ref(null);
const warehouseCode = ref("")
const wareouseId = ref("")

// @。 四向车库：八排；轻库：十二排；重库；六排
//  重型立库：code :0318080022 03180800PL id:67901a31e08a49f98dab0240fc8f1282   立库：03180800KS id;aebf01bd6fae4f63a1d2bbb4c8208e0c  穿梭车库：code :0318080022    id:b9fe3b7bf47847ce8ccc5fb69a889d90
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const ckcodeMap = ['QLK', 'ZLK', 'PK'];

const activeCategorys = (index) => {
    activeCategory.value = index;
    const ckcode = ckcodeMap[index] || '';
    if (ckcode == 'QLK') {
        warehouseCode.value = "03180800KS"
        wareouseId.value = "aebf01bd6fae4f63a1d2bbb4c8208e0c"
        shelfItems.value = ['全部', '第一排', '第二排', '第三排', '第四排', '第五排', '第六排', '第七排', '第八排', '第九排', '第十排', '第十一排', '第十二排']
    } else if (ckcode == 'ZLK') {
        warehouseCode.value = "03180800PL"
        wareouseId.value = "67901a31e08a49f98dab0240fc8f1282 "
        shelfItems.value = ['全部', '第一排', '第二排', '第三排', '第四排', '第五排', '第六排']
    } else {
        warehouseCode.value = "0318080022"
        wareouseId.value = "b9fe3b7bf47847ce8ccc5fb69a889d90 "
        shelfItems.value = ['全部', '第一排', '第二排', '第三排', '第四排', '第五排', '第六排', '第七排', '第八排']
    }
    activeShelf.value = 0;
    queryDistributionInfoPaginations();
    console.log('点击触发', { "code": 1, "type": "btn", "data": { "id": 26, "ckcode": ckcode } });
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": 26, "ckcode": ckcode } });
}

// 货架切换数据
const activeShelf = ref(0);
const shelfItems = ref(['全部', '第一排', '第二排', '第三排', '第四排', '第五排', '第六排', '第七排', '第八排', '第九排', '第十排', '第十一排', '第十二排']);

const activeShelfChange = (index) => {
    activeShelf.value = index;
    console.log('点击触发', { "code": 1, "type": "huojia", "data": { "id": index } });
    callParentMethod({ "code": 1, "type": "huojia", "data": { "id": index } });
};

// 实时库存表格点击行事件
const handleInventoryRowClick = (row) => {
    if (!row) return;
    const id = row.materialId || '';
    console.log(row,'row')
    const uniqueWarehouseCode = row.uniqueWarehouseCode || '';
    console.log('库存行点击', { "code": 1, "type": "goods", "data": { "id": uniqueWarehouseCode} });
    // callParentMethod({ "code": 1, "type": "goods", "data": { "id": uniquewarehouseCode, "warehouseCode": warehouseCode } });
};

// 新增分类切换数据 (与搜索框同级)
const activeCategory = ref(0);
const categoryItems = ref(['轻载立库', '重载立库', '四向车库',]);
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type && newVal?.json.type == 'poi') {
            // showMenus.value = true

        }

    }
})

const handleClickOutside = (event) => {
    // console.log(event, menuRef.value.contains(event.target))
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

const isLoadingVideo = ref(false); // 视频加载状态
const videoElementSingle = ref(null);
const easyPlayerInstance = ref(null);

const showSingleVideoPopup = ref(false);
const menuRefSingle = ref(null);
const videoElementPopup = ref(null);
const easyPlayerInstancePopup = ref(null);

const currentCamera = ref({
    id: '',
    name: '',
    videoUrl: '',
    location: '',
    status: 'online'
});

const openVideoPopup = async () => {
    console.log('🎥 Clicking video box, current id:', currentCamera.value.id);

    // 点击时调用接口
    await fetchCameraVideoAndOpenPopup(
        currentCamera.value.id,
        currentCamera.value.name,
        currentCamera.value.status === 'online' ? 'online' : 'offline'
    );

    showSingleVideoPopup.value = true;
    await nextTick();
    initPopupPlayer();
};

const closeSingleVideoPopup = () => {
    destroyPopupPlayer();
    showSingleVideoPopup.value = false;
};

const initPopupPlayer = () => {
    destroyPopupPlayer();
    if (!videoElementPopup.value || !currentCamera.value.videoUrl) return;

    try {
        let videoUrl = currentCamera.value.videoUrl;
        if (videoUrl && !videoUrl.match(/^(http|https|ws|wss|webrtc|wt|artc):/)) {
            videoUrl = window.location.origin + videoUrl;
        }

        easyPlayerInstancePopup.value = new window.EasyPlayerPro(videoElementPopup.value, {
            stretch: true,
            hasAudio: true,
            autoplay: true,
            live: false,
            object_fit: "fill",
        });
        easyPlayerInstancePopup.value.play(videoUrl);
    } catch (error) {
        console.error('弹窗播放器初始化失败:', error);
    }
};

const destroyPopupPlayer = () => {
    if (easyPlayerInstancePopup.value) {
        try {
            easyPlayerInstancePopup.value.destroy();
            easyPlayerInstancePopup.value = null;
        } catch (error) {
            console.error('销毁弹窗播放器出错:', error);
            easyPlayerInstancePopup.value = null;
        }
    }
};

// 通用函数：根据摄像头ID获取视频URL并打开弹窗
const fetchCameraVideoAndOpenPopup = async (cameraId, cameraName = '摄像头', cameraStatus = 'online') => {
    currentCamera.value.id = cameraId; // 保存ID以便重试或弹窗使用
    currentCamera.value.name = cameraName;
    currentCamera.value.status = cameraStatus;
    currentCamera.value.videoUrl = '';

    if (!cameraId) {
        isLoadingVideo.value = false;
        console.warn('摄像头ID为空，显示暂无信号');
        return;
    }

    isLoadingVideo.value = true;

    try {
        const safeCameraId = String(cameraId);
        const response = await request({
            url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
            method: 'post',
            data: {
                cameraIndexCode: safeCameraId
            },
            skipGlobalParams: true
        });

        if (response && response.code === '0' && response.data && response.data.url) {
            currentCamera.value.videoUrl = response.data.url;
            await nextTick();
            if (currentCamera.value.videoUrl) {
                initSingleFlvPlayer();
            }
        }
    } catch (error) {
        console.error('调用视频预览接口失败:', error);
    } finally {
        isLoadingVideo.value = false;
    }
}

const handleRowClick = async (row) => {
    if (!row) return;
    await fetchCameraVideoAndOpenPopup(
        row.id || '',
        row.cn || '摄像头',
        row.online === '在线' ? 'online' : 'offline'
    );
    // 点击表格行时，同步打开大屏弹窗
    openVideoPopup();
}

// 初始化单画面播放器 (使用 EasyPlayer)
const initSingleFlvPlayer = async () => {
    destroySingleFlvPlayer();
    await nextTick();

    if (!videoElementSingle.value || !currentCamera.value.videoUrl) {
        if (currentCamera.value.videoUrl && !videoElementSingle.value) {
            setTimeout(() => {
                initSingleFlvPlayer();
            }, 200);
        }
        return;
    }

    try {
        const videoUrl = currentCamera.value.videoUrl;
        if (!window.EasyPlayerPro) {
            console.error('EasyPlayer Pro 库未加载');
            return;
        }
        initEasyPlayer(videoUrl);
    } catch (error) {
        console.error('播放器初始化失败:', error);
    }
};

const initEasyPlayer = (videoUrl) => {
    try {
        let absoluteUrl = videoUrl;
        if (videoUrl && !videoUrl.match(/^(http|https|ws|wss|webrtc|wt|artc):/)) {
            absoluteUrl = window.location.origin + videoUrl;
        }

        easyPlayerInstance.value = new window.EasyPlayerPro(videoElementSingle.value, {
            stretch: true,
            hasAudio: true,
            autoplay: true,
            live: false,
            object_fit: "fill",
        });

        easyPlayerInstance.value.play(absoluteUrl);
    } catch (error) {
        console.error('EasyPlayer 初始化失败:', error);
    }
};

const destroySingleFlvPlayer = () => {
    if (easyPlayerInstance.value) {
        try {
            easyPlayerInstance.value.destroy();
            easyPlayerInstance.value = null;
        } catch (error) {
            console.error('销毁播放器时出错:', error);
            easyPlayerInstance.value = null;
        }
    }
};


//货位模型接口
const lstPicture = ref(defaultImg)

const queryDistributionPictures = (id) => {
    queryDistributionPicture({
        id: id || '48B574059A8F4A859D9352DB5A3628DB'
    }).then(res => {
        console.log('queryDistributionPicture 接口返回:', res)

        if (res?.code == 200) {
            lstPicture.value = res?.data?.lstPicture
        }

    })
}

//实时库存数据接口

const queryDistributionInfoPaginations = () => {

    queryDistributionInfoPagination({
        "bureauCode": "0318",
        "provinceCode": "03",
        "warehouseCode": warehouseCode.value,
        wareouseId: wareouseId.value,
        "pageNo": 1,
        "pageSize": 999,
    }).then(res => {

        // 因为 request.js 拦截器已经返回了 response.data，所以这里直接判断 res.code
        if (res?.code == 0) {
            const list = res?.data?.list || []
            workdata.value = list.map(item => {
                return {
                    ...item,
                    receiptTime: item.receiptTime ? new Date(item.receiptTime).toLocaleString() : ''
                }
            })
            if (list.length > 0) {
                queryDistributionPictures(list[0].id)
            }
        } else {
            console.warn('实时库存接口返回状态非 200:', res);
            workdata.value = workdata.value.map(item => {
                return {
                    ...item,
                    receiptTime: item.receiptTime ? new Date(item.receiptTime).toLocaleString() : ''
                }
            })
        }

    }).catch(err => {
        console.error('实时库存接口调用失败:', err);
    })
}

const workdata = ref([
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 1,
        "receiptTime": 1774571123663,
        "id": "35BCEB753F3A4EBEA12C422BDA73AAFE",
        "receiptCode": "SGR03042026030014",
        "materialId": "090114200000003",
        "uniqueWarehouseCode": "A0102011005",
        "actualQty": 1,
        "warehouseCode": "0304046001086002005011"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 2,
        "receiptTime": 1774514593436,
        "id": "40D1F7347F794A04BE89213BCE6B61BD",
        "receiptCode": "SGMPR03182026030012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "014010227A11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP002001027"
    },
    {
        "materialName": "防振锤，FD-3",
        "OUTER_TABLE_ROWNUM": 3,
        "receiptTime": 1774430032412,
        "id": "C71383DAE83B4B4892B05A54A3A7372A",
        "receiptCode": "SGR03182026030070",
        "materialId": "020500500010153",
        "uniqueWarehouseCode": "034010106B11",
        "actualQty": 200,
        "warehouseCode": "03180800229P2001002006"
    },
    {
        "materialName": "防振锤，FD-3",
        "OUTER_TABLE_ROWNUM": 4,
        "receiptTime": 1774430032412,
        "id": "B853A974A41143DB97D93371CC93F36F",
        "receiptCode": "SGR03182026030070",
        "materialId": "020500500010153",
        "uniqueWarehouseCode": "034010107B11",
        "actualQty": 160,
        "warehouseCode": "03180800229P2001002007"
    },
    {
        "materialName": "HDPE管塞, 适合外径Φ32",
        "OUTER_TABLE_ROWNUM": 5,
        "receiptTime": 1774429984785,
        "id": "B8307480A57245008FFD9ABBB1D3973F",
        "receiptCode": "SGR03182026030071",
        "materialId": "150100400010025",
        "uniqueWarehouseCode": "034010105B11",
        "actualQty": 1000,
        "warehouseCode": "03180800229P2001002005"
    },
    {
        "materialName": "防振锤（FD、FG型），FD-4",
        "OUTER_TABLE_ROWNUM": 6,
        "receiptTime": 1774429946113,
        "id": "4E977A40B4C4486E8DA03F2D0CDE23EF",
        "receiptCode": "SGR03182026030074",
        "materialId": "020500500010110",
        "uniqueWarehouseCode": "034010108B11",
        "actualQty": 180,
        "warehouseCode": "03180800229P2001002008"
    },
    {
        "materialName": "防振锤（FD、FG型），FD-4",
        "OUTER_TABLE_ROWNUM": 7,
        "receiptTime": 1774429946113,
        "id": "3A9972FA48D34C8D8EA6F10723DF5B18",
        "receiptCode": "SGR03182026030074",
        "materialId": "020500500010110",
        "uniqueWarehouseCode": "034010109B11",
        "actualQty": 180,
        "warehouseCode": "03180800229P2001002009"
    },
    {
        "materialName": "熔断丝5A",
        "OUTER_TABLE_ROWNUM": 8,
        "receiptTime": 1774429939516,
        "id": "91B8844DC470493CBD4B991BF4A6D694",
        "receiptCode": "SGR03182026030075",
        "materialId": "150201300020017",
        "uniqueWarehouseCode": "034010104B11",
        "actualQty": 1000,
        "warehouseCode": "03180800229P2001002004"
    },
    {
        "materialName": "10kV全冷缩户外终端头，3芯×120mm2",
        "OUTER_TABLE_ROWNUM": 9,
        "receiptTime": 1774429931160,
        "id": "54FE37CB8D394CC48BDA3A5FF54781DC",
        "receiptCode": "SGR03182026030079",
        "materialId": "171000200010005",
        "uniqueWarehouseCode": "034010102B11",
        "actualQty": 2,
        "warehouseCode": "03180800229P2001002002"
    },
    {
        "materialName": "10kV冷缩中间头，3×120mm2",
        "OUTER_TABLE_ROWNUM": 10,
        "receiptTime": 1774429926368,
        "id": "837831FF0DBE4F4DA2E6BD103E3662C4",
        "receiptCode": "SGR03182026030080",
        "materialId": "110046001224",
        "uniqueWarehouseCode": "034010101B11",
        "actualQty": 2,
        "warehouseCode": "03180800229P2001002001"
    },
    {
        "materialName": "10kV全冷缩户外终端头，3芯×70mm2",
        "OUTER_TABLE_ROWNUM": 11,
        "receiptTime": 1774429921688,
        "id": "98A3BFAAFC3A42039C5986A6F321A5F5",
        "receiptCode": "SGR03182026030081",
        "materialId": "171000200010008",
        "uniqueWarehouseCode": "034010108D11",
        "actualQty": 12,
        "warehouseCode": "03180800229P2001004008"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 12,
        "receiptTime": 1774429917321,
        "id": "D5AA031B110046ED8ED91530BBB59628",
        "receiptCode": "SGR03182026030082",
        "materialId": "040700300010001",
        "uniqueWarehouseCode": "034010109D11",
        "actualQty": 36,
        "warehouseCode": "03180800229P2001004009"
    },
    {
        "materialName": "10kV冷缩中间头，3×400mm2",
        "OUTER_TABLE_ROWNUM": 13,
        "receiptTime": 1774429906529,
        "id": "7F8EE03F9F2B431DA440B539B4645501",
        "receiptCode": "SGR03182026030066",
        "materialId": "171000100020007",
        "uniqueWarehouseCode": "034010103B11",
        "actualQty": 6,
        "warehouseCode": "03180800229P2001002003"
    },
    {
        "materialName": "C型线夹，CT-240-240",
        "OUTER_TABLE_ROWNUM": 14,
        "receiptTime": 1774421733530,
        "id": "84CE394686E84467B19B331993F060BB",
        "receiptCode": "SGMPR03182026030016",
        "materialId": "020501800010027",
        "uniqueWarehouseCode": "014010802H11",
        "actualQty": 50,
        "warehouseCode": "03180800PLSLP008008002"
    },
    {
        "materialName": "10kV瓷绝缘横担，RA5.0ET165L",
        "OUTER_TABLE_ROWNUM": 15,
        "receiptTime": 1774258296341,
        "id": "6EDF4FD0315F43E392BEAA1526A65130",
        "receiptCode": "SGR03182026030013",
        "materialId": "020600600010001",
        "uniqueWarehouseCode": "034010514F11",
        "actualQty": 108,
        "warehouseCode": "03180800229P2005006014"
    },
    {
        "materialName": "玻璃绝缘子，35kV～500kV，U70BLP-2，146mm，450mm，耐污型，70kN",
        "OUTER_TABLE_ROWNUM": 16,
        "receiptTime": 1774258289058,
        "id": "6DDD5A05895141F4B89D08A1EEF59713",
        "receiptCode": "SGR03182026030014",
        "materialId": "020600100030026",
        "uniqueWarehouseCode": "034010314E11",
        "actualQty": 60,
        "warehouseCode": "03180800229P2009005003"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-240",
        "OUTER_TABLE_ROWNUM": 17,
        "receiptTime": 1774258275706,
        "id": "19ED299F29F64D5793B9AD9075FDF6A6",
        "receiptCode": "SGR03182026030063",
        "materialId": "020200100010007",
        "uniqueWarehouseCode": "014010427C11",
        "actualQty": 0.5,
        "warehouseCode": "03180800PLSLP004003027"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-240",
        "OUTER_TABLE_ROWNUM": 18,
        "receiptTime": 1774258275706,
        "id": "E0460D779948428B8F36A94A2CEBCD21",
        "receiptCode": "SGR03182026030063",
        "materialId": "020200100010007",
        "uniqueWarehouseCode": "014010708B11",
        "actualQty": 0.5,
        "warehouseCode": "03180800PLSLP007002008"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 19,
        "receiptTime": 1773974018565,
        "id": "63BA363D2EAB46B597B70D6DDE40BB9C",
        "receiptCode": "SGMPR03182026030012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-120",
        "OUTER_TABLE_ROWNUM": 20,
        "receiptTime": 1773912469484,
        "id": "B656BAB4EB304D89A1968A081BA7600C",
        "receiptCode": "SGR03182026030056",
        "materialId": "020200100010011",
        "uniqueWarehouseCode": "014010125H11",
        "actualQty": 1.5,
        "warehouseCode": "03180800PLSLP001008025"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-120",
        "OUTER_TABLE_ROWNUM": 21,
        "receiptTime": 1773912469484,
        "id": "E7AB859428E24F8CAEB78BCE218DC931",
        "receiptCode": "SGR03182026030056",
        "materialId": "020200100010011",
        "uniqueWarehouseCode": "014010501B11",
        "actualQty": 1.5,
        "warehouseCode": "03180800PLSLP005002001"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-16",
        "OUTER_TABLE_ROWNUM": 22,
        "receiptTime": 1773912465122,
        "id": "EC2E060A095C4B50AAB4FEFD9AF01084",
        "receiptCode": "SGR03182026030057",
        "materialId": "020200100010008",
        "uniqueWarehouseCode": "014010925F11",
        "actualQty": 3.9,
        "warehouseCode": "03180800PLSLP009006025"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 23,
        "receiptTime": 1773912461320,
        "id": "CB8B1C2D979A49EEAEB769FD1F8A2FCF",
        "receiptCode": "SGR03182026030058",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "014010210B11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP002002010"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 24,
        "receiptTime": 1773912461320,
        "id": "7372D4951C3E45D6A28DF5B01E53EE3B",
        "receiptCode": "SGR03182026030058",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "014010410B11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP004002010"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-35",
        "OUTER_TABLE_ROWNUM": 25,
        "receiptTime": 1773912457384,
        "id": "7AB10628D436466BAC8329F9B984C2C5",
        "receiptCode": "SGR03182026030059",
        "materialId": "020200100010009",
        "uniqueWarehouseCode": "014011108C11",
        "actualQty": 3,
        "warehouseCode": "03180800PLSLP011003008"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-35",
        "OUTER_TABLE_ROWNUM": 26,
        "receiptTime": 1773912457384,
        "id": "0BD45BAD22434E819F32D6A0ECCCC25B",
        "receiptCode": "SGR03182026030059",
        "materialId": "020200100010009",
        "uniqueWarehouseCode": "014011225G11",
        "actualQty": 3,
        "warehouseCode": "03180800PLSLP012007025"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-70",
        "OUTER_TABLE_ROWNUM": 27,
        "receiptTime": 1773912452415,
        "id": "504490C02D5545ACABEA8ADE3343CEBF",
        "receiptCode": "SGR03182026030060",
        "materialId": "020200100010010",
        "uniqueWarehouseCode": "014011211B11",
        "actualQty": 2,
        "warehouseCode": "03180800PLSLP012002011"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-70",
        "OUTER_TABLE_ROWNUM": 28,
        "receiptTime": 1773912452414,
        "id": "BFDB53C4463342F1A6D547377660CEBE",
        "receiptCode": "SGR03182026030060",
        "materialId": "020200100010010",
        "uniqueWarehouseCode": "014010227D11",
        "actualQty": 2,
        "warehouseCode": "03180800PLSLP002004027"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-120",
        "OUTER_TABLE_ROWNUM": 29,
        "receiptTime": 1773912445840,
        "id": "9E1FEF63F3C24E2C93B7D8063802579B",
        "receiptCode": "SGR03182026030061",
        "materialId": "020200100010005",
        "uniqueWarehouseCode": "014010503H11",
        "actualQty": 0.8,
        "warehouseCode": "03180800PLSLP005008003"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-120",
        "OUTER_TABLE_ROWNUM": 30,
        "receiptTime": 1773912445840,
        "id": "21D44D3D2AE54140B9D5D2AE5976DDA8",
        "receiptCode": "SGR03182026030061",
        "materialId": "020200100010005",
        "uniqueWarehouseCode": "014010808F11",
        "actualQty": 0.8,
        "warehouseCode": "03180800PLSLP008006008"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-16",
        "OUTER_TABLE_ROWNUM": 31,
        "receiptTime": 1773912441353,
        "id": "ADA0D75EDC5644E584B62035978E7C50",
        "receiptCode": "SGR03182026030062",
        "materialId": "020200100010002",
        "uniqueWarehouseCode": "014010403G11",
        "actualQty": 3,
        "warehouseCode": "03180800PLSLP004007003"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-16",
        "OUTER_TABLE_ROWNUM": 32,
        "receiptTime": 1773912441353,
        "id": "2667413FCB294E02A51F0B1CD8085D18",
        "receiptCode": "SGR03182026030062",
        "materialId": "020200100010002",
        "uniqueWarehouseCode": "014010901B11",
        "actualQty": 3,
        "warehouseCode": "03180800PLSLP009002001"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-35",
        "OUTER_TABLE_ROWNUM": 33,
        "receiptTime": 1773912433287,
        "id": "027F125508AB4E6C9C8E440511757762",
        "receiptCode": "SGR03182026030064",
        "materialId": "020200100010003",
        "uniqueWarehouseCode": "014010111A11",
        "actualQty": 2,
        "warehouseCode": "03180800PLSLP001001011"
    },
    {
        "materialName": "500V铜芯低压电线，（双塑）BVV-35",
        "OUTER_TABLE_ROWNUM": 34,
        "receiptTime": 1773912433287,
        "id": "91357D779A884D2D9C530372BB9621E2",
        "receiptCode": "SGR03182026030064",
        "materialId": "020200100010003",
        "uniqueWarehouseCode": "014010402G11",
        "actualQty": 2,
        "warehouseCode": "03180800PLSLP004007002"
    },
    {
        "materialName": "100kVA变压器配电箱",
        "OUTER_TABLE_ROWNUM": 35,
        "receiptTime": 1773912428315,
        "id": "0C80E146613644A8B4564637C6EFB9F4",
        "receiptCode": "SGR03182026030065",
        "materialId": "040600400010002",
        "uniqueWarehouseCode": "024010310D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE003004010"
    },
    {
        "materialName": "100kVA变压器配电箱",
        "OUTER_TABLE_ROWNUM": 36,
        "receiptTime": 1773912428315,
        "id": "A429004EBD8E4A4692FC2324E0C0E97B",
        "receiptCode": "SGR03182026030065",
        "materialId": "040600400010002",
        "uniqueWarehouseCode": "024010419D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE004004019"
    },
    {
        "materialName": "10kV瓷套跌落式开关，100A",
        "OUTER_TABLE_ROWNUM": 37,
        "receiptTime": 1773912423698,
        "id": "CE8ED0575E5549C2B746376FC341D478",
        "receiptCode": "SGR03182026030067",
        "materialId": "040700400010002",
        "uniqueWarehouseCode": "014010203A11",
        "actualQty": 18,
        "warehouseCode": "03180800PLSLP002001003"
    },
    {
        "materialName": "10kV瓷套跌落式开关，100A",
        "OUTER_TABLE_ROWNUM": 38,
        "receiptTime": 1773912423698,
        "id": "BC28853C73D44EEAAE619574BAC1BF1C",
        "receiptCode": "SGR03182026030067",
        "materialId": "040700400010002",
        "uniqueWarehouseCode": "014011125E11",
        "actualQty": 18,
        "warehouseCode": "03180800PLSLP011005025"
    },
    {
        "materialName": "10kV交流外串联间隙金属氧化物避雷器，复合外套，YH10CX-17/50",
        "OUTER_TABLE_ROWNUM": 39,
        "receiptTime": 1773912416903,
        "id": "873A3D04FB0F4FCE89DAB378B099A7A3",
        "receiptCode": "SGR03182026030069",
        "materialId": "021100300020007",
        "uniqueWarehouseCode": "014011217E11",
        "actualQty": 126,
        "warehouseCode": "03180800PLSLP012005017"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 40,
        "receiptTime": 1773912376998,
        "id": "65E4C612218542C99F96040D6E9CEE57",
        "receiptCode": "SGR03182026030051",
        "materialId": "040700300010001",
        "uniqueWarehouseCode": "014010102B11",
        "actualQty": 54,
        "warehouseCode": "03180800PLSLP001002002"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 41,
        "receiptTime": 1773909049559,
        "id": "38721C65A3094A8F955ACE63B959E48E",
        "receiptCode": "SGMPR03182026030012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "瓷横担绝缘子",
        "OUTER_TABLE_ROWNUM": 42,
        "receiptTime": 1773908745736,
        "id": "AA3FA88E038B4C989DD18D9A27EE3FA5",
        "receiptCode": "SGR03182026030050",
        "materialId": "020600200010031",
        "uniqueWarehouseCode": "034010314B11",
        "actualQty": 48,
        "warehouseCode": "03180800229P2009002003"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 43,
        "receiptTime": 1773839359575,
        "id": "FD498A53C14A4D6AAC33167530A14A2C",
        "receiptCode": "SGMPR03182026030012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 44,
        "receiptTime": 1773834107568,
        "id": "4F8EB188D3D34D32BE79E78699F9DFD9",
        "receiptCode": "SGMPR03182026030012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "014010227A11",
        "actualQty": 16,
        "warehouseCode": "03180800PLSLP002001027"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 45,
        "receiptTime": 1773833614271,
        "id": "DC2D67A0B3A641A5928B508BE979DFA2",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010115G11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE001007015"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 46,
        "receiptTime": 1773833614271,
        "id": "1A5ECB1F68BA49029AB57E52EC6EB057",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010316C11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE003003016"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 47,
        "receiptTime": 1773833614271,
        "id": "1AD0140473C74B848D448AF8B7227DAC",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010309G11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE003007009"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 48,
        "receiptTime": 1773833614271,
        "id": "04F58C4CA08E4718BC99D853A5907476",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010505D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE005004005"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 49,
        "receiptTime": 1773833614271,
        "id": "D11AF2078AFE41129FDFE796A3F2BEA8",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010504E11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE005005004"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 50,
        "receiptTime": 1773833614271,
        "id": "3095722524BA44C3B0341D5533BB3187",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010501H11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE005008001"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 51,
        "receiptTime": 1773833614271,
        "id": "886AC98B581C420D9F284FB8B605A7A5",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010614C11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE006003014"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 52,
        "receiptTime": 1773833614271,
        "id": "2D7852348B4E486B88C6A9653529DF4E",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010605D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE006004005"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 53,
        "receiptTime": 1773833614271,
        "id": "D8E8F490315B448E8C6BBE3C404FB5A9",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010609F11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE006006009"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 54,
        "receiptTime": 1773833614271,
        "id": "350C16E1F54940ABB2A2D1185CDEABB9",
        "receiptCode": "SGR03182026030012",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "024010620H11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE006008020"
    },
    {
        "materialName": "500KVA变压器配电箱（SMC）",
        "OUTER_TABLE_ROWNUM": 55,
        "receiptTime": 1773833600490,
        "id": "F3CEB377A7EE43BBB821851A182B3C2C",
        "receiptCode": "SGR03182026030015",
        "materialId": "010039001667",
        "uniqueWarehouseCode": "024010313D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE003004013"
    },
    {
        "materialName": "100KVA变压器配电箱（SMC），国产开关",
        "OUTER_TABLE_ROWNUM": 56,
        "receiptTime": 1773833591041,
        "id": "F2F8D4EA48F04D77A1B7670D44E53688",
        "receiptCode": "SGR03182026030016",
        "materialId": "040600400010028",
        "uniqueWarehouseCode": "024010112D11",
        "actualQty": 1,
        "warehouseCode": "03180800KS0GE001004012"
    },
    {
        "materialName": "10kV冷缩中间头，3×400mm2",
        "OUTER_TABLE_ROWNUM": 57,
        "receiptTime": 1773833581562,
        "id": "0945C27720864868AA31E1583EE165D3",
        "receiptCode": "SGR03182026030017",
        "materialId": "171000100020007",
        "uniqueWarehouseCode": "014010826A11",
        "actualQty": 3,
        "warehouseCode": "03180800PLSLP008001026"
    },
    {
        "materialName": "10kV冷缩中间头，3×400mm2",
        "OUTER_TABLE_ROWNUM": 58,
        "receiptTime": 1773833572275,
        "id": "9F814351011D4AD49FB00B97C465DB52",
        "receiptCode": "SGR03182026030018",
        "materialId": "171000100020007",
        "uniqueWarehouseCode": "014010810C11",
        "actualQty": 13,
        "warehouseCode": "03180800PLSLP008003010"
    },
    {
        "materialName": "玻璃绝缘子",
        "OUTER_TABLE_ROWNUM": 59,
        "receiptTime": 1773828795291,
        "id": "ECDF555A4E384DF7BFAB409FBF1E61E3",
        "receiptCode": "SGR03182026030021",
        "materialId": "4362",
        "uniqueWarehouseCode": "034010316B11",
        "actualQty": 60,
        "warehouseCode": "03180800229P2009002004"
    },
    {
        "materialName": "硅橡胶户外终端头",
        "OUTER_TABLE_ROWNUM": 60,
        "receiptTime": 1773827902655,
        "id": "95E20FCB1FB943EEAF469E8574D5E9CA",
        "receiptCode": "SGR03182026030020",
        "materialId": "4643",
        "uniqueWarehouseCode": "034010316C11",
        "actualQty": 6,
        "warehouseCode": "03180800229P2009003004"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 61,
        "receiptTime": 1773818285505,
        "id": "DA528112E12442F494C67933FFA023A8",
        "receiptCode": "SGMPR03182026030011",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "014010127A11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP001001027"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 62,
        "receiptTime": 1773800693879,
        "id": "397760617D6F43FD922B8B1AE59E5E70",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 63,
        "receiptTime": 1773799650123,
        "id": "963DD6C27BF941DFBB66B7D8C9770A07",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 64,
        "receiptTime": 1773654209885,
        "id": "F29779B9F0C54B649E798EA49FBD932C",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 0.9,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "70mm压接式铜铝过渡线耳",
        "OUTER_TABLE_ROWNUM": 65,
        "receiptTime": 1773558176755,
        "id": "FB6B9E5527E74E98A985EE7DD529E9B2",
        "receiptCode": "SGMPR03182026030007",
        "materialId": "020501400010056",
        "uniqueWarehouseCode": "014010806F11",
        "actualQty": 5,
        "warehouseCode": "03180800PLSLP008006006"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 66,
        "receiptTime": 1773539861090,
        "id": "89E782806CED4DB7A40754E5C363B2DB",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 0.1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 67,
        "receiptTime": 1773369061854,
        "id": "BF80315A1EE943C3B4D57D5799B33AFD",
        "receiptCode": "SGR03042026030012",
        "materialId": "090114200000003",
        "uniqueWarehouseCode": "A0102010007",
        "actualQty": 1,
        "warehouseCode": "0304046001086002007010"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 68,
        "receiptTime": 1773193860754,
        "id": "EE49515318F740B5B544A83ED287632E",
        "receiptCode": "SGR03042026030011",
        "materialId": "090114200000003",
        "uniqueWarehouseCode": "A0101029003",
        "actualQty": 1,
        "warehouseCode": "0304046001086001003029"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 69,
        "receiptTime": 1772694857971,
        "id": "586849312786494CA94A066A9ECE3FC9",
        "receiptCode": "SGR03042026030010",
        "materialId": "090114200000003",
        "uniqueWarehouseCode": "A0101009005",
        "actualQty": 1,
        "warehouseCode": "0304046001086001005009"
    },
    {
        "materialName": "（科创专区）配网自动化设备",
        "OUTER_TABLE_ROWNUM": 70,
        "receiptTime": 1770693993885,
        "id": "BEB47D362195485EA785A5E2AEFF005D",
        "receiptCode": "SGR03182026020002",
        "materialId": "040800300010007",
        "uniqueWarehouseCode": "014011009A11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP010001009"
    },
    {
        "materialName": "配电变压器",
        "OUTER_TABLE_ROWNUM": 71,
        "receiptTime": 1770018964043,
        "id": "DCEC18D3E2CC460D8F26CA485C428974",
        "receiptCode": "SGR03182026020001",
        "materialId": "110001000065",
        "uniqueWarehouseCode": "014010101A11",
        "actualQty": 1,
        "warehouseCode": "03180800PLSLP001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 72,
        "receiptTime": 1769672231039,
        "id": "89174877A3B24EB6A91BA64226DFFF0F",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "014010501A11",
        "actualQty": 0.9,
        "warehouseCode": "03180800PLSLP005001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 73,
        "receiptTime": 1768361759292,
        "id": "410B89DD785B474299EDC658A8F05360",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 74,
        "receiptTime": 1768304834124,
        "id": "44E25BBE2E304230BAC6996F3EB454DD",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "TP2187",
        "actualQty": 1,
        "warehouseCode": "03180800PL003001001001"
    },
    {
        "materialName": "10kV柱上真空断路器自动化成套设备，FZW32(630A)，三相支柱式",
        "OUTER_TABLE_ROWNUM": 75,
        "receiptTime": 1768291653951,
        "id": "F952460E94014D1780FA80EC3769CD97",
        "receiptCode": "SGMPR03182026010012",
        "materialId": "030800300010039",
        "uniqueWarehouseCode": "014011223H11",
        "actualQty": 194.1,
        "warehouseCode": "03180800PLSLP012008023"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 76,
        "receiptTime": 1766743502663,
        "id": "791BB33B0613430BA05829F26F07BF5F",
        "receiptCode": "CKGR0300202510000001",
        "materialId": "030100100090001",
        "actualQty": 0.1,
        "warehouseCode": "0300004015031002001012"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-70",
        "OUTER_TABLE_ROWNUM": 77,
        "receiptTime": 1762841650215,
        "id": "A7AB83B662CB4153A721A5F1D23B36FA",
        "receiptCode": "CKTM0300202506000009",
        "materialId": "033300200010034",
        "actualQty": 1,
        "warehouseCode": "0300004015031001003003"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 78,
        "receiptTime": 1762841469951,
        "id": "A34F833DCF43410B83A2EE4C1AEB6CF2",
        "receiptCode": "SGR03002024070001",
        "materialId": "090114200000003",
        "actualQty": 1,
        "warehouseCode": "0300004015031002003013"
    },
    {
        "materialName": "控制电缆，ZAN-KVVP2-22-450/750 -10芯×2.5mm2",
        "OUTER_TABLE_ROWNUM": 79,
        "receiptTime": 1760945177521,
        "id": "115BB8E8825E4CEEAAC1DD847B3E78B4",
        "receiptCode": "SGR03002025100001",
        "materialId": "033300200010032",
        "actualQty": 1,
        "warehouseCode": "0300004017001002001019"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 80,
        "receiptTime": 1760751714517,
        "id": "16175B79813A402289F19E3C09E0E513",
        "receiptCode": "SGMPR03002025100001",
        "materialId": "030100100090001",
        "actualQty": 0.1,
        "warehouseCode": "0300004015031001001006"
    },
    {
        "materialName": "三基色柔光灯",
        "OUTER_TABLE_ROWNUM": 81,
        "receiptTime": 1759041735124,
        "id": "537F8139017A44CCA83E57704B479222",
        "receiptCode": "SGMPR03002025090001",
        "materialId": "080003000032",
        "actualQty": 994,
        "warehouseCode": "0300004015031002002015"
    },
    {
        "materialName": "（科创专区）配网自动化设备",
        "OUTER_TABLE_ROWNUM": 82,
        "receiptTime": 1759023699079,
        "id": "BBE53D9C40FB4B91A8524731CA0D584D",
        "receiptCode": "SGR03002025090003",
        "materialId": "040800300010007",
        "actualQty": 10,
        "warehouseCode": "0300004015031001001004"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 83,
        "receiptTime": 1757379554122,
        "id": "2B14E9571B574481AF6808E6B166AB12",
        "receiptCode": "SGR03002025090001",
        "materialId": "090114200000003",
        "actualQty": 10,
        "warehouseCode": "0300004015031001003006"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 84,
        "receiptTime": 1757379554122,
        "id": "14252C09E7B3413B97F5161D87DADC52",
        "receiptCode": "SGR03002025090001",
        "materialId": "090114200000003",
        "actualQty": 10,
        "warehouseCode": "0300004015031001003006"
    },
    {
        "materialName": "（科创专区）硅橡胶",
        "OUTER_TABLE_ROWNUM": 85,
        "receiptTime": 1756457337575,
        "id": "5E47A853EB964F21BDE956B6F9942CDE",
        "receiptCode": "SGR03002025080002",
        "materialId": "130300700000005",
        "actualQty": 9,
        "warehouseCode": "0300004015031002001002"
    },
    {
        "materialName": "库存供应物资",
        "OUTER_TABLE_ROWNUM": 86,
        "receiptTime": 1756455654987,
        "id": "E1685D3544F04166B064289FBA3E6325",
        "receiptCode": "CKGR0300202508000003",
        "materialId": "030002100283",
        "actualQty": 5,
        "warehouseCode": "0300004015031002002006"
    },
    {
        "materialName": "法兰头",
        "OUTER_TABLE_ROWNUM": 87,
        "receiptTime": 1756453414785,
        "id": "BD116E4FAE854E5EBA6E08A6B186E831",
        "receiptCode": "JMIGI2025060000003",
        "materialId": "010001002419",
        "uniqueWarehouseCode": "014010101A11",
        "actualQty": 10,
        "warehouseCode": "0300004015003001001"
    },
    {
        "materialName": "110kV 户外GIS隔离开关分段间隔，1600A，单母线，6绕组",
        "OUTER_TABLE_ROWNUM": 88,
        "receiptTime": 1751853235766,
        "id": "061697EDF0DA40B0A20F14DC8A0AA1C1",
        "receiptCode": "SGR03002025010002",
        "materialId": "010003000581",
        "actualQty": 7,
        "warehouseCode": "0300004015031001001002"
    },
    {
        "materialName": "（科创专区）主变在线监测装置",
        "OUTER_TABLE_ROWNUM": 89,
        "receiptTime": 1750405149899,
        "id": "A5FB334115F0468AAC85B053BA67EB80",
        "receiptCode": "SGR03012024090002",
        "materialId": "033601700000015",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 1,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "\r\n控制电缆，ZAN-KVVP2-22-450/750 -10芯×2.5mm2",
        "OUTER_TABLE_ROWNUM": 90,
        "receiptTime": 1745552002514,
        "id": "768B4A38690A48D78BF17C37B5ABBC29",
        "receiptCode": "CKGR0301202501000005",
        "materialId": "033300200010032",
        "uniqueWarehouseCode": "014120623E11",
        "actualQty": 200,
        "warehouseCode": "080002905300185F6H05"
    },
    {
        "materialName": "控制电缆，ZRB-KVVP2/22-10芯×2.5mm2",
        "OUTER_TABLE_ROWNUM": 91,
        "receiptTime": 1741922723149,
        "id": "5A1EA3ACBD914F3FA8AE72CC9C2D130B",
        "receiptCode": "SGR03012025010002",
        "materialId": "033300200010337",
        "uniqueWarehouseCode": "024050101A11",
        "actualQty": 8,
        "warehouseCode": "080002997G97L85W0101"
    },
    {
        "materialName": "阻燃屏蔽控制电缆ZA-KVVP2-14×2.5",
        "OUTER_TABLE_ROWNUM": 92,
        "receiptTime": 1740281987030,
        "id": "1EFCB6EF0EC9453E8119D225F4B70575",
        "receiptCode": "CKGR0301202501000005",
        "materialId": "033300200010030",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 1000,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "阻燃屏蔽控制电缆ZA-KVVP2-4×4",
        "OUTER_TABLE_ROWNUM": 93,
        "receiptTime": 1740281987030,
        "id": "2DB7939334CF4634942B679CE09FE0AE",
        "receiptCode": "CKGR0301202501000005",
        "materialId": "033300200010031",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 1200,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "\r\n控制电缆，ZAN-KVVP2-22-450/750 -14芯×2.5mm2",
        "OUTER_TABLE_ROWNUM": 94,
        "receiptTime": 1740281987030,
        "id": "86F5042A6B6E4815AA92420D141EC568",
        "receiptCode": "CKGR0301202501000005",
        "materialId": "033300200010033",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 1200,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "\r\n控制电缆，ZAN-KVVP2-22-450/750 -4芯×10mm2",
        "OUTER_TABLE_ROWNUM": 95,
        "receiptTime": 1740281987030,
        "id": "D938F387E78E4DB48FFEB8716925C928",
        "receiptCode": "CKGR0301202501000005",
        "materialId": "033300200010034",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 1200,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "1kV全塑电缆，普通-VV23-1-4 ×185mm2＋1×120mm2",
        "OUTER_TABLE_ROWNUM": 96,
        "receiptTime": 1740273313534,
        "id": "1C26C993434A4B8EA30E8A656C8BB62A",
        "receiptCode": "SGMPR03012025020002",
        "materialId": "010044008571",
        "uniqueWarehouseCode": "034070119B12",
        "actualQty": 20,
        "warehouseCode": "080002997G85E85H1904"
    },
    {
        "materialName": "10kV四回耐张角钢塔，含（Q345）高强钢",
        "OUTER_TABLE_ROWNUM": 97,
        "receiptTime": 1740186279242,
        "id": "A9F6FA34D379466C9796B5A2E9F06C46",
        "receiptCode": "SGR03012024090003",
        "materialId": "020100300010036",
        "uniqueWarehouseCode": "184040101C11",
        "actualQty": 10,
        "warehouseCode": "080002997J85J85E0103"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 98,
        "receiptTime": 1740058197413,
        "id": "975B3E0060014F349A039219A6CEE0C3",
        "receiptCode": "SGR03012024110001",
        "materialId": "090114200000003",
        "uniqueWarehouseCode": "034060101A11",
        "actualQty": 1,
        "warehouseCode": "080002997G85E85G0101"
    },
    {
        "materialName": "1kV全塑电缆，普通-VV22-1-4 ×185mm2＋1×150mm2",
        "OUTER_TABLE_ROWNUM": 99,
        "receiptTime": 1740057973139,
        "id": "76F3B513842445219FB369A6494E0C4E",
        "receiptCode": "SGMPR03012025020001",
        "materialId": "010044008577",
        "uniqueWarehouseCode": "034070119B12",
        "actualQty": 15,
        "warehouseCode": "080002997G85E85H1904"
    },
    {
        "materialName": "1kV全塑电缆，防白蚁-VV-1-4 ×185mm2＋1×150mm2",
        "OUTER_TABLE_ROWNUM": 100,
        "receiptTime": 1736911474745,
        "id": "41B57604FA784F9C9FA0996E58A110DD",
        "receiptCode": "SGMPR03012025010001",
        "materialId": "010044008573",
        "uniqueWarehouseCode": "114010234B11",
        "actualQty": 19,
        "warehouseCode": "080002997J97G97G8202"
    },
    {
        "materialName": "控制电缆，ZRB-KVVP2/22-10芯×2.5mm2",
        "OUTER_TABLE_ROWNUM": 101,
        "receiptTime": 1736906375237,
        "id": "C8D845E458C7458D8B97ACA981EFAC4E",
        "receiptCode": "SGR03012025010002",
        "materialId": "033300200010337",
        "uniqueWarehouseCode": "034070119B12",
        "actualQty": 890,
        "warehouseCode": "080002997G85E85H1904"
    },
    {
        "materialName": "（科创专区）超声波局放成像仪",
        "OUTER_TABLE_ROWNUM": 102,
        "receiptTime": 1735898304482,
        "id": "A02A322A85014D189961A68477724A75",
        "receiptCode": "SGR03002024100007",
        "materialId": "090114200000003",
        "actualQty": 10,
        "warehouseCode": "0300004015031002003015"
    },
    {
        "materialName": "110kV 户外GIS电缆出线间隔，4000A，单母线，5绕组",
        "OUTER_TABLE_ROWNUM": 103,
        "receiptTime": 1735889077239,
        "id": "1381F374C6E14C2AA37B772D8CAD744C",
        "receiptCode": "SGR03012025010001",
        "materialId": "010003000423",
        "uniqueWarehouseCode": "104010105B11",
        "actualQty": 35.41,
        "warehouseCode": "080002997G85N97G0503"
    },
    {
        "materialName": "110kV 户外GIS电缆出线间隔，4000A，双母线，5绕组",
        "OUTER_TABLE_ROWNUM": 104,
        "receiptTime": 1735889077239,
        "id": "8E1C2C699DAE459181DF44697C673803",
        "receiptCode": "SGR03012025010001",
        "materialId": "010003000424",
        "uniqueWarehouseCode": "034070119B12",
        "actualQty": 11.12,
        "warehouseCode": "080002997G85E85H1904"
    },
    {
        "materialName": "220kVSF6断路器，4000A，50kA，IV级(3.1cm/kV)",
        "OUTER_TABLE_ROWNUM": 105,
        "receiptTime": 1728720648023,
        "id": "1189F9AF09234A509C1EF9E47118CD81",
        "receiptCode": "SGR03002024100003",
        "materialId": "030800200010035",
        "actualQty": 4,
        "warehouseCode": "0300004015031002003008"
    },
    {
        "materialName": "220kVSF6断路器，4000A，50kA，IV级(3.1cm/kV)",
        "OUTER_TABLE_ROWNUM": 106,
        "receiptTime": 1728720067631,
        "id": "325A2CC311B14D67A4310A1FCFDC2A4C",
        "receiptCode": "SGR03002024100002",
        "materialId": "030800200010035",
        "actualQty": 2,
        "warehouseCode": "0300004015031002002007"
    },
    {
        "materialName": "500V铝芯低压电线，（双塑）BLVV-240",
        "OUTER_TABLE_ROWNUM": 107,
        "receiptTime": 1727316143970,
        "id": "CC1CA2F4CA434AA2BD1F892A91FB8B47",
        "receiptCode": "SGMPR03012024090002",
        "materialId": "020200100010013",
        "uniqueWarehouseCode": "114010303E11",
        "actualQty": 5,
        "warehouseCode": "080002997J97G97G9905"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 108,
        "receiptTime": 1727232610429,
        "id": "6A66443FED2945DC8759693637D88C60",
        "receiptCode": "SGR03012024090003",
        "materialId": "040700300010001",
        "uniqueWarehouseCode": "114010303E11",
        "actualQty": 10,
        "warehouseCode": "080002997J97G97G9905"
    },
    {
        "materialName": "10kV瓷套跌落式开关，普通型，200A",
        "OUTER_TABLE_ROWNUM": 109,
        "receiptTime": 1727232610429,
        "id": "64D97747F0AC42BCB45596ECDB91F574",
        "receiptCode": "SGR03012024090003",
        "materialId": "040700400010010",
        "uniqueWarehouseCode": "114010303E11",
        "actualQty": 10,
        "warehouseCode": "080002997J97G97G9905"
    },
    {
        "materialName": "10kV户外隔离开关，陶瓷，630A",
        "OUTER_TABLE_ROWNUM": 110,
        "receiptTime": 1726832284327,
        "id": "D733977EE9FF49CCAE72C0224899D93A",
        "receiptCode": "SGR03012024090001",
        "materialId": "040700300010001",
        "uniqueWarehouseCode": "114010303E11",
        "actualQty": 12,
        "warehouseCode": "080002997J97G97G9905"
    }
]);

const data1 = ref([
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', cn: "摄像头#1", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', cn: "摄像头#2", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'ee0febb859a541f1bca7515db0e5a41a', cn: "摄像头#3", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', cn: "摄像头#4", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', cn: "摄像头#5", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'ee0febb859a541f1bca7515db0e5a41a', cn: "摄像头#6", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', cn: "摄像头#7", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', cn: "摄像头#8", countNums2: "球机", name: "ADD", countNums6: "在线" }
]);
const RUN_STATUS_MAP = { 0: "离线", 1: "在线" };
// /api/mm/qydigital-park-service/qyMonitoringPoint/queryMonitoringPointListPagination
const fetchData2 = async () => {
    try {
        const res = await request({
            url: '/api/qydigital-park-service/videoMonitoringPoint/queryDataListByPage', // 添加了开头的斜杠
            method: 'post',
            skipGlobalParams: true,
            data: {
                pageSize: 999,
                pageNo: 1
            }
        });
        if (res.code === '0') {
            // 根据返回结构赋值
            if (res.data && res.data.list) {
                const mappedList = res.data.list.map((item, index) => ({
                    id: item.id,
                    cn: item.cn, // 对应监测点位置
                    name1: `摄像头#-${index + 1}`, // 对应设备名称
                    online: RUN_STATUS_MAP[item.online] || '未知',
                    manufacturer: item.manufacturer
                }));
                data1.value = mappedList;
                // 进来默认拿第一条数据的id进行播放
                if (mappedList.length > 0) {
                    fetchCameraVideoAndOpenPopup(
                        mappedList[0].id,
                        mappedList[0].cn,
                        'online'
                    );
                }
            }
        }
    } catch (err) {
        console.error('获取data2数据失败', err);
    }
}
// 生命周期
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    queryDistributionInfoPaginations();
    fetchData2();


});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    destroySingleFlvPlayer();
});

onBeforeUnmount(() => {
    destroySingleFlvPlayer();
});

</script>
