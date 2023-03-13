<template>
    <view>
        <!-- pages/cssCase/snow/index.wxml -->
        <view v-for="(item, index) in left" :key="index">
            <text :style="'left:' + left[index] + 'rpx'" :animation="animation[index]" class="snow" @tap="hide" :data-index="index">*</text>
        </view>
    </view>
</template>

<script>
var i = 0;
export default {
    data() {
        return {
            left: [],
            animation: [],
            tm: 0
        };
    },
    onShow: function () {
        this.donghua();
        let j = 14;

        while (j--) this.left.push(Math.floor(Math.random() * 750 + 1));

        this.setData({
            tm: 1,
            left: this.left
        });
    },
    methods: {
        donghua: function () {
            setTimeout(
                function () {
                    let animation = uni.createAnimation({});
                    animation.translateY(604).opacity(0).step({
                        duration: 4000
                    });
                    animation.translateY(0).opacity(1).step({
                        duration: 0
                    });
                    this['animation[' + i + ']'] = animation.export();
                    this['left[' + i + ']'] = Math.floor(Math.random() * 750 + 1);
                    i++;

                    if (i == 14) {
                        i = 0;
                    }
                }.bind(this),
                500
            );
            setTimeout(
                function () {
                    this.donghua();
                }.bind(this),
                500
            );
        },

        hide(e) {
            let index = e.currentTarget.dataset['index'];
            console.log(index);
            let animation = uni.createAnimation({});
            animation.translateY(0).opacity(0).step({
                duration: 0
            });
            this['animation[' + index + ']'] = animation.export();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
