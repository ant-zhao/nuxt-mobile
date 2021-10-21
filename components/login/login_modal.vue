<template>
    <van-popup
        round closeable
        v-model="visible"
        :close-on-click-overlay="false"
    >
        <Login pageType="modal" @login="turnShow(false,'success')" />
    </van-popup>
</template>
<script type="text/javascript">
import Login from "./index.vue";
import { mapMutations } from 'vuex';
export default {
    name: "login_modal",
    data() {
        return {
            visible: false
        }
    },
    components: {
        Login
    },
    watch: { 
        visible(val) {
            if(!val)this.turnLogin(val);
        }
    },
    methods: {
        ...mapMutations({
            turnLogin: "user/turnLogin"
        }),
        turnShow(flag,type) {
            this.visible = flag;
            if(type==='success')window.location.reload();
        }
    }
}
</script>

<style lang="less" scoped>
.login_modal {
    /deep/.ant-modal-body {
        padding: 0;
    }
}
</style>
