<template>
    <view>
        <view class="top">
            <swiper
                class="swiper-box"
                :current="swiperCurrent"
                :indicator-dots="true"
                indicator-active-color="#e0bbc3"
                indicator-color="#999999"
                @change="swiperChange"
                :circular="true"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
            >
                <block v-for="(item, index) in banner_list" :key="item.b_list">
                    <swiper-item>
                        <image :src="item" :data-src="item" class="banner_img"></image>
                    </swiper-item>
                </block>
            </swiper>
        </view>
        <view class="search_btn">
            <input placeholder="请输入...." placeholder-class="p_class" class="i_box" />
            <image src="/static/img/index/search_b.png" class="s_icon"></image>
        </view>

        <view class="top_ban">
            <image src="https://i.postimg.cc/Gm7KjGmN/111.jpg"></image>
        </view>

        <!-- 新增滚动条 -->
        <view class="scroll flex-row">
            <image src="/static/img/star-o.png" class="new_cion"></image>
            <swiper class="new_swiper" :vertical="true" :autoplay="true" :circular="true" interval="2000" display-multiple-items="1">
                <block v-for="(item, idx) in 5" :key="idx">
                    <swiper-item>
                        <view class="content-item">
                            <text>购物享折扣购物购物享折扣，购物享折扣购物享折扣购物享折扣享折扣</text>
                        </view>
                    </swiper-item>
                </block>
            </swiper>
            <image src="/static/img/add_left.png" class="left-arr"></image>
        </view>

        <view class="tab_list">
            <scroll-view scroll-x class="tb_l">
                <block v-for="(item, index) in navList" :key="item.nav_list">
                    <view @tap.stop.prevent="tabNav" :data-index="index" class="tabNav">
                        <view :class="'tabbar_li ' + (type == index ? 'on' : '')">{{ item }}</view>
                    </view>
                </block>
            </scroll-view>
        </view>

        <view class="good_list flex-row">
            <block v-for="(item, index) in 3" :key="item.good_list">
                <view class="g_item">
                    <view class="g_img">
                        <image src="https://i.postimg.cc/Bn1XpkSn/susu.jpg"></image>
                    </view>
                    <view class="goods_name">巴啦啦嫩你说的怀旧服草莓味的味450g巴啦啦嫩你说的怀旧服草莓味的味450g</view>
                    <view class="flex j_b price_a_c">
                        <view>
                            <text class="cn_icon">￥</text>
                            <text class="digi_price">30.</text>
                            <text class="cn_icon">00</text>
                        </view>
                        <view class="pre_price">￥69.00</view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/index2/index.js
export default {
    data() {
        return {
            autoplay: true,
            //是否自动切换
            interval: 3000,
            //自动切换时间间隔,3s
            duration: 1000,
            //  滑动动画时长1s
            swiperCurrent: '',
            banner_list: ['https://i.postimg.cc/Gm7KjGmN/111.jpg', 'https://i.postimg.cc/Bn1XpkSn/susu.jpg', 'https://i.postimg.cc/Bv28vfkg/222.webp'],
            navList: ['全部', '系列1', '系列2', '系列1', '系列2', '系列1', '系列2'],
            type: 0
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    onReachBottom: function () {},
    methods: {
        tabNav(e) {
            let { index } = e.currentTarget.dataset;

            if (this.type === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    type: index
                });
            }
        },

        //轮播图切换
        swiperChange: function (e) {
            this.setData({
                swiperCurrent: e.detail.current
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
