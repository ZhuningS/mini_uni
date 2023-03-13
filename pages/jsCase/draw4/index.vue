<template>
    <!-- pages/jsCase/draw4/index.wxml -->
    <view class="draw_box flex-row j_c">
        <view
            class="circle"
            :style="'top:' + item.topCircle + 'rpx;left:' + item.leftCircle + 'rpx;background: ' + (index % 2 == 0 ? dotColor1 : dotColor2) + ';'"
            v-for="(item, index) in dotList"
            :key="index"
        ></view>
        <view class="draw_con">
            <view class="flex-row j_b prize_box">
                <block v-for="(item, index) in prize_list" :key="index">
                    <block v-if="index == 4">
                        <view class="prize_start prize_item">
                            <image :src="'../img/' + (start_btn ? 'start_btn.png' : 'start_btn_gray.png')" class="lott_btn" mode="aspectFill" @tap="lottery"></image>
                        </view>
                    </block>

                    <view :class="'prize_item flex-column ' + (item.active ? 'ative' : '')" :data-index="index">
                        <view class="prize_img">
                            <image :src="item.icon" mode="aspectFill" />
                        </view>
                        <text class="text_ellipsis e_text">{{ index }}.{{ item.name }}</text>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
// pages/jsCase/draw4/index.js
export default {
    data() {
        return {
            dotList: [],
            dotColor1: 'pink',

            //圆点颜色1
            dotColor2: 'linear-gradient(180deg, #1BFCE2 0%, #DBF5FF 100%)',

            //圆点颜色2
            remian_num: 5,

            //剩余抽奖的次数
            prize_list: [],

            lock: false,

            //防止重复点击
            prizeListIndex: [0, 1, 2, 4, 7, 6, 5, 3],

            //抽奖顺序的索引
            prizeListIndex1: [0, 1, 2, 7, 3, 6, 5, 4],

            //奖品索引
            over: false,

            //是否加载完奖品数据
            start_btn: true,

            //是否有抽奖机会
            //按钮音
            innerAudioContext: '',

            // 抽奖动画
            Timer: null,

            LotteryEnd: false,

            //抽奖结束
            nowRunIndex: 0,

            active: false
        };
    },
    onLoad: function (options) {
        this.init();
    },
    onShow: function () {
        this.getData();
    },
    methods: {
        // 范围随机数
        randomRange(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },

        init() {
            //圆点设置
            var leftCircle = 7.5;
            var topCircle = 8;
            var dotList = [];

            for (var i = 0; i < 28; i++) {
                if (i == 0) {
                    topCircle = 8;
                    leftCircle = 64;
                } else if (i < 8) {
                    topCircle = 8;
                    leftCircle = leftCircle + 72;
                } else if (i == 8) {
                    topCircle = 54;
                    leftCircle = 626;
                } else if (i < 14) {
                    topCircle = topCircle + 86;
                    leftCircle = 626;
                } else if (i == 14) {
                    topCircle = 538;
                    leftCircle = 570;
                } else if (i < 22) {
                    topCircle = 538;
                    leftCircle = leftCircle - 72;
                } else if (i == 22) {
                    topCircle = 484;
                    leftCircle = 10;
                } else if (i < 28) {
                    topCircle = topCircle - 86;
                    leftCircle = 10;
                } else {
                    return;
                }

                dotList.push({
                    topCircle: topCircle,
                    leftCircle: leftCircle
                });
            }

            this.setData({
                dotList: dotList
            }); // 圆点闪烁

            setInterval(() => {
                if (this.dotColor1 == 'pink') {
                    this.setData({
                        dotColor1: 'linear-gradient(180deg, #1BFCE2 0%, #DBF5FF 100%)',
                        dotColor2: 'pink'
                    });
                } else {
                    this.setData({
                        dotColor1: 'pink',
                        dotColor2: 'linear-gradient(180deg, #1BFCE2 0%, #DBF5FF 100%)'
                    });
                }
            }, 500);
        },

        getData() {
            var list = [
                {
                    id: '001',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品一'
                },
                {
                    id: '002',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '谢谢惠顾'
                },
                {
                    id: '003',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品二'
                },
                {
                    id: '004',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品三'
                },
                {
                    id: '005',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品四'
                },
                {
                    id: '006',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '谢谢惠顾'
                },
                {
                    id: '007',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品五'
                },
                {
                    id: '008',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '奖品六'
                }
            ];
            let prize_list = list;
            let pIndex = this.prizeListIndex1;

            for (let i in prize_list) {
                prize_list[i].active = false;
                prize_list[i].index = pIndex[i];
            }

            this.setData({
                prize_list,
                over: true
            });
        },

        //ative样式的索引，
        luckChose(luckIndex) {
            return new Promise((resolve, reject) => {
                let that = this;
                let maxTime = this.randomRange(2500, 4000);
                let time_speed = 0.01; //速率

                if (this.nowRunIndex == 0) {
                    //初始化从索引0开始显示抽奖激活的边框
                    this.setData({
                        'prize_list.[0].active': true
                    });
                }

                function lotteryRun(time) {
                    that.Timer = setTimeout(() => {
                        let list = that.prize_list;
                        ++that.nowRunIndex;

                        if (that.nowRunIndex >= that.prizeListIndex.length) {
                            that.nowRunIndex = 0;
                        } else {
                            ('');
                        }

                        let Pindex = that.prizeListIndex[that.nowRunIndex];
                        console.log(Pindex);
                        list.map((item, index) => {
                            item.active = Pindex == index;
                        });
                        that.setData({
                            prize_list: list
                        });

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
                            time_speed += 0.5;
                            lotteryRun(time + time_speed);
                        }
                    }, time);
                }

                lotteryRun(80);
                setTimeout(() => {
                    this.LotteryEnd = true;
                }, maxTime);
            });
        },

        audioPlay() {
            const innerAudioContext = uni.createInnerAudioContext();
            innerAudioContext.autoplay = false; // 是否自动开始播放，默认为 false

            innerAudioContext.loop = true; // 是否循环播放，默认为 false

            uni.setInnerAudioOption({
                // ios在静音状态下能够正常播放音效
                obeyMuteSwitch: false,
                // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
                success: function (e) {},
                fail: function (e) {}
            });
            innerAudioContext.src = '/static/pages/jsCase/img/btnaudio.mp3';
            innerAudioContext.play();
            this.setData({
                innerAudioContext
            });
        },

        lottery() {
            if (!this.over) {
                return;
            } // 防止重复点击

            if (this.lock) {
                return;
            }

            this.setData({
                lock: true
            });
            let { prize_list } = this;

            if (this.remian_num.length <= 0 || this.prize_list.length === 0) {
                return;
            }

            this.audioPlay();
            let id = '005';
            let currIndex = '';
            for (let i in prize_list) {
                if (id == prize_list[i].id) {
                    currIndex = prize_list[i].index;
                }
            }

            this.luckChose(currIndex).then((res) => {
                this.innerAudioContext.stop();
                uni.showToast({
                    title: '你抽中了' + res[0].name,
                    icon: 'none'
                });
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
