<template>
    <view>
        <!-- pages/jsCase/historySearch/index.wxml -->
        <view class="head flex-row">
            <view class="head_input">
                <image src="/static/img/search_icon.png" class="search_icon"></image>
                <input type="text" placeholder="搜索" placeholder-class="place_holder" @confirm="getData" :value="search" />
            </view>
            <view class="sha_icon" @tap.stop.prevent="clear_input">取消</view>
        </view>
        <view class="con">
            <view class="title">热门搜索</view>
            <view class="flex-row list">
                <block v-for="(item, index) in hot_list" :key="index">
                    <view class="c_item color" :data-index="index" @tap.stop.prevent="getSearch">{{ item }}</view>
                </block>
            </view>

            <view v-if="list.length > 0">
                <view class="flex-row j_b">
                    <view class="title">搜索历史</view>
                    <view @tap.stop.prevent="clearHistory" class="clear">清空历史</view>
                </view>

                <view class="flex-row list">
                    <block v-for="(item, index) in list" :key="index">
                        <view class="c_item" :data-index="index" @tap.stop.prevent="getSearchOne">{{ item }}</view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/jsCase/historySearch/index.js
export default {
    data() {
        return {
            hot_list: ['杜甫', '李白', '李清照', '姜子牙', '万事如意，心想事成'],
            list: [],
            search: ''
        };
    },
    onShow: function () {
        if (uni.getStorageSync('search_history')) {
            this.setData({
                list: JSON.parse(uni.getStorageSync('search_history')).slice(0, 15)
            });
        }
    },
    methods: {
        getData(e) {
            let data = e.detail.value.replace(/(^\s*)|(\s*$)/g, ''); //去掉前后的空格

            if (data.trim() != '') {
                this.list.forEach((key, index) => {
                    if (key == data) {
                        this.list.splice(index, 1);
                    }
                });
                this.list.unshift(data);
                this.setData({
                    list: this.list.slice(0, 15)
                });
                uni.setStorageSync('search_history', JSON.stringify(this.list));
            }
        },

        clear_input() {
            this.setData({
                search: ''
            });
        },

        getSearch(e) {
            let { index } = e.currentTarget.dataset;
            let { hot_list } = this;
            let va = hot_list[index];
            this.setData({
                search: va
            }); // 将标签存到历史搜索中

            this.list.forEach((item, index) => {
                if (item == va) {
                    this.list.splice(index, 1);
                }
            });
            this.list.unshift(va);
            this.setData({
                list: this.list.slice(0, 15)
            });
            uni.setStorageSync('search_history', JSON.stringify(this.list));
        },

        //清空历史
        clearHistory() {
            this.setData({
                list: []
            });
            uni.removeStorageSync('search_history');
        },

        getSearchOne(e) {
            let { index } = e.currentTarget.dataset;
            let { list } = this;
            let va = list[index];
            this.setData({
                search: va
            });
            this.list.forEach((item, index) => {
                if (item == va) {
                    this.list.splice(index, 1);
                }
            });
            this.list.unshift(va);
            this.setData({
                list: this.list.slice(0, 15)
            });
            console.log(this.list);
            uni.setStorageSync('search_history', JSON.stringify(this.list));
        }
    }
};
</script>
<style>
@import './index.css';
</style>
