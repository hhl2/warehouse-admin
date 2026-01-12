<template>
    <div class="demo-container">
        <!-- 点击区域组件 -->
        <ClickPopupMenu area-text="" :area-style="{}" @position-click="handlePositionClick" />

        <!-- 弹窗菜单 - 完全由父组件控制 -->
        <div v-if="showMenu" class="context-menu" :class="{ show: showMenu }" :style="menuStyle" ref="menuRef">
            <!-- 这里可以自定义菜单内容 -->
            <!-- <div v-for="item in customMenuItems" :key="item.id" class="menu-item" :class="{ divider: item.divider }"
                @click.stop="!item.divider && handleMenuClick(item)">
                <span v-if="item.icon" class="menu-icon">{{ item.icon }}</span>
                <span v-if="!item.divider">{{ item.label }}</span>
            </div> -->

        </div>
    </div>
</template>

<script setup>
import ClickPopupMenu from './ClickPopupMenu.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const showMenu = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const menuRef = ref(null)

// 自定义菜单项 - 可以在不同父组件中自定义
const customMenuItems = ref([
    { id: 1, label: '自定义选项1', icon: '⭐' },
    { id: 2, label: '自定义选项2', icon: '🌟' },
    { id: 3, divider: true },
    { id: 4, label: '自定义选项3', icon: '🔔' },
    { id: 5, label: '删除', icon: '🗑️' }
])

// 菜单样式
const menuStyle = ref({
    left: '0px',
    top: '0px'
})

// 处理位置点击
const handlePositionClick = async (position) => {
    console.log('收到点击位置:', position)

    // 这里可以添加条件判断
    if (true) { // 你的条件
        console.log("阻止弹出")


        menuPosition.value = position
        showMenu.value = true

        // 下一帧调整位置
        await nextTick()
        adjustMenuPosition()
    }
}

// 调整菜单位置
const adjustMenuPosition = () => {
    if (!menuRef.value) {
        console.warn('menuRef 未找到')
        return
    }

    try {
        const menuRect = menuRef.value.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let { x, y } = menuPosition.value

        // 水平边界检测
        if (x + menuRect.width > viewportWidth) {
            x = viewportWidth - menuRect.width - 10
        }

        // 垂直边界检测
        if (y + menuRect.height > viewportHeight) {
            y = viewportHeight - menuRect.height - 10
        }

        // 确保位置不为负数
        x = Math.max(10, x)
        y = Math.max(10, y)

        menuStyle.value = {
            left: `${x}px`,
            top: `${y}px`
        }
    } catch (error) {
        console.error('调整菜单位置时出错:', error)
    }
}

// 处理菜单项点击
const handleMenuClick = (item) => {
    alert(`您点击了: ${item.label}`)
    showMenu.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        showMenu.value = false
    }
}

// 监听窗口大小变化
const handleResize = () => {
    if (showMenu.value) {
        adjustMenuPosition()
    }
}

// 生命周期
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.context-menu {
    position: fixed;
    background: white;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    padding: 8px 0;
    min-width: 180px;
    z-index: 1000000;
    opacity: 0;
    transform: scale(0.95);
    transform-origin: top left;
    transition: opacity 0.2s, transform 0.2s;
    border: 1px solid #e0e0e0;
}

.context-menu.show {
    opacity: 1;
    transform: scale(1);
}

.menu-item {
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    font-size: 14px;
    color: #333;
}

.menu-item:hover {
    background: #f0f2f5;
}

.menu-item.divider {
    height: 1px;
    background: #e9ecef;
    margin: 5px 0;
    padding: 0;
    cursor: default;
}

.menu-icon {
    margin-right: 10px;
    font-size: 16px;
}
</style>