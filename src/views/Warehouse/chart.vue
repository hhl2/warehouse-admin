<template>
    <div class="pie-chart-container">
        <div class="chart-wrapper">
            <div ref="chartRef" class="chart"></div>
            <div class="center-content">
                <div class="total-value">{{ total }}</div>
                <div class="total-label">总计</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// 定义props
const props = defineProps({
    data: {
        type: Array,
        default: () => [
            { value: 735, name: '' },
            { value: 1048, name: '' }
        ]
    },
    colors: {
        type: Array,
        default: () => ['#42FFF9', '#F0B716']
    }
})

const chartRef = ref(null)
let chartInstance = null
const total = ref(0)

// 计算总和
const calculateTotal = () => {
    total.value = props.data.reduce((sum, item) => sum + item.value, 0)
}

// 初始化图表
const initChart = () => {
    if (!chartRef.value) return

    chartInstance = echarts.init(chartRef.value)

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            show: false
        },
        series: [
            {
                name: '数据分布',
                type: 'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 3,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.data.map((item, index) => ({
                    ...item,
                    itemStyle: {
                        color: props.colors[index % props.colors.length]
                    }
                }))
            }
        ]
    }

    chartInstance.setOption(option)

    // 响应窗口大小变化
    const resizeChart = () => {
        chartInstance?.resize()
    }
    window.addEventListener('resize', resizeChart)
}

// 监听数据变化
watch(() => props.data, () => {
    calculateTotal()
    if (chartInstance) {
        chartInstance.setOption({
            series: [{
                data: props.data.map((item, index) => ({
                    ...item,
                    itemStyle: {
                        color: props.colors[index % props.colors.length]
                    }
                }))
            }]
        })
    }
}, { deep: true })

onMounted(() => {
    calculateTotal()
    initChart()
})

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
    }
})
</script>

<style scoped>
.pie-chart-container {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 500px;
}

.chart {
    width: 100%;
    height: 100%;
}

.center-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
}

.total-value {
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
}

.total-label {
    font-size: 14px;
    color: #7f8c8d;
}
</style>