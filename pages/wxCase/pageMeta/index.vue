<template>
    <view>
        <!-- pages/wxCase/pageMeta/index.wxml -->
        <page-meta
            :background-text-style="bgTextStyle"
            :background-color="bgColor"
            :background-color-top="bgColorTop"
            :background-color-bottom="bgColorBottom"
            :scroll-top="scrollTop"
            page-style="color: green"
            root-font-size="16px"
        >
            <navigation-bar :title="nbTitle" :loading="nbLoading" :front-color="nbFrontColor" :background-color="nbBackgroundColor" />
        </page-meta>
    </view>
</template>

<script>
export default {
    data() {
        return {
            bgTextStyle: 'dark',
            scrollTop: '200rpx',
            bgColor: '#ff0000',
            bgColorTop: '#00ff00',
            bgColorBottom: '#0000ff',
            nbTitle: '苏苏小苏苏',
            nbLoading: false,
            nbFrontColor: '#000000',
            nbBackgroundColor: '#ccc'
        };
    },
    onLoad() {
        this.setData({
            nbTitle: '新标题',
            nbLoading: true,
            nbFrontColor: '#ffffff',
            nbBackgroundColor: '#000000'
        });
        setTimeout(() => {
            this.setData({
                nbLoading: false
            });
        }, 3000);
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
