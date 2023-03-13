<template>
    <!-- pages/subPack/chating/index.wxml -->
    <!-- pages/contact/contact.wxml -->

    <view>
        <scroll-view scroll-y :scroll-into-view="toView" :style="'height: ' + scrollHeight + ';'">
            <!-- <view class='scrollMsg'> -->
            <block v-for="(item, index) in msgList" :key="index">
                <!-- 单个消息1 客服发出（左） -->

                <view v-if="item.speaker == 'server'" :id="'msg-' + index" style="display: flex; padding: 2vw 11vw 2vw 2vw">
                    <view style="width: 11vw; height: 11vw">
                        <image style="width: 11vw; height: 11vw; border-radius: 10rpx" src="/static/pages/images/contact_member.png"></image>
                    </view>
                    <view style="width: 4vw; height: 11vw; margin-left: 0.5vw; display: flex; align-items: center; z-index: 9">
                        <image style="width: 4vw" src="/static/pages/images/left_msg.png" mode="widthFix"></image>
                    </view>
                    <view class="leftMsg">{{ item.content }}</view>
                </view>

                <!-- 单个消息2 用户发出（右） -->

                <view v-else :id="'msg-' + index" style="display: flex; justify-content: flex-end; padding: 2vw 2vw 2vw 11vw">
                    <view class="rightMsg">{{ item.content }}</view>
                    <view style="width: 4vw; height: 11vw; margin-right: 0.5vw; display: flex; align-items: center; z-index: 9">
                        <image style="width: 4vw" src="/static/pages/images/right_msg.png" mode="widthFix"></image>
                    </view>
                    <view style="width: 11vw; height: 11vw">
                        <image style="width: 11vw; height: 11vw; border-radius: 10rpx" :src="cusHeadIcon"></image>
                    </view>
                </view>
            </block>
            <!-- </view> -->

            <!-- 占位 -->
            <view style="width: 100%; height: 18vw"></view>
        </scroll-view>

        <view class="inputRoom" :style="'bottom: ' + inputBottom">
            <image style="width: 7vw; margin-left: 3.2vw" src="/static/pages/images/pic_icon.png" mode="widthFix"></image>
            <input @confirm="sendClick" :adjust-position="false" :value="inputVal" confirm-type="send" @focus="focus" @blur="blur" />
        </view>
    </view>
</template>

<script>
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = uni.getSystemInfoSync().windowWidth;
var windowHeight = uni.getSystemInfoSync().windowHeight;
var keyHeight = 0;
/**
 * 初始化数据
 */

function initData(that) {
    inputVal = '';
    msgList = [
        {
            speaker: 'server',
            contentType: 'text',
            content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
        },
        {
            speaker: 'customer',
            contentType: 'text',
            content: '我怕是走错片场了...'
        }
    ];
    that.setData({
        msgList,
        inputVal
    });
}
/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//  var query = wx.createSelectorQuery();
//  query.select('.scrollMsg').boundingClientRect(function(rect) {
//  }).exec();
// }

export default {
    data() {
        return {
            scrollHeight: '100vh',
            inputBottom: 0,
            msgList: '',
            inputVal: '',
            cusHeadIcon: '',
            toView: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        initData(this);
        this.setData({
            cusHeadIcon: app.globalData.userInfo.avatarUrl
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    methods: {
        /**
         * 获取聚焦
         */
        focus: function (e) {
            keyHeight = e.detail.height;
            this.setData({
                scrollHeight: windowHeight - keyHeight + 'px'
            });
            this.setData({
                toView: 'msg-' + (msgList.length - 1),
                inputBottom: keyHeight + 'px'
            }); //计算msg高度
            // calScrollHeight(this, keyHeight);
        },

        //失去聚焦(软键盘消失)
        blur: function (e) {
            this.setData({
                scrollHeight: '100vh',
                inputBottom: 0
            });
            this.setData({
                toView: 'msg-' + (msgList.length - 1)
            });
        },

        /**
         * 发送点击监听
         */
        sendClick: function (e) {
            msgList.push({
                speaker: 'customer',
                contentType: 'text',
                content: e.detail.value
            });
            inputVal = '';
            this.setData({
                msgList,
                inputVal
            });
        },

        /**
         * 退回上一页
         */
        toBackClick: function () {
            uni.navigateBack({});
        }
    }
};
</script>
<style>
@import './index.css';
</style>
