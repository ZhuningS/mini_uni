<template>
	<view>
		<!-- pages/cssCase/gird/index.wxml -->
		<!-- https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html -->
		<view class="g"><text class="susu-01">Grid布局</text></view>
		<view class="grid">
			<view class="item item-1">1</view>
			<view class="item item-2">2</view>
			<view class="item item-3">3</view>
			<view class="item item-4">4</view>
			<view class="item item-5">5</view>
			<view class="item item-6">6</view>
			<view class="item item-7">7</view>
			<view class="item item-8">8</view>
			<view class="item item-9">9</view>
		</view>
		<view class="grid2">
			<view class="item2" v-for="(item,index) in (" 123456789")" :key="index">{{item}}</view>
		</view>
		<view class="grid3">
			<view class="item2" v-for="(item,index) in (" 123456789")" :key="index">{{item}}</view>
		</view>
		<!-- 设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。 -->
		<!-- grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。 
除了使用绝对单位，也可以使用百分比。-->

		<!-- （1）repeat() -->
		<view class="grid4">
			<view class="item2" v-for="(item,index) in (" 123456789")" :key="index">{{item}}</view>
		</view>

		<!-- repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
repeat()重复某种模式也是可以的 -->
		<!-- <view class="grid5">
  <view class="item2" wx:for="123456789" wx:key="index">{{item}}</view>
</view> -->

		<!-- （2）auto-fill 关键字 自动填充，直到容器不能放置更多的列 -->
		<view class="grid6">
			<view class="item2" v-for="(item,index) in (" 123456789")" :key="index">{{item}}</view>
		</view>

		<!-- （3）fr 关键字 fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍 -->
		<view class="grid7">
			<view class="item2" v-for="(item,index) in (" 1234")" :key="index">{{item}}</view>
		</view>
		<view class="grid8">
			<view class="item2" v-for="(item,index) in (" 12345")" :key="index">{{item}}</view>
		</view>
		<view class="grid9">
			<view class="item2" v-for="(item,index) in (" 12345")" :key="index">{{item}}</view>
		</view>

		<!-- minmax() 函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值 -->
		<view class="grid10">
			<view class="item2" v-for="(item,index) in (" 12345")" :key="index">{{item}}</view>
		</view>

		<!-- auto关键字表示由浏览器自己决定长度。 -->
		<view class="grid11">
			<view class="item2" v-for="(item,index) in (" 12345")" :key="index">{{item}}</view>
		</view>
		<!-- grid-row-gap 属性，
grid-column-gap 属性，
grid-gap 属性 -->

		<view class="grid12">
			<view class="item2" v-for="(item,index) in (" 12345")" :key="index">{{item}}</view>
		</view>

	</view>
</template>

<script>
	// pages/cssCase/gird/index.js
	export default {
		data() {
			return {};
		},
		/**
			* 生命周期函数--监听页面加载
			*/
		onLoad: function(options) {},
		/**
			* 生命周期函数--监听页面初次渲染完成
			*/
		onReady: function() {},
		/**
			* 生命周期函数--监听页面显示
			*/
		onShow: function() {},
		/**
			* 生命周期函数--监听页面隐藏
			*/
		onHide: function() {},
		/**
			* 生命周期函数--监听页面卸载
			*/
		onUnload: function() {},
		/**
			* 页面相关事件处理函数--监听用户下拉动作
			*/
		onPullDownRefresh: function() {},
		/**
			* 页面上拉触底事件的处理函数
			*/
		onReachBottom: function() {},
		/**
			* 用户点击右上角分享
			*/
		onShareAppMessage: function() {},
		methods: {}
	};
</script>
<style>
	@import "./index.css";
</style>