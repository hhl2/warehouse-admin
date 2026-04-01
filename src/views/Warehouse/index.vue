<template>
    <div class="xm_title">
        <img v-if="showBack" class="backimg" src="@/assets/rounded-rectangle.png" @click="goback()" />
        <img class="xmimg" src="@/assets/xm_title.png" />
        <div class="xm_titles">清远仓库数字孪生平台</div>
    </div>
    <div class="menu_boxs" v-if='showMenu'>
        <div class="menu_box_uls">
            <div v-for="(item, index) in menuList2" :key="item.id" class="nav-button-item"
                :class="{ active: changli2 === item.id }" @click.stop="changelist2(item)">
                <div class="nav-button-content">
                    <span class="nav-button-text">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="menu_boxs" v-if='showgl'>
        <div class="menu_box_uls">
            <div v-for="(item, index) in menuList3" :key="item.id" class="nav-button-item gl-button"
                :class="{ active: changli3 === item.id }" @click.stop="changelist3(item)">
                <div class="nav-button-content">
                    <span class="nav-button-text">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="xm_date" style="pointer-events: auto; z-index: 9999;">
        {{ formattedTime }}&nbsp;&nbsp; |&nbsp; {{ formattedDate }} &nbsp;&nbsp;{{ weekDay }}
        <img class="fullscreen-icon" :src="isFullscreen ? exitFullscreenImg : fullscreenImg"
            @click.stop="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏切换'" />
    </div>


    <!-- <div class="xm_texts">
        <img src="@/assets/link.png" />
        <div class="xm_titless">安全运行 <div class="xm_title_bold">&nbsp;366&nbsp;</div> 天</div>
    </div> -->


    <!-- 主要内容区域 -->
    <main class="main-content">
        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <div :key="route.name" class="page-wrapper">
                    <component :is="Component" :isPanelVisible="isPanelsVisible" />
                </div>
            </transition>
        </router-view>
    </main>

    <div class="menu_box">
        <div class="menu_box_ul">
            <div v-for="(item, index) in menuList" :key="item.id" class="menu_box_li"
                :class="{ active: changli === item.id }" @click="changelist(item)">
                <img :src="getImagePath(item.id)" :alt="item.name">
                <div class="menu_box_text">{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div class="xm_foot">
        <img style="height: 21px;" src="@/assets/xm_foot.png" />
    </div>


    <div v-show="showball && isPaneClose">
        <DragFloatBall v-model="isPanelsVisible" default-position="right" :size="70" :snap-distance="20"
            :edge-margin="30" :enable-snap="true" :enable-drag="true" @toggle="handleToggle"
            @drag-start="handleDragStart" @drag-end="handleDragEnd" @position-change="handlePositionChange"
            @close="handleClose">
            <!-- 自定义内容 -->

            <template #default="{ isVisible }">
                <div class="custom-content">
                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="isVisible"
                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                            fill="currentColor" />
                        <path v-else
                            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                            fill="currentColor" />
                    </svg>
                    <div class="text">{{ isVisible ? '隐藏' : '显示' }}</div>
                </div>
            </template>
        </DragFloatBall>

    </div>

</template>

<style scoped>
/* 核心导航按钮样式 */
.nav-button-item {
    position: relative;
    width: 125px;
    height: 25px;
    margin-left: -20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
}

.nav-button-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    background: rgba(0, 48, 96, 0.4);
    border: 1px solid rgba(0, 228, 255, 0.2);
    /* 采用倾斜平行四边形切角 */
    clip-path: polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.nav-button-text {
    font-family: YouSheBiaoTiHei, Microsoft YaHei;
    font-size: 16px;
    color: rgba(174, 210, 245, 0.8);
    font-weight: bold;
    letter-spacing: 1px;
    transition: all 0.3s ease;
}

/* 悬浮效果 */
.nav-button-item:hover {
    z-index: 5;
    transform: translateY(-2px);
}

.nav-button-item:hover .nav-button-content {
    background: rgba(0, 48, 96, 0.7);
    border-color: rgba(0, 228, 255, 0.6);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-button-item:hover .nav-button-text {
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* 激活状态 */
.nav-button-item.active {
    z-index: 10;
    transform: translateY(-1px);
}

.nav-button-item.active .nav-button-content {
    /* 渐变背景 */
    background: linear-gradient(135deg, rgba(16, 168, 253, 0.85) 0%, rgba(9, 107, 180, 0.85) 100%);
    border-color: #00E4FF;
    border-width: 1.5px;
    box-shadow:
        0 0 15px rgba(0, 228, 255, 0.4),
        inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.nav-button-item.active .nav-button-text {
    color: #fff !important;
    font-size: 16px;
    text-shadow: 0 0 10px rgba(0, 228, 255, 0.8);
    background: linear-gradient(to bottom, #FFFFFF, #DAEDFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* 特殊宽度调整 */
.gl-button {
    width: 180px !important;
}

.footer-item {
    width: 156px;
    height: 40px;
}

.footer-item .nav-button-content {
    clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
}

.menu_box_li {
    width: 146px;
    position: relative;
}

.menu_box_li img {
    width: 100%;
    height: 42px;
}

.menu_box_li .menu_box_text {
    position: absolute;
    top: 9px;
    left: 50%;
    transform: translate(-50%);
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 17px;
    color: #fff;
}

.xm_texts {
    position: fixed;
    top: 55px;
    z-index: 32;
    left: 50%;
    transform: translateX(-50%);
    height: 70px;
    display: inline-block;
    /* 重要：让容器宽度自适应内容 */


}

.xm_texts img {
    height: 60px;
    width: auto;
    /* 保持图片原始比例 */
    display: block;
}

.xm_titless {
    display: flex;
    align-items: center;
    position: absolute;
    top: 28px;
    left: 35px;
    color: #AED2F5;
    letter-spacing: 3px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: Regular;




}

.xm_title_bold {

    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 22px;
    color: #1280FB;
    letter-spacing: 0px;

    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* 标准属性 */
    background-clip: text;
    color: transparent;

}

.layout-container {
    position: relative;
    min-height: 100vh;
    background: #f0f2f5;
}

.xm_title {
    position: fixed;
    top: 0;
    z-index: 32;
    left: 50%;
    transform: translateX(-50%);
    height: 70px;
    display: inline-block;


}

.xm_title .backimg {

    width: 65px;
    height: 30px;
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: 54px;
    z-index: 9999;
    cursor: pointer;
}

.xm_title .xmimg {

    height: 70px;
    width: auto;
    /* 保持图片原始比例 */
    display: block;

}

.xm_titles {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 2px;
    font-size: 32px;
    font-weight: bold;
    white-space: nowrap;
    pointer-events: none;
    background: linear-gradient(to top, #FFFFFF, #6CB0FD);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    /* 标准属性 */

    color: transparent;




}

.xm_foot {
    position: fixed;
    bottom: 0;
    z-index: 32;
    left: 50%;
    transform: translateX(-50%);
    height: 21px;

}

.xm_date {
    position: fixed;
    right: 25px;
    color: #fff;
    z-index: 33;
    top: 25px;
    font-size: 16px;
    font-weight: 400;
}

.menu_box {
    position: fixed;
    bottom: 30px;
    z-index: 999;
    width: 40%;
    background-size: 100% 100%;
    left: 50%;
    transform: translateX(-50%);
    height: 42px;
}

.menu_box_ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
}

.menu_box_ul .menu_box_li {
    width: 146px;
    position: relative;
}

.menu_box_ul .menu_box_li img {
    width: 100%;
    height: 42px;
}

.menu_box_ul .menu_box_li .menu_box_text {
    position: absolute;
    top: 9px;
    left: 50%;
    transform: translate(-50%);
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 17px;
    color: #fff;
}

.menu_box_text1 {
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    font-weight: bold;
    opacity: 1;
    z-index: 9999;

}




.menu_boxs {
    position: fixed;
    top: 24px;
    z-index: 999;
    width: 100%;
    background-size: 100% 100%;
    left: 20px;
    height: 35px;
}

.menu_box_uls {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.menu_box_uls .menu_box_lis {
    width: 135px;
    position: relative;
    margin-left: -22px;
}

.menu_box_uls .menu_box_lis img {
    width: 100%;
    height: 30px;
}

.menu_change_box {
    width: 200px !important;
    font-size: 12px !important;

}



.menu_box_texts {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    font-weight: bold;
    opacity: 1;
    z-index: 9999;
    background: linear-gradient(to bottom, #DAEDFF, #12B7FD, #04A6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}

.fullscreen-icon {
    margin-left: 15px;
    cursor: pointer;
    vertical-align: middle;
    width: 22px;
    height: 22px;
    transition: all 0.3s;
    opacity: 0.8;
}

.fullscreen-icon:hover {
    opacity: 1;
    transform: scale(1.15);
    filter: drop-shadow(0 0 8px rgba(0, 228, 255, 0.9));
}
</style>

<script>
export default {
    name: 'LayoutIndex' // 改为多单词名称
}
</script>
<script setup>

import activeButton from '@/assets/activeButton.png'
import defaultButton from '@/assets/defaultButton.png'
import defaultButton2 from '@/assets/label-selected.png'
import activeButton2 from '@/assets/ningde-label.png'

import { onMounted, onUnmounted, ref, computed, onBeforeUnmount, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FullScreen } from '@element-plus/icons-vue'
import fullscreenImg from '@/assets/try/fullscreen_new.png'
import exitFullscreenImg from '@/assets/try/exit_fullscreen.png'

import DragFloatBall from '@/components/DragFloatBall.vue';

// 面板状态
const isPanelsVisible = ref(true);

const isPaneClose = ref(true);

// 全屏状态
const isFullscreen = ref(false);

const updateFullscreenState = () => {
    // 强制使用最新的 DOM 状态或窗口高度检查全屏
    const isFull = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (isFullscreen.value !== isFull) {
        isFullscreen.value = isFull;
    }
}

const handleClose = () => {
    console.log("确认关闭悬浮球")
    isPaneClose.value = false
}
const handleToggle = (isVisible) => {
    console.log('面板状态:', isPanelsVisible, isVisible ? '显示' : '隐藏');
};

const handleDragStart = (position) => {
    console.log('开始拖拽:', position);
};

const handleDragEnd = (position) => {
    console.log('结束拖拽:', position);
};

const handlePositionChange = (position) => {
    console.log('位置变化:', position);
};


// 如果路由有 meta.showMenu 配置，就使用配置的值
// 如果没有配置，默认显示菜单（true）

const showball = computed(() => {
    // 如果路由有 meta.showMenu 配置，就使用配置的值
    return route.meta.showball !== false
})
const showgl = computed(() => {
    return route.meta.showgl && route.meta.showgl !== false
})
const showMenu = computed(() => {
    return route.meta.showMenu !== false
})
const showBack = computed(() => {
    return route.meta.showBack !== false
})

// 计算属性：根据路由元信息决定是否显示菜单

// 获取路由实例和当前路由对象
const router = useRouter()
const route = useRoute()


const goback = () => {
    router.go(-1);
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": 1 } });
}

/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const ue5click = (index) => {
    console.log('点击触发', { "code": 1, "type": "btn", "data": { "id": index } });
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": index } });
}

const menuList = ref([
    { id: 1, name: '园区运营', routeName: 'Park' },
    { id: 2, name: '仓储作业', routeName: 'housework' },
    { id: 3, name: '设备管理', routeName: 'shebgl' },
    { id: 4, name: '检测作业', routeName: '' },

    // 可以继续添加更多菜单项
]);


const menuList2 = ref([
    { id: 21, name: '仓储作业', routeName: 'housework' },
    // { id: 22, name: '告警联动', routeName: 'work1' },
    { id: 23, name: '作业推演', routeName: 'work2' },
    { id: 24, name: '作业安全', routeName: 'work3' },
    { id: 25, name: '物资监控', routeName: 'work4' },
    { id: 26, name: '库房监控', routeName: 'work5' },


    // 可以继续添加更多菜单项
]);
// 图片映射
const imageMap = {
    active: activeButton,
    default: defaultButton
};
const changli = ref(1)
const changelist = (item) => {

    changli.value = item.id;
    if (item.id == 2) {
        changli2.value = 21

    }
    if (item.id == 3) {
        changli3.value = 31

    }
    // 如果是id为4，打开新窗口
    if (item.id == 4) {
        // console.log('打开新窗口')
        window.open('http://10.151.223.209/jc/#/', '_blank');
        // return;
        // const data2 = {

        //     "code": 1,
        //     "type": "agv",
        //     "data": [
        //         {
        //             "id": 1
        //         },
        //         {
        //             "id": 2
        //         },
        //         {
        //             "id": 3
        //         }
        //     ]
        // }
        // console.log(data2)
        // callParentMethod(data2);
        return;
    }

    router.push({ name: item.routeName })
    ue5click(item.id)
};
const getImagePath = (id) => {
    return changli.value === id ? imageMap.active : imageMap.default;
}


const changli2 = ref(21)
// 图片映射
const imageMap2 = {
    active: activeButton2,
    default: defaultButton2
};
const changelist2 = (item) => {
    changli2.value = item.id;


    ue5click(item.id)


    router.push({ name: item.routeName })
};
const getImagePath2 = (id) => {
    return changli2.value === id ? imageMap2.active : imageMap2.default;
}

const menuList3 = ref([


    { id: 31, name: '设备管理', routeName: 'shebgl' },
    { id: 32, name: '重点设备维护', routeName: 'device' },




    // 可以继续添加更多菜单项
]);

const changli3 = ref(31)
// 图片映射
const imageMap3 = {
    active: activeButton2,
    default: defaultButton2
};
const changelist3 = (item) => {
    changli3.value = item.id;
    ue5click(item.id)

    router.push({ name: item.routeName })
};
const getImagePath3 = (id) => {
    return changli3.value === id ? imageMap3.active : imageMap3.default;
}








// 定义响应式时间对象
const now = ref(new Date());
let timer = null;

// 补零函数（确保两位数显示）
const complement = (value) => {
    return value < 10 ? `0${value}` : value;
};

// 时间格式化
const formatDateTime = () => {
    const date = now.value;
    return {
        year: date.getFullYear(),
        month: complement(date.getMonth() + 1),
        day: complement(date.getDate()),
        hour: complement(date.getHours()),
        minute: complement(date.getMinutes()),
        second: complement(date.getSeconds()),
        week: date.getDay()  // 返回 0-6（0=星期日）
    };
};

// 计算属性式输出
const formattedDate = computed(() => {
    const { year, month, day } = formatDateTime();
    return `${year}年${month}月${day}日`;
});

const formattedTime = computed(() => {
    const { hour, minute, second } = formatDateTime();
    return `${hour}:${minute}:${second}`;
});

const weekDay = computed(() => {
    const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekMap[formatDateTime().week];
});

// 清除定时器
onBeforeUnmount(() => {
    clearInterval(timer);
});

onMounted(async () => {
    timer = setInterval(() => {
        now.value = new Date();
    }, 1000);
    //显示时间end

    // 监听全屏变化
    document.addEventListener('fullscreenchange', updateFullscreenState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenState);
    document.addEventListener('mozfullscreenchange', updateFullscreenState);
    document.addEventListener('MSFullscreenChange', updateFullscreenState);
})

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', updateFullscreenState);
    document.removeEventListener('webkitfullscreenchange', updateFullscreenState);
    document.removeEventListener('mozfullscreenchange', updateFullscreenState);
    document.removeEventListener('MSFullscreenChange', updateFullscreenState);
})

const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    console.log('Toggle Fullscreen Triggered');
    const doc = document.documentElement;
    const currentlyFullscreen = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

    if (!currentlyFullscreen) {
        // 先立刻改变图标状态保证反馈
        isFullscreen.value = true;
        const rfs = doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullscreen || doc.msRequestFullscreen;
        if (rfs) rfs.call(doc).catch(err => {
            console.warn('全屏失败:', err);
            isFullscreen.value = false; // 失败则回退状态
        });
    } else {
        isFullscreen.value = false;
        const efs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        if (efs) {
            // efs.call 可能不返回 promise，包一层 try
            try { efs.call(document); } catch (e) { console.warn(e); }
        }
    }
}
</script>