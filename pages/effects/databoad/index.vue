<template>
    <view>
        <!-- pages/effects/databoad/index.wxml -->
        <view class="cust_head">
            <view class="head_title" :style="'height:' + navHeight + 'px;'">
                <view class="flex-row" :style="'height:' + navObj + 'px;padding-top:' + navTop + 'px;'">
                    <view class="back_view flex-row" @tap.stop.prevent="goBack">
                        <view class="i"></view>
                    </view>
                    <text class="title_text">基础数据</text>
                </view>
            </view>
            <view class="head_con flex-row j_c">
                <view class="flex-column flex_1">
                    <text>9999</text>
                    <text class="head_con_title">测试</text>
                </view>
                <view class="flex-column flex_1">
                    <text>888</text>
                    <text class="head_con_title">测试</text>
                </view>
            </view>
        </view>
        <view class="con_data">
            <view>
                <view class="data_title">基础数据</view>
                <view class="flex-row j_b">
                    <block v-for="(item, index) in dash_data" :key="item.dash_data">
                        <view class="flex-column">
                            <view :class="'data_num ' + (item.type == 1 && 'data_num2')">{{ item.num }}</view>
                            <text class="data_name">{{ item.name }}</text>
                        </view>
                    </block>
                </view>
            </view>
            <view>
                <view class="data_title mt57">销售金额</view>
                <view class="flex-row j_b">
                    <view class="sale_box">
                        <view class="flex-row">
                            <view class="sale_day">日</view>
                            <view>当日销售金额</view>
                        </view>
                        <view class="sale_price">25 < text>万元</view>
                    </view>
                    <view class="sale_box">
                        <view class="flex-row">
                            <view class="sale_day sales_month">月</view>
                            <view>当月销售金额</view>
                        </view>
                        <!-- 金额最多到亿 -->
                        <view class="sale_price">1223 < text>万元</view>
                    </view>
                </view>
                <view class="ser_free">
                    <view class="flex-row j_b ser_box">
                        <view class="flex_0">
                            <view class="ser_title">上月预估服务费</view>
                            <view>（以实际发放为准）</view>
                        </view>
                        <view class="ser_price text_ellipsis">100000000 < text>元</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 图表 -->
        <view class="data_chart">
            <view class="flex-row j_b">
                <view class="chart_title">全年服务费趋势</view>
                <view class="chart_unit">单位:万元</view>
            </view>
            <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ec"></ec-canvas>
        </view>
    </view>
</template>

<script>
// import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp();
export default {
    data() {
        return {
            navHeight: app.globalData.navHeight,
            //导航栏高度
            navTop: app.globalData.navTop,
            //导航栏距顶部距离
            navObj: app.globalData.navObj,
            //胶囊的高度
            navObjWid: app.globalData.navObjWid,
            //胶囊宽度+距右距离
            dash_data: [
                {
                    type: 1,
                    name: '测试1',
                    num: 1111
                },
                {
                    type: 1,
                    name: '测试1',
                    num: 1111
                },
                {
                    type: 2,
                    name: '测试1',
                    num: 1111
                },
                {
                    type: 2,
                    name: '测试1',
                    num: '999+'
                }
            ],
            ec: {
                lazyLoad: true // 延迟加载
            }
        };
    },
    onLoad: function (options) {
        // this.echartsComponnet = this.selectComponent('#mychart-dom-pie');
    },
    onShow: function () {
        // this.getData();
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
                    data: ['1月', '3月', '5月', '7月', '11月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [300, 255, 690, 880, 558, 33, 77],
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
                        }
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
        },

        /**
         * 回到上一页
         */
        goBack: function () {
            uni.navigateBack({
                delta: 1,
                fail: function () {
                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
