<template>
    <view>
        <!-- pages/apiDemo/moveCert/index2.wxml -->
        <view style="display: none">
            拼图验证 用canvas与微信官方组件movable-area、movable-view实现，加载图片，裁剪特殊形状图片后加载到image上，用movable-view的移动来控制image移动
        </view>
        <veri id="puzzleVerify" @puzzleVerify="countDown($event, { tagId: 'puzzleVerify' })" :sildeBlockCont="sildeBlockCont"></veri>
    </view>
</template>

<script>
import veri from '../components/veri/index';
// pages/apiDemo/moveCert/index2.js
export default {
    components: {
        veri
    },
    data() {
        return {
            sildeBlockCont: '' //滑块背景图
        };
    },
    onReady: function () {
        this.puzzleVerify = this.$mp.page.selectComponent('#puzzleVerify').$vm;
    },
    methods: {
        getCode() {
            this.puzzleVerify.visidlisd();
        },

        // 滑块验证成功操作
        countDown(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
