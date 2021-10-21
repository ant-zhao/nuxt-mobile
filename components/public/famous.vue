<template>
    <div class="famous-box pt20">
        <div class="famous-header al-center justBet">
            <h3>热门名人</h3>
            <nuxt-link to="/mingyan/list/">更多<van-icon name="arrow"></van-icon></nuxt-link>
        </div>
        <van-row :gutter="20" class="famous">
            <van-col :span="6" class="mt10" v-for="(item,index) in list" :key="index">
                <nuxt-link class="db famous-item" :to="`/mingyan/${item.id}.html`">
                    <div class="head pr">
                        <img :src="item.previewHeadUrl" :alt="item.name">
                    </div>
                    <div class="name mt15">{{item.name}}</div>
                </nuxt-link>
            </van-col>
        </van-row>
    </div>
</template>

<script type="text/javascript">
export default {
    name: "famous",
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
.famous-box {
    .famous-header {
        padding-bottom: 10px;
        a {
            font-size: .5rem;
            color: var(--hintColor);
            i {
                font-size: .4rem;
            }
        }
    }
    .famous {
        &-item {
            text-align: center;
            color: var(--textColor);
            .head {
                width: 100%;
                height: 3.5rem;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 3.5rem;
                    object-fit: contain;
                }
            }
            .name {
                font-size: .5rem;
                white-space: nowrap;
            }
        }
    }
    
}
</style>
