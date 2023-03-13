<template>
    <view>
        <!-- pages/scroll/index2.wxml -->
        <view @tap.stop.prevent="aa">点我去下面</view>
        <view class="h1" id="h1">sdfjhsdfkjds</view>
    </view>
</template>

<script>
// pages/scroll/index2.js
export default {
    data() {
        return {
            scrollTop: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        aa() {
            const query = uni.createSelectorQuery();
            query.select('#h1').boundingClientRect();
            query.selectViewport().scrollOffset();
            let top = 0;
            query.exec(function (res) {
                console.log(res);
                res[0].top; // #the-id节点的上边界坐标

                top = res[1].scrollTop; // 显示区域的竖直滚动位置

                console.log(res[0].top, res[1].scrollTop);
                uni.pageScrollTo({
                    scrollTop: res[0].top + res[1].scrollTop,
                    duration: 300
                });
            });
            this.setData({
                scrollTop: top
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
