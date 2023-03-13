<template>
    <view>
        <!-- pages/wxCase/exlipTwo/index.wxml -->
        <view id="text" :class="(height > 50 ? 'ative' : '') + ' ' + (!ellipsis ? 'no_tive' : '')">
            苏苏苏算算算电缆敷设的高峰时段个施工方施工方给对方高度冻干粉高度返回就等结果大苏苏uuusus发的收到回复是的附件发生的姐夫地方的卢浮宫感觉改发链接感觉发返回就挂号费
        </view>
        <view class="img_box" @tap="ellipsisFun" v-if="height > 50">
            <image class="img_ellipsis" :src="ellipsis ? '../img/open.png' : '../img/close.png'"></image>
        </view>
        <!-- 注意：动态计算view高度的方法要在this.setData后，不然view的高度会一直是line-height的高度 -->
    </view>
</template>

<script>
// pages/wxCase/exlipTwo/index.js
export default {
    data() {
        return {
            // 文字是否收起，默认收起
            ellipsis: true,

            height: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        //创建节点选择器
        var query = uni.createSelectorQuery();
        query.select('#text').boundingClientRect();
        query.exec((res) => {
            console.log('height==', res[0].height);
            this.setData({
                height: res[0].height
            });
            var height = res[0].height; //22px为css里设置的view的line-height

            this.colNum = Math.round(height / 22);
            console.log('行数==', this.colNum);
        });
    },
    methods: {
        ellipsisFun: function () {
            this.setData({
                ellipsis: !this.ellipsis
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
