<template>
    <view>
        <!-- pages/wxCase/text/index.wxml -->

        <view class="mb20 border">
            <view class="mb20" style="color: red">文本换行："\\n"， 需要写在'text'标签中才能生效</view>
            <view class="mb20">eg:</view>
            <text>苏苏就是\n小苏苏</text>
        </view>

        <view class="mb20 border">
            <view class="mb20" style="color: red">文本换行："\\n"， 在view标签中是一个空格，不会换行</view>
            <view class="mb20">eg:</view>
            <view>苏苏就是\n小苏苏</view>
        </view>

        <view class="mb20 border">
            <view class="mb20" style="color: red">text标签的decode="{{ true }}"属性</view>
            <view class="mb20">html中空格的写法很简单,一个空格就是&emsp;</view>
            <view class="mb20">小程序中用space="emsp"或者space="emsp",emsp为中文字符空格大小。</view>
            <view class="mb20">eg:</view>
            <text space="emsp">姓 名</text>
            <text :decode="true">性&emsp;别</text>
        </view>

        <view class="mb20 border">
            <view class="mb20" style="color: red">text标签的space属性</view>
            <view class="mb20">ensp: 中文字符空格一半大小</view>
            <view class="mb20">emsp: 中文字符空格大小</view>
            <view class="mb20">nbsp: 根据字体设置的空格大小</view>
            <view class="mb20">单个空格用\\t , 换行用\\n</view>
            <view class="mb20">eg:</view>
            <text space="ensp">姓 名</text>
            <text space="emsp">姓 名</text>
            <text space="nbsp">姓 名</text>
            <text space="ensp">苏苏就是小\t苏苏</text>
        </view>

        <view class="mb20 border">
            <view class="mb20" style="color: red">服务端返回数据含有\n</view>
            <view class="mb20">正常情况下，用text即可</view>
            <view class="mb20">当返回的数据\\n变成\ \\n,则需利用正则将\ \\n转换为 \\n</view>
            <view class="mb20">eg:</view>
            <text>原数据：{{ data }}</text>
            <text>{{ util.format(data) }}</text>
        </view>

        <!-- uniapp框架下， 用filter处理一下,把\n转化一下
写法如下：
<view>{{rule | formatRule}}</view>
filters: {
    formatRule(val) {
        return val.raplace(/\\n/g,'\n')
    }
}
-->
    </view>
</template>
<script module="util" lang="wxs" src="./filter.wxs"></script>
<script>
// pages/wxCase/text/index.js
export default {
    data() {
        return {
            data: '苏苏就是\\n小苏苏，哈哈哈哈\\n，苏苏'
        };
    },
    onLoad: function (options) {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
