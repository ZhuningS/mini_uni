<template>
    <!-- pages/effects/guaguale/index.wxml -->
    <view class="scratch_body">
        <image class="scratch_body_bg" mode="widthFix" src="https://img-blog.csdnimg.cn/2022010702543295939.png"></image>

        <view class="scratch_time">
            您有
            <text>{{ cjNum }}</text>
            次刮奖机会
        </view>

        <view class="scratch_do">
            <view class="scratch_do_after">
                <view v-if="hasPrize" class="scratch_do_after_box">
                    <image mode="widthFix" src="https://img-blog.csdnimg.cn/2022010702543242350.png"></image>
                    <view>恭喜你刮中{{ prizeName }}</view>
                    <view class="scratch_do_after_btn" @tap="gj">再来一次</view>
                </view>
                <view v-else class="scratch_do_after_box">
                    <view>很遗憾未中奖</view>
                    <view class="scratch_do_after_btn" @tap="gj">再来一次</view>
                </view>
            </view>

            <canvas
                v-if="!gjEnd"
                class="scratch_do_in"
                :disable-scroll="false"
                canvas-id="canvas-demo"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
            ></canvas>

            <cover-image v-if="showGjBth" class="scratch_do_before" src="https://img-blog.csdnimg.cn/2022010702543256236.png" @tap="gj"></cover-image>

            <!-- <view wx:if="{{again}}" class="scratch_btn again_btn" bindtap="gj">
			<view>再刮一次</view>
		</view> -->
        </view>

        <view class="scratch_btn">
            <view>我的奖品</view>
        </view>
        <view class="scratch_btn">
            <view>活动规则</view>
        </view>
    </view>
</template>

<script>
var app = getApp();
import Scratch from './sc';
let cjIn = false; //防止多次点击

export default {
    data() {
        return {
            gjEnd: false,
            //是否刮奖结束
            showGjBth: true,
            //是否显示刮奖按钮
            again: false,
            //是否显示再来一次按钮
            cjNum: '',
            //抽奖机会
            resaultSrc: '',
            //中奖显示图
            hasPrize: '',
            //是否中奖
            prizeName: '' //奖品名称
        };
    },
    onShow: function () {
        cjIn = false;
        let that = this;
        that.setData({
            gjEnd: false,
            //是否刮奖结束
            showGjBth: true,
            //是否显示刮奖按钮
            again: false,
            //是否显示再来一次按钮
            resaultSrc: '',
            //中奖显示图
            hasPrize: '' //是否中奖
        });
        that.getNum(); //获取抽奖机会次数
    },
    methods: {
        //刮奖设置
        gj() {
            let This = this;

            if (!This.cjNum) {
                uni.showModal({
                    title: '很抱歉',
                    content: '没有机会啦~',
                    showCancel: false,

                    success(res) {}
                });
                return;
            }

            if (cjIn) {
                return;
            } else {
                cjIn = true;
            }

            let timeOutTime = 0; //再次 刮奖时要先显示CANVAS，如果显示CANVAS 与 初始化刮奖界面同时进行的话，则不能重置刮奖层状态

            if (This.gjEnd) {
                //先显示CANVAS
                This.setData({
                    gjEnd: false //是否刮奖结束
                });
                timeOutTime = 100;
            }

            setTimeout(function () {
                //初始化刮奖界面 ，重置刮奖层状态
                new Scratch(This, {
                    canvasId: 'canvas-demo',
                    width: 570,
                    height: 213,
                    //maskColor:'#dddddd',
                    //size:15,
                    //scale:1,
                    scale: 0.5
                });
                setTimeout(function () {
                    //重置刮奖层状态后，再绑定 获取到的结果 数据，否则会出现结果先出来导致“闪动”的状态
                    This.setData({
                        showGjBth: false,
                        //是否显示刮奖按钮
                        again: false,
                        //是否显示再来一次按钮
                        //cjNum: 0, //抽奖机会
                        cjNum: 1,
                        //抽奖机会
                        resaultSrc: '',
                        //中奖显示图
                        hasPrize: true,
                        //是否中奖
                        prizeName: '奖品名称XXX' //奖品名称
                    });
                }, 100);
            }, timeOutTime);
        },

        //刮卡已刮干净
        clearCanvas() {
            let This = this;
            setTimeout(function () {
                //隐藏CANVAS
                This.setData({
                    gjEnd: true //是否刮奖结束
                });
            }, 100);

            if (!This.again) {
                cjIn = false;
                console.log('刮卡已刮干净啦！'); //刮卡刮干净后 显示的界面 ，显示再刮一次按钮（页面中已注释）

                This.setData({
                    again: true
                });
            }
        },

        //获取抽奖机会次数
        getNum() {
            let This = this;
            This.setData({
                cjNum: 1
            });
        },

        touchStart() {
            console.log('占位：函数 touchStart 未声明');
        },

        touchMove() {
            console.log('占位：函数 touchMove 未声明');
        },

        touchEnd() {
            console.log('占位：函数 touchEnd 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
