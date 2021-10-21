<template>
    <div class="sentence-box">
        <div class="sentence">
            <div class="sentence-item" v-for="(item,index) in list" :key="index">
                <nuxt-link  class="mulEllipsis elli10 mb15 db link" :to="`/ju/${item.id}.html`">
                    <div v-html="item.context"></div>
                </nuxt-link>
                <p v-if="item.authorName||item.productionName" class="source ar overeli">
                    <span class="median">——</span>
                    <template v-if="item.authorName">
                        <span v-if="item.authorType=='1'">
                            <nuxt-link :to="`/mingyan/${item.authorId}.html`">{{item.authorName}}</nuxt-link>
                        </span>
                        <span v-else>
                            <nuxt-link :to="`/zuozhe/${item.authorId}.html`">{{item.authorName}}</nuxt-link>
                        </span>
                    </template>
                    <span v-if="item.productionName"><nuxt-link :to="`/zuopin/${item.productionId}.html`">《{{item.productionName}}》</nuxt-link></span>
                </p>
                <div class="action-box al-center justBet pt20">
                    <div class="handle al-center">
                        <div :class="['handle-item zan mr10',zanList[index]?'active':'']" @click="handle('like',index,item)">
                            <i class="iconfont icon-dianzan1 default"></i>
                            <i class="iconfont icon-dianzan2 like"></i>
                            {{(item.likesNum||0)-((zanList[index]&&list[index].liked===0)?-1:(!zanList[index]&&list[index].liked===1)?1:0)}}
                        </div>
                        <div :class="['handle-item collect mr10',joinList[index]?'active':'']" @click="handle('store',index,item)">
                            <i class="iconfont icon-shoucang1 default"></i>
                            <i class="iconfont icon-shoucang like"></i>
                        </div>
                        <div class="handle-item comment mr10">
                            <i class="iconfont icon-liuyan"></i>
                            {{item.commentNum||0}}
                        </div>
                    </div>
                    <Share :info="item" :key="item.id" />
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { likesApi, joinStoreApi } from "@/server/post";
import Share from "@/components/public/share.vue";
import { mapState,mapMutations } from "vuex";
export default {
    name: "sentence",
    components: {
        Share
    },
    props: {
        pagination: {
            type: Boolean|Object,
            default: false
        },
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: mapState({
        userInfo(state) {
            return state.user.userInfo;
        }
    }),
    data() {
        return {
            loading: false,
            zanList: [],
            joinList: []
        }
    },
    mounted() {
        this.$set(this, "zanList", this.list.map(v=>{
            return v.liked===1?true:false
        }))
        this.$set(this, "joinList", this.list.map(v=>{
            return v.stored===1?true:false
        }))
    },
    methods: {
        ...mapMutations({
            turnLogin: "user/turnLogin"
        }),
        async likeComment(index,item) {
            if(this.loading)return;
            this.loading = true;
            let likeType = this.zanList[index]?0:1;
            const {code} = await likesApi({
                type: 1,
                id: item.id,
                likeType,
            });
            this.loading = false;
            if(code!==0) return;
            this.$set(this.zanList,index, likeType===1?true:false);
        },
        async joinStore(index,item) {
            if(this.loading) return;
            this.loading = true;
            let type = this.joinList[index]?2:1;
            const {code} = await joinStoreApi({
                writingId: item.id,
                type
            })
            this.loading = false;
            if(code!==0) return;
            this.$set(this.joinList, index, type===1?true:false)
        },
        handle(type,index,item) {
            if(!this.userInfo.userId) {
                this.turnLogin(true);
                return;
            }
            switch (type) {
                case 'like':
                    this.likeComment(index,item);
                    break;
                case 'store':
                    this.joinStore(index,item);
                    break;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.sentence-box {
    .sentence {
        &-item {
            color: var(--textColor);
            font-size: .6rem;
            line-height: 1rem;
            margin-top: .8rem;
            padding: .6rem .8rem;
            background-color: var(--backgroundColor);
            box-shadow: 0px 0px 10px 0px var(--shadowColor);
            border-radius: 4px;
            .source {
                font-size: .6rem;
                color: var(--labelColor);
            }
            .action-box {
                .handle {
                    font-size: 14px;
                    line-height: 20px;
                    .handle-item {
                        .like {
                            display: none;
                            color: var(--activeColor);
                        }
                        &.active {
                            .iconfont {
                                color: var(--activeColor);
                            }
                            .like {
                                display: inline;
                            }
                            .default {
                                display: none;
                            }
                        }
                    }
                }
                .share {
                    &-item {
                        img {
                            width: .7rem;
                            height: .7rem;
                        }
                    }
                }
            }
            .link {
                color: var(--textColor);
            }
        }
    }
}
</style>
