<template>
    <div :class="['talk pr',showType==='pyq'?'active':'', hasShadow?'shadow':'']">
        <p v-if="usableEdit" class="edit pa">
            <nuxt-link :to="`/post?id=${talk.id}`" target="_blank">
                <van-icon name="edit" />
            </nuxt-link>
        </p>
        <template v-if="showType==='pyq'">
            <div class="talk-content db">
                <div :class="['mb15 context',type=='details'?'':'mulEllipsis elli10']">
                    <nuxt-link 
                        v-for="(topic,index) in talk.topics" class="pr10"
                        :to="`/quan/${topic.id}.html`" :key="index"
                    >#{{topic.name}}#</nuxt-link>
                    <span class="txt" v-if="type=='details'">{{talk.context}}</span>
                    <nuxt-link class="txt" :to="`/ju/${talk.id}.html`" v-else>{{talk.context}}</nuxt-link>
                </div>
                <template v-if="talk.previewUrls.length">
                    <van-row :gutter="24" class="img-box">
                        <van-col :span="8" class="mb10" v-for="(item,index) in talk.previewUrls" :key="index">
                            <div class="img" @click.stop.prevent="goPreview(index)">
                                <img :src="item" />
                            </div>
                        </van-col>
                    </van-row>
                </template>
            </div>
        </template>
        <template v-else>
            <div class="mb15 talk-content">
                <div class="pt20 pb20 context retract">
                    <span class="txt" v-if="type=='details'">{{talk.context}}</span>
                    <nuxt-link class="txt" :to="`/ju/${talk.id}.html`" v-else>{{talk.context}}</nuxt-link>
                </div>
            </div>
            <template v-if="talk.previewUrls.length&&talk.columnId==3">
                <van-row :gutter="24" class="img-box">
                    <van-col :span="8" v-for="(item,index) in talk.previewUrls" :key="index">
                        <div class="img" @click="goPreview(index)">
                            <img :src="item" />
                        </div>
                    </van-col>
                </van-row>
            </template>
            <p v-if="talk.authorName||talk.productionName" class="source ar fz14 pt10">
                <span class="median">——</span>
                <template v-if="talk.authorName">
                    <span v-if="talk.authorType=='1'">
                        <nuxt-link :to="`/mingyan/${talk.authorId}.html`">{{talk.authorName}}</nuxt-link>
                    </span>
                    <span v-else>{{talk.authorName}}</span>
                </template>
                <span v-if="talk.productionName"><nuxt-link :to="`/zuopin/${talk.productionId}.html`">《{{talk.productionName}}》</nuxt-link></span>
            </p>
        </template>
        <div class="action-box al-center justBet noSelect pt20">
            <div class="handle al-center">
                <div :class="['handle-item zan mr10 fl',likeFlag?'active':'']" @click="handle('like')">
                    <i class="iconfont icon-dianzan1 default"></i>
                    <i class="iconfont icon-dianzan2 active"></i>
                    {{
                        Number(talk.likesNum||0)-((likeFlag&&talk.liked===0)?-1:(!likeFlag&&talk.liked===1)?1:0)
                    }}
                </div>
                <div :class="['handle-item collect mr10 fl',storeFlag?'active':'']" @click="handle('store')">
                    <i class="iconfont icon-shoucang1 default"></i>
                    <i class="iconfont icon-shoucang active"></i>
                </div>
                <div class="handle-item hot fl" @click="handle('joinHot')">
                    加入句集
                </div>
            </div>
            <Share :info="talk" :key="talk.id" />
        </div>
    </div>
</template>
<script type="text/javascript">
import { likesApi, joinStoreApi } from "@/server/post";
import Share from "@/components/public/share.vue";
import { mapState,mapMutations } from "vuex";
export default {
    name: "talk",
    components: {
        Share
    },
    props: {
        talk: {
            type: Object,
            default() {
                return {}
            }
        },
        type: {
            type: String,
            default: "intro"
        },
        showType: {
            type: String,
            default: "pyq"
        },
        usableEdit: {
            type: Boolean,
            default: false
        },
        hasShadow: {
            type: Boolean,
            default: false
        }
    },
    computed: mapState({
        userInfo(state) {
            return state.user.userInfo;
        }
    }),
    mounted() {
        this.likeFlag = this.talk.liked==1?true:false;
        this.storeFlag = this.talk.stored==1?true:false;
    },
    data() {
        return {
            likeFlag: false,
            storeFlag: false,
            loading: false,
        }
    },
    methods: {
        ...mapMutations({
            turnLogin: "user/turnLogin",
            changeState: "utils/changeState"
        }),
        async likes() {
            if(this.loading) return;
            this.loading = true;
            const {code} = await likesApi({
                type: 2,
                id: this.talk.id,
                likeType: this.likeFlag?0:1
            })
            this.loading = false;
            this.likeFlag = !this.likeFlag;
        },
        async joinStore() {
            if(this.loading) return;
            this.loading = true;
            const {code} = await joinStoreApi({
                writingId: this.talk.id,
                type: this.storeFlag?2:1
            })
            this.loading = false;
            if(code!==0) return;
            this.storeFlag = !this.storeFlag;
        },
        handle(type) {
            if(type!='like'&&!this.userInfo.userId) {
                this.turnLogin(true);
                return;
            }
            switch (type) {
                case 'like':
                    this.likes();
                    break;
                case 'store':
                    this.joinStore();
                    break;
                case 'joinHot':
                    this.$emit('startjoinHot');
            }
        },
        goPreview(index) {
            this.changeState({key: 'previewIndex', value: index});
            this.changeState({key: 'previewList', value: this.talk.previewUrls});
            this.changeState({key: 'previewVisible', value: true});
        }
    }
}
</script>
<style lang="less" scoped>
.talk {
    color: var(--textColor);
    margin: .8rem 0 .4rem;
    padding: .8rem;
    background-color: var(--backgroundColor);
    transition: all .2s;
    border-radius: 4px;
    &.shadow {
        box-shadow: 0px 0px 10px 0px var(--shadowColor);
    }
    .edit {
        right: .5rem;
        top: .5rem;
        font-size: .7rem;
    }
    .talk-content {
        font-size: .6rem;
        line-height: .9rem;
        .retract {
            text-indent: 1.1rem;
        }
        a.txt,.txt {
            color: var(--textColor);
        }
        
    }
    .img-box {
        .img {
            width: 3.8rem;
            height: 3.8rem;
            margin: 0 auto;
            img {
                width: 3.8rem;
                height: 3.8rem;
                object-fit: cover;
            }
        }
    }
    .timeout {
        font-size: 14px;
        color: var(--hintColor);
    }
    .action-box {
        .handle {
            font-size: 12px;
            line-height: .8rem;
            .handle-item {
                .active {
                    display: none;
                    color: var(--activeColor);
                }
                &.active {
                    color: var(--activeColor);
                    .iconfont {
                        color: var(--activeColor);
                    }
                    .active {
                        display: inline;
                    }
                    .default {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
