<template>
	<div class="index">首页</div>
</template>

<script>
import { getTdkApi } from "@/server/doc";
export default {
	layout: "blank",
	async asyncData() {
		let pageData = await getTdkApi();
		return {
			headInfo: pageData.resultInfo
		};
	},
	head() {
		return this.$initHead(
			this.headInfo.siteName,
			this.headInfo.description,
			this.headInfo.keywords
		);
	},
	data() {
		return {
			title: "主页",
			scrollTop: 0
		};
	},
	components: {},
	created() {},
	mounted() {},
	methods: {}
};
</script>

<style lang="less" scoped>
.index {
	width: 100%;
	font-size: 1rem;
}
</style>
