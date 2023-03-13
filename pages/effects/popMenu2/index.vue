<template>
    <view>
        <!-- pages/effects/popMenu2/index.wxml -->
        <view :class="'mask1 ' + maskAnimation" @touchmove.stop.prevent="preventdefault"></view>
        <view class="menu-container" @touchmove.stop.prevent="preventdefault" v-if="!isShow">
            <view class="menu">
                <view class="menu-list">
                    <navigator
                        :url="item.url"
                        class="menu-item"
                        :style="'width:' + (menuList.length >= 4 ? '25' : 100 / menuList.length) + '%;animation-delay: ' + (index + 1) * 0.1 + 's'"
                        v-for="(item, index) in menuList"
                        :key="item.menuList"
                    >
                        <image mode="aspectFill" :src="item.src" class="menu-icon"></image>

                        <text class="menu-name">{{ item.name }}</text>
                    </navigator>
                </view>
            </view>
        </view>
        <view class="btn">
            <view @tap.stop.prevent="click" :class="'btn-main ' + btnAnimation">+</view>
        </view>
    </view>
</template>

<script>
import vanUploader from '@vant/weapp/uploader/index';
// pages/effects/popMenu2/index.js
export default {
    components: {
        vanUploader
    },
    data() {
        return {
            isShow: true,

            menuList: [
                {
                    name: '菜单一',
                    src: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                    url: ''
                },
                {
                    name: '菜单二',
                    src: 'https://i.postimg.cc/Gm7KjGmN/111.jpg',
                    url: ''
                },
                {
                    name: '菜单三',
                    src: 'https://i.postimg.cc/Bv28vfkg/222.webp',
                    url: ''
                },
                {
                    name: '菜单四',
                    src: 'https://i.postimg.cc/65STLQNc/333.webp',
                    url: ''
                }
            ],

            maskAnimation: '',
            btnAnimation: ''
        };
    },
    methods: {
        click() {
            this.setData({
                isShow: !this.isShow
            });

            if (this.isShow) {
                this.setData({
                    maskAnimation: 'maskClose',
                    btnAnimation: 'menuClose'
                });
            } else {
                this.setData({
                    maskAnimation: 'maskOpen',
                    btnAnimation: 'menuOpen'
                });
            }
        },

        preventdefault() {
            return false;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
