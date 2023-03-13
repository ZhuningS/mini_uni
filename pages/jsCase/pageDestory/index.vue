<template>
    <view>
        <!-- pages/jsCase/pageDestory/index.wxml -->
        <view class="refresh btn" @tap.stop.prevent="refresh">刷新</view>
        <view class="refresh">
            要想触发销毁页面onUnload生命周期执行方法，必须要使用不存在页面栈的路由。比如：wx.reLaunch、wx.redirectTo、wx.navigateBack
            不能使用wx.navigateTo，因为此路由是可以保存页面栈的，也就是并没有销毁页面，而是叠加页面栈，最多可以叠加5层。
        </view>
    </view>
</template>

<script>
// pages/jsCase/pageDestory/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
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
    onUnload: function () {
        // 小程序点击返回键时销毁之前页面
        let pages = getCurrentPages().length - 1;
        console.log('需要销毁的页面：' + pages);
        uni.navigateBack({
            delta: pages
        });
    },
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
        /**
         * 生命周期函数--监听页面加载
         */
        onLoadClone3389: function (options) {
            console.log('onload');
        },

        refresh() {
            // 取当前页面栈的数组，数组中最后一个就是当前页面，然后onload当前页面
            if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad();
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
