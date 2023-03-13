<template>
    <!-- pages/another/Like/index.wxml -->
    <view class="content">
        <view class="but">
            <view class="input">
                <input type="text" placeholder-class="placeholder-class" placeholder="说点什么吧…" v-model="barrage" />
            </view>
            <button @tap="tapSend">发送</button>
        </view>

        <!-- 弹幕 -->
        <view class="barrage">
            <scroll-view scroll-y class="scroll-y" id="message-item" :scroll-top="scrollTop">
                <view class="item" v-for="(item, index) in barrageData" :key="index">
                    <view :class="'user ' + (item.active ? 'active' : '')">{{ item.name }}</view>

                    {{ item.val }}
                </view>
            </scroll-view>
        </view>
        <!-- 点赞 -->
        <view class="like">
            <likeFx :count="num" />
            <button @tap="tapLike">点赞</button>
        </view>
    </view>
</template>

<script>
import likeFx from '../components/like/like';
// pages/another/Like/index.js
export default {
    components: {
        likeFx
    },
    data() {
        return {
            //点赞数目
            num: 0,
            // 弹幕
            barrage: '',
            // 弹幕top值
            scrollTop: 0,
            // 弹幕内容
            barrageData: [
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World Hello World Hello World Hello World Hello World Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: '管理管理员',
                    val: '欢迎大家',
                    active: true
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                },
                {
                    name: 'Sam',
                    val: 'Hello World',
                    active: false
                }
            ]
        };
    },
    onLoad(e) {},
    onShow: function () {},
    methods: {
        tapLike() {
            this.setData({
                num: this.num + 1
            });
        },

        tapSend() {
            let that = this;
            that.barrageData.push({
                name: 'Sam',
                val: that.barrage,
                active: false
            });
            that.setData({
                barrageData: that.barrageData
            });
            uni.createSelectorQuery()
                .select('#message-item')
                .boundingClientRect(function (rect) {
                    that.setData({
                        scrollTop: rect.top * 3
                    }); // 拉到最底部
                })
                .exec();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
