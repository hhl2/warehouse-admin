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
                    <el-table-column prop="warehouseCode" label="货位编码" show-overflow-tooltip />
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
    const warehouseCode = row.warehouseCode || '';
    console.log('库存行点击', { "code": 1, "type": "goods", "data": { "id": warehouseCode, "warehouseCode": warehouseCode } });
    callParentMethod({ "code": 1, "type": "goods", "data": { "id": warehouseCode, "warehouseCode": warehouseCode } });
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
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 1,
        "receiptTime": 1768988761033,
        "id": "E69FF39926504FCD9D9940CF894CCD88",
        "receiptCode": "SGMPR03182026010029",
        "materialId": "080200100000004",
        "actualQty": 0.02,
        "warehouseCode": "014010927H11"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 2,
        "receiptTime": 1768894521793,
        "id": "982A0A818EC64200A3E3FD8ECF2F538B",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 0.02,
        "warehouseCode": "014010521B11"
    },
    {
        "materialName": "电动电缆剪",
        "OUTER_TABLE_ROWNUM": 3,
        "receiptTime": 1768544388090,
        "id": "EAC9954E4D31465C947EC3AD5BA4635A",
        "receiptCode": "SGMPR03002026010002",
        "materialId": "200501500000004",
        "actualQty": 2.0,
        "warehouseCode": "014010422A11"
    },
    {
        "materialName": "电动滑板车",
        "OUTER_TABLE_ROWNUM": 4,
        "receiptTime": 1768544388090,
        "id": "3BD6B1D6030A41ED98E3C19B25ED739B",
        "receiptCode": "SGMPR03002026010002",
        "materialId": "210200300000014",
        "actualQty": 2.0,
        "warehouseCode": "014010326F11"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 5,
        "receiptTime": 1768528713117,
        "id": "48B574059A8F4A859D9352DB5A3628DB",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 0.01,
        "warehouseCode": "014010224F11"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 6,
        "receiptTime": 1768524578486,
        "id": "0D2D7D8D84BB437FB08CF1AFD0E43F79",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "010200100060001",
        "actualQty": 10.0,
        "warehouseCode": "014010622H11"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 7,
        "receiptTime": 1768524578486,
        "id": "75CC894C24B0428EAC33A30D553B3AF1",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 9.97,
        "warehouseCode": "014011227A11"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 8,
        "receiptTime": 1768470092634,
        "id": "C8050604FC3A4232B2A2819BC704BB33",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "080200100000004",
        "actualQty": 0.02,
        "warehouseCode": "014010127A11"
    },
    {
        "materialName": "110kV备自投装置屏",
        "OUTER_TABLE_ROWNUM": 9,
        "receiptTime": 1768386428029,
        "id": "D22EF9D5573449289EBA2B54282584B4",
        "receiptCode": "SGMPR03182025110025",
        "materialId": "033700500010004",
        "actualQty": 1.0,
        "warehouseCode": "014010227A11"
    },

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
