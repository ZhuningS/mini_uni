<template>
    <view>
        <!-- pages/wxCase/swiper_goods/index.wxml -->
        <view class="act">
            <view class="t_box">
                <view class="title">精选商品</view>
            </view>
            <view class="point_con">
                <swiper class="swiper-box" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
                    <swiper-item v-for="(item, index) in goods_list" :key="index">
                        <view class="point_flex" v-for="(its, index1) in item.goods" :key="its.key">
                            <image class="point_img" :src="its.img"></image>

                            <view class="point_text">30积分</view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>

        <view class="act">
            <view class="t_box">
                <view class="title">精选商品</view>
            </view>
            <view :class="'point_con ' + (d_num == 1 ? 'wd1' : d_num == 2 ? 'wd2' : '')">
                <swiper class="swiper-box" :indicator-dots="false" :autoplay="true" :interval="1500" :duration="1000" :circular="true" :display-multiple-items="d_num">
                    <swiper-item v-for="(item, index) in g_list" :key="index">
                        <view class="point_flex_w">
                            <image class="point_img" :src="item.img"></image>
                            <view class="point_text">{{ 40 }}积分</view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/swiper_goods/index.js
export default {
    data() {
        return {
            goods_list: [
                {
                    goods: [
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        }
                    ]
                },
                {
                    goods: [
                        {
                            img: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                        }
                    ]
                },
                {
                    goods: [
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        },
                        {
                            img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                        }
                    ]
                }
            ],

            g_list: [
                {
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    img: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                },
                {
                    img: 'https://i.postimg.cc/XJmpTvCD/susu2.jpg'
                },
                {
                    img: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    img: 'https://i.postimg.cc/WzKK73vQ/20210729155755.jpg'
                },
                {
                    img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg'
                },
                {
                    img: 'https://i.postimg.cc/65STLQNc/333.webp'
                }
            ],

            d_num: 3,

            its: {
                key: '',
                img: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let len = this.g_list.length;
        this.setData({
            d_num: len > 2 ? 3 : len
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
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
