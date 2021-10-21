<template>
    <div class="error-content pt50">
        <van-empty description=""></van-empty>
        <h1 v-if="error.statusCode === 404">无此页面</h1>
        <h1 v-else>ERROR</h1>
        <van-button type="primary" class="btn"><nuxt-link to="/">首页</nuxt-link></van-button>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    layout: "post",
    props: ["error"],
    computed: mapState ({
        theme(state) {
            return state.utils.theme
        }
    }),
    head() {
        const header = this.$initHead(
            `名人名言_名言名句_唯美句子_文案句子_句子迷 - 读好句`,
            `读好句提供最新文案句子,包括名人名言,名言名句,唯美的句子,伤感的句子,文案句子,适合发朋友圈的句子,优美句子等，为广大句子迷收集各种有深度有品味的句子,适合各种心情的句子。读好句，发现好文案！`,
            `名人名言,名言名句,唯美的句子,伤感的句子,文案句子,句子迷,读好句,优美句子`
        );
        return {
            ...header,
            link: [
                ...header.link,
                { rel: 'stylesheet', id: "theme", href: this.theme=='dark'?'/css/dark.css':'/css/light.css' },
            ]
        };
    },
    mounted() {
        this.changeState({key:"isMobile",value: isMobile()});
        const theme = localStorage.getItem("theme");
        if(theme&&theme=='dark'){
            this.changeState({key:"theme",value: 'dark'});
        }
    },
    methods: {
        ...mapMutations({
            changeState: "utils/changeState",
        })
    }
};
</script>
<style lang="less" scoped>
.error-content {
    min-height: calc(100vh - 140px);
    text-align: center;
    .btn {
        height: 1.4rem;
        padding: 0 15px;
        line-height: 1.4rem;
        a {
            color: #ffffff;
        }
    }
}
</style>
