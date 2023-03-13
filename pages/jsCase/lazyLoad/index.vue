<template>
    <view class="girls-list-wrap">
        <view class="girls-list clearfix" id="J_GirlsList">
            <view :class="'item item-' + index" v-for="(item, index) in group" :key="index">
                <view class="a">
                    <view class="item-wrap">
                        <view class="img">
                            <image :src="item.show ? item.src : item.def" :class="item.show ? 'active' : ''"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/jsCase/lazyLoad/index.js
const app = getApp();
export default {
    data() {
        return {
            height: '',
            // 获取当前页面的可视高度
            group: [
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                },
                {
                    src: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png',
                    show: false,
                    def: 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif'
                }
            ]
        };
    },
    onLoad: function () {
        // wx.getSystemInfo({  // 获取页面可视区域的高度
        //   success: (res) =>{
        //     this.setData({
        //       height: res.screenHeight
        //     })
        //   },
        // })
        // this.showImg()
        let group = this.group; // 获取原数据

        for (let i in this.group) {
            uni.createIntersectionObserver()
                .relativeToViewport({
                    bottom: 20
                })
                .observe('.item-' + i, (ret) => {
                    if (ret.intersectionRatio > 0) {
                        group[i].show = true;
                    }

                    this.setData({
                        // 更新数据
                        group
                    });
                });
        }
    },
    onPageScroll() {
        // 调用showImg函数
        // app.Util.debounce(this.showImg())
    },
    methods: {
        showImg() {
            // 判断高度是否需要加载
            uni.createSelectorQuery()
                .selectAll('.item')
                .boundingClientRect((ret) => {
                    const group = this.group;
                    const height = this.height;
                    ret.forEach((item, index) => {
                        if (item.top < height) {
                            group[index].show = true;
                        }
                    });
                    this.setData({
                        group
                    });
                })
                .exec();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
