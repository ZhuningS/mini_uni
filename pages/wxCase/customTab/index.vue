<template>
    <!-- pages/wxCase/customTab/index.wxml -->

    <!-- <import src="./nav" />
<view class="flex fix_nav_wp">
<block wx:for="{{navData}}" wx:key="">
    <template is="nav" data="{{...item}}"/>
</block>
</view>  -->

    <view class="loader five"></view>
</template>

<script>
// pages/wxCase/customTab/index.js
export default {
    data() {
        return {
            navData: [
                {
                    name: '广场',
                    //文本
                    current: 1,
                    //是否是当前页，0不是  1是
                    style: 0,
                    //样式
                    ico: 'icon-qiugouguanli',
                    //不同图标
                    fn: 'gotoIndex' //对应处理函数
                },
                {
                    name: '旧物',
                    current: 0,
                    style: 0,
                    ico: 'icon-mingpianjia',
                    fn: 'gotoOldGoods'
                },
                {
                    name: '发布',
                    current: 0,
                    style: 1,
                    ico: '',
                    fn: 'gotoPublish'
                },
                {
                    name: '招领',
                    current: 0,
                    style: 0,
                    ico: 'icon-yikeappshouyetubiao35',
                    fn: 'gotoRecruit'
                },
                {
                    name: '我的',
                    current: 0,
                    style: 0,
                    ico: 'icon-wode',
                    fn: 'gotoMine'
                }
            ]
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
        gotoOldGoods: function () {
            uni.redirectTo({
                url: '/pages/oldgoods/oldgoods'
            });
        },

        gotoPublish: function () {
            uni.redirectTo({
                url: '/pages/publish/publish'
            });
        },

        gotoRecruit: function () {
            uni.redirectTo({
                url: '/pages/recruit/recruit'
            });
        },

        gotoMine: function () {
            uni.redirectTo({
                url: '/pages/mine/mine'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
