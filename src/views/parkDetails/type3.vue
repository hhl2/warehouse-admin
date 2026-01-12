<template>

    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">视频监控</div>
        </div>
        <div class="spjkLists">
            <template v-for="(value, index) in sorces" :key="index">
                <div class="spjkList" @click="handleRowClick(value)">
                    <div class="spjkListbox">
                        <img :src="value.url" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div class="spjkList_label">{{ value.name || '摄像头' + (index + 1) }}</div>
                </div>
            </template>
        </div>

    </div>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data" @row-click="handleRowClick">
                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip />
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

                    <el-table-column prop="countNums8" label="告警信息" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column prop="" label="关键应急预案" show-overflow-tooltip>
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
            <el-table class="my-spacing-table2" ref="tableRef" :data="data2" @row-click="handleRowClick">
                <el-table-column prop="name" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="设备类型" />
                <el-table-column prop="name" label="检测点位置" show-overflow-tooltip />
                <el-table-column prop="countNams6" label="状态" width="50">
                    <template #default="scope">
                        <!-- <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                            {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                        </span> -->

                                    <span class='status-normal' >在线
                           
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>


    <!-- 弹窗（遮罩层已禁用） -->
    <Transition name="fade">
        <!-- 如需启用遮罩层，取消下面注释并注释掉再下面的 context-menus -->
        <!-- <div v-if="showSingleVideoPopup" class="popup-overlay" @click.self="closeSingleVideoPopup"> -->
        <div v-if="showSingleVideoPopup" class="context-menus" ref="menuRefSingle">
            <div class="sxtmName">
                <span>{{ currentCamera.name || '摄像头' }}</span>
                <span class="camera-status-single" :class="currentCamera.status || 'online'">●</span>
                <div class="close-popup" @click="closeSingleVideoPopup">×</div>
            </div>
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
        <!-- </div> -->
    </Transition>


    <div>

    </div>
</template>

<style scoped>
/* 背景遮罩层（已禁用，如需启用请取消注释） */
/*
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
*/

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active .context-menus,
.fade-leave-active .context-menus {
    transition: transform 0.3s ease;
}

.fade-enter-from .context-menus {
    transform: translate(-50%, -20px);
}

.fade-leave-to .context-menus {
    transform: translate(-50%, -20px);
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
    z-index: 999;

}

.context_tans {
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

    background: #61B3FF;
    background: -webkit-linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
    background: linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
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

/* 单画面状态指示器 */
.camera-status-single {
    font-size: 12px;
    margin-left: 10px;
    /* 覆盖父元素的透明文字填充，确保状态指示器可见 */
    -webkit-text-fill-color: currentColor;
}

.camera-status-single.online {
    color: #52c41a;
    animation: blink 2s infinite;
}

.camera-status-single.offline {
    color: #ff4d4f;
}

/* 闪烁动画 */
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

/* 关闭按钮 */
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
    /* 覆盖父元素的透明文字填充，确保关闭按钮文字可见 */
    -webkit-text-fill-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
}

.close-popup:hover {
    background: rgba(255, 60, 60, 1);
    transform: scale(1.1);
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

/* 加载动画 - 旋转圆环 */
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

/* 加载文字 */
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


.testmian {
    padding: 20px 15px;
    background: url('@/assets/框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 875px;
    height: 330px;
    position: fixed;
    left: 50%;
    bottom: 65px;
    transform: translateX(-50%);
    z-index: 999;
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

.spjkLists {
    margin: 10px 25px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

}


.spjkLists .spjkList {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0px;
    cursor: pointer;
}

.spjkLists .spjkListbox {
    width: 200px;
    height: 160px;
    background: #fff;
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
    cursor: pointer;
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
    flex: 1;
    overflow: hidden;
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
    height: 288px;
}

.my-spacing-table2 {
    height: 100%;
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
import { reactive, ref, inject, watch, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import request from '@/utils/request'

const showMenus = ref(false);
const menuRef = ref(null);
const showSingleVideoPopup = ref(false);
const isLoadingVideo = ref(false); // 视频加载状态

// EasyPlayer 播放器相关引用
const videoElementSingle = ref(null);
const easyPlayerInstance = ref(null);

const currentCamera = ref({
    id: 'cam001',
    name: '变压器检测工位摄像头',
    videoUrl: '', 
    location: '变压器流水线检测工位',
    status: 'online'
});



// 通用函数：根据摄像头ID获取视频URL并打开弹窗
const fetchCameraVideoAndOpenPopup = async (cameraId, cameraName = '摄像头', cameraStatus = 'online') => {
    // 更新摄像头名称和状态
    currentCamera.value.name = cameraName;
    currentCamera.value.status = cameraStatus;

    // 先清空视频URL
    currentCamera.value.videoUrl = '';

    // 判空：检查cameraId是否有效
    if (!cameraId) {
        console.warn('摄像头ID为空，无法调用API');
        // 即使没有ID，也打开弹窗显示"暂无视频信号"
        isLoadingVideo.value = false;
        showSingleVideoPopup.value = true;
        return;
    }

    // 立即打开弹窗并显示加载状态
    isLoadingVideo.value = true;
    showSingleVideoPopup.value = true;

    // 异步加载视频URL（不阻塞UI）
    try {
        // === 彻底的保险措施：防止 cameraId is not defined 错误 ===
        // 使用 typeof 检查变量是否存在，避免 ReferenceError
        const safeCameraId = typeof cameraId !== 'undefined' && cameraId ? String(cameraId) : '';

        console.log('📹 准备请求视频URL，cameraId:', safeCameraId);

        // 调用API获取视频预览URL（使用代理避免跨域）
        const response = await request({
            url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
            method: 'post',
            data: {
                cameraIndexCode: safeCameraId
            }
        });

        // 检查响应是否成功
        if (response && response.code === '0' && response.data && response.data.url) {
            // 将返回的URL赋值给currentCamera.videoUrl
            currentCamera.value.videoUrl = response.data.url;
            console.log('✅ 成功获取视频URL:', response.data.url);
            console.log('📊 URL类型:', response.data.url.match(/^(http|https|ws|wss):/)?.[0] || '未知协议');

            // 等待 DOM 更新后初始化 FLV 播放器
            await nextTick();
            if (currentCamera.value.videoUrl) {
                initSingleFlvPlayer();
            }
        } else {
            console.warn('⚠️ 获取视频URL失败或返回数据为空:', response);
            // videoUrl保持为空，弹窗会显示"暂无视频信号"
        }
    } catch (error) {
        console.error('调用视频预览接口失败:', error);
        // videoUrl保持为空，弹窗会显示"暂无视频信号"
    } finally {
        // 无论成功或失败，都关闭加载状态
        isLoadingVideo.value = false;
    }
}

const handleRowClick = async (row) => {
    // 添加参数验证，确保 row 对象存在
    if (!row) {
        console.warn('handleRowClick: row 对象为空');
        return;
    }

    console.log('handleRowClick 接收到的数据:', row);

    // 调用通用函数，传入行数据中的id、名称和状态
    // 使用可选链和默认值避免 undefined 错误
    await fetchCameraVideoAndOpenPopup(
        row.id || '',
        row.name || '摄像头',
        row.countNums6 === '在线' ? 'online' : 'offline'
    );
}

const closeSingleVideoPopup = () => {
    destroySingleFlvPlayer(); // 销毁 FLV 播放器
    showSingleVideoPopup.value = false;
    isLoadingVideo.value = false; // 重置加载状态
    currentCamera.value = {
        id: '',
        name: '',
        videoUrl: '',
        location: '',
        status: 'online'
    };
};

// 初始化单画面播放器 (使用 EasyPlayer)
const initSingleFlvPlayer = async () => {
    console.log('🚀 开始初始化 EasyPlayer 播放器...');

    // 销毁旧的播放器
    destroySingleFlvPlayer();

    await nextTick();

    // 检查元素和URL是否存在
    console.log('🎬 检查:', {
        hasVideoElement: !!videoElementSingle.value,
        hasVideoUrl: !!currentCamera.value.videoUrl,
        videoUrl: currentCamera.value.videoUrl,
        popupVisible: showSingleVideoPopup.value
    });

    if (!videoElementSingle.value || !currentCamera.value.videoUrl) {
        console.warn('⚠️ 视频元素或 URL 不存在');

        // 如果有URL但元素还没准备好，可能是DOM还在渲染，等待后重试
        if (currentCamera.value.videoUrl && showSingleVideoPopup.value && !videoElementSingle.value) {
            console.log('🔄 video元素未就绪，200ms后重试...');
            setTimeout(() => {
                initSingleFlvPlayer();
            }, 200);
        }
        return;
    }

    try {
        const videoUrl = currentCamera.value.videoUrl;
        console.log('📹 视频URL:', videoUrl);
        console.log('🎬 使用 EasyPlayer 播放器');

        // 检查 EasyPlayer 是否已加载
        if (!window.EasyPlayerPro) {
            console.error('❌ EasyPlayer 库未加载，请检查 index.html 中的脚本引用');
            return;
        }

        // 直接初始化播放器
        initEasyPlayer(videoUrl);
    } catch (error) {
        console.error('❌ 播放器初始化失败:', error);
    }
};

// 初始化 EasyPlayer
const initEasyPlayer = (videoUrl) => {
    try {
        console.log('🎬 初始化 EasyPlayer，URL:', videoUrl);

        // 如果是相对路径，转换为绝对URL
        let absoluteUrl = videoUrl;
        if (videoUrl && !videoUrl.match(/^(http|https|ws|wss|webrtc|wt|artc):/)) {
            absoluteUrl = window.location.origin + videoUrl;
            console.log('🔄 转换相对路径为绝对URL:', absoluteUrl);
        }

        // 创建播放器实例
        easyPlayerInstance.value = new window.EasyPlayerPro(videoElementSingle.value, {
            stretch: true,
            hasAudio: true,
            // 添加配置项以减少内部错误
            autoplay: true,
            live: false // FLV 文件是点播，不是直播
        });

        // 播放视频，捕获 Promise 错误避免未处理的异常
        easyPlayerInstance.value.play(absoluteUrl).then(() => {
            console.log('✅ EasyPlayer 播放成功');
        }).catch((error) => {
            // 忽略 postMessage 相关的栈溢出错误（EasyPlayer 内部问题，不影响播放）
            if (error.message && error.message.includes('Maximum call stack size exceeded')) {
                console.warn('⚠️ EasyPlayer 内部警告（不影响播放）:', error.message);
            } else {
                console.error('❌ EasyPlayer 播放失败:', error);
            }
        });

    } catch (error) {
        console.error('❌ EasyPlayer 初始化失败:', error);
    }
};

// 销毁播放器
const destroySingleFlvPlayer = () => {
    // 销毁 EasyPlayer 播放器
    if (easyPlayerInstance.value) {
        try {
            easyPlayerInstance.value.destroy();
            easyPlayerInstance.value = null;
            console.log('✅ EasyPlayer 播放器已销毁');
        } catch (error) {
            console.error('销毁 EasyPlayer 播放器时出错:', error);
            easyPlayerInstance.value = null;
        }
    }
};
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type == 'afjc' || newVal?.json.type == 'poi') {
            showMenus.value = true
        }

        // 如果接收到的数据包含id，调用API获取视频URL并打开弹窗
        if (newVal?.json?.id) {
            await fetchCameraVideoAndOpenPopup(
                newVal.json.id,
                newVal.json.name || '摄像头',
                'online'
            );
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
        {
            name: "摄像头#1",
            id: 'ee0febb859a541f1bca7515db0e5a41a',
            url: require("@/assets/camera/图1.png"),
        },
        {
            name: "摄像头#2",
            id: 'dafe004a0d264b18ac12564fefc9dcd6',
            url: require("@/assets/camera/图2.png"),
        },
        {
            name: "摄像头#3",
            id: 'b9877ba9b8d94041a8a448eb178d8163',
            url: require("@/assets/camera/图3.png"),
        },
        {
            name: "摄像头#4",
            id: 'facf0b82581f43db9144d12a53c40102',
            url: require("@/assets/camera/图4.png"),
        },
        {
            name: "摄像头#5",
            id: 'ffbfc244a9d44a7e838329526f47f904',
            url: require("@/assets/camera/图5.png"),
        },
        {
            name: "摄像头#6",
            id: 'f4cdcb8f913941ddb77f9a034d0c90fe',
            url: require("@/assets/camera/图6.png"),
        },
        {
            name: "摄像头#7",
            id: 'ee0febb859a541f1bca7515db0e5a41a',
            url: require("@/assets/camera/图7.png"),
        },
        {
            name: "摄像头#8",
            id: 'dafe004a0d264b18ac12564fefc9dcd6',
            url: require("@/assets/camera/图.png"),
        }
    ]




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

var data = [
    {
        name: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        name: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        name: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测点温度过高",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        name: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        name: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#7",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        name: "摄像头#8",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },




];

var data2 = [
    {
        name: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "大厅1号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },
    {
        name: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "大厅2号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        name: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "大厅3号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测人员入侵",
        type: 1,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        name: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "大厅4号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },
    {
        name: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "大厅5号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        name: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "大厅6号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        name: "摄像头#7",
        countNums2: "安防监控",
        countNums3: "室内7号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#8",
        countNums2: "安防监控",
        countNums3: "室内8号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        name: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        name: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        name: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "大厅1号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        name: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "大厅2号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "大厅3号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测人员入侵",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        name: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "大厅4号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        name: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "大厅5号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        name: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "大厅6号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },




];


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
                 data2.value = res.data.list;
                //  data.value = res.data.list;
             }
        }
    } catch (err) {
        console.error('获取data2数据失败', err);
    }
}


// 生命周期
onMounted(() => {
    fetchData2();
    document.addEventListener("click", handleClickOutside);



});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    // 组件卸载前销毁 FLV 播放器
    destroySingleFlvPlayer();
});

</script>