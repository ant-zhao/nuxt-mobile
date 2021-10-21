<!--
 * @Description: 
 * @Author: zhaojunjie
 * @Date: 2021-10-20 23:29:54
 * @LastEditTime: 2021-10-20 23:36:17
 * @LastEditors: zhaojunjie
-->
<template>
    <div class="index pt15">
        
    </div>
</template>
<script>
export default {
    components: {},
    data(){
        return {
            clientData: [],
            pageNo: 1,
            loadDone: false
        }
    },
    watch: {
        scrollTop(val) {
            if(val+this.windowHeight+100>=this.windowScrollHeight&&!this.loading) this.getJuList();
        }
    },
    head() {
        const header = this.$initHead(
            `名人名言_名言名句_唯美句子_文案句子_句子迷 - 读好句`,
            `读好句提供最新文案句子,包括名人名言,名言名句,唯美的句子,伤感的句子,文案句子,适合发朋友圈的句子,优美句子等，为广大句子迷收集各种有深度有品味的句子,适合各种心情的句子。读好句，发现好文案！`,
            `名人名言,名言名句,唯美的句子,伤感的句子,文案句子,句子迷,读好句,优美句子`
        );
        return {
            ...header
        };
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
.index {
    
}
</style>