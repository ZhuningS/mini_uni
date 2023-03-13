<template>
    <view>
        <!-- pages/jsCase/draw/index.wxml -->
        <view class="con flex-column">
            <image src="/static/pages/jsCase/img/draw_bg1.png" class="bg_img"></image>
            <view class="draw_sc flex-row">
                <image src="/static/pages/jsCase/img/draw_icon.png" class="draw_icon" />
                <swiper class="swiper" :vertical="true" :autoplay="true" :circular="true" interval="3000" display-multiple-items="1">
                    <block v-for="(item, idx) in 2" :key="idx">
                        <swiper-item>
                            <view>
                                <text :decode="true">恭喜用户&nbsp;&nbsp;&nbsp;</text>
                                <text class="draw_text">135XXXX5678</text>
                                <text :decode="true">&nbsp;&nbsp;抽中奶粉券就加水电费扫地</text>
                            </view>
                        </swiper-item>
                    </block>
                </swiper>
            </view>
            <view class="draw_con">
                <image src="/static/pages/jsCase/img/draw_bg2.png" class="bg_img" />
                <view class="flex-row j_b prize_box">
                    <block v-for="(item, index) in prize_list" :key="index">
                        <!-- 抽奖 按钮 -->

                        <block v-if="index == 4">
                            <view class="prize_start prize_item">
                                <image src="/static/pages/jsCase/img/start_btn.png" class="lott_btn" mode="aspectFill" @tap="lottery"></image>
                            </view>
                        </block>

                        <!-- 奖项 -->

                        <view :class="'prize_item flex-column ' + (item.active ? 'ative' : '')">
                            <view class="prize_img">
                                <image :src="item.icon" mode="aspectFill" />
                            </view>
                            <text>{{ index }}{{ item.name }}</text>
                        </view>
                    </block>
                </view>
            </view>
            <view class="remainin_text">
                您还有
                <text>{{ remian_num }}次</text>
                抽奖机会
            </view>
        </view>
        <!-- 活动内容按钮 -->
        <view class="btn" @tap.stop.prevent="toDetail">活动内容</view>
        <!-- 抽奖记录 -->
        <view v-if="true" class="draw_bot">
            <view class="flex-row j_c">
                <view class="line"></view>
                <view class="bot_title flex-column">我的抽奖记录</view>
                <view class="line"></view>
            </view>
            <swiper class="bot_swiper" :vertical="true" :autoplay="true" :circular="true" interval="3000" display-multiple-items="3">
                <block v-for="(item, idx) in 9" :key="idx">
                    <swiper-item>
                        <view class="flex" style="align-items: baseline">
                            <text :decode="true">5月21日 10：20：01 &nbsp;&nbsp;&nbsp;</text>
                            <text :decode="true" class="bot_text text_ellipsis">&nbsp;&nbsp;抽中了奶粉券就加水电费扫地</text>
                        </view>
                    </swiper-item>
                </block>
            </swiper>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            remian_num: 5,

            //剩余抽奖的次数
            prize_list: [
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '谢谢惠顾',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人',
                    active: false
                }
            ],

            lock: false,

            //防止重复点击
            //抽奖顺序的索引
            prizeListIndex: [0, 1, 2, 4, 7, 6, 5, 3],

            // 抽奖动画
            Timer: null,

            LotteryEnd: false,

            //抽奖结束
            nowRunIndex: 0,

            active: false
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    onPageScroll: function (e) {
        console.log(e);
    },
    methods: {
        // 禁止弹框底层滑动
        catchTouchMove: function () {
            return false;
        },

        // 范围随机数
        randomRange(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },

        // 抽奖活动
        lottery() {
            // 防止重复点击
            if (this.lock) {
                return;
            }

            this.setData({
                lock: true
            });
            this.luckChose(this.randomRange(0, 7)).then((e) => {
                uni.showToast({
                    title: '成抽中了' + e[0].name,
                    icon: 'none'
                });
            });
        },

        //ative样式的索引，
        luckChose(luckIndex) {
            return new Promise((resolve, reject) => {
                console.log('中奖索引>>>', luckIndex);
                let that = this;
                let maxTime = this.randomRange(2500, 4000); //抽奖的时间2.5s-4s之间

                console.log(maxTime);
                let rI = 0.01;
                console.log(this.nowRunIndex);

                if (this.nowRunIndex == 0) {
                    //初始化从索引0开始显示抽奖激活的边框
                    this.setData({
                        'prize_list[0].active': true
                    });
                }

                function runAni(_t) {
                    that.Timer = setTimeout(() => {
                        let list = that.prize_list;
                        ++that.nowRunIndex;

                        if (that.nowRunIndex >= that.prizeListIndex.length) {
                            that.nowRunIndex = 0;
                        } else {
                            ('');
                        }

                        console.log(that.nowRunIndex >= that.prizeListIndex.length);
                        console.log(that.nowRunIndex);
                        let Pindex = that.prizeListIndex[that.nowRunIndex];
                        list.map((item, index) => {
                            item.active = Pindex == index;
                        });
                        that.setData({
                            prize_list: list
                        });
                        console.log(that.LotteryEnd);
                        console.log(luckIndex == that.nowRunIndex);

                        if (that.LotteryEnd && luckIndex == that.nowRunIndex) {
                            clearTimeout(that.Timer);
                            that.LotteryEnd = false;
                            that.setData({
                                lock: false
                            });
                            resolve(
                                list.filter((v) => {
                                    return v.active;
                                })
                            );
                        } else {
                            rI += 0.5;
                            runAni(_t + rI);
                        }
                    }, _t);
                }

                runAni(80);
                setTimeout(() => {
                    this.LotteryEnd = true;
                }, maxTime);
            });
        },

        toDetail() {
            console.log('占位：函数 toDetail 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
