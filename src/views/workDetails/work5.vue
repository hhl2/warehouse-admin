<template>

    <div class="lefts" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title" style="margin-top: 10px;">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">货物模型</div>
        </div>
        <div class="imgbox2">
            <img :src="lstPicture" alt="">
        </div>
    </div>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="workdata">
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

        <div class="changleft">
            <el-table class="my-spacing-table2" ref="tableRef" :data="data1" @row-click="handleRowClick">
                <el-table-column prop="name1" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="设备类型" />
                <el-table-column prop="name" label="监测点位置" show-overflow-tooltip />

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
    width: 425px;
    height: 294px;
    background-color: #fff;
    margin: 15px 10px 15px 20px;
    overflow: hidden;
}

.context_tans {
    width: 100%;
    height: 100%;
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
    background: url("@/assets/动画弹窗.png") no-repeat 0 0;
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
            live: false
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
            }
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
        row.name1 || '摄像头',
        row.countNums6 === '在线' ? 'online' : 'offline'
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
            live: false
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
        console.log(res)

        if (res?.data?.code == 200) {
            lstPicture.value = res?.data?.data?.lstPicture
        }

    })
}

//实时库存数据接口

const queryDistributionInfoPaginations = () => {
    queryDistributionInfoPagination().then(res => {
        if (res?.data?.code == 200) {
            const list = res?.data?.data?.list
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
            workdata.value = workdata.value.map(item => {
                return {
                    ...item,
                    receiptTime: item.receiptTime ? new Date(item.receiptTime).toLocaleString() : ''
                }
            })
        }

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
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 2,
        "receiptTime": 1768894521793,
        "id": "982A0A818EC64200A3E3FD8ECF2F538B",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 0.02,
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": "电动电缆剪",
        "OUTER_TABLE_ROWNUM": 3,
        "receiptTime": 1768544388090,
        "id": "EAC9954E4D31465C947EC3AD5BA4635A",
        "receiptCode": "SGMPR03002026010002",
        "materialId": "200501500000004",
        "actualQty": 2.0,
        "warehouseCode": "031864T64T003001001001"
    },
    {
        "materialName": "电动滑板车",
        "OUTER_TABLE_ROWNUM": 4,
        "receiptTime": 1768544388090,
        "id": "3BD6B1D6030A41ED98E3C19B25ED739B",
        "receiptCode": "SGMPR03002026010002",
        "materialId": "210200300000014",
        "actualQty": 2.0,
        "warehouseCode": "031864T64T003001001001"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 5,
        "receiptTime": 1768528713117,
        "id": "48B574059A8F4A859D9352DB5A3628DB",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 0.01,
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 6,
        "receiptTime": 1768524578486,
        "id": "0D2D7D8D84BB437FB08CF1AFD0E43F79",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "010200100060001",
        "actualQty": 10.0,
        "warehouseCode": "031864T64R64R001001023"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 7,
        "receiptTime": 1768524578486,
        "id": "75CC894C24B0428EAC33A30D553B3AF1",
        "receiptCode": "SGMPR03182026010031",
        "materialId": "080200100000004",
        "actualQty": 9.97,
        "warehouseCode": "031864T64T003001001001"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 8,
        "receiptTime": 1768470092634,
        "id": "C8050604FC3A4232B2A2819BC704BB33",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "080200100000004",
        "actualQty": 0.02,
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": "110kV备自投装置屏",
        "OUTER_TABLE_ROWNUM": 9,
        "receiptTime": 1768386428029,
        "id": "D22EF9D5573449289EBA2B54282584B4",
        "receiptCode": "SGMPR03182025110025",
        "materialId": "033700500010004",
        "actualQty": 1.0,
        "warehouseCode": "031864T64T006001001003"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 10,
        "receiptTime": 1768381751489,
        "id": "59EF1BEE850E4723A95802020A6406D5",
        "receiptCode": "SGMPR03182026010029",
        "materialId": "080200100000004",
        "actualQty": 0.05,
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 11,
        "receiptTime": 1768375680991,
        "id": "324574231EE84503AA0C9DCA95D53048",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "010200100060001",
        "actualQty": 5.0,
        "warehouseCode": "031864T64T006001001002"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 12,
        "receiptTime": 1768375680991,
        "id": "3ABCB4E2B21647BA8258335B524F8EDF",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "080200100000004",
        "actualQty": 0.05,
        "warehouseCode": "031864T64T006001001001"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 13,
        "receiptTime": 1768374718547,
        "id": "50E84C695523481BAA51DF1CEAEEAE2C",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "010200100060001",
        "actualQty": 5.0,
        "warehouseCode": "031864T64R64R001001042"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 14,
        "receiptTime": 1768374718547,
        "id": "51210E3DC4DA4597A2789A59905B6024",
        "receiptCode": "SGMPR03182026010030",
        "materialId": "080200100000004",
        "actualQty": 9.93,
        "warehouseCode": "031864T64R64R001002016"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 15,
        "receiptTime": 1768370929633,
        "id": "B94179683BC34665B81838484E3F5152",
        "receiptCode": "SGMPR03182026010029",
        "materialId": "010200100060001",
        "actualQty": 5.0,
        "warehouseCode": "031864T64T64R002001006"
    },
    {
        "materialName": " 叶轮给煤机",
        "OUTER_TABLE_ROWNUM": 16,
        "receiptTime": 1768361264114,
        "id": "209D09034D7E4CDA91D76C62E77585E1",
        "receiptCode": "SGMPR03182026010029",
        "materialId": "010200100060001",
        "actualQty": 5.0,
        "warehouseCode": "031864T64R64R001002013"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 17,
        "receiptTime": 1768361264114,
        "id": "837558770385454193D85043241D76B1",
        "receiptCode": "SGMPR03182026010029",
        "materialId": "080200100000004",
        "actualQty": 9.93,
        "warehouseCode": "031864T64R64R001002015"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 18,
        "receiptTime": 1768351613870,
        "id": "3FA4D2E1ABC74D479FDA6F305C0476ED",
        "receiptCode": "SGMPR03182026010015",
        "materialId": "080200100000004",
        "actualQty": 0.01,
        "warehouseCode": "031864T64T003001001001"
    },
    {
        "materialName": "电缆",
        "OUTER_TABLE_ROWNUM": 19,
        "receiptTime": 1768351613870,
        "id": "164D0D398CC540F0BC776B5227BDBA11",
        "receiptCode": "SGMPR03182026010015",
        "materialId": "080200100000004",
        "actualQty": 0.01,
        "warehouseCode": "031864T64T003001001003"
    },
    {
        "materialName": "电动电缆剪",
        "OUTER_TABLE_ROWNUM": 20,
        "receiptTime": 1768299716983,
        "id": "17F6D571D2154857A89633A0B49015C0",
        "receiptCode": "SGMPR03182025120057",
        "materialId": "200501500000004",
        "actualQty": 1.0,
        "warehouseCode": "031864T64T006001001003"
    }
]);

const data1 = ref([
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', name1: "摄像头#1", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', name1: "摄像头#2", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'ee0febb859a541f1bca7515db0e5a41a', name1: "摄像头#3", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', name1: "摄像头#4", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', name1: "摄像头#5", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'ee0febb859a541f1bca7515db0e5a41a', name1: "摄像头#6", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'dafe004a0d264b18ac12564fefc9dcd6', name1: "摄像头#7", countNums2: "球机", name: "ADD", countNums6: "在线" },
    { id: 'b9877ba9b8d94041a8a448eb178d8163', name1: "摄像头#8", countNums2: "球机", name: "ADD", countNums6: "在线" }
]);

const fetchData2 = async () => {
    try {
        const res = await request({
            url: 'api/qydigital-park-service/videoMonitoringPoint/queryDataListByPage', // 请在此处填入接口地址
            method: 'post',
            data: {
                pageSize: 25,
                pageNo: 1
            }
        });
        if (res.code === '0') {
            // 根据返回结构赋值
            if (res.data && res.data.list) {
                const mappedList = res.data.list.map((item, index) => ({
                    id: item.id,
                    name: item.name, // 对应检测点位置
                    name1: `摄像头#-${index + 1}`, // 对应设备名称
                    countNums2: 'ADD' + index,  // 对应设备类型
                    countNums6: '在线',
                }));
                data1.value = mappedList;
                // 进来默认拿第一条数据的id进行播放
                if (mappedList.length > 0) {
                    fetchCameraVideoAndOpenPopup(
                        mappedList[0].id,
                        mappedList[0].name1,
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