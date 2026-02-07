<template>
    <div></div>
</template>




<script setup>


//打开道路信息
if (json_res.type == 'daolu') {
    console.log('呼叫打开道路信息', JSON.parse(res));
    //这一部分打开路网并传递数据到本地存储
    // 保存到本地存储
    localStorage.setItem('roadinfo', JSON.stringify(json_res.data))
    this.$router.push({
        path: '/road',
        query: json_res.data // ➡️ /inspection?id=123
    })
}

if (json_res.type == 'disease') {
    console.log('呼叫预演小窗', JSON.parse(res));
    //打开预演小窗
    localStorage.setItem('yyxc', JSON.stringify(json_res.data))
    this.$router.push({
        path: '/planning',
        // query: { id: '20240509', name: '东大街芷泉段' } // ➡️ /inspection?id=123
    })
}

if (json_res.type == 'yyroad') {
    console.log('呼叫道路预演小窗', JSON.parse(res));
    //打开预演小窗
    localStorage.setItem('yyroadxc', JSON.stringify(json_res.data))
    this.$router.push({
        path: '/yyinfo',
    })
}
//呼叫我打开病害基本信息
if (json_res.type == 'binghai') {
    console.log('呼叫我打开病害基本信息', JSON.parse(res));
    //传递病害编号给我
    localStorage.setItem('diseaseinfo', JSON.stringify(json_res.data))
    this.$router.push({
        path: '/disease',
    })
}
// 管道属性
if (json_res.type == 'guandao') {
    console.log('呼叫管道属性小窗', JSON.parse(res));
    //打开预演小窗
    localStorage.setItem('gdsx', JSON.stringify(json_res.data))
    this.$router.push({
        path: '/pipe',
        // query: { id: '20240509', name: '东大街芷泉段' } // ➡️ /inspection?id=123
    })
}
</script>