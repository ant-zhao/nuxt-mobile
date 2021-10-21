<template>
    <van-popup
        v-if="visible"
        round closeable
        v-model="visible"
        :close-on-click-overlay="false"
        @click-close-icon="turnCustomShow"
    >
        <van-tabs class="custom-box" swipeable>
            <van-tab title="图文">
                <div class="content pr" ref="content">
                    <div class="img-box" v-if="imgTxtUrl&&txtUrl">
                        <img :src="imgTxtUrl" class="imgTxt db">
                        <p v-if="isMobile" class="hint ac">请长按图片保存</p>
                        <a v-else :href="'data:application/octet-stream;base64'+imgTxtUrl" class="download ml20 mb20" download="图文.png">下载图片</a>
                    </div>
                    <div class="content-box img-txt" v-else>
                        <div class="pic-box">
                            <img class="pic db" :src="selP">
                        </div>
                        <div class="content-bottom img-txt-bottom">
                            <div class="text">
                                {{ info.context }}
                            </div>
                            <p v-if="info.authorName" class="author ar">—— {{info.authorName}}</p>
                            <div class="clearfix ewm-box pt10">
                                <Qrcode id="imgtxtewm" class="fl" :system="system" slogan="" :width="60" :height="60" :context="`https://www.duhaoju.com/ju/${info.id}.html`" />
                                <div class="hint fl ml5 mt15">
                                    <div>发现好文案</div>
                                    <div>读好句</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="文字">
                <div class="content">
                    <div class="img-box" v-if="txtUrl">
                        <img :src="txtUrl" class="imgTxt db">
                        <p v-if="isMobile" class="hint ac">请长按图片保存</p>
                        <a v-else :href="'data:application/octet-stream;base64'+imgTxtUrl" class="download ml20" download="图文.png">下载图片</a>
                    </div>
                    <div class="content-box img-txt" v-else>
                        <div class="content-bottom img-txt-bottom">
                            <div class="text">
                                {{ info.context }}
                            </div>
                            <p v-if="info.authorName" class="author ar">——— {{info.authorName}}</p>
                            <div class="clearfix ewm-box pt10">
                                <Qrcode id="txtewm" class="fl" :system="system" slogan="" :width="60" :height="60" :context="`https://www.duhaoju.com/ju/${info.id}.html`" />
                                <div class="hint fl ml5 mt15">
                                    <div>发现好文案</div>
                                    <div>读好句</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </van-popup>
</template>
<script type="text/javascript">
import Qrcode from "./Qrcode.vue";
import { mapState } from "vuex";
export default {
    name: "custom",
    data() {
        return {
            visible: false,
            loading: false,
            selP: null,
            imgTxtUrl: "",
            txtUrl: "",
            imgTxtLoading: false,
            txtLoading: false
        }
    },
    props: {
        info: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        Qrcode
    },
    computed: mapState({
        isMobile(state) {
            return state.utils.isMobile
        },
        system(state) {
            return state.utils.system
        }
    }),
    mounted() {
        this.selP = this.getPic();
    },
    methods: {
        startDraw() {
            const img = new Image();
            img.onload = ()=>{
                const timer = setTimeout(async () => {
                    clearTimeout(timer);
                    const container = document.getElementsByClassName("van-overlay")[0];
                    const imgTxtDom = document.getElementsByClassName("img-txt")[0];
                    const txtDom = document.getElementsByClassName(" img-txt-bottom")[0];
                    const imgTxtData = await this.createImg(container, imgTxtDom,'imgtxt');
                    this.imgTxtUrl = imgTxtData.toDataURL("image/jpeg", 1);
                    const txtData = await this.createImg(container, txtDom, 'txt');
                    this.txtUrl = txtData.toDataURL("image/jpeg", 1);
                },200)
            }
            img.src = this.selP;
        },
        createImg(container, dom) {
            const width = dom.offsetWidth;
            let height = dom.offsetHeight;
            const copyDom = dom.cloneNode(true) // 克隆一个
            copyDom.style.width = width + 'px';
            copyDom.style.height = height + 'px';
            copyDom.style.zIndex = '-10';
            copyDom.classList.add("center");
            container.appendChild(copyDom) // 添加
            let scale = 2;
            let opts = {
                dpi: window.devicePixelRatio * scale,
                scrollY: 0,
                width: width, //dom 原始宽度
                height: height,
                useCORS: true // 【重要】开启跨域配置
            };
            return new Promise((res, rej) => {
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    this.$html2canvas(copyDom, opts).then(canvas => {
                        container.removeChild(copyDom); // 用完要删除
                        res(canvas);
                    });
                },200)
            });
        },
        turnCustomShow() {
            if(!this.visible) {
                this.visible = true;
                this.startDraw();
            } else {
                this.imgTxtUrl = null;
                this.txtUrl = null;
                this.visible = false;
            }
        },
        getPic() {
            const { previewUrls } = this.info;
            return previewUrls&&previewUrls.length?previewUrls[0]:"";
        }
    }
}
</script>

<style lang="less" scoped>
.custom-box {
    padding: .8rem .2rem;
    width: 86vw;
    max-width: 400px;
    .content {
        .img-box {
            width: 100%;
            top: 0;
            left: 0;
            .hint {
                font-size: .5rem;
                color: var(--hintColor);
            }
        }
    }
    .imgTxt {
        width: 100%;
        margin: 0 auto;
    }
}
</style>
<style lang="less">
.img-txt {
    .pic-box {
        padding: 20px 20px 0;
        background-color: var(--backgroundColor);
        .pic {
            width: 100%;
            border-radius: 6px;
        }
    }
}
.img-txt-bottom {
    padding: 20px 20px 10px;
    line-height: 1rem;
    font-size: .6rem;
    color: var(--textColor);
    background-color: var(--backgroundColor);
    .text {
        text-indent: 1.2rem;
    }
    .author {
        margin-bottom: 0;
    }
    .hint {
        line-height: .8rem;
        font-size: .55rem;
    }
}
</style>