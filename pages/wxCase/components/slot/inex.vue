<template>
    <!-- pages/wxCase/components/slot/inex.wxml -->
    <!-- 在同一个节点上使用普通样式类和外部样式类时，两个类的优先级是未定义的，因此最好避免这种情况。 -->
    <view class="wrapper">
        <slot name="before"></slot>
        <view>苏苏苏，{{ propA }}-{{ propB }}</view>
        <view my-class="text">外部样式测试</view>
        <slot name="after"></slot>
        <!-- <slot></slot> -->
    </view>
</template>

<script>
// pages/wxCase/components/slot/inex.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    externalClasses: ['my-class'],
    options: {
        multipleSlots: true,
        // 在组件定义时的选项中启用多slot支持
        styleIsolation: 'isolated' //指定特殊的样式隔离选项
    },
    props: {
        propA: {
            type: String
        },
        propB: {
            type: String
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
};
</script>
<style>
@import './inex.css';
</style>
