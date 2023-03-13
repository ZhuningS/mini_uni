<template>
    <view>
        <!-- pages/charts/index2.wxml -->
        <view class="mt"></view>
        <view class="con">
            <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ec"></ec-canvas>
            <!-- 苹果手机不会发生穿透 但是安卓会出现穿透现象  解决方法 1、把顶部的固定tab栏放到下面 cover-view的优先级根据页面顺序来 也在上面的层级就越低 2、不用cover-view 直接些样式进行定位 -->
            <cover-view class="covew">
                <cover-view class="text1">苏苏</cover-view>
                <cover-view class="text2">100%</cover-view>
            </cover-view>
        </view>

        <cover-view class="head flex j_b">
            <block v-for="(item, index) in navList" :key="item.navList">
                <!-- cover-vierw 真机伪类不生效 -->

                <cover-view class="c_tab" :data-index="index" @tap.stop.prevent="tabNav">
                    <cover-view :class="'tabbar_li ' + (type == index ? 'on' : '')">{{ item }}</cover-view>
                    <cover-view class="line" v-if="type == index"></cover-view>
                </cover-view>
            </block>
        </cover-view>

        <view class="con1">
            <ec-canvas id="mychart-dom-pie1" canvas-id="mychart-pie1" :ec="ec1"></ec-canvas>
            <view class="c_view">
                <view class="text1">苏苏</view>
                <view class="text2">99%</view>
            </view>
        </view>
    </view>
</template>

<script>
import ecCanvas from '../../components/ec-canvas/ec-canvas';
// pages/charts/index2.js
import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp();
export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec: {
                lazyLoad: true // 延迟加载
            },
            ec1: {
                lazyLoad: true // 延迟加载
            },
            navList: ['未完成', '全部任务'],
            type: 0
        };
    },
    onLoad: function (options) {
        this.echartsComponnet = this.$mp.page.selectComponent('#mychart-dom-pie').$vm;
        this.echartsComponnet1 = this.$mp.page.selectComponent('#mychart-dom-pie1').$vm;
        this.getData(); //获取数据
    },
    onShow: function () {},
    methods: {
        tabNav(e) {
            let { index } = e.currentTarget.dataset;

            if (this.type === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    type: index
                });
            }
        },

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
            this.echartsComponnet1.init((canvas, width, height, dpr) => {
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

        getOption() {
            var option = {
                // backgroundColor: "#fff",
                title: {
                    show: true,
                    text: '单位：%',
                    left: 'right',
                    top: 50
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: '#e0bbc3',
                    extraCssText: 'z-index:0',
                    position: function (point, params, dom, rect, size) {
                        dom.style.transform = 'translateZ(0)'; // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                        // 提示框位置

                        let x = 0; // x坐标位置

                        let y = 0; // y坐标位置
                        // 当前鼠标位置

                        let pointX = point[0];
                        let pointY = point[1]; // 提示框大小

                        let boxWidth = size.contentSize[0];
                        let boxHeight = size.contentSize[1]; // boxWidth > pointX 说明鼠标左边放不下提示框

                        if (boxWidth > pointX) {
                            x = 5;
                        } else {
                            // 左边放的下
                            x = pointX - boxWidth;
                        } // boxHeight > pointY 说明鼠标上边放不下提示框

                        if (boxHeight > pointY) {
                            y = 5;
                        } else {
                            // 上边放得下
                            y = pointY - boxHeight;
                        }

                        return [x, y];
                    }
                },
                legend: {
                    type: 'scroll',
                    left: 'center',
                    bottom: 0,
                    icon: 'circle',
                    itemWidth: 20,
                    // 设置宽度
                    itemHeight: 20 // 设置高度
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: true,
                        itemStyle: {
                            borderRadius: 5,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            normal: {
                                formatter: '{b} : {d}% ',
                                fontSize: 14
                            } // position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: '20',
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: true
                        },
                        data: [
                            {
                                value: 1048,
                                name: '搜索引擎',
                                itemStyle: {
                                    color: '#e0bbc3'
                                }
                            },
                            {
                                value: 735,
                                name: '直接访问',
                                itemStyle: {
                                    color: '#d4788c'
                                }
                            },
                            {
                                value: 580,
                                name: '邮件营销',
                                itemStyle: {
                                    color: '#b94962'
                                }
                            },
                            {
                                value: 484,
                                name: '杭州dasdaewqeqweqweqwsdas',
                                itemStyle: {
                                    color: '#8d6c73'
                                }
                            },
                            {
                                value: 300,
                                name: '视频广告',
                                itemStyle: {
                                    color: '#631223'
                                }
                            }
                        ]
                    }
                ]
            };
            return option;
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
