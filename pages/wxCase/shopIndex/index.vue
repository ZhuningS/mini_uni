<template>
    <view>
        <view class="custom_head">
            <view class="custom_title flex-row" :style="'height:' + navObj + 'px;padding-top:' + navTop + 'px;padding-right:' + (navObjWid + 5) + 'px;'">hi,关注+Star！</view>
            <view class="head_swiper">
                <swiper class="swiper_box" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
                    <swiper-item v-for="(item, index) in banner" :key="index">
                        <image @tap="clickImg" :src="item" mode="aspectFill"></image>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class="band_box flex-row">
            <swiper class="swiper_band" :indicator-dots="true" :autoplay="false" @animationfinish="swiperChange">
                <swiper-item v-for="(item, index) in band_list" :key="index">
                    <view class="clearfix">
                        <block v-for="(item0, index1) in item.items" :key="index1">
                            <view class="flex-column band_item">
                                <image :src="item0.icon" class="band_icon" />
                                <text>{{ item0.name }}</text>
                            </view>
                        </block>
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <!-- 热门活动 -->
        <view class="hot_box">
            <view class="flex-row hot_title">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                <text>hots</text>
            </view>
            <view class="flex-row">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="floor1_icon" mode="aspectFill" />
                <view>
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="floor2_icon" mode="aspectFill" />
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="floor2_icon" mode="aspectFill" />
                </view>
            </view>
        </view>
        <!-- 近期资讯 -->
        <view class="hot_box">
            <view class="flex-row hot_title">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="news_icon" />
                <text>news</text>
            </view>
            <view class="flex-row news_box">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="g_icon" />
                <view class="news_info">
                    <view class="line_ellipsis">苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏</view>
                    <view class="flex-row news_item">
                        <text>苏苏来了</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            navHeight: app.globalData.navHeight,

            //导航栏高度
            navTop: app.globalData.navTop,

            //导航栏距顶部距离
            navObj: app.globalData.navObj,

            //胶囊的高度
            navObjWid: app.globalData.navObjWid,

            //胶囊宽度+距右距离
            banner: ['/static/img/banner.png', '/static/img/banner.png', '/static/img/banner.png', '/static/img/banner.png', '/static/img/banner.png'],

            band_list: [
                {
                    items: [
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            name: '品牌专区',
                            icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        }
                    ]
                }
            ],

            swiperCurrent: ''
        };
    },
    onLoad() {},
    onShow() {},
    methods: {
        //轮播图切换
        swiperChange: function (e) {
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                this.setData({
                    swiperCurrent: e.detail.current
                });
            }
        },

        clickImg() {
            console.log('占位：函数 clickImg 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
