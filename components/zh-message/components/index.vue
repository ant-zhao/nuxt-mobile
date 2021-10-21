<template>
    <transition name="fade">
        <div class="zh-message" :class="type" v-show="visible">
            <!-- <i class="icon"></i> -->
            <span class="text">{{message}}</span>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'zh-message',
    data() {
        return {
            type: "info",
            message: "",
            visible: false,
        }
    }
  }
</script>

<style scoped lang="less">
    @strong-text-color: #262626;
    @success-color: #67c23a;
    @danger-color: #f56c6c;
    @warning-color: #e6a23c;

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
        
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
        
    .zh-message {
        position:fixed;
        top: 15%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        min-height: 31px;
        max-height: 100px;
        max-width: 70%;
        overflow: hidden;
        padding: 6px 14px;
        color: @strong-text-color;
        background: var(--backgroundColor);
        border-radius: 6px;
        font-size: .5rem;
        line-height: 1.4;
        z-index: 99999;
        box-shadow: 0rem .1rem 1rem 0rem var(--shadowColor);
        animation: move .3s;
        &.info {
            color: @strong-text-color;
        }
        &.success {
            color: @success-color;
        }
            
        &.error {
            color: @danger-color;
        }
            
        &.warning {
            color: @warning-color;
        }
    }
    @keyframes move {
        0% {
            top: 60px;
            opacity: .3;
        }
        100% {
            top: 15%;
            opacity: 1;
        }
    }
    
</style>