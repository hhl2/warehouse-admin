<template>
    <div class="trytext-container">
        <div class="form-box">
            <!-- <div class="title">任务模拟录入</div> -->
            <el-form :model="formData" label-width="100px" class="custom-form">
                <el-form-item label="任务号">
                    <el-input v-model="formData.id" placeholder="请输入任务号" />
                </el-form-item>
                <el-form-item label="起点编码">
                    <el-input v-model="formData.start" placeholder="请输入起点编码" />
                </el-form-item>
                <el-form-item label="终点编码">
                    <el-input v-model="formData.end" placeholder="请输入终点编码" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formData.status" placeholder="请选择状态" class="full-width">
                        <el-option label="开始" value="0" />
                        <el-option label="结束" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="AGV类型">
                    <el-input v-model="formData.agvtype" placeholder="请输入AGV类型" />
                </el-form-item>
                <el-form-item label="AGV编码">
                    <el-input v-model="formData.agvcode" placeholder="请输入AGV编码" />
                </el-form-item>
                <div class="btn-group">
                    <el-button type="primary" @click="handleSubmit">确认发送对象</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </div>
            </el-form>

            <div v-if="submittedData" class="result-box">
                <div class="result-title">生成的JSON对象：</div>
                <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'

const formData = reactive({
    id: '',
    start: '',
    end: '',
    status: '',
    agvtype: '',
    agvcode: ''
})

/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.sendMessage) {
        console.log(message, '22')
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const submittedData = ref(null)

const handleSubmit = () => {
    // 构造所需的对象结构
    const result = {
        "id": formData.id,
        "start": formData.start,
        "end": formData.end,
        "status": formData.status,
        "agvtype": formData.agvtype,
        "agvcode": formData.agvcode
    }
    submittedData.value = result;

    ElMessage.success('对象已生成，请查看下方结果');

    const message = {
        code: 1,
        type: "agv",
        data: [result]
    }

    console.log('生成对象:', message);

    callParentMethod(message);
}

const handleReset = () => {
    Object.keys(formData).forEach(key => formData[key] = '');
    submittedData.value = null;
}
</script>

<style scoped>
.trytext-container {
    width: 100%;
    height: 100vh;
    background: #0d479e;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(circle at 50% 50%, #0d2847 0%, #020F23 100%);
    overflow: auto;
}

.form-box {
    width: 550px;
    padding: 20px;
    /* background: rgba(16, 36, 65, 0.4); */
    border: 1px solid #10A8FD;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(16, 168, 253, 0.2);
    backdrop-filter: blur(10px);
}

.title {
    color: #fff;
    font-size: 26px;
    text-align: center;
    margin-bottom: 35px;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(16, 168, 253, 0.5);
    position: relative;
    padding-bottom: 15px;
}

.title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #10A8FD;
    box-shadow: 0 0 8px #10A8FD;
}

/* 覆盖 Element Plus 样式以匹配深色主题 */
.custom-form :deep(.el-form-item__label) {
    color: #a4ccf5;
    font-weight: bold;
}

.custom-form :deep(.el-input__wrapper),
.custom-form :deep(.el-select__wrapper) {
    background-color: rgba(5, 22, 48, 0.5) !important;
    box-shadow: 0 0 0 1px #1C70D7 inset !important;
    transition: all 0.3s;
}

.custom-form :deep(.el-input__wrapper:hover),
.custom-form :deep(.el-select__wrapper:hover),
.custom-form :deep(.el-input__wrapper.is-focus),
.custom-form :deep(.el-select__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #4ed5ff inset !important;
    background-color: rgba(5, 22, 48, 0.8) !important;
}

.custom-form :deep(.el-input__inner) {
    color: #fff !important;
    font-family: inherit;
}

.full-width {
    width: 100%;
}

.btn-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}

.btn-group .el-button {
    padding: 12px 30px;
    height: auto;
    font-size: 16px;
}

.result-box {
    margin-top: 30px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px dashed #10A8FD;
    border-radius: 4px;
    position: relative;
}

.result-title {
    color: #10A8FD;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
}

pre {
    color: #8AFC67;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
    margin: 0;
}
</style>
