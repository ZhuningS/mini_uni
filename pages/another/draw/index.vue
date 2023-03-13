<template>
    <!-- pages/another/draw/index.wxml -->
    <view class="content" :style="'background-image: url(' + cdn + '/lucky9/bg.jpg);'">
        <!-- 抽奖 -->
        <view class="lucky-box">
            <image :src="cdn + '/lucky9/bg-lucky.png'" mode="widthFix"></image>
            <view class="prize-box">
                <block v-for="(item, index) in prize" :key="item.prize">
                    <block v-if="index == 4">
                        <view class="item">
                            <!-- 抽奖 -->
                            <image :src="cdn + '/lucky9/lottery.png'" mode="widthFix" @tap="tapLottery"></image>
                        </view>
                    </block>

                    <view class="item">
                        <!-- 奖品项 -->
                        <image :src="cdn + '/lucky9/' + (item.active ? 'bg-prize-select' : 'bg-prize') + '.png'" mode="widthFix"></image>
                        <view class="prize">
                            <!-- 谢谢参与或券或实物奖 -->
                            <image :src="item.src" mode="scaleToFill"></image>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            cdn: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu',

            prize: [
                {
                    id: 0,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-entity.png'
                },
                {
                    id: 1,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-thanks.png'
                },
                {
                    id: 2,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-entity.png'
                },
                {
                    id: 3,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-thanks.png'
                },
                {
                    id: 4,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-thanks.png'
                },
                {
                    id: 5,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-entity.png'
                },
                {
                    id: 6,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-thanks.png'
                },
                {
                    id: 7,
                    active: false,
                    src: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky9/prize-entity.png'
                }
            ],

            prizeListIndex: [0, 1, 2, 4, 7, 6, 5, 3],
            lock: false,

            // 抽奖动画
            Timer: null,

            LotteryEnd: false,
            AniRunIndex: 0,
            LotteryStatus: true,
            active: false
        };
    },
    methods: {
        // 范围随机数
        randomRange(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },

        luckAni(luckIndex) {
            return new Promise((resolve, reject) => {
                console.log('中奖索引>>>', luckIndex);
                let that = this;
                let maxTime = this.randomRange(2500, 4000);
                let rI = 0.01;

                if (this.AniRunIndex == 0) {
                    this.setData({
                        'prize[0].active': true
                    });
                }

                function runAni(_t) {
                    that.Timer = setTimeout(() => {
                        let list = that.prize;
                        ++that.AniRunIndex;

                        if (that.AniRunIndex >= that.prizeListIndex.length) {
                            that.AniRunIndex = 0;
                        } else {
                            ('');
                        }

                        let Pindex = that.prizeListIndex[that.AniRunIndex];
                        list.map((v, i) => {
                            v.active = Pindex == i;
                        });
                        that.setData({
                            prize: list
                        });

                        if (that.LotteryEnd && luckIndex == that.AniRunIndex) {
                            clearTimeout(that.Timer);
                            that.LotteryEnd = false;
                            that.LotteryStatus = true;
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

        // 点击抽奖
        tapLottery() {
            if (this.lock) {
                return;
            }

            this.setData({
                lock: true
            });
            this.luckAni(this.randomRange(0, 7)).then((e) => {
                uni.showToast({
                    title: '成抽中了' + e[0].id,
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
