<template>
    <div v-if="showMenus" class="context-menu" :class="{ show: showMenus }" :style="menuStyle" ref="menuRef">
        <div class="context_tan">
            <div>
                <div class="context_tan_title">告警单号：GD233484</div>
                <!-- 可以在这里添加更多内容 -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',

    inject: ['ueResponseData', 'utils'],

    data() {
        return {
            showMenus: false,
            menuPosition: { x: 0, y: 0 },
            menuStyle: {
                left: '0px',
                top: '0px'
            }
        };
    },

    computed: {
        // 监听注入的数据变化
        responseData() {
            return this.ueResponseData ? this.ueResponseData() : null;
        }
    },

    watch: {
        responseData: {
            handler(newVal) {
                if (newVal && newVal.showMenus && newVal.ueResponse) {
                    this.handleNewData(newVal);
                } else {
                    this.showMenus = false;
                }
            },
            deep: true,
            immediate: true
        }
    },

    mounted() {
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * 设置事件监听器
         */
        setupEventListeners() {
            document.addEventListener('click', this.handleClickOutside);
            window.addEventListener('resize', this.handleResize);
        },

        /**
         * 移除事件监听器
         */
        removeEventListeners() {
            document.removeEventListener('click', this.handleClickOutside);
            window.removeEventListener('resize', this.handleResize);
        },

        /**
         * 处理新数据
         */
        async handleNewData(data) {
            if (data.ueResponse && data.ueResponse.clickPosition) {
                this.menuPosition = { ...data.ueResponse.clickPosition };
                this.showMenus = true;

                await this.$nextTick();
                this.adjustMenuPosition();
            }
        },

        /**
         * 调整菜单位置
         */
        adjustMenuPosition() {
            if (!this.$refs.menuRef) {
                console.warn('菜单引用未找到');
                return;
            }

            try {
                const menuRect = this.$refs.menuRef.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let { x, y } = this.menuPosition;

                // 边界检测
                if (x + menuRect.width > viewportWidth) {
                    x = viewportWidth - menuRect.width - 10;
                }
                if (x < 10) {
                    x = 10;
                }
                if (y + menuRect.height > viewportHeight) {
                    y = viewportHeight - menuRect.height - 10;
                }
                if (y < 10) {
                    y = 10;
                }

                this.menuStyle = {
                    left: `${x}px`,
                    top: `${y}px`
                };

            } catch (error) {
                console.error('调整菜单位置时出错:', error);
            }
        },

        /**
         * 点击外部关闭菜单
         */
        handleClickOutside(event) {
            if (this.$refs.menuRef && !this.$refs.menuRef.contains(event.target)) {
                this.showMenus = false;
            }
        },

        /**
         * 处理窗口大小变化
         */
        handleResize() {
            if (this.showMenus) {
                this.adjustMenuPosition();
            }
        }
    }
};
</script>

<style scoped>
.context-menu {
    position: fixed;
    background: transparent;
    border-radius: 8px;
    padding: 8px 0;
    min-width: 180px;
    z-index: 1000000;
    opacity: 0;
    transform: scale(0.95);
    transform-origin: top left;
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: auto;
}

.context-menu.show {
    opacity: 1;
    transform: scale(1);
}

.context_tan {
    width: 584px;
    height: 246px;
    background: url('@/assets/告警弹窗.png') no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 99999;
}

.context_tan .context_tan_title {
    font-family: SimHei;
    font-weight: 400;
    font-size: 22px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #77B9FF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 32px;
    padding-top: 20px;
}
</style>