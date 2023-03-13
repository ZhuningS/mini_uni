<template>
    <view>
        <!-- pages/another/overflow/index.wxml -->
        <view class="possess-layout margin-layout">
            <view class="main">
                <view class="commodity">
                    <view class="commdoity-image">
                        <image class="commodity-img" src="/static/img/shangpin.jpg"></image>
                    </view>
                    <view class="commodity-title">
                        <view class="title commodity-line">
                            华为旗舰5G手机拍照手机4GB+64GB魅蓝全网通华为旗舰5G手机拍照手机4GB+64GB魅蓝全网通华为旗舰5G手机拍照手机4GB+64GB魅蓝全网通
                        </view>
                        <view class="goods-price">
                            <text>¥</text>
                            <text>1888</text>
                            <text>.</text>
                            <text>66</text>
                        </view>
                    </view>
                    <view class="commdoity-image-right">
                        <image src="/static/img/icon/icon-evaluate-detail-gou.png"></image>
                    </view>
                </view>
            </view>
        </view>

        <view class="appraise-user">
            <view class="possess-layout margin-layouts">
                <view class="main">
                    <block v-for="(item, index) in repotList" :key="item.key">
                        <view class="user-comment">
                            <view class="comment-user">
                                <view class="user">
                                    <image class="user-head-portrait" :src="item.img"></image>
                                    <view class="user-name">
                                        <view>{{ item.users }}</view>
                                        <view>
                                            <block v-for="(item, index1) in userpingfen" :key="index1">
                                                <block v-for="(item, index2) in item.pingfenpic" :key="index2">
                                                    <image :src="item"></image>
                                                </block>
                                            </block>
                                        </view>
                                    </view>
                                </view>
                                <view class="appraise-date">{{ item.time }}</view>
                            </view>
                            <view class="appraise-contents"></view>
                            <view class="appraise-content">
                                <block v-if="item.select.length != 0" v-for="(item, index1) in item.select" :key="index1">
                                    <block v-if="item.whether != ''">
                                        <view>
                                            <text>是否正品：</text>
                                            <text>{{ item.whether }}</text>
                                        </view>
                                    </block>

                                    <block v-if="item.colour != ''">
                                        <view>
                                            <text>产品颜色：</text>
                                            <text>{{ item.colour }}</text>
                                        </view>
                                    </block>

                                    <block v-if="item.effect != ''">
                                        <view>
                                            <text>显色效果：</text>
                                            <text>{{ item.effect }}</text>
                                        </view>
                                    </block>

                                    <block v-if="item.rests != ''">
                                        <view>
                                            <text>其他特色：</text>
                                            <text>{{ item.rests }}</text>
                                        </view>
                                    </block>
                                </block>
                                <block v-if="item.comment != ''">
                                    <text class="evaluate-content">{{ item.comment }}</text>
                                </block>
                            </view>
                            <scroll-view :scroll-x="true" class="scroll-view-true">
                                <block v-for="(item, index1) in item.picture" :key="index1">
                                    <image :src="item"></image>
                                </block>
                            </scroll-view>
                            <view class="appraise-base">
                                <view class="have-bought">{{ item.selected }}</view>
                                <view class="write-back">
                                    <view @tap.stop.prevent="writeBack">
                                        <image class="wrte-back-img" src="/static/img/icon/icon-write-back.png"></image>
                                        <view>2</view>
                                    </view>
                                    <view>
                                        <image
                                            class="wrte-back-img"
                                            :src="item.change ? '../../../img/icon/icon-give-a-like-red.png' : '../../../img/icon/icon-give-a-like.png'"
                                            :data-curindex="index"
                                            @tap="praiseThis"
                                        ></image>
                                        <view :class="item.change ? 'hover-active' : ''">{{ item.praise }}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 商品评价详情 E -->
        <view class="appraise-user">
            <view class="possess-layout margin-layouts">
                <view class="main">
                    <view class="appraise-detail-top">共{{ appraiseList.length }}条评论</view>
                    <block v-for="(item, index1) in appraiseList" :key="item.index1">
                        <view>
                            <view class="username-appraise-top">
                                <view class="username">
                                    <image :src="item.img"></image>
                                    <view>{{ item.username }}</view>
                                </view>
                                <view>
                                    <image
                                        class="praise"
                                        :src="item.change ? '../../../img/icon/icon-give-a-like-red.png' : '../../../img/icon/icon-give-a-like.png'"
                                        :data-curindex="index1"
                                        @tap="praiseThiss"
                                    ></image>
                                    <view :class="'amount ' + (item.change ? 'hover-active' : '')">{{ item.praise }}</view>
                                </view>
                            </view>
                        </view>

                        <view class="appraise-content">
                            <text>{{ item.appraise_content }}</text>
                            <text>{{ item.time }}</text>
                        </view>

                        <view class="reply-username">
                            <block v-if="item.reply_list.length > 2">
                                <view :class="'reply-usernames ' + (item.isOpen ? 'reply-usernames-active' : '')">
                                    <block v-for="(item, index2) in item.reply_list" :key="item.index2">
                                        <view class="username-appraise-tops">
                                            <view class="username">
                                                <image :src="item.img"></image>
                                                <view>{{ item.nickname }}</view>
                                            </view>
                                            <view>
                                                <image
                                                    class="praise"
                                                    :src="item.changes ? '../../../img/icon/icon-give-a-like-red.png' : '../../../img/icon/icon-give-a-like.png'"
                                                    :data-curindex="index1"
                                                    :data-curindexs="index2"
                                                    @tap="praiseThisss"
                                                ></image>
                                                <view :class="'amount ' + (item.changes ? 'hover-active' : '')">{{ item.praise }}</view>
                                            </view>
                                        </view>

                                        <view class="appraise-content">
                                            <text>{{ item.reply_content }}</text>
                                            <text>{{ item.time }}</text>
                                        </view>
                                    </block>
                                </view>
                                <view class="unfold-btn" @tap="chooseUnfold" v-if="!item.isOpen" :data-value="item.isOpen" :data-key="'appraiseList.[' + index1 + ']'">
                                    展开{{ item.reply_list.length - 1 }}条回复
                                </view>
                                <view class="unfold-btn" @tap="chooseUnfold" v-if="item.isOpen" :data-value="item.isOpen" :data-key="'appraiseList.[' + index1 + ']'">
                                    收起{{ item.reply_list.length - 1 }}条回复
                                </view>
                            </block>
                            <block v-else>
                                <block v-for="(item, index2) in item.reply_list" :key="item.index2">
                                    <view class="username-appraise-top">
                                        <view class="username">
                                            <image :src="item.img"></image>
                                            <view>{{ item.nickname }}</view>
                                        </view>
                                        <view>
                                            <image
                                                class="praise"
                                                :src="item.changes ? '../../../img/icon/icon-give-a-like-red.png' : '../../../img/icon/icon-give-a-like.png'"
                                                :data-curindex="index1"
                                                :data-curindexs="index2"
                                                @tap="praiseThisss"
                                            ></image>
                                            <view :class="'amount ' + (item.changes ? 'hover-active' : '')">{{ item.praise }}</view>
                                        </view>
                                    </view>

                                    <view class="appraise-content">
                                        <text>{{ item.reply_content }}</text>
                                        <text>{{ item.time }}</text>
                                    </view>
                                </block>
                            </block>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="end">- 这里就到底了哦 -</view>

        <!-- 底部评论 S -->
        <view class="appraise-btn">
            <view class="appraise-btn-left">
                <image src="/static/img/icon/icon-import.png"></image>
                <view>说点什么吧</view>
            </view>
            <view class="appraise-btn-right">评价</view>
        </view>
        <!-- 底部评论 E -->
    </view>
</template>

<script>
// pages/commodity/commodity-write-back/index.js
var pingxin = require('./pingxing.js');

export default {
    data() {
        return {
            status: true,

            //评价框显示隐藏
            content: '',

            repotList: [
                {
                    users: '山河',
                    img: '/static/img/00.jpg',
                    selected: '黑色#眼线笔01',
                    select: [],
                    praise: 0,
                    change: false,
                    comment: '颜值超高的一款眉笔!!!自然生动, 十分适合初学者~',
                    picture: ['/static/img/00.jpg', '/static/img/00.jpg', '/static/img/00.jpg', '/static/img/00.jpg', '/static/img/00.jpg'],
                    time: '2020-05-29'
                }
            ],

            appraiseList: [
                {
                    username: '太白子',
                    img: '/static/img/00.jpg',
                    is_merchant: 0,
                    isOpen: false,
                    change: false,
                    praise: 0,
                    appraise_content: '相信经常不化妆的小仙女都知道眉毛的重要性, 明人不说暗话,今天小编就来给推一推哪些优惠的眉笔吧!!!',
                    reply_list: [
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        }
                    ],
                    time: '今天 15:07'
                },
                {
                    username: '太白子',
                    img: '/static/img/00.jpg',
                    is_merchant: 1,
                    isOpen: false,
                    change: false,
                    praise: 0,
                    appraise_content: '相信经常不化妆的小仙女都知道眉毛的重要性, 明人不说暗话,今天小编就来给推一推哪些优惠的眉笔吧!!!',
                    reply_list: [
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            time: '05-25',
                            praise: 0
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            time: '05-25',
                            praise: 0
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        },
                        {
                            nickname: '太白金星',
                            img: '/static/img/00.jpg',
                            reply_content: '我也是这么觉得',
                            changes: false,
                            praise: 0,
                            time: '05-25'
                        }
                    ],
                    time: '今天 15:07'
                }
            ],

            userpingfen: [
                // 用户评分
                {
                    pingfen: 4
                }
            ],

            focus: '',
            concent1: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        var tiyan = this.userpingfen;

        for (var i = 0; i < tiyan.length; i++) {
            tiyan[i].pingfenpic = pingxin.pingfen(parseFloat(tiyan[i].pingfen)); //使用函数
        }

        that.setData({
            userpingfen: tiyan
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
        //失去焦点时获取里面评论内容
        bindTextAreaBlur: function (e) {
            this.setData({
                content: e.detail.value
            });
        },

        //点击按钮时得到里面的值
        fabiao: function (e) {
            if (this.content == '') {
                uni.showToast({
                    title: '内容不能为空',
                    icon: 'none',
                    duration: 1500
                });
            } else {
                this.setData({
                    focus: 'false',
                    concent1: this.content
                });
                console.log(this.content);
            }
        },

        /**
         * 点击回复显示隐藏评价框
         */
        chengeStatusTop: function () {
            let status = this.status;
            this.setData({
                status: !status
            });
        },

        // 点赞功能逻辑
        praiseThis: function (e) {
            var index = e.currentTarget.dataset.curindex;

            if (this.repotList[index]) {
                var change = this.repotList[index].change;

                if (change !== undefined) {
                    var num = this.repotList[index].praise;

                    if (change) {
                        this.repotList[index].praise = num - 1;
                        this.repotList[index].change = false;
                    } else {
                        this.repotList[index].praise = num + 1;
                        this.repotList[index].change = true;
                    }

                    this.setData({
                        repotList: this.repotList
                    });
                }
            }
        },

        // 点击展开
        chooseUnfold: function (e) {
            var key = e.currentTarget.dataset.key;
            var val = e.currentTarget.dataset.value;
            key = key + '.isOpen';
            this[e.currentTarget.dataset.key] = !val;
        },

        // 点赞功能逻辑s
        praiseThiss: function (e) {
            var index = e.currentTarget.dataset.curindex;

            if (this.appraiseList[index]) {
                var change = this.appraiseList[index].change;

                if (change !== undefined) {
                    var num = this.appraiseList[index].praise;

                    if (change) {
                        this.appraiseList[index].praise = num - 1;
                        this.appraiseList[index].change = false;
                    } else {
                        this.appraiseList[index].praise = num + 1;
                        this.appraiseList[index].change = true;
                    }

                    this.setData({
                        appraiseList: this.appraiseList
                    });
                }
            }
        },

        // 点赞内层逻辑
        praiseThisss: function (e) {
            var index = e.currentTarget.dataset.curindex;
            var indexs = e.currentTarget.dataset.curindexs;
            console.log(indexs);

            if (this.appraiseList[index].reply_list[indexs]) {
                var change = this.appraiseList[index].reply_list[indexs].changes;

                if (change !== undefined) {
                    var num = this.appraiseList[index].reply_list[indexs].praise;

                    if (change) {
                        this.appraiseList[index].reply_list[indexs].praise = num - 1;
                        this.appraiseList[index].reply_list[indexs].changes = false;
                    } else {
                        this.appraiseList[index].reply_list[indexs].praise = num + 1;
                        this.appraiseList[index].reply_list[indexs].changes = true;
                    }

                    this.setData({
                        appraiseList: this.appraiseList
                    });
                }
            }
        },

        writeBack() {
            console.log('占位：函数 writeBack 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
