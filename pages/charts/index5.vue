<template>
    <!-- pages/charts/index5.wxml -->
    <view class="data_chart">
        <view class="flex-row j_b">
            <view class="chart_title">全年服务费趋势</view>
            <view class="chart_unit">单位:万元</view>
        </view>
        <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ec"></ec-canvas>
    </view>
</template>

<script>
import ecCanvas from '../../components/ec-canvas/ec-canvas';
// pages/basicData/index.js
import * as echarts from '../../components/ec-canvas/echarts';
export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec: {
                lazyLoad: true // 延迟加载
            }
        };
    },
    onLoad: function (options) {
        this.echartsComponnet = this.$mp.page.selectComponent('#mychart-dom-pie').$vm;
        this.getData(); //获取数据
    },
    methods: {
        /**
         * 获取图表数据
         */
        getData() {
            this.echartsComponnet.init((canvas, width, height, dpr) => {
                // 初始化图表
                const Chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr
                });
                Chart.setOption(this.getOption()); // 注意这里一定要返回 chart 实例，否则会影响事件处理等

                return Chart;
            });
        },

        /**
         * 图表init
         */
        getOption() {
            var option = {
                xAxis: {
                    type: 'category',
                    data: ['1月', '3月', '5月', '7月', '9月', '11月', '12月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [180, 223, 128, 180, 143, 500, 700],
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#48A3FF',
                                //改变折线点的颜色
                                lineStyle: {
                                    color: '#48A3FF' //改变折线颜色
                                }
                            }
                        },
                        center: ['50%']
                    }
                ],
                // 悬浮图标
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    position: function (pos, params, dom, rect, size) {
                        var obj = {
                            top: 60
                        };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    }
                }
            };
            return option;
        }
    }
};
</script>
<style>
@import './index5.css';
</style>
