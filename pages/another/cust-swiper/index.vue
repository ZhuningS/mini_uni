<template>
    <!-- pages/another/cust-swiper/index.wxml -->
    <view class="swiper-box" @touchmove="tauchMove" @touchstart="tauchStartFun" @touchend="tauchEnd">
        <view :class="'item-box ' + (item.zIndex == 1 ? 'none' : '')" :style="'--index:' + item.zIndex + ';--left:' + item.mLeft" v-for="(item, index) in swiperList" :key="index">
            <view class="swiper-item">
                <image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
                <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
            </view>
        </view>
    </view>
</template>

<script>
// pages/another/cust-swiper/index.js
export default {
    data() {
        return {
            swiperList: [
                {
                    type: 'video',
                    url: 'https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/XJmpTvCD/susu2.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/76br1jzJ/susu1.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                },
                {
                    type: 'image',
                    url: 'https://i.postimg.cc/XJmpTvCD/susu2.jpg'
                }
            ],

            tauchStart: '',
            direction: ''
        };
    },
    onLoad: function (options) {
        this.tauchSwiper('swiperList');
    },
    onShow: function () {},
    methods: {
        // 初始化tauchSwiper
        tauchSwiper(name) {
            let list = this[name];

            for (let i = 0; i < list.length; i++) {
                // Math.abs(x) 函数返回指定数字 “x“ 的绝对值
                list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2));
                list[i].mLeft = i - parseInt(list.length / 2);
            }

            this.setData({
                swiperList: list
            });
        },

        // tauchSwiper触摸开始
        tauchStartFun(e) {
            this.setData({
                tauchStart: e.touches[0].pageX
            });
        },

        // tauchSwiper计算方向
        tauchMove(e) {
            this.setData({
                direction: e.touches[0].pageX - this.tauchStart > 0 ? 'right' : 'left'
            });
        },

        // tauchSwiper计算滚动
        tauchEnd(e) {
            let direction = this.direction;
            let list = this.swiperList;

            if (direction == 'right') {
                let mLeft = list[0].mLeft;
                let zIndex = list[0].zIndex;

                for (let i = 1; i < list.length; i++) {
                    list[i - 1].mLeft = list[i].mLeft;
                    list[i - 1].zIndex = list[i].zIndex;
                }

                list[list.length - 1].mLeft = mLeft;
                list[list.length - 1].zIndex = zIndex;
                this.setData({
                    swiperList: list
                });
            } else {
                let mLeft = list[list.length - 1].mLeft;
                let zIndex = list[list.length - 1].zIndex;

                for (let i = list.length - 1; i > 0; i--) {
                    list[i].mLeft = list[i - 1].mLeft;
                    list[i].zIndex = list[i - 1].zIndex;
                }

                list[0].mLeft = mLeft;
                list[0].zIndex = zIndex;
                this.setData({
                    swiperList: list
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
