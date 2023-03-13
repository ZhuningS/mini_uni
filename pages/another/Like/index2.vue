<template>
    <view>
        <!-- pages/another/Like/index2.wxml -->
        <view class="doommview">
            <block v-for="(item, index) in doommData" :key="item.id">
                <text v-if="item.display" class="aon" :style="'animation:first ' + item.time + 's linear forwards;top: ' + item.top + 'px; color:' + item.color + ';'">
                    {{ item.text }}
                </text>
            </block>
        </view>

        <view class="button">
            <button @tap="bindbt">弹一个小苹果</button>
        </view>
    </view>
</template>

<script>
//index.js
var page = undefined;
export default {
    data() {
        return {
            doommData: []
        };
    },
    onLoad: function () {
        page = this;
    },
    methods: {
        bindbt: function () {
            doommList.push(new Doomm('你是我的小苹果', Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
            this.setData({
                doommData: doommList
            });
        }
    }
};
var doommList = [];
var i = 0; //用做唯一的wx:key

class Doomm {
    constructor(text, top, time, color) {
        this.text = text + i;
        this.top = top;
        this.time = time;
        this.color = color;
        this.display = true;
        let that = this;
        this.id = i++;
        setTimeout(function () {
            doommList.splice(doommList.indexOf(that), 1); //动画完成，从列表中移除这项

            page.setData({
                doommData: doommList
            });
        }, this.time * 1000); //定时器动画完成后执行。
    }
}

function getRandomColor() {
    let rgb = [];

    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);

        if (color.length == 1) {
            color = '0' + color;
        } else {
            color = color;
        }

        rgb.push(color);
    }

    return '#' + rgb.join('');
}
</script>
<style>
@import './index2.css';
</style>
