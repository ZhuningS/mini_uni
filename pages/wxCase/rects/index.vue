<template>
    <view>
        <!-- pages/wxCase/rects/index.wxml -->
        <view class="btn rect">正方形</view>
        <view class="btn circle">半圆矩形</view>

        <!-- 基于矩形的变形，经常会出现梯形与平行四边形的按钮 -->
        <!-- 实现它们主要使用 transform 即可，但是要注意一点，使用了 transform 之后，标签内的文字也会同样的变形，所以，我们通常使用元素的伪元素去实现造型，这样可以做到不影响按钮内的文字。 -->
        <!-- 平行四边形使用 transform: skewX() 即可，注意上述说的，利用元素的伪元素实现平行四边形，做到不影响内部的文字。 -->
        <view class="btn px">平行四边形</view>
        <!-- 不想使用伪元素，除了 transform: skewX()，平行四边形使用渐变也是可以实现的。 -->
        <view class="btn px1">渐变平行四边形</view>

        <!-- 梯形比平行四边形稍微复杂一点，它多借助了 perspective，其实是利用了一定的 3D 变换。原理就是一个矩形，绕着 X 轴旋转，像是这样： -->
        <!-- 使用  perspective 和 transform: rotateX() 即可 -->
        <view class="btn tx">梯形</view>

        <!-- 切角 -- 纯色背景 ,当要求底色是渐变色的时候，这个方法就比较笨拙 -->
        <view class="ant btn"></view>
        <view class="ant4 btn">tips</view>
        <view class="ant2 btn"></view>

        <!-- 利用 clip-path 实现渐变背景的切角图形 借助 clip-path 切出一个切角图形，这样，背景色可以是任意定制的颜色，无论是渐变还是纯色都不在话下
在渐变矩形图形的基础上，利用 clip-path: polygon() 切出我们想要的形状（一个 8 边形）：-->
        <view class="ant1 btn"></view>

        <view class="ant3 btn"></view>
        <view class="ant5 btn"></view>
        <view class="ant7 btn"></view>

        <!-- 箭头按钮 -->
        <view class="arrow btn">arrow</view>
        <view class="arrow1 btn">arrow</view>
        <view class="arrow2 btn">arrow</view>
        <view class="arrow3 btn">arrow</view>

        <!-- 内切圆角 -->
        <view class="c1 btn"></view>
        <view class="c2 btn"></view>
        <!-- 背景色渐变色  mask 实现一层遮罩，利用 mask 的特性，把 4 个角给遮住即可 -->
        <view class="c3 btn"></view>
        <view class="c4 btn"></view>
        <view class="c4_top btn"></view>
        <view class="c5 btn"></view>
        <!-- 圆角不规则矩形 -->
        <!-- 圆角矩形 + 圆角平行四边形组成 -->
        <view class="skew btn">不规则</view>
        <view class="skew1 btn">不规则</view>
        <view class="s1 btn">不规则</view>

        <!-- 外圆角按钮  类似于 Chrome 的分页 -->
        <div class="web_tab btn">苏苏小苏苏</div>

        <!-- 形状 -->
        <view class="s_box btn">
            <view class="s3 s1 btn"></view>
            <view class="s2 btn"></view>
        </view>

        <!-- 按钮 -->
        <button class="b1 btn">这是一个按钮</button>

        <button class="b2 btn" open-type="contact">
            <image src="https://i.postimg.cc/pXDp6RXq/susu3.jpg"></image>
        </button>

        <view class="award_left btn">1</view>
        <view class="award_right btn">1</view>
    </view>
</template>

<script>
// pages/wxCase/rects/index.js
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
