<template>
    <view>
        <!-- pages/wxCase/navigator/index.wxml -->
        <view class="btn-area">
            <navigator url="/pages/cssCase/chargeCss/index?title=navigate" open-type="navigate" hover-class="navigator-hover">navigate</navigator>
            <navigator url="/pages/cssCase/rotateBall/index?title=redirect" open-type="redirect" hover-class="other-navigator-hover">redirect</navigator>
            <navigator url="/pages/index/index" open-type="switchTab" hover-class="other-navigator-hover">switchTab</navigator>
            <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序</navigator>
            <navigator hover-class="none" open-type="navigateBack" delta="1">navigateBack</navigator>
            <navigator url="/pages/index/index" hover-class="none" open-type="reLaunch">reLaunch</navigator>
        </view>
        <view class="hp">
            <view>hover-class属性</view>
            <view>hover-class 的值为 none 时，组件上不会有任何点击态效果。</view>
            <view class="tips" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">相关属性</view>
            <view>hover-stop-propagation</view>
            <view>hover-start-time</view>
            <view>hover-stay-time</view>
            <view class="tips" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000" :hover-stop-propagation="true">支持标签</view>
            <view class="flex-row j_b">
                <text>view</text>
                <text>button</text>
                <text>navigator</text>
            </view>
        </view>
        <view class="hp1">
            <view class="c_item">页面跳转api</view>
            <view class="tips c_item" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">wx.navigateTo</view>
            <view class="c_item">
                保留当前页面、跳转到应用内的某个页面，使用 wx.navigateBack可以返回到原页面。对于页面不是特别多的小程序，通常推荐使用 wx.navigateTo进行跳转，
                以便返回原页面，以提高加载速度。当页面特别多时，则不推荐使用。
            </view>
            <view class="tips c_item" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">wx.redirectTo</view>
            <view class="c_item">
                页面过多时，被保留页面会挤占微信分配给小程序的内存，或是达到微信所限制的 5 层页面栈。这时，我们应该考虑选择
                wx.redirectTo。wx.redirectTo()用于关闭当前页面，跳转到应用内的某个页面。这样的跳转，可以避免跳转前页面占据运行内存，但返回时页面需重新加载，增加了返回页面的显示时间。
            </view>
            <view class="tips c_item" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">wx.reLaunch</view>
            <view class="c_item">wx.reLaunch 与 wx.redirectTo()的用途基本相同， 只是 wx.reLaunch()先关闭了内存中所有保留的页面，再跳转到目标页面。</view>
            <view class="tips c_item" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">wx.switchTab</view>
            <view class="c_item">
                wx.switchTab 对于跳转到 tab bar 的页面，最好选择 wx.switchTab()，它会先关闭所有非 tab bar 的页面。其次，也可以选择 wx.reLaunch()，它也能实现从非 tab bar 跳转到 tab
                bar，或在 tab bar 间跳转，效果等同 wx.switchTab()。使用其他跳转 API 来跳转到 tab bar，则会跳转失败。
            </view>
            <view class="tips c_item" hover-class="btn_class" hover-start-time="30" hover-stay-time="3000">wx.navigateBack</view>
            <view class="c_item">
                wx.navigateBack 用于关闭当前页面，并返回上一页面或多级页面。开发者可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。这个 API 需要填写的参数只有
                delta，表示要返回的页面数。若 delta 的取值大于现有可返回页面数时，则返回到用户进入小程序的第一个页面。当不填写 delta 的值时，就默认其为 1（注意，默认并非取
                0），即返回上一页面。
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/navigator/index.js
export default {
    data() {
        return {};
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
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
