<template>
    <div>
        <h2>用户列表</h2>

        <!-- 搜索区域 -->
        <div class="search-box">
            <input v-model="searchParams.keyword" placeholder="搜索关键词" @keyup.enter="handleSearch">
            <select v-model="searchParams.status">
                <option value="">全部状态</option>
                <option value="1">启用</option>
                <option value="0">禁用</option>
            </select>
            <button @click="handleSearch" :disabled="loading">
                {{ loading ? '搜索中...' : '搜索' }}
            </button>
            <button @click="handleReset">重置</button>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading">加载中...</div>

        <!-- 错误信息 -->
        <div v-else-if="error" class="error">
            加载失败: {{ error }}
            <button @click="fetchUserList">重试</button>
        </div>

        <!-- 数据表格 -->
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.status === 1 ? '启用' : '禁用' }}</td>
                        <td>
                            <button @click="handleEdit(user)">编辑</button>
                            <button @click="handleDelete(user.id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 分页 -->
            <div class="pagination">
                <button :disabled="searchParams.page === 1" @click="handlePageChange(searchParams.page - 1)">
                    上一页
                </button>
                <span>第 {{ searchParams.page }} 页</span>
                <button @click="handlePageChange(searchParams.page + 1)">
                    下一页
                </button>
            </div>
        </div>

        <!-- 新增用户表单 -->
        <div class="add-form">
            <h3>新增用户</h3>
            <form @submit.prevent="handleAddUser">
                <input v-model="newUser.name" placeholder="姓名" required>
                <input v-model="newUser.email" placeholder="邮箱" type="email" required>
                <button type="submit" :disabled="adding">
                    {{ adding ? '添加中...' : '添加用户' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
    getUserList,
    createUser,
    updateUser,
    deleteUser
} from '@/api/user'

// 响应式数据
const userList = ref([])
const loading = ref(false)
const error = ref('')
const adding = ref(false)




// 查询参数
const searchParams = reactive({
    page: 1,
    limit: 10,
    keyword: '',
    status: ''
})
// Object.assign(gcgwList, response.data)

// 新增用户数据
const newUser = reactive({
    name: '',
    email: ''
})

// 获取用户列表
const fetchUserList = async () => {
    try {
        loading.value = true
        error.value = ''

        // 调用GET接口，传递params参数
        const response = await getUserList(searchParams)

        userList.value = response.data?.list || []

    } catch (err) {
        error.value = err.message || '获取用户列表失败'
        console.error('接口调用失败:', err)
    } finally {
        loading.value = false
    }
}

// 搜索
const handleSearch = () => {
    searchParams.page = 1 // 重置到第一页
    fetchUserList()
}

// 重置搜索
const handleReset = () => {
    searchParams.keyword = ''
    searchParams.status = ''
    searchParams.page = 1
    fetchUserList()
}

// 分页
const handlePageChange = (page) => {
    searchParams.page = page
    fetchUserList()
}

// 新增用户（POST请求）
const handleAddUser = async () => {
    try {
        adding.value = true

        // 调用POST接口，传递data参数
        await createUser(newUser)

        // 添加成功后的操作
        alert('用户添加成功')

        // 重置表单
        newUser.name = ''
        newUser.email = ''

        // 刷新列表
        fetchUserList()

    } catch (err) {
        alert('添加用户失败: ' + (err.message || '未知错误'))
        console.error('添加用户失败:', err)
    } finally {
        adding.value = false
    }
}

// 编辑用户
const handleEdit = async (user) => {
    try {
        const newName = prompt('请输入新的姓名:', user.name)
        if (newName && newName !== user.name) {
            // PUT请求，第一个参数是路径参数，第二个是请求体数据
            await updateUser(user.id, { name: newName })
            alert('更新成功')
            fetchUserList() // 刷新列表
        }
    } catch (err) {
        alert('更新失败: ' + err.message)
    }
}

// 删除用户
const handleDelete = async (userId) => {
    if (!confirm('确定要删除这个用户吗？')) {
        return
    }

    try {
        // DELETE请求
        await deleteUser(userId)
        alert('删除成功')
        fetchUserList() // 刷新列表
    } catch (err) {
        alert('删除失败: ' + err.message)
    }
}

// 组件挂载时获取数据
onMounted(() => {
    // fetchUserList()
})
</script>

<style scoped>
.search-box,
.pagination,
.add-form {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.loading {
    color: #1890ff;
    text-align: center;
    padding: 20px;
}

.error {
    color: #ff4d4f;
    text-align: center;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f5f5f5;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

input,
select {
    margin: 0 10px;
    padding: 5px;
}
</style>