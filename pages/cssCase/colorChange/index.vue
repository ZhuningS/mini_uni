<template>
    <view>
        <!-- pages/cssCase/colorChange/index.wxml -->
        <view class="card" @tap="choice_color" :data-color="item" v-for="(item, index) in color_card" :key="index">
            <view class="card_top">
                <view class="cardtop_item" :style="'background-color:' + item" v-for="(item, index1) in item.colors" :key="index1"></view>
            </view>

            <view class="card_bottom">
                <view class="cardbottom_name">{{ item.name }}</view>
                <view class="cardbottom_img">
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"></image>
                </view>
            </view>
        </view>
        <view class="tips">该项为学习案例（主要是颜色色值）</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            color_card: [
                {
                    name: '颜色盘1',
                    colors: [
                        '#1abc9c',
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#34495e',
                        '#16a085',
                        '#27ae60',
                        '#2980b9',
                        '#8e44ad',
                        '#2c3e50',
                        '#f1c40f',
                        '#e67e22',
                        '#e74c3c',
                        '#ecf0f1',
                        '#95a5a6',
                        '#f39c12',
                        '#d35400',
                        '#c0392b',
                        '#bdc3c7',
                        '#7f8c8d'
                    ]
                },
                {
                    name: '颜色盘2',
                    colors: [
                        '#55efc4',
                        '#81ecec',
                        '#74b9ff',
                        '#a29bfe',
                        '#dfe6e9',
                        '#00b894',
                        '#00cec9',
                        '#0984e3',
                        '#6c5ce7',
                        '#b2bec3',
                        '#ffeaa7',
                        '#fab1a0',
                        '#e74c3c',
                        '#ff7675',
                        '#636e72',
                        '#fdcb6e',
                        '#e17055',
                        '#d63031',
                        '#e84393',
                        '#2d3436'
                    ]
                }
            ]
        };
    },
    methods: {
        choice_color: function (e) {
            uni.navigateTo({
                url: './colorItem?color=' + JSON.stringify(e.currentTarget.dataset.color)
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
