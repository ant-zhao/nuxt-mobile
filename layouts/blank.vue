<template>
	<div class="content pr">
		<nuxt />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
	computed: {},
	mounted() {}
};
</script>

<style lang="less">
@import "~@/assets/style/common.less";
html {
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	.content {
		width: 100%;
		margin: 0 auto;
		min-height: 100vh;
	}
}
</style>
