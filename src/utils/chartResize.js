// 监听全屏和窗口变化，自动调用 ECharts resize
export function useChartResize(chartInstances) {
    const resizeCharts = () => {
        // chartInstances 可以是单个实例或数组
        const charts = Array.isArray(chartInstances) ? chartInstances : [chartInstances]
        charts.forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize()
            }
        })
    }

    // 监听 resize 事件
    window.addEventListener('resize', resizeCharts)

    // 监听全屏变化事件（包含 F11）
    document.addEventListener('fullscreenchange', resizeCharts)
    document.addEventListener('webkitfullscreenchange', resizeCharts)
    document.addEventListener('mozfullscreenchange', resizeCharts)
    document.addEventListener('MSFullscreenChange', resizeCharts)

    // 返回清理函数
    return () => {
        window.removeEventListener('resize', resizeCharts)
        document.removeEventListener('fullscreenchange', resizeCharts)
        document.removeEventListener('webkitfullscreenchange', resizeCharts)
        document.removeEventListener('mozfullscreenchange', resizeCharts)
        document.removeEventListener('MSFullscreenChange', resizeCharts)
    }
}

// 简化版：传入 ref 数组，自动处理
export function setupChartResize(getCharts) {
    let cleanup = null

    const init = () => {
        const resizeCharts = () => {
            const charts = getCharts()
            charts.forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    setTimeout(() => chart.resize(), 100) // 延迟确保 DOM 更新
                }
            })
        }

        window.addEventListener('resize', resizeCharts)
        document.addEventListener('fullscreenchange', resizeCharts)
        document.addEventListener('webkitfullscreenchange', resizeCharts)

        cleanup = () => {
            window.removeEventListener('resize', resizeCharts)
            document.removeEventListener('fullscreenchange', resizeCharts)
            document.removeEventListener('webkitfullscreenchange', resizeCharts)
        }
    }

    return { init, cleanup: () => cleanup && cleanup() }
}
