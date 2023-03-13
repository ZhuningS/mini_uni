<template>
	<view>
		<!-- pages/jsCase/keyWordHight/index.wxml -->
		<!-- 公共的wxs工具 -->

		<view v-for="(item,index) in (list)" :key="index">



			<view style="display: inline-block;" v-for="(item,index1) in (util.highLight(item," 苏苏"))" :key="index1">



				<text v-if="item.type==1" :decode="true" :space="true" style="color:red;">{{util.myReplace(item.text)}} </text>






				<text v-else :decode="true" :space="true">{{util.myReplace(item.text)}}</text>



			</view>



		</view>
	</view>
</template>
<script module="util" lang="wxs" src="./highlight.wxs"></script>
<script>
	// pages/jsCase/keyWordHight/index.js
	export default {
		data() {
			return {
				list: ['苏苏小苏苏', '测试1', '测试2', '测试苏苏苏']
			};
		},
		onLoad: function() {},
		methods: {}
	};
</script>
<style>
	@import "./index.css";
</style>