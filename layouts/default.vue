<template>
    <div class="mobile-sys">
        <Header />
        <div class="container">
            <nuxt />
        </div>
        <div class="btn-box pf ac">
            <van-switch v-model="isLight" active-color="#ffffff" inactive-color="#242832" size="14px" @change="changeTheme" />
            <p>
                <van-button 
                    class="add-btn" @click="startPost" 
                    v-if="$route.path.indexOf('/user')<0&&$route.path.indexOf('/post')<0"
                >
                    发表
                </van-button>
            </p>
            <p class="goDraw">
                <span class="iconfont icon-picture" @click="goDraw"></span>
            </p>
            <p v-if="scrollTop>windowHeight" class="gotop">
                <span class="iconfont icon-top" @click="goScroll"></span>
            </p>
        </div>
        <Footer />
        <van-popup v-model="showPost" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onSelPost"
                @cancel="showPost=false"
            />
        </van-popup>
        <LoginModal ref="login_nodal" />
        <Draw ref="draw" />
    </div>
</template>
<script>
import { getSystem } from "@/utils/index";
import Header from "@/components/header.vue";
import Footer from "@/components/footer";
import Introduce from "@/components/Introduce.vue";
import LoginModal from "@/components/login/login_modal.vue";
import Draw from "@/components/tools/draw.vue";
import { mapState,mapMutations } from 'vuex';
import { getClientHeight, getScrollHeight } from "@/utils/index";
export default {
    components: {
        Header,
        Footer,
        Introduce,
        LoginModal,
        Draw
    },
    data() {
        return {
            options: [
                { text: '句子', value: 1 },
                { text: '图文美句', value: 3 },
                { text: '朋友圈', value: 4 },
            ],
            showPost: false,
            isLight: true
        }
    },
    computed: mapState({
        userInfo(state) {
            return state.user.userInfo;
        },
        showLogin(state) {
            return state.user.showLogin;
        },
        previewVisible(state) {
            return state.utils.previewVisible
        },
        previewList(state) {
            return state.utils.previewList
        },
        previewIndex(state) {
            return state.utils.previewIndex
        },
        columns() {
            return this.options.map(v=>v.text)
        },
        scrollTop(state) {
            return state.utils.scrollTop;
        },
        windowHeight(state) {
            return state.utils.windowHeight;
        },
        windowScrollHeight(state) {
            return state.utils.windowScrollHeight;
        },
        theme(state) {
            return state.utils.theme;
        }
    }),
    watch:{
        showLogin(val) {
            this.$refs['login_nodal'].turnShow(val?true:false);
        },
        previewVisible(val) {
            if(val) this.showPreview();
        },
        theme(val) {
            this.isLight = val!=='dark';
        }
    },
    mounted() {
        this.$stopScale();
        const {isMobile, system} = getSystem();
        this.changeState({key: 'isMobile', value: isMobile});
        this.changeState({key: 'system', value: system});
        
        // 获取主题色
        const theme = localStorage.getItem("theme");
        if(theme&&theme=='dark'){
            this.changeState({key:"theme",value: 'dark'});
        }

        // 监听滚动
        this.scrollFunc();
        window.addEventListener("scroll", this.scrollFunc, true);
        this.$once('hook:beforeDestroy', function () {
            window.removeEventListener('scroll', this.scrollFunc, true)
        })
    },
    methods: {
        ...mapMutations({
            turnLogin: "user/turnLogin",
            changeState: "utils/changeState"
        }),
        startPost() {
            if(this.userInfo.userId) {
                this.showPost=true;
            } else {
                this.turnLogin(true);
            }
        },
        goPost(column=1) {
            if(this.userInfo.userId) {
                this.$router.push(`/post?column=${column}`)
            } else {
                this.turnLogin(true);
            }
        },
        showPreview() {
            const that = this;
            this.$ImagePreview({
                images: this.previewList, // 预览图片的那个数组
                closeable: true,
                showIndex: true,
                startPosition: this.previewIndex, // 指明预览第几张图
                onClose:()=> {
                    this.changeState({key: 'previewVisible', value: false});
                    this.changeState({key: 'previewIndex', value: 0});
                    this.changeState({key: 'previewList', value: []});
                }
            })
        },
        onSelPost(value) {
            const item = this.options.find(v=>v.text===value);
            this.showPost = false;
            this.goPost(item.value)
        },
        scrollFunc() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.changeState({key:"scrollTop",value: scrollTop});
            const windowHeight = getClientHeight();
            const windowScrollHeight = getScrollHeight();
            this.changeState({key:"windowHeight",value: windowHeight});
            this.changeState({key:"windowScrollHeight",value: windowScrollHeight});
        },
        goScroll() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        changeTheme(val) {
            const theme = val?'light':'dark';
            this.changeState({key:'theme',value: theme});
            window.localStorage.setItem("theme", theme);
        },
        goDraw() {
            this.$refs['draw'].turnDrawShow()
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    padding: 0 .8rem .4rem;
    max-width: 700px;
    margin: 0 auto;
    min-height: calc(100vh - 5.92rem);
}
.btn-box {
    bottom: 1.5rem;
    right: .3rem;
    z-index: 100;
    padding: 10px 2px;
    border-radius: 4px;
    background: var(--backgroundColor);
    box-shadow: 0 0 30px 2px var(--shadowColor);
    .add-btn {
        height: 1rem;
        width: 1.8rem;
        margin-top: .3rem;
        padding: 0;
        font-size: 0.4rem;
        border: none;
        background: var(--backgroundColor);
        color: var(--activeColor);
    }
    .gotop,.goDraw {
        padding: .3rem .2rem;
    }
    .goDraw {
        padding: .3rem .4rem;
        .iconfont {
            font-size: .8rem;
        }
    }
}
</style>
