<template>
    <div class="qrcode-box al-center flexCol">
        <div class="qrcode">
            <img class="db" :src="ewmUrl">
        </div>
        <p class="toast">{{slogan}}</p>
    </div>
</template>
<script>
let QRCode=null;
if (process.browser) {
    QRCode = require("qrcode");
}
export default {
    props: {
        context: String,
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        slogan: {
            type: String,
            default: "打开微信，“扫一扫”"
        },
        id: {
            type: String,
            default: "qrcode"
        },
        system: {
            type: String,
            default: "other"
        }
    },
    data() {
        return {
            ewmUrl: ""
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.qrcode();
        });
    },
    methods: {
        qrcode() {
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            QRCode.toCanvas(canvas, this.context, error => {
                if (error) {
                    console.log(error);
                } else {
                    this.ewmUrl = canvas.toDataURL("image/jpeg");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.qrcode-box {
    background: var(--backgroundColor);
    .qrcode img {
        width: 2.4rem;
        height: 2.4rem;
    }
    .toast {
        font-size: .4rem;
        color: var(--hintColor);
        text-align: center;
    }
}
</style>
