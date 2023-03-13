<template>
    <!-- pages/cssCase/nTabbar/index.wxml -->
    <view class="tabbar-box">
        <block v-for="(item, index) in menu" :key="item.list">
            <view :class="'menu-item ' + (currIndex == index && 'active')" @tap.stop.prevent="tabClick" :data-index="index">
                <view :class="'iconfont ' + item.icon"></view>
                <text>{{ item.name }}</text>
            </view>
        </block>
        <view class="active-tabbar-box" :style="'--n:' + currIndex"></view>
    </view>
</template>

<script>
// pages/cssCase/nTabbar/index.js
export default {
    data() {
        return {
            currIndex: 0,
            menu: [
                {
                    name: '三明治',
                    icon: 'icon-susua-2-53'
                },
                {
                    name: '汉堡',
                    icon: 'icon-susuhanbao'
                },
                {
                    name: '冰沙',
                    icon: 'icon-susubingsha'
                },
                {
                    name: '可乐',
                    icon: 'icon-susukele'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    methods: {
        tabClick(e) {
            let { index } = e.currentTarget.dataset;
            this.setData({
                currIndex: index
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
