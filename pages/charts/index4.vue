<template>
    <!-- pages/charts/index4.wxml -->
    <view class="container">
        <ec-canvas class="ec-canvas1" id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ec1" @init="echartInit($event, { tagId: 'mychart-dom-pie' })"></ec-canvas>
    </view>
</template>

<script>
import ecCanvas from '../../components/ec-canvas/ec-canvas';
import * as echarts from '../../components/ec-canvas/echarts';

function initChart1(canvas, width, height) {
    var value = 80; //这里控制着圆环图的进度

    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    var option = {
        series: [
            {
                type: 'pie',
                //指定类型为饼状图
                clockWise: true,
                radius: ['70%', '75%'],
                //指定半径，注意不建议直接指定px，不利于自适应。
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [
                    {
                        value: value,
                        name: 'completed',
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: {
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#F13577' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#6076E1' // 100% 处的颜色
                                        }
                                    ]
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        }
                    },
                    {
                        name: 'gap',
                        value: 100 - value,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0
                            }
                        }
                    }
                ]
            }
        ]
    };
    chart.setOption(option);
    chart.resize();
    return chart;
}

export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec1: {
                onInit: initChart1
            }
        };
    },
    onReady() {},
    methods: {
        echartInit(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 echartInit 未声明');
        }
    }
};
</script>
<style>
@import './index4.css';
</style>
