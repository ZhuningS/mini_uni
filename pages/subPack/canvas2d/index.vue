<template>
    <view>
        <!-- pages/subPack/canvas2d/index.wxml -->
        <view class="head_box flex-row">
            <block v-for="(item, index) in data_list" :key="item.data_list">
                <view class="h_item">
                    <canvas2d-ring
                        type="2d"
                        :id="'can' + index"
                        :canvasWidth="80"
                        f_weight="bold"
                        :lineColor="'green'"
                        :value="item.value"
                        valueColor="#333"
                        :f_size="15"
                        :lineWidth="3"
                        :title="'susu'"
                    ></canvas2d-ring>
                </view>
            </block>
        </view>
        <view class="new_ca">
            <canvas type="2d" id="myCanvas" :style="'width:' + canvasW + 'px;height: ' + canvasH + 'px;'"></canvas>
        </view>
    </view>
</template>

<script>
import canvas2dRing from '../components/canvas2d-ring/index';
// pages/canvas/index.js
export default {
    components: {
        canvas2dRing
    },
    data() {
        return {
            canvasW: 220,
            canvasH: 220,
            data_list: [
                {
                    value: 0
                },
                {
                    value: 10
                },
                {
                    value: 20
                },
                {
                    value: 30
                },
                {
                    value: 40
                },
                {
                    value: 50
                },
                {
                    value: 60
                },
                {
                    value: 70
                },
                {
                    value: 80
                },
                {
                    value: 90
                },
                {
                    value: 100
                },
                {
                    value: 101
                }
            ] //数据列表
        };
    },
    onShow: function () {
        this.drawNew();
        this.getRings();
    },
    methods: {
        getRings() {
            this.data_list.forEach((item, index) => {
                this.canvasRing = this.$mp.page.selectComponent('#can' + index).$vm;
                this.canvasRing.showCanvasRing();
            });
        },

        drawNew(step) {
            const query = uni.createSelectorQuery().in(this);
            query
                .select('#myCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec(this.init.bind(this));
        },

        init(res) {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            const dpr = uni.getSystemInfoSync().pixelRatio;
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            ctx.scale(dpr, dpr);
            var gradient = ctx.createLinearGradient(200, 100, 100, 200);
            gradient.addColorStop('0', '#a57b5f');
            gradient.addColorStop('0.5', '#cc9ad1');
            gradient.addColorStop('1.0', '#b84e88');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
