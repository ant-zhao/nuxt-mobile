<!--
 * @Description: 
 * @Author: zhaojunjie
 * @Date: 2020-11-29 14:24:34
 * @LastEditTime: 2021-03-21 19:01:36
 * @LastEditors: zhaojunjie
-->
<template>
    <div class="share df">
        <div class="share-item ml10" v-for="(item,index) in shareList" :key="index" @click="shareDo(item.name)">
            <img :src="item.icon" class="db">
        </div>
        <Custom :info="info" ref="custom" />
    </div>
</template>
<script type="text/javascript">
import { shareTowebo, shareToQq, shareToQqZone } from "@/utils/index";
import Custom from "./custom.vue";
export default {
    name: "share",
    components: {
        Custom
    },
    props: {
        info: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            shareList: [
                {
                    icon: require("@/assets/svg/pic.svg"),
                    name: "ewm",
                    title: "生成二维码"
                },
                {
                    icon: require("@/assets/svg/sina-icon2.svg"),
                    name: "weibo",
                    title: "新浪微博"
                },
                {
                    icon: require("@/assets/svg/qq-icon2.svg"),
                    name: "qq",
                    title: "QQ好友"
                },
                {
                    icon: require("@/assets/svg/qzone2.svg"),
                    name: "qqzone",
                    title: "QQ空间"
                }
            ],
            origin: ""
        }
    },
    mounted() {
        this.origin = window.location.origin;
    },
    methods: {
        shareDo(name) {
            const { info } = this;
            const { labels,topics, columnId, previewUrls, context, id} = info;
            if(!id) {
                this.$zhMessage.error('页面错误');
                return;
            }
            const title = columnId===4?topics.length?topics[0].name:'读好句':labels.length?labels[0].name:'读好句';
            switch (name) {
                case "ewm":
                    this.$refs['custom'].turnCustomShow()
                    break;
                case "weibo":
                    shareTowebo(title, `${this.origin}/ju/${id}.html`, previewUrls[0]||null, context);
                    break;
                case "qq":
                    shareToQq(title, `${this.origin}/ju/${id}.html`, previewUrls[0], context);
                    break;
                case "qqzone":
                    shareToQqZone( title, `${this.origin}/ju/${id}.html`, previewUrls[0], context );
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.share {
    &-item {
        img {
            width: .7rem;
            height: .7rem;
        }
    }
}
</style>
