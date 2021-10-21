<template>
    <van-row class="panel-item">
        <van-col :span="2">
            <p class="label fw600" v-if="wordData.label">{{wordData.label}}：</p>
        </van-col>
        <van-col :span="22">
            <div class="list df flexWarp mb10">
                <template v-for="(item,m) in wordData.list">
                    <nuxt-link 
                        :to="`/search/${wordData.key}-${item.id}.html`"
                        :key="m" class="mark"
                        :class="[searchId==item.id?'active':'']"
                    >{{item.name}}</nuxt-link>
                </template>
            </div>
        </van-col>
    </van-row>
</template>

<script type="text/javascript">
export default {
    name: "word",
    props: {
        wordData: {
            type: Object,
            default() {
                return {}
            }
        },
        searchId: String
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
.panel-item {
    font-size: .6rem;
    line-height: .9rem;
    p {
        padding: 2px 0;
        white-space: nowrap;
        margin-bottom: 5px;
    }
    .mark {
        color: var(--labelColor);
        white-space: nowrap;
        padding: 2px 6px;
        line-height: .8rem;
        margin-left: .4rem;
        border-radius: 3px;
        &.active {
            background-color: var(--activeColor);
            color: #ffffff;
        }
    }
}
</style>
