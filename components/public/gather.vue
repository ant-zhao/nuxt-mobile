<template>
    <div class="gather-box">
        <div class="gather-header al-center justBet">
            <h5>热门句集</h5>
            <nuxt-link to="/juji/">更多<van-icon name="arrow"></van-icon></nuxt-link>
        </div>
        <ul class="gather">
            <li class="gather-item" v-for="(item,index) in list" :key="index">
                <nuxt-link :to="`/juji/${item.id}.html`">
                    <i class="iconfont icon-biaoji"></i>
                    <span class="title">{{item.name}}</span>
                    <span class="num">{{item.num}}句</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
    name: "gather",
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    components: {
    }
}
</script>

<style lang="less" scoped>
.gather-box {
    padding: 20px 0 10px;
    .gather-header {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--borderColor);
        h5 {
            font-size: .7rem;
            line-height: 1rem;
            margin-bottom: 0;
        }
        a {
            font-size: .5rem;
            line-height: .5rem;
            color: var(--hintColor);
            .van-icon {
                font-size: .5rem;
            }
        }
    }
    .gather {
        &-item {
            padding: 15px 0;
            border-bottom: 1px dashed var(--borderColor);
            a {
                .iconfont,.title {
                    font-size: .6rem;
                    color: var(--textColor);
                }
                .iconfont {
                    color: var(--activeColor);
                }
                .num {
                    color: var(--labelColor);
                }
            }
        }
    }
}
</style>
