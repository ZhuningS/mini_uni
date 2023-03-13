<template>
    <!-- pages/another/jiugongeLottery/index.wxml -->
    <view class="content">
        <view class="lucky">
            <image :class="'dish ' + dishClass" src="https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky/dish.png"></image>
            <image class="go" src="https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/lucky/go.png"></image>
            <button class="go-lucky" @tap="tapLucky">立即抽奖</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            dishClass: '',
            lock: false,
            //锁，防止重复点击
            luckys: {
                1: 'OPPO手机',
                2: '充电器',
                3: '888红包',
                4: '188红包',
                5: '88红包',
                6: '18.8红包',
                7: '8.8红包',
                8: '6.88红包'
            }
        };
    },
    methods: {
        tapLucky() {
            let lock = this.lock;
            let luckys = this.luckys;
            let seed = parseInt(Math.ceil(8 * Math.random()));

            if (lock) {
                return;
            }

            uni.showLoading({
                title: '抽奖中···'
            });
            this.setData({
                lock: true
            });
            setTimeout(() => {
                // 模拟接口请求
                uni.hideLoading();
                this.setData({
                    dishClass: 'lucky0'
                }); // 清除动画

                setTimeout(() => {
                    this.setData({
                        dishClass: 'lucky' + seed
                    }); // 启动动画
                }, 100);
                setTimeout(() => {
                    uni.showToast({
                        title: '抽中了' + luckys[seed],
                        icon: 'none'
                    });
                    this.setData({
                        lock: false
                    });
                }, 3000);
            }, 1000);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
