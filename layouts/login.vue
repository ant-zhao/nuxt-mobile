<template>
    <div class="mobile-sys">
        <nuxt />
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: mapState({
        theme(state) {
            return state.utils.theme
        }
    }),
    mounted() {
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
}
</script>
<style lang="less" scoped>
.mobile-sys {
    width: 100%;
    min-height: 100vh;
}
</style>
