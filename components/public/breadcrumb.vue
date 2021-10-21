<template>
    <div class="breadcrumb-box pt20 df overeli">
        <div
            class="breadcrumb-item"
            v-for="(item,index) in breadcrumbList" 
            :key="index"
        >
            <nuxt-link  v-if="!!item.href" :to="item.href">
                {{item.name}}
            </nuxt-link>
            <span v-else>
                {{item.name}}
            </span>
            <span v-if="index<breadcrumbList.length-1" class="pl5 pr5">></span>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: "breadcrumb",
    props: {
        breadcrumbList: {
            type: Array,
            deafult() {
                return []
            }
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.breadcrumb-box {
    font-size: 12px;
    span {
        color: var(--hintColor);
    }
}
</style>
