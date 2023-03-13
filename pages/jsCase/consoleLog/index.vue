<template>
    <!-- pages/jsCase/consoleLog/index.wxml -->
    <view>console.log("%c需要输出的信息 ", "css 代码");</view>
</template>

<script>
// pages/jsCase/consoleLog/index.js
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
    onShow: function () {
        console.log(
            `%c苏苏 `,
            ` color:red;
      font-size:25px;
 `
        );
        console.log(
            '%c+',
            `font-size: 1px;
padding: 200px 200px;
background-image: url(https://i.postimg.cc/mgsKJGLw/susu1.jpg);
background-size: contain;
background-repeat: no-repeat;
color: transparent;`
        );
    },
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
