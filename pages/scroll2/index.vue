<template>
    <!-- pages/scroll2/index.wxml -->
    <view class="spread-cateBox">
        <!-- <view> -->
        <scroll-view scroll-y scroll-with-animation :scroll-left="scrollLength" class="spread-cateLeft" :style="'height: ' + winHeight + 'px'">
            <block v-for="(item, index) in tabs" :key="index">
                <view @tap="jumpIndex" :data-menuindex="index" :data-anchor="item.anchor">
                    <view :class="'spread-cateLItem ' + (currentIndex == index ? ' bg-fff' : '')">
                        <text :class="currentIndex == index ? 'c-theme' : ''">{{ item.title }}</text>
                    </view>
                </view>
            </block>
        </scroll-view>
        <!-- </view> -->
        <!-- <view style='height: {{winHeight}}px'> -->
        <scroll-view scroll-y scroll-with-animation :scroll-left="scrollLength" @scroll="scrollToLeft" :scroll-into-view="toTitle" :style="'height: ' + winHeight + 'px'">
            <block v-for="(item, index) in tabs" :key="item.tabs">
                <view :id="'view-' + item.anchor">
                    <view class="title" :id="'title-' + item.anchor">{{ item.title }}</view>
                    <block v-for="(item, index1) in tabsList[item.anchor]" :key="index1">
                        <view class="flex-start good-item">
                            <image class="good-img" :src="imgUrls + 'default.png'"></image>
                            <view class="flex-between good-name">
                                <view>这是商品名称</view>
                                <view>月售122</view>
                                <view>￥19.9</view>
                            </view>
                        </view>
                    </block>
                </view>
            </block>
        </scroll-view>
        <!-- </view> -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            imgUrls: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',

            tabs: [
                {
                    title: '特惠',
                    anchor: 'a'
                },
                {
                    title: '必点',
                    anchor: 'b'
                },
                {
                    title: '营养汤',
                    anchor: 'c'
                },
                {
                    title: '主食',
                    anchor: 'd'
                },
                {
                    title: '套餐',
                    anchor: 'e'
                },
                {
                    title: '饮料',
                    anchor: 'f'
                }
            ],

            tabsList: {
                a: [
                    {
                        price: 10.1,
                        anchor: 'a',
                        index: 0,
                        num: 0
                    },
                    {
                        price: 10.2,
                        anchor: 'a',
                        index: 1,
                        num: 0
                    },
                    {
                        price: 10.3,
                        anchor: 'a',
                        index: 2,
                        num: 0
                    }
                ],
                b: [
                    {
                        price: 10.4,
                        anchor: 'b',
                        index: 0,
                        num: 0
                    },
                    {
                        price: 10.5,
                        anchor: 'b',
                        index: 1,
                        num: 0
                    },
                    {
                        price: 10.6,
                        anchor: 'b',
                        index: 2,
                        num: 0
                    }
                ],
                c: [
                    {
                        price: 10.7,
                        anchor: 'c',
                        index: 0,
                        num: 0
                    },
                    {
                        price: 10.8,
                        anchor: 'c',
                        index: 1,
                        num: 0
                    },
                    {
                        price: 10.9,
                        anchor: 'c',
                        index: 2,
                        num: 0
                    }
                ],
                d: [
                    {
                        price: 11,
                        anchor: 'd',
                        index: 0,
                        num: 0
                    },
                    {
                        price: 11.1,
                        anchor: 'd',
                        index: 1,
                        num: 0
                    },
                    {
                        price: 11.2,
                        anchor: 'd',
                        index: 2,
                        num: 0
                    }
                ],
                e: [
                    {
                        price: 11.3,
                        anchor: 'e',
                        index: 0,
                        num: 0
                    } // {
                    //   price: 11.4,
                    //   anchor: "e",
                    //   index: 1,
                    //   num: 0
                    // },
                    // {
                    //   price: 11.5,
                    //   anchor: "e",
                    //   index: 2,
                    //   num: 0
                    // },
                ],
                f: [
                    {
                        price: 11.6,
                        anchor: 'f',
                        index: 0,
                        num: 0
                    },
                    {
                        price: 11.7,
                        anchor: 'f',
                        index: 1,
                        num: 0
                    },
                    {
                        price: 11.8,
                        anchor: 'f',
                        index: 2,
                        num: 0
                    } // {
                    //   price: 11.8,
                    //   anchor: "f",
                    //   index: 2,
                    //   num: 0
                    // },
                    // {
                    //   price: 11.8,
                    //   anchor: "f",
                    //   index: 2,
                    //   num: 0
                    // },
                    // {
                    //   price: 11.8,
                    //   anchor: "f",
                    //   index: 2,
                    //   num: 0
                    // },
                    // {
                    //   price: 11.8,
                    //   anchor: "f",
                    //   index: 2,
                    //   num: 0
                    // },
                ]
            },

            currentIndex: 0,

            // 当前选中的下标
            toTitle: 'title-c',

            scrollTop: 0,
            top: [],
            winHeight: '',
            scrollLength: 0
        };
    },
    onLoad: function (options) {
        var that = this;
        uni.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight
                });
                var top2 = new Array();

                for (var i = 0; i < that.tabs.length; i++) {
                    uni.createSelectorQuery()
                        .select('#view-' + that.tabs[i].anchor)
                        .boundingClientRect(function (rect) {
                            var isTop = Number(rect.top);
                            top2.push(isTop);
                        })
                        .exec();
                }

                console.log(top2);
                that.setData({
                    top: top2
                });
                console.log(that.top);
            }
        });
    },
    methods: {
        // 左侧点击事件
        jumpIndex(e) {
            let index = e.currentTarget.dataset.menuindex;
            let anchor = e.currentTarget.dataset.anchor;
            this.setData({
                currentIndex: index,
                toTitle: 'title-' + anchor
            });
        },

        scrollToLeft(e) {
            this.setData({
                scrollTop: e.detail.scrollTop
            });
            var length = this.top.length;

            for (var i = 0; i < this.top.length; i++) {
                // this.data.top[i] - this.data.top[0] <= this.data.scrollTop && (i < length - 1 && this.data.top[i + 1] - this.data.top[0] > this.data.scrollTop)
                if (this.top[i] - this.top[0] <= this.scrollTop && i < length - 1 && this.top[i + 1] - this.top[0] > this.scrollTop) {
                    if (this.currentIndex != i) {
                        this.setData({
                            currentIndex: i
                        });
                    }
                }
            }

            if (this.scrollTop >= this.top[length - 1]) {
                console.log(111);
                this.setData({
                    currentIndex: length - 1
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
