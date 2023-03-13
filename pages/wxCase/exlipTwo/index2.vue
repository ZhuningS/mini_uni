<template>
    <!-- pages/wxCase/exlipTwo/index2.wxml -->
    <view class="con">
        <view class="tips">
            <view :class="(height > 200 ? 'ative' : '') + ' ' + (!ellipsis ? 'no_tive' : '')" id="text">
                <rich-text :nodes="rule"></rich-text>
            </view>
            <view class="img_box" @tap.stop.prevent="ellbtn" v-if="height > 200">
                <image class="img_icon" :src="ellipsis ? '../img/open.png' : '../img/close.png'"></image>
            </view>
            <view v-if="height > 200" class="drop_shadow"></view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/exlipTwo/index2.js
export default {
    data() {
        return {
            ellipsis: true,

            //默认收起
            rule: '<p>这是规苏苏苏苏苏苏苏苏苏苏苏则呢呵呵哈哈哈或哈哈哈红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p><p>这是规则呢红红火火恍恍惚惚</p>',

            height: ''
        };
    },
    onLoad: function (options) {
        //创建节点选择器
        var query = uni.createSelectorQuery();
        query.select('#text').boundingClientRect();
        query.exec((res) => {
            res[0].height;
            this.setData({
                height: res[0].height
            });
        });
    },
    methods: {
        /**
         * 收起/展开按钮点击事件
         */
        ellbtn: function () {
            this.setData({
                ellipsis: !this.ellipsis
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
