<template>
    <view>
        <!-- pages/wxCase/pubuliu/index.wxml -->
        <view class="content">
            <view class="left">
                <block v-for="(item, index) in list" :key="index">
                    <!-- parse <template is="item" :data="...item" v-if="index%2==0"></template> -->
                    <block name="item">
                        <view class="item">
                            <image class="item-img" :src="url" mode="widthFix"></image>
                            <view class="item-title-box">
                                <navigator url="url" class="item-title">{{ title }}</navigator>
                            </view>
                            <view class="name">
                                <image class="item-ava" :src="avatar"></image>
                                <text class="name-title">{{ name }}</text>
                                <view class="heart">
                                    <text>{{ num }}</text>
                                </view>
                            </view>
                        </view>
                    </block>
                </block>
            </view>
            <view class="right">
                <block v-for="(item, index) in list" :key="index">
                    <!-- parse <template is="item" :data="...item" v-if="index%2==1"></template> -->
                    <block name="item">
                        <view class="item">
                            <image class="item-img" :src="url" mode="widthFix"></image>
                            <view class="item-title-box">
                                <navigator url="url" class="item-title">{{ title }}</navigator>
                            </view>
                            <view class="name">
                                <image class="item-ava" :src="avatar"></image>
                                <text class="name-title">{{ name }}</text>
                                <view class="heart">
                                    <text>{{ num }}</text>
                                </view>
                            </view>
                        </view>
                    </block>
                </block>
            </view>
        </view>
        <block name="item">
            <view class="item">
                <image class="item-img" :src="url" mode="widthFix"></image>
                <view class="item-title-box">
                    <navigator url="url" class="item-title">{{ title }}</navigator>
                </view>
                <view class="name">
                    <image class="item-ava" :src="avatar"></image>
                    <text class="name-title">{{ name }}</text>
                    <view class="heart">
                        <text>{{ num }}</text>
                    </view>
                </view>
            </view>
        </block>

        <!-- 该种方法有弊端，假设偶数行数据都是短图，就会形成 左侧很长，右侧很短 -->
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            list: [
                {
                    name: '苏苏',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img1.baidu.com/it/u=610726533,1686239110&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
                    avatar: 'https://img1.baidu.com/it/u=610726533,1686239110&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750'
                },
                {
                    name: '苏苏6',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img0.baidu.com/it/u=1555018837,2431012166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    avatar: 'https://img0.baidu.com/it/u=1555018837,2431012166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                },
                {
                    name: '苏苏2',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img2.baidu.com/it/u=2656232546,4221523240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=777',
                    avatar: 'https://img2.baidu.com/it/u=2656232546,4221523240&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=777'
                },
                {
                    name: '苏苏3',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img1.baidu.com/it/u=2602506082,2229028687&fm=253&fmt=auto&app=138&f=JPEG?w=796&h=500',
                    avatar: 'https://img1.baidu.com/it/u=2602506082,2229028687&fm=253&fmt=auto&app=138&f=JPEG?w=796&h=500'
                },
                {
                    name: '苏苏4',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img1.baidu.com/it/u=3462460603,3220043498&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=458',
                    avatar: 'https://img1.baidu.com/it/u=3462460603,3220043498&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=458'
                },
                {
                    name: '苏苏5',
                    num: '1',
                    title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
                    url: 'https://img0.baidu.com/it/u=3184989322,3773788620&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
                    avatar: 'https://img0.baidu.com/it/u=3184989322,3773788620&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667'
                }
            ],

            url: '',
            title: '',
            avatar: '',
            name: '',
            num: 0
        };
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
