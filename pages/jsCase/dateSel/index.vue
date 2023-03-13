<template>
    <view>
        <!-- pages/jsCase/dateSel/index.wxml -->
        <!-- minDate最小时间 默认为2018/1/1,日期格式为yyyy/mm/dd ,最小时间和当前日期尽量不要相差太大,无最大日期,在触底时每次加载6个月 -->
        <date
            :isShow="show"
            :timeStart="sel_list.start_time"
            minDate="2019/1/1"
            :timeEnd="sel_list.end_time"
            theme_color="#ffc05F"
            @tapYes="dateSubmit($event, { tagId: 'date' })"
            @tapNo="closeModal($event, { tagId: 'date' })"
            id="date"
        />
        <view class="btn" @tap.stop.prevent="showFun">选择日期</view>
    </view>
</template>

<script>
import date from '../components/date/index';
// pages/jsCase/dateSel/index.js
export default {
    components: {
        date
    },
    data() {
        return {
            show: false,

            sel_list: {
                start_time: '',
                end_time: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.changeToRgb('#fff');
        console.log(this.changeToRgb('#fff'));
        console.log(this.getOpacityColor('#000', '.5'));
        var myHex = this.hexify('rgba(57,156,29,0.05)');
        console.log(myHex);
    },
    methods: {
        showFun() {
            this.setData({
                show: true
            });
        },

        hexify(color) {
            var values = color
                .replace(/rgba?\(/, '')
                .replace(/\)/, '')
                .replace(/[\s+]/g, '')
                .split(',');
            var a = parseFloat(values[3] || 1);
            var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
            var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
            var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
            return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
        },

        getOpacityColor(thisColor, thisOpacity) {
            var theColor = thisColor.toLowerCase(); //十六进制颜色值的正则表达式

            var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 如果是16进制颜色

            if (theColor && r.test(theColor)) {
                if (theColor.length === 4) {
                    var sColorNew = '#';

                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1));
                    }

                    theColor = sColorNew;
                } //处理六位的颜色值

                var sColorChange = [];

                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt('0x' + theColor.slice(i, i + 2)));
                }

                return 'rgba(' + sColorChange.join(',') + ',' + thisOpacity + ')';
            }

            return theColor;
        },

        changeToRgb(color) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();

            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = '#';

                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }

                    sColor = sColorNew;
                } //处理六位的颜色值

                var sColorChange = [];

                for (var i = 1; i <= 6; i += 2) {
                    sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
                } //此处是返回的颜色 如需要透明度,0.3是指透明度30%，直接返回
                //"rgba(" + sColorChange.join(",") + ",0.3)"

                return 'rgba(' + sColorChange.join(',') + ')';
            } else {
                return sColor;
            }
        },

        closeModal(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
        },

        dateSubmit(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 dateSubmit 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
