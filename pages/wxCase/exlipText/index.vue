<template>
    <view>
        <!-- pages/wxCase/exlipText/index.wxml -->
        <view :class="'tips_box ' + (ellipsis ? 'ellipsis' : 'unellipsis')">
            <rich-text :nodes="text" id="text"></rich-text>
        </view>
        <view class="img_box" @tap="ellipsisFun">
            <image class="img_ellipsis" :src="ellipsis ? '../img/open.png' : '../img/close.png'"></image>
        </view>
    </view>
</template>

<script>
// pages/wxCase/exlipText/index.js
export default {
    data() {
        return {
            ellipsis: true,

            // 文字是否收起，默认收起
            text: '<p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/><p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/><p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/><p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/><p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/><p>这是规则哈哈哈哈哈哈红红火火恍恍惚惚或或</p><br/>',

            colNum: ''
        };
    },
    onLoad() {
        //创建节点选择器
        var query = uni.createSelectorQuery();
        query.select('#text').boundingClientRect();
        query.exec((res) => {
            res[0].height;
            console.log('height==', res[0].height);
            var height = res[0].height; //50为css里设置的view的line-height

            this.colNum = height / 50;
            console.log('行数==', this.colNum);
            this.setData({
                colNum: this.colNum
            });
        });
    },
    methods: {
        /**
         * 收起/展开按钮点击事件
         */
        ellipsisFun: function () {
            var value = !this.ellipsis;
            this.setData({
                ellipsis: value
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
