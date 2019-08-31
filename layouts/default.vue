<template>
	<div class="default">
		<Header />
		<div class="nuxt-box">
			<nuxt />
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { mapState, mapMutations } from "vuex";
export default {
	data() {
		return {
			title: "主页"
		};
	},
	components: {
		Header,
		Footer
	},
	computed: {},
	created() {},
	mounted() {
		//this.getUserInfo();
	},
	methods: {
		...mapMutations(["SET_USERINFO"]),
		getUserInfo() {
			let userkey = this.encrypt.b64_md5("userBasic");
			let _userBasic = window.localStorage.getItem(userkey);
			let userBasic = _userBasic
				? JSON.parse(decodeURIComponent(_userBasic))
				: {};
			this.SET_USERINFO(userBasic);
		}
	}
};
</script>

<style lang="less">
@import "~@/assets/style/common.less";
html {
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	width: 100%;
	.default {
		width: 100%;
		margin: 0 auto;
		min-height: 100vh;
		height: auto !important;
		.nuxt-box {
			width: 100%;
		}
	}
}
</style>
