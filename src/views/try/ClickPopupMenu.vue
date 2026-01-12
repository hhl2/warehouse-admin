<template>
    <div class="click-area" @click="handleAreaClick" :style="areaStyle">
        <p>{{ areaText }}</p>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    areaText: {
        type: String,
        default: ''
    },
    areaStyle: {
        type: Object,
        default: () => ({
            height: '300px',
            background: '#f8f9fa'
        })
    }
})

// Emits - 只发送点击位置信息
const emit = defineEmits(['position-click'])

// 处理区域点击
const handleAreaClick = (event) => {
    event.stopPropagation()

    const clickPos = {
        x: event.clientX,
        y: event.clientY
    }

    console.log('点击位置:', clickPos)
    // 发送位置信息给父组件
    emit('position-click', clickPos)
}
</script>

<style scoped>
.click-area {
    position: absolute;
    width: 100vw;
    height: 100vh;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    background: transparent;
    z-index: 99999;
}

.click-area:hover {
    background: transparent !important;
    border-color: #adb5bd;
}

.click-area p {
    color: #6c757d;
    font-size: 18px;
    margin: 0;
}
</style>