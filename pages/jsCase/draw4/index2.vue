<template>
    <!-- pages/jsCase/draw4/index2.wxml -->
    <view class="container-out">
        <view
            class="circle"
            :style="'top:' + item.topCircle + 'rpx;left:' + item.leftCircle + 'rpx;background-color: ' + (index % 2 == 0 ? colorCircleFirst : colorCircleSecond) + ';'"
            v-for="(item, index) in circleList"
            :key="index"
        ></view>
        <view class="container-in">
            <view
                class="content-out"
                :style="'top:' + item.topAward + 'rpx;left:' + item.leftAward + 'rpx;background-color: ' + (index == indexSelect ? colorAwardSelect : colorAwardDefault) + ';'"
                v-for="(item, index) in awardList"
                :key="index"
            >
                <image class="award-image" :src="item.imageAward"></image>
            </view>
            <view class="start-btn" @tap="startGame" :style="' background-color:' + (isRunning ? '#e7930a' : '#ffe400')">START</view>
        </view>
    </view>
</template>

<script>
//index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            circleList: [],
            //圆点数组
            awardList: [],
            //奖品数组
            colorCircleFirst: '#FFDF2F',
            //圆点颜色1
            colorCircleSecond: '#FE4D32',
            //圆点颜色2
            colorAwardDefault: '#F5F0FC',
            //奖品默认颜色
            colorAwardSelect: '#ffe400',
            //奖品选中颜色
            indexSelect: 0,
            //被选中的奖品index
            isRunning: false,
            //是否正在抽奖
            imageAward: [
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg',
                'https://i.postimg.cc/jjP71L0H/20220223152052.jpg'
            ] //奖品图片数组
        };
    },
    onLoad: function () {
        var that = this; //圆点设置

        var leftCircle = 7.5;
        var topCircle = 7.5;
        var circleList = [];

        for (var i = 0; i < 24; i++) {
            if (i == 0) {
                topCircle = 15;
                leftCircle = 15;
            } else if (i < 6) {
                topCircle = 7.5;
                leftCircle = leftCircle + 102.5;
            } else if (i == 6) {
                topCircle = 15;
                leftCircle = 620;
            } else if (i < 12) {
                topCircle = topCircle + 94;
                leftCircle = 620;
            } else if (i == 12) {
                topCircle = 565;
                leftCircle = 620;
            } else if (i < 18) {
                topCircle = 570;
                leftCircle = leftCircle - 102.5;
            } else if (i == 18) {
                topCircle = 565;
                leftCircle = 15;
            } else if (i < 24) {
                topCircle = topCircle - 94;
                leftCircle = 7.5;
            } else {
                return;
            }

            circleList.push({
                topCircle: topCircle,
                leftCircle: leftCircle
            });
        }

        this.setData({
            circleList: circleList
        }); //圆点闪烁

        setInterval(function () {
            if (that.colorCircleFirst == '#FFDF2F') {
                that.setData({
                    colorCircleFirst: '#FE4D32',
                    colorCircleSecond: '#FFDF2F'
                });
            } else {
                that.setData({
                    colorCircleFirst: '#FFDF2F',
                    colorCircleSecond: '#FE4D32'
                });
            }
        }, 500); //设置圆点闪烁的效果
        //奖品item设置

        var awardList = []; //间距,怎么顺眼怎么设置吧.

        var topAward = 25;
        var leftAward = 25;

        for (var j = 0; j < 8; j++) {
            if (j == 0) {
                topAward = 25;
                leftAward = 25;
            } else if (j < 3) {
                topAward = topAward; //166.6666是宽.15是间距.下同

                leftAward = leftAward + 166.6666 + 15;
            } else if (j < 5) {
                leftAward = leftAward; //150是高,15是间距,下同

                topAward = topAward + 150 + 15;
            } else if (j < 7) {
                leftAward = leftAward - 166.6666 - 15;
                topAward = topAward;
            } else if (j < 8) {
                leftAward = leftAward;
                topAward = topAward - 150 - 15;
            }

            var imageAward = this.imageAward[j];
            awardList.push({
                topAward: topAward,
                leftAward: leftAward,
                imageAward: imageAward
            });
        }

        this.setData({
            awardList: awardList
        });
    },
    methods: {
        //开始抽奖
        startGame: function () {
            if (this.isRunning) {
                return;
            }

            this.setData({
                isRunning: true
            });
            var that = this;
            var indexSelect = 0;
            var i = 0;
            var timer = setInterval(function () {
                indexSelect++; //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度

                i += 30;

                if (i > 1000) {
                    //去除循环
                    clearInterval(timer); //获奖提示

                    uni.showModal({
                        title: '恭喜您',
                        content: '获得了第' + (that.indexSelect + 1) + '个优惠券',
                        showCancel: false,
                        //去掉取消按钮
                        success: function (res) {
                            if (res.confirm) {
                                that.setData({
                                    isRunning: false
                                });
                            }
                        }
                    });
                }

                indexSelect = indexSelect % 8;
                that.setData({
                    indexSelect: indexSelect
                });
            }, 200 + i);
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
