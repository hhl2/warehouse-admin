<template>

    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">视频监控</div>
        </div>
        <div class="spjkLists">
            <template v-for="(value, index) in sorces" :key="index">
                <div class="spjkList" @click="handleRowClick(value)" :data-index="index"
                    :ref="el => setSpjkListRef(el, index)">
                    <div class="spjkListbox">
                        <!-- 加载中显示转圈 -->
                        <div v-if="value.loading" class="mini-loader"></div>

                        <!-- 加载完成显示图片 -->
                        <div v-else-if="value.imageUrl" class="snapshot-wrapper">
                            <img :src="value.imageUrl" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                            <!-- 右上角刷新的小按钮，随时可以重试 -->
                            <div class="refresh-snapshot-btn" @click.stop="fetchSnapshot(value, index)" title="刷新此路监控快照">
                                <el-icon>
                                    <Refresh />
                                </el-icon>
                            </div>
                        </div>

                        <!-- 无图片也无加载显示暂无信号，增加点击重试的容错机制 -->
                        <div v-else class="fetch-error" @click.stop="fetchSnapshot(value, index)" style="cursor: pointer;" title="点击重新加载该路监控">
                            <div style="text-align: center;">
                                <div>暂无信号</div>
                                <div style="font-size: 12px; margin-top: 4px; color: #10a8fd; opacity: 0.8;">⟳ 点击重试</div>
                            </div>
                        </div>
                    </div>
                    <div class="spjkList_label">{{ value.cn || '摄像头' + (index + 1) }}</div>
                </div>
            </template>
        </div>

    </div>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input4" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                    @keyup.enter="querySecurityAlarmListPagination" />
                <el-button type="primary" class="search-btn" @click="querySecurityAlarmListPagination">查询</el-button>
            </div>
            <div class="device-table-wrapper">
                <el-table class="device-custom-table" ref="tableRef" :data="AlarmList" height="100%">
                    <el-table-column prop="cn" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="cameraType" label="设备类型" />
                    <el-table-column prop="installLocation" label="监测点位置" show-overflow-tooltip />
                    <el-table-column prop="online" label="状态" width="50">
                    </el-table-column>
                    <el-table-column prop="alarmTime" label="监测时间" show-overflow-tooltip />

                    <el-table-column prop="alarmInfo" label="告警信息" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column prop="" label="抓拍信息" show-overflow-tooltip>
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
            <!-- <img src="@/assets/title_bgs.png" alt=""> -->

            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">摄像头监控列表</div>
        </div>
        <div class="title_text_box_custom">
            <div v-for="tag in regions" :key="tag" class="title_txets_custom"
                :class="{ 'active_tag': currentRegion === tag }" @click="handleRegionChange(tag)">
                {{ tag }}
            </div>
        </div>

        <div class="inputbox">
            <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" clearable
                @keyup.enter="triggerSearch" />
            <el-button type="primary" class="search-btn" @click="triggerSearch">查询</el-button>
        </div>

        <div class="device-table-wrapper" style="height: calc(100% - 140px); margin-bottom: 10px;">
            <el-table class="device-custom-table" ref="tableRef" :data="cameraListData" @row-click="handleRowClick"
                height="100%">
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
        <div class="pagination-container">
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :small="true" background />
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
    background: url("@/assets/animation-popup.png") no-repeat 0 0;
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

.changewidth {
    margin: 5px 15px 0px 15px;
}


.testmian {
    padding: 20px 15px;
    background: url('@/assets/frame-center.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 875px;
    height: 330px;
    position: fixed;
    left: 50%;
    bottom: 70px;
    transform: translateX(-50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
}

.inputbox {
    margin: 10px 15px 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.yylf_search_box {
    color: #E6F2FF;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    font-size: 15px;
    height: 32px;
    line-height: 32px;
    width: 55px;
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
    width: 200px;
    /* 固定宽度，确保子元素不会超出 */
}

.spjkLists .spjkListbox {
    width: 200px;
    height: 160px;
    background: rgba(16, 24, 48, 0.5);
    /* 暗色背景 */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid rgba(97, 179, 255, 0.1);
}

.mini-loader {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(97, 179, 255, 0.1);
    border-top-color: #61B3FF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.fetch-error {
    color: #4a5a6a;
    font-size: 14px;
}


/* 监控快照相关样式 */
.snapshot-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.refresh-snapshot-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    z-index: 5;
    transition: all 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.refresh-snapshot-btn:hover {
    background: #10a8fd;
    transform: scale(1.1);
}

.spjkList_label {
    margin-top: 10px;
    color: #fff;
    font-size: 18px;
    display: block;
    /* 确保是块级元素 */
    max-width: 200px;
    /* 最大宽度，与图片宽度一致 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    text-overflow: ellipsis;
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

.title_text_box_custom {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 15px 5px 15px;
    gap: 15px;
}

.title_txets_custom {
    font-size: 16px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #8ed0ff;
    cursor: pointer;
    padding: 2px 10px;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
}

.title_txets_custom:hover {
    color: #00f0ff;
}

.title_txets_custom.active_tag {
    color: #00f0ff;
    border-bottom: 2px solid #00f0ff;
    background: linear-gradient(to top, rgba(0, 240, 255, 0.1), transparent);
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
    -webkit-text-fill-color: transparent;

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
import { Search, Refresh } from '@element-plus/icons-vue'
import { reactive, ref, inject, watch, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import request from '@/utils/request'

const showMenus = ref(false);
const menuRef = ref(null);
const showSingleVideoPopup = ref(false);
const isLoadingVideo = ref(false); // 视频加载状态
const AlarmList = ref([]);

// EasyPlayer 播放器相关引用
const videoElementSingle = ref(null);
const easyPlayerInstance = ref(null);
const input3 = ref(null);
const input4 = ref(null);

const currentCamera = ref({
    id: 'cam001',
    name: '变压器检测工位摄像头',
    videoUrl: '',
    location: '变压器流水线检测工位',
    status: 'online'
});

const queryMonitoringPointListPagination = async () => {
    try {
        const response = await request({
            url: '/api/qydigital-park-service/qyMonitoringPoint/queryMonitoringPointListPagination',
            method: 'post',
            data: {
                "pageNo": 1, "pageSize": 25, "cn": "", "indexCode": ""
            },
            skipGlobalParams: true
        });
        console.log(response);
    } catch (error) {
        console.error('获取监控点列表失败:', error);
    }
}



const querySecurityAlarmListPagination
    = async () => {
        try {
            const res = await request({
                url: '/api/qydigital-park-service/qyMonitoringPoint/querySecurityAlarmListPagination',
                method: 'post',
                data: {
                    "pageNo": 1, "pageSize": 25, "cn": input4.value, "indexCode": ""
                },
                skipGlobalParams: true
            });
            if (res.code == 0) {
                AlarmList.value = res.data?.list || []

            } else {
                AlarmList.value = [];


            }

            console.log(response);
        } catch (error) {
            console.error('获取监控点列表失败:', error);
        }
    }
// /api/mm/qydigital-park-service/qyMonitoringPoint/queryWatchUrl

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
        // /api/mm/qydigital-park-service/qyMonitoringPoint/queryWatchUrl
        const response = await request({
            url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
            // url: "qydigital-park-service/qyMonitoringPoint/queryWatchUrl",

            method: 'post',
            data: {
                cameraIndexCode: safeCameraId
            },
            skipGlobalParams: true
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
        row.cn || '摄像头',
        row.online === '在线' ? 'online' : 'offline'
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
            // showMenus.value = true
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

// 视频网格数据 - 初始为空，由接口填充
const sorces = ref([
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false },
    { id: '', cn: '暂无数据', imageUrl: '', loading: false }
]);



// 视频网格播放器管理
const videoElementRefs = ref([]);
const gridPlayerInstances = ref([]);

// 设置视频元素引用的辅助函数
const setVideoRef = (el, index) => {
    if (el) {
        videoElementRefs.value[index] = el;
    }
};

// 网格播放器逻辑已移除，改为显示抓拍图
/*
const initGridPlayer = async (index, videoUrl) => {
    // ...
};
*/

// 销毁所有网格播放器（已不再使用实时视频流）
const destroyGridPlayers = () => {
    gridPlayerInstances.value.forEach((player, index) => {
        if (player) {
            try {
                player.destroy();
            } catch (error) {
                console.error(`销毁网格播放器 ${index} 失败:`, error);
            }
        }
    });
    gridPlayerInstances.value = [];
    videoElementRefs.value = [];
};

// --- 可视区域懒加载 ---
const spjkListRefs = ref([]);
const setSpjkListRef = (el, index) => {
    if (el) {
        spjkListRefs.value[index] = el;
    }
};

let lazyObserver = null;
const initObserver = () => {
    if (lazyObserver) lazyObserver.disconnect();

    // 监听 dom，在可视区域的才去加载
    lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.dataset.index;
                const item = sorces.value[index];
                // 如果在可视区域且还没有去请求过，放入抓拍队列
                if (item && item.loading && !item.inQueue) {
                    item.inQueue = true; // 标记防止重复加载
                    fetchSnapshot(item, index);
                }
            }
        });
    }, {
        root: null, // 监听视口
        rootMargin: '100px', // 提前 100px 预加载
        threshold: 0.1
    });

    // 开始绑定监听
    nextTick(() => {
        spjkListRefs.value.forEach(el => {
            if (el) lazyObserver.observe(el);
        });
    });
};

// --- 隐藏播放器截取画面逻辑队列 ---
let isCapturingActive = true;
const captureQueue = [];
const maxConcurrent = 4; // 并发抓拍数量
let activeCount = 0;

const processSnapshotQueue = async () => {
    if (activeCount >= maxConcurrent || captureQueue.length === 0 || !isCapturingActive) return;

    while (activeCount < maxConcurrent && captureQueue.length > 0 && isCapturingActive) {
        activeCount++;
        const task = captureQueue.shift();
        executeSnapshot(task.item, task.index).finally(() => {
            activeCount--;
            processSnapshotQueue();
        });
    }
};

const executeSnapshot = (item, index) => {
    return new Promise(async (resolve) => {
        if (!isCapturingActive) return resolve();

        if (!item.id) {
            if (sorces.value[index]) sorces.value[index].loading = false;
            return resolve();
        }

        try {
            const response = await request({
                url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
                method: 'post',
                data: {
                    cameraIndexCode: item.id
                },
                skipGlobalParams: true
            });

            if (response && response.code === '0' && response.data && response.data.url) {
                await capturePlayerFrame(response.data.url, index);
            } else {
                if (sorces.value[index]) sorces.value[index].loading = false;
            }
        } catch (error) {
            console.error(`获取摄像头 ${item.id} 播放地址失败:`, error);
            if (sorces.value[index]) sorces.value[index].loading = false;
        }
        resolve();
    });
};

const capturePlayerFrame = (videoUrl, index) => {
    return new Promise((resolve) => {
        console.log("进入到这个页面")
        if (!isCapturingActive || !sorces.value[index]) return resolve();

        // 创建临时隐藏容器，确保有充足宽高来渲染画面
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.top = '-9999px';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '640px';
        tempContainer.style.height = '360px';
        document.body.appendChild(tempContainer);

        let absoluteUrl = videoUrl;
        if (videoUrl && !videoUrl.match(/^(http|https|ws|wss|webrtc|wt|artc):/)) {
            absoluteUrl = window.location.origin + videoUrl;
        }

        let player = null;
        try {
            player = new window.EasyPlayerPro(tempContainer, {
                stretch: true,
                hasAudio: false,
                autoplay: true,
                live: false,
                muted: true,
                preserveDrawingBuffer: true // 解决 WebGL(canvas) 截图黑屏的核心参数
            });
        } catch (e) {
            if (document.body.contains(tempContainer)) document.body.removeChild(tempContainer);
            if (sorces.value[index]) sorces.value[index].loading = false;
            return resolve();
        }

        let attempts = 0;
        // 先给 2 秒（2000ms）的“缓冲强制等待期”，让播放器充分初始化并跳过初始黑屏/Logo
        setTimeout(() => {
            let snapshotInterval = setInterval(() => {
                attempts++;
                // 设置超时时间 (约 12 秒)
                if (attempts > 120 || !isCapturingActive) {
                    clearInterval(snapshotInterval);
                    cleanUpTempPlayer(player, tempContainer);
                    if (sorces.value[index]) sorces.value[index].loading = false;
                    return resolve();
                }

                try {
                    let dataUrl = null;

                    // 方案 A：如果是普通视频标签 (MSE)，直接绘制 video 上的画面
                    const video = tempContainer.querySelector('video');
                    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = video.videoWidth;
                        tempCanvas.height = video.videoHeight;
                        const ctx = tempCanvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
                        dataUrl = tempCanvas.toDataURL('image/jpeg', 0.6);
                    } else {
                        // 方案 B：如果是 Wasm 解码，则它是渲染在 canvas (WebGL) 上的
                        const canvas = tempContainer.querySelector('canvas');
                        if (canvas) {
                            dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                        }
                    }

                    if (dataUrl) {
                        // 验证画面是否真实加载：数据长度 > 5000（提高阈值，防止高分屏下的大体积黑块）说明是真实画面
                        if (dataUrl.length > 5000) {
                            clearInterval(snapshotInterval);

                            if (sorces.value[index]) {
                                sorces.value[index].imageUrl = dataUrl;
                                sorces.value[index].loading = false;
                            }
                            cleanUpTempPlayer(player, tempContainer);
                            return resolve();
                        }
                    }
                } catch (err) { }
            }, 100);
        }, 2000);

        player.play(absoluteUrl).catch(e => {
            clearInterval(snapshotInterval);
            cleanUpTempPlayer(player, tempContainer);
            if (sorces.value[index]) sorces.value[index].loading = false;
            resolve();
        });
    });
};

const cleanUpTempPlayer = (player, container) => {
    try { if (player) player.destroy(); } catch (e) { }
    try { if (document.body.contains(container)) document.body.removeChild(container); } catch (e) { }
};

// 抓拍入口函数：放入队列执行避免浏览器卡死
const fetchSnapshot = (item, index) => {
    if (sorces.value[index]) sorces.value[index].loading = true;
    captureQueue.push({ item, index });
    processSnapshotQueue();
}

// 初始化视频网格数据 - 调取接口获取抓拍图，不播放实时视频
const initializeVideoGrids = async () => {
    if (!cameraListData.value || cameraListData.value.length === 0) {
        console.warn('cameraListData 为空，无法初始化视频网格');
        return;
    }

    // 取数据
    // const first8Items = cameraListData.value.slice(0, 8);
    const first8Items = cameraListData.value

    // 初始化 sorces 数组
    sorces.value = first8Items.map((item, index) => ({
        id: item.id,
        cn: item.cn || '摄像头',
        imageUrl: '',
        loading: true,
        inQueue: false // 初始化并未进队
    }));

    // 重置队列
    captureQueue.length = 0;
    activeCount = 0;

    // 不再这里直接 forEach 加载了，交给 Observer 懒加载
    console.log('✅ 初始化视频网格完成，准备懒加载观察...');
    initObserver();
}

const cameraListData = ref([]);
const pageNo = ref(1);
const pageSize = ref(20);
const total = ref(0);

const currentRegion = ref('全部');
const regions = ['全部', '智能平库', '四向车库', '指挥中心', '立库'];

const handleRegionChange = (tag) => {
    currentRegion.value = tag;
    pageNo.value = 1;
    fetchData2();
};

const handleSizeChange = (val) => {
    pageSize.value = val;
    fetchData2();
};

const handleCurrentChange = (val) => {
    pageNo.value = val;
    fetchData2();
};

const RUN_STATUS_MAP = { 0: "离线", 1: "在线" };

// 当使用输入框查询时，重置条件
const triggerSearch = () => {
    pageNo.value = 1;
    fetchData2();
};

// ====== API 查询数据 ====== 
const fetchData2_API = async () => {
    try {
        /**
         * [方案 A] 后端分页筛选逻辑：
         * 如果后端支持筛选，您可以将 currentRegion.value 作为一个参数传递给接口
         * 例如：region: currentRegion.value === '全部' ? '' : currentRegion.value
         */
        const res = await request({
            url: '/api/qydigital-park-service/videoMonitoringPoint/queryDataListByPage',
            method: 'post',
            data: {
                // 如果是一次性获取所有数据并在前端筛选 (方案 B)，则 pageSize 设置为 9999
                pageSize: pageSize.value,
                pageNo: pageNo.value,
                cn: input3.value || '',
                // region: currentRegion.value === '全部' ? '' : currentRegion.value // [方案 A] 给后端传参
            },
            skipGlobalParams: true
        });

        if (res.code === '0' || res.code === 0) {
            let list = res.data?.list || [];

            /**
             * [方案 B] 如果接口不支持 region 筛选，且您一次性拿到了所有数据，请在此处手动过滤并分页：
             * let allData = list;
             * if (currentRegion.value !== '全部') {
             *     allData = allData.filter(item => item.region && item.region.includes(currentRegion.value));
             * }
             * total.value = allData.length;
             * list = allData.slice((pageNo.value - 1) * pageSize.value, pageNo.value * pageSize.value);
             */

            total.value = res.data?.count || list.length;
            if (list && list.length > 0) {
                const mappedList = list.map((item, index) => ({
                    id: item.id,
                    name1: item.cn || `摄像头#${index + 1}`,
                    cn: item.cn,
                    online: RUN_STATUS_MAP[item.online] || '未知',
                    manufacturer: item.manufacturer
                }));
                cameraListData.value = mappedList;
                // 数据加载完成后，初始化视频网格
                await initializeVideoGrids();
            } else {
                cameraListData.value = [];
                sorces.value.forEach(item => item.loading = false);
            }
        } else {
            cameraListData.value = [];
            sorces.value.forEach(item => item.loading = false);
        }
    } catch (err) {
        console.error('获取data2 API 数据失败', err);
        cameraListData.value = [];
        sorces.value.forEach(item => item.loading = false);
    }
};

// ====== 本地 Mock 查询数据 ======
const fetchData2_Mock = async () => {
    try {
        const allCameraList = require('./cameraList.json') || [];

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 200));

        // 关键字过滤
        const keyword = input3.value ? input3.value.trim() : '';
        let filteredList = allCameraList;
        if (keyword) {
            filteredList = allCameraList.filter(item =>
                (item.cn && item.cn.includes(keyword)) ||
                (item.id && item.id.includes(keyword))
            );
        }

        // 2. [方案 B] 区域过滤 (前端手动实现)
        if (currentRegion.value !== '全部') {
            filteredList = filteredList.filter(item => {
                // 处理 JSON 中特殊的 Region‌ 字段键名 (可能包含不可见字符)
                const regionValue = item['Region‌'] || item.Region;
                return regionValue && regionValue.includes(currentRegion.value);
            });
        }

        total.value = filteredList.length;

        // 3. 手动分页
        const startIndex = (pageNo.value - 1) * pageSize.value;
        const endIndex = startIndex + pageSize.value;
        const pageData = filteredList.slice(startIndex, endIndex);

        if (pageData.length > 0) {
            const mappedList = pageData.map((item, index) => ({
                id: item.id,
                name1: item.cn || `摄像头#${startIndex + index + 1}`,
                cn: item.cn,
                online: '在线', // mock 数据默认在线
                manufacturer: item['Region‌'] || '摄像头设备'
            }));
            cameraListData.value = mappedList;

            // 数据加载完成后，初始化视频网格
            await initializeVideoGrids();
        } else {
            cameraListData.value = [];
            sorces.value.forEach(item => item.loading = false);
        }

    } catch (err) {
        console.error('获取data2 Mock 数据失败', err);
        cameraListData.value = [];
        sorces.value.forEach(item => item.loading = false);
    }
};

// 主请求入口 (切换注释实现数据源切换)
const fetchData2 = () => {
   // fetchData2_API();     // [方案 A] 调用真实接口 (需后端配合筛选)
    fetchData2_Mock(); // [方案 B] 调用本地 Mock 数据 (当前采用)
};



// 生命周期
onMounted(() => {
    fetchData2();
    // queryMonitoringPointListPagination();
    querySecurityAlarmListPagination();
    document.addEventListener("click", handleClickOutside);



});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    isCapturingActive = false; // 停止所有的背景抓拍排队
    if (lazyObserver) lazyObserver.disconnect();
    // 组件卸载前销毁所有播放器
    destroySingleFlvPlayer();
    destroyGridPlayers();
});

</script>