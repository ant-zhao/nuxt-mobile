<template>
	<div class="industry">行业资讯</div>
</template>

<script>
import { getTdkApi } from "@/server/doc";
export default {
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
}
</style>
