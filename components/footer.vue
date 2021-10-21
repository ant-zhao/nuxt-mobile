<template>
    <div class="footer-box ac">
        <div class="info">本站所有内容来自互联网及网友分享<br />侵删请发邮件至 duhaoju@163.com</div>
        <div class="copy pt10">
            读好句(duhaoju.com) © 2021 版权所有
            <div>
                <a href="http://www.beian.miit.gov.cn" target="_blank" rel="nofollow">
                    沪ICP备2021000023号
                </a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        
    },
    data() {
        return {
        }
    },
    components: {}
};
</script>
<style lang="less" scoped>
.footer-box {
    width: 100%;
    padding: 1rem .6rem;
    line-height: .8rem;
    background: var(--footerBackgroundColor);
    color: #aaa;
    .copy {
        color: #999;
        a{
            color: #999;
        }
    }
}
</style>
