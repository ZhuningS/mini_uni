<template>
    <!-- pages/jsCase/draw3/index.wxml -->
    <view class="con flex-column">
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
        <view class="box">
            <view class="b_box">
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
        </view>
        <view class="remainin_text">
            您还有
            <text>{{ remian_num }}次</text>
            抽奖机会
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            remian_num: 5,

            //剩余抽奖的次数
            prize_list: [],

            lock: false,

            //防止重复点击
            prizeListIndex: [0, 1, 2, 4, 7, 6, 5, 3],

            //抽奖顺序的索引
            prizeListIndex1: [0, 1, 2, 7, 3, 6, 5, 4],

            //奖品索引
            //是否加载完奖品数据
            over: false,

            // 抽奖动画
            Timer: null,

            LotteryEnd: false,

            //抽奖结束
            nowRunIndex: 0,

            active: false
        };
    },
    onShow: function () {
        this.getDraw();
    },
    methods: {
        getDraw() {
            var cacheData = uni.getStorageSync('draw_data');
            var prize_list = cacheData ? JSON.parse(cacheData) : {}; //缓存数据，防止页面空白
            this.setData({
                prize_list
            });
            this.getData();
        },

        getData() {
            var list = [
                {
                    id: '001',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '002',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '谢谢惠顾'
                },
                {
                    id: '003',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '004',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '005',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '006',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '007',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                },
                {
                    id: '008',
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    name: '扫地机器人'
                }
            ];
            setTimeout(() => {
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
                uni.setStorageSync('draw_data', JSON.stringify(prize_list));
            }, 500);
        },

        // 范围随机数
        randomRange(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },

        //ative样式的索引，
        luckChose(luckIndex) {
            return new Promise((resolve, reject) => {
                let that = this;
                let maxTime = this.randomRange(2500, 4000); //抽奖的时间2.5s-4s之间

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

        // 抽奖活动
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

            setTimeout(() => {
                console.log('12312');
                let id = '007';
                let currIndex = '';
                for (let i in prize_list) {
                    if (id == prize_list[i].id) {
                        currIndex = prize_list[i].index;
                    }
                }

                console.log(currIndex);
                this.luckChose(currIndex).then((res) => {
                    console.log(res);
                    uni.showToast({
                        title: '你抽中了' + res[0].name,
                        icon: 'none'
                    });
                });
            }, 500);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
