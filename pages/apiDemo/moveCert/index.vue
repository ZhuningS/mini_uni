<template>
    <view>
        <!-- pages/apiDemo/moveCert/index.wxml -->
        <view style="display: none">
            滑块验证 用微信官方组件movable-area、movable-view实现，方便快捷。 无规则验证码
            用canvas实现，先画随机字母，再画随机线条，再画随机点，如果有其他更好想法，还可以再画随机其他。
        </view>
        <movable-area class="content" :style="'width:' + area_width + '%'">
            拖动滑块验证
            <movable-view class="box" :style="'width:' + box_width + 'rpx'" :friction="100" direction="horizontal" :x="x" :damping="500" @change="drag" @touchend="dragOver">
                <view class="movable-icon"></view>
            </movable-view>
        </movable-area>
    </view>
</template>

<script>
// pages/apiDemo/moveCert/index.js
var coord; //声明 全局变量

export default {
    data() {
        return {
            x: 0,
            area_width: 85,
            //可滑动区域的宽，单位是百分比，设置好后自动居中
            box_width: 120,
            //滑块的宽,单位是 rpx
            maxNum: 0
        };
    },
    onLoad: function (options) {
        var that = this;
        uni.getSystemInfo({
            //获取系统信息 设置预设值
            success: function (res) {
                console.log(res.windowWidth);
                var n = Math.floor((res.windowWidth * that.area_width) / 100 - that.box_width / 2);
                console.log(n);
                that.setData({
                    maxNum: n
                });
            }
        });
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
        // 函数方法
        drag(e) {
            var that = this;
            coord = e.detail.x; //根据bindchange 事件获取detail的x轴
        },

        dragOver(e) {
            //根据触摸 手指触摸动作结束    判断 当前的x轴 是否大于预设值的值
            var that = this;

            if (coord >= that.maxNum) {
                uni.showToast({
                    title: '验证成功',
                    icon: 'success',
                    duration: 2000
                }); //验证成功之后的代码
            } else {
                // 如果不大于 则设置 x周的距离为0
                that.setData({
                    x: 0
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
