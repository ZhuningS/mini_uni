<template>
    <view>
        <!-- pages/subPack/transitionBox/index.wxml -->
        <view
            class="common"
            :style="
                'opacity:' +
                (index >= (page - 1) * 2 ? op : '1') +
                ';margin-left:' +
                (index >= (page - 1) * 2 ? mr : '0') +
                'rpx;transition:all ' +
                (index >= (page - 1) * 2 ? (index - (page - 1) * 2) * 0.5 + 0.5 : '0') +
                's;'
            "
            v-for="(item, index) in lists"
            :key="index"
        >
            第{{ index }}条
        </view>

        <!-- <view bindtap='loadData' style='position:relative;right:-150px;top:50rpx;'>下一条</view> -->

        <view class="ts" style="opacity: 1; transition: all 5s; margin-left: 0">嘻嘻哈哈哈哈哈哈哈哈</view>
    </view>
</template>

<script>
// pages/subPack/transitionBox/index.js
export default {
    data() {
        return {
            list: ['1'],
            lists: ['1'],
            page: 1,
            op: 0,
            mr: 0
        };
    },
    onLoad: function (options) {},
    onReady: function (e) {
        this.setData({
            op: 1,
            mr: 0
        });
    },
    onShow: function () {},
    onReachBottom: function () {
        // if (this.data.load_show) {
        //   this.setData({
        //     page: this.data.page + 1
        //   })
        //   this.loadData();
        // }
    },
    methods: {
        loadData: function (e) {
            this.page++; //模拟从后台获取到了下一页的数据，附加到原有数组上

            var lists = this.lists.concat(this.list);
            this.setData({
                lists: lists,
                page: this.page,
                op: 0,
                mr: -50
            });
            this.onReady();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
