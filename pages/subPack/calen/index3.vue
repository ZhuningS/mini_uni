<template>
    <view>
        <!-- pages/subPack/calen/index3.wxml -->
        <!--配置属性
    default-value="{{value}}"
    week-text="{{week}}" 
    last-month="{{lastMonth}}"
    next-month="{{nextMonth}}"
-->

        <Calendar id="Calendar" @select="select($event, { tagId: 'Calendar' })"></Calendar>
        <view style="width: 90%; margin: 0 auto; text-align: center; padding: 30rpx 20rpx; border: 1rpx dashed #aaa">
            <button type="default" @tap="toggleType">切换展示效果</button>
            <view>选中日期:{{ selectVal }}</view>
        </view>
    </view>
</template>

<script>
import Calendar from '../components/calendar2/calendar';
// pages/subPack/calen/index3.js
export default {
    components: {
        Calendar
    },
    data() {
        return {
            value: '2018-11-11',
            week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            lastMonth: 'lastMonth',
            nextMonth: 'nextMonth',
            selectVal: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        //组件监听事件
        select(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            // console.log(e)
            this.setData({
                selectVal: e.detail
            });
        },

        toggleType() {
            this.$mp.page.selectComponent('#Calendar').$vm.toggleType();
        }
    }
};
</script>
<style>
@import './index3.css';
</style>
