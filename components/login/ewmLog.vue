<template>
	<div class="ewm-box">
		<div id="erweima_box"></div>
	</div>
</template>
<script type="text/javascript">
export default {
	name: "ewm-login",
	props: ["weChatInfo"],
	watch: {
		weChatInfo(val) {
			if (window) {
				window.WxLogin({
					id: "erweima_box",
					...val
				});
			}
		}
	},
	data() {
		return {};
	},
	mounted() {
		if (this.weChatInfo.appid) {
			window.WxLogin({
				id: "erweima_box",
				...this.weChatInfo
			});
		}
	}
};
</script>
<style lang="less" scoped>
.ewm-box {
	width: 300px;
	height: 302px;
	overflow: hidden;
	margin: 0 auto;
	
}
/deep/.impowerBox .qrcode{
	width:auto;
}
</style>
