<template>
    <div class="drag-float-ball" :class="{
        'snapped': isSnapped,
        'snapped-left': isSnapped && snappedSide === 'left',
        'snapped-right': isSnapped && snappedSide === 'right',
        'hovering': isHoveringSnapped
    }" :style="ballStyle" @mousedown="startDrag" @touchstart="startDrag" @click="handleClick"
        @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- 关闭按钮 -->
        <div v-if="showCloseButton && isHovering" class="close-button" @click.stop="handleClose" @mousedown.stop
            @touchstart.stop>

            <el-icon>
                <CloseBold />
            </el-icon>
        </div>

        <div class="ball-content">
            <slot :isVisible="isVisible">
                {{ isVisible ? '隐藏' : '显示' }}
            </slot>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import { ElMessageBox } from 'element-plus';

const emit = defineEmits(['toggle', 'drag-start', 'drag-end', 'position-change', 'close', 'close-canceled']);

const props = defineProps({
    // 初始可见状态
    modelValue: {
        type: Boolean,
        default: true
    },
    // 初始位置
    initialPosition: {
        type: Object,
        default: () => ({ x: '0', y: '10' })
    },
    // 默认位置类型：'left' | 'right' | 'top' | 'bottom' | 'custom'
    defaultPosition: {
        type: String,
        default: 'right',
        validator: (value) => ['left', 'right', 'top', 'bottom', 'custom'].includes(value)
    },
    // 球的大小
    size: {
        type: Number,
        default: 80
    },
    // 吸附距离
    snapDistance: {
        type: Number,
        default: 20
    },
    // 是否启用吸附
    enableSnap: {
        type: Boolean,
        default: true
    },
    // 是否启用拖拽
    enableDrag: {
        type: Boolean,
        default: true
    },
    // 自定义颜色
    color: {
        type: String,
        default: 'rgba(64, 158, 255, 0.1)'
    },
    // 距离边缘的间距
    edgeMargin: {
        type: Number,
        default: 30
    },
    // 是否显示关闭按钮
    showCloseButton: {
        type: Boolean,
        default: true
    },
    // 关闭按钮大小（相对于悬浮球的比例）
    closeButtonSize: {
        type: Number,
        default: 1 // 悬浮球大小的30%
    },
    // 关闭按钮背景色
    closeButtonBgColor: {
        type: String,
        default: 'rgba(255, 77, 79, 0.9)'
    },
    // 关闭按钮文本颜色
    closeButtonTextColor: {
        type: String,
        default: 'white'
    },
    // 是否在点击关闭时隐藏悬浮球
    hideOnClose: {
        type: Boolean,
        default: false
    },
    // 是否显示确认关闭对话框
    showConfirmOnClose: {
        type: Boolean,
        default: true
    },
    // 确认对话框标题
    confirmTitle: {
        type: String,
        default: '确认关闭'
    },
    // 确认对话框内容
    confirmMessage: {
        type: String,
        default: '确定要关闭悬浮球吗？'
    },
    // 确认按钮文本
    confirmButtonText: {
        type: String,
        default: '确定'
    },
    // 取消按钮文本
    cancelButtonText: {
        type: String,
        default: '取消'
    },
    // 确认按钮类型
    confirmButtonType: {
        type: String,
        default: 'danger'
    },
    // 对话框是否居中
    centerDialog: {
        type: Boolean,
        default: false
    }
});
const isHovering = ref(false);
const isVisible = ref(props.modelValue);
const isDragging = ref(false);
const dragStart = reactive({ x: 0, y: 0 });
const ballPosition = reactive({ x: 0, y: 0 });
const hasUserDragged = ref(false); // 标记用户是否拖拽过
const isSnapped = ref(false); // 是否处于吸边状态
const snappedSide = ref(''); // 吸附到哪一侧: 'left' | 'right'
const isHoveringSnapped = ref(false); // 鼠标是否悬停在吸边状态的球上

// 计算默认位置
const calculateDefaultPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 如果指定了具体位置，使用指定位置
    if (props.initialPosition.x !== 'auto' && props.initialPosition.y !== 'auto') {
        return { ...props.initialPosition };
    }

    // 根据 defaultPosition 计算位置
    switch (props.defaultPosition) {
        case 'left':
            return {
                x: props.edgeMargin,
                y: viewportHeight / 2 - props.size / 2
            };
        case 'right':
            return {
                x: viewportWidth - props.size - props.edgeMargin,
                y: viewportHeight / 2 - props.size / 2
            };
        case 'top':
            return {
                x: viewportWidth / 2 - props.size / 2,
                y: props.edgeMargin
            };
        case 'bottom':
            return {
                x: viewportWidth / 2 - props.size / 2,
                y: viewportHeight - props.size - props.edgeMargin
            };
        default:
            return { x: props.edgeMargin, y: props.edgeMargin };
    }
};

// 计算关闭按钮样式
const closeButtonStyle = ref({
    width: `${props.size * props.closeButtonSize}px`,
    height: `${props.size * props.closeButtonSize}px`,
    fontSize: `${props.size * props.closeButtonSize * 0.8}px`,
    background: props.closeButtonBgColor,
    color: props.closeButtonTextColor,
    lineHeight: `${props.size * props.closeButtonSize}px`
});

// 悬浮球样式
const ballStyle = ref({});

// 初始化位置
const initPosition = () => {
    const defaultPos = calculateDefaultPosition();
    ballPosition.x = defaultPos.x;
    ballPosition.y = defaultPos.y;

    // 初始化时就设置为吸边状态
    const viewportWidth = window.innerWidth;
    if (ballPosition.x > viewportWidth / 2) {
        // 右侧
        ballPosition.x = viewportWidth - props.size;
        isSnapped.value = true;
        snappedSide.value = 'right';
    } else {
        // 左侧
        ballPosition.x = 0;
        isSnapped.value = true;
        snappedSide.value = 'left';
    }

    updateBallPosition();
};

// 更新悬浮球位置
const updateBallPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    ballPosition.x = Math.max(0, Math.min(ballPosition.x, viewportWidth - props.size));
    ballPosition.y = Math.max(0, Math.min(ballPosition.y, viewportHeight - props.size));

    // 构建CSS类名
    let classNames = [];
    if (isSnapped.value) {
        classNames.push('snapped');
        classNames.push(`snapped-${snappedSide.value}`);
        if (isHoveringSnapped.value) {
            classNames.push('hovering');
        }
    }

    ballStyle.value = {
        left: `${ballPosition.x}px`,
        top: `${ballPosition.y}px`,
        width: `${props.size}px`,
        height: `${props.size}px`,
        class: classNames.join(' ')
    };
};

// 颜色加深工具函数
const darkenColor = (color) => {
    return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
        (match, r, g, b, a) => `rgba(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)}, ${a})`);
};

// 开始拖拽
const startDrag = (e) => {
    if (!props.enableDrag) return;

    // 如果点击的是关闭按钮，不触发拖拽
    if (e.target.closest('.close-button')) {
        return;
    }

    isDragging.value = true;
    hasUserDragged.value = true;
    emit('drag-start', ballPosition);

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    dragStart.x = clientX - ballPosition.x;
    dragStart.y = clientY - ballPosition.y;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
};

// 拖拽中
const onDrag = (e) => {
    if (!isDragging.value) return;

    e.preventDefault();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    ballPosition.x = clientX - dragStart.x;
    ballPosition.y = clientY - dragStart.y;

    updateBallPosition();
    emit('position-change', ballPosition);
};

// 停止拖拽并吸附
const stopDrag = () => {
    if (!isDragging.value) return;

    isDragging.value = false;
    emit('drag-end', ballPosition);

    if (props.enableSnap) {
        snapToEdge();
    }

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
};

// 吸附到边缘（只吸附左右）
const snapToEdge = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const distanceToLeft = ballPosition.x;
    const distanceToRight = viewportWidth - ballPosition.x - props.size;

    // 只比较左右距离
    const minDistance = Math.min(distanceToLeft, distanceToRight);

    // 始终吸附到最近的左右边缘
    if (minDistance === distanceToLeft) {
        ballPosition.x = 0;
        isSnapped.value = true;
        snappedSide.value = 'left';
    } else {
        ballPosition.x = viewportWidth - props.size;
        isSnapped.value = true;
        snappedSide.value = 'right';
    }

    // 确保Y坐标在可视范围内
    ballPosition.y = Math.max(0, Math.min(ballPosition.y, viewportHeight - props.size));

    updateBallPosition();
    emit('position-change', ballPosition);
};

// 鼠标进入事件
const handleMouseEnter = () => {
    isHovering.value = true;
    if (isSnapped.value) {
        isHoveringSnapped.value = true;
        updateBallPosition();
    }
};

// 鼠标离开事件
const handleMouseLeave = () => {
    isHovering.value = false;
    if (isSnapped.value) {
        isHoveringSnapped.value = false;
        updateBallPosition();
    }
};

// 点击事件（非拖拽时才触发）
const handleClick = (e) => {
    if (!isDragging.value) {
        // 如果点击的是关闭按钮，不触发切换
        if (e.target.closest('.close-button')) {
            return;
        }

        isVisible.value = !isVisible.value;
        emit('update:modelValue', isVisible.value);
        emit('toggle', isVisible.value);
    }
};

// 关闭按钮点击事件
const handleClose = async () => {
    // 如果需要显示确认对话框
    if (props.showConfirmOnClose) {
        try {
            await ElMessageBox.confirm(
                props.confirmMessage,
                props.confirmTitle,
                {
                    confirmButtonText: props.confirmButtonText,
                    cancelButtonText: props.cancelButtonText,
                    type: props.confirmButtonType,
                    center: props.centerDialog,
                    draggable: true, // 对话框可拖拽
                    customClass: 'float-ball-confirm-dialog',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '关闭中...';
                            setTimeout(() => {
                                done();
                                instance.confirmButtonLoading = false;
                            }, 300);
                        } else {
                            done();
                        }
                    }
                }
            );

            // 用户点击了确定
            emit('close', ballPosition);

            if (props.hideOnClose) {
                isVisible.value = false;
                emit('update:modelValue', isVisible.value);
                emit('toggle', isVisible.value);
            }
        } catch (error) {
            // 用户点击了取消或关闭对话框
            console.log('用户取消了关闭操作');
            emit('close-canceled', ballPosition); // 新增一个取消事件
        }
    } else {
        // 不显示确认对话框，直接关闭
        emit('close', ballPosition);

        if (props.hideOnClose) {
            isVisible.value = false;
            emit('update:modelValue', isVisible.value);
            emit('toggle', isVisible.value);
        }
    }
};

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal;
});

// 监听相关属性变化，更新关闭按钮样式
watch(() => [props.size, props.closeButtonSize, props.closeButtonBgColor, props.closeButtonTextColor], () => {
    closeButtonStyle.value = {
        width: `${props.size * props.closeButtonSize}px`,
        height: `${props.size * props.closeButtonSize}px`,
        fontSize: `${props.size * props.closeButtonSize * 0.8}px`,
        background: props.closeButtonBgColor,
        color: props.closeButtonTextColor,
        lineHeight: `${props.size * props.closeButtonSize}px`
    };
}, { deep: true });

// 窗口大小变化时重新定位
const handleResize = () => {
    // 如果用户没有拖拽过，重新计算默认位置
    if (!hasUserDragged.value) {
        initPosition();
    } else {
        updateBallPosition();
    }
};

onMounted(() => {
    initPosition();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.drag-float-ball {
    position: fixed;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    z-index: 1000;
    user-select: none;
    touch-action: none;

    /* 半透明风格 */
    background: rgba(0, 0, 0, 0.35) !important;

    /* 毛玻璃效果 */
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);

    /* 边框和阴影 */
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
        0 8px 32px 0 rgba(0, 0, 0, 0.3),
        0 2px 8px 0 rgba(0, 0, 0, 0.12),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.15);

    /* 平滑过渡 - 吸边效果的关键 */
    transition:
        transform 0.4s cubic-bezier(0.34, 1.26, 0.64, 1),
        border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease,
        border 0.3s ease;
}

.drag-float-ball:hover:not(:active):not(.snapped) {
    transform: scale(1.06);
    box-shadow:
        0 12px 40px 0 rgba(0, 0, 0, 0.4),
        0 4px 12px 0 rgba(0, 0, 0, 0.16),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

.drag-float-ball:active {
    cursor: grabbing;
    transform: scale(0.94);
    box-shadow:
        0 4px 16px 0 rgba(0, 0, 0, 0.3),
        inset 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}

/* 吸边状态 - 左侧竖条 */
.drag-float-ball.snapped-left {
    transform: translateX(-80%);
    border-radius: 0 50% 50% 0;
    border-left: none;
}

/* 吸边状态 - 右侧竖条 */
.drag-float-ball.snapped-right {
    transform: translateX(80%);
    border-radius: 50% 0 0 50%;
    border-right: none;
}

/* hover时展开 */
.drag-float-ball.snapped.hovering {
    transform: translateX(0) !important;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
        0 12px 48px 0 rgba(0, 0, 0, 0.4),
        0 4px 16px 0 rgba(0, 0, 0, 0.2),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

.ball-content {
    color: white;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    line-height: 1.3;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    letter-spacing: 0.5px;
    opacity: 1;
    transition: opacity 0.3s ease;
}

/* 吸边时文字淡出 */
.drag-float-ball.snapped:not(.hovering) .ball-content {
    opacity: 0;
}

/* 关闭按钮样式 */
.close-button {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
    box-shadow:
        0 2px 8px rgba(238, 90, 90, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1);
    user-select: none;
    font-weight: bold;
    border: 2px solid rgba(255, 255, 255, 0.9);
    color: white;
    font-size: 12px;
}

.close-button:hover {
    transform: scale(1.15);
    background: linear-gradient(135deg, #ff5252 0%, #e53935 100%);
    box-shadow:
        0 4px 16px rgba(229, 57, 53, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.close-button:active {
    transform: scale(0.95);
    box-shadow: 0 1px 4px rgba(229, 57, 53, 0.4);
}

.close-icon {
    display: block;
    text-align: center;
    font-weight: bold;
}
</style>