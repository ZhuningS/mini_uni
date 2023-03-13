<template>
    <!-- pages/getStar/index.wxml -->
    <view class="flex-column con">
        <view class="flex-row">
            <image
                class="itm_img"
                :src="item.flag == 1 ? '/img/star.png' : '/img/star-o.png'"
                :data-index="index"
                @tap="checkScore"
                v-for="(item, index) in stars"
                :key="item.as"
            ></image>
        </view>
        <view class="flex-row review_list">
            <block v-for="(item, index) in re_list" :key="index">
                <view :class="'item ' + (chosedStar == index + 1 ? 'chosed' : '')" :data-index="4 - index" @tap="checkScore">{{ item }}</view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/getStar/index.js
export default {
    data() {
        return {
            stars: [
                {
                    flag: 1
                },
                {
                    flag: 1
                },
                {
                    flag: 1
                },
                {
                    flag: 1
                },
                {
                    flag: 1
                }
            ],
            re_list: ['极好', '较好', '一般', '较差', '很差'],
            chosedStar: 0 //星星的等级
        };
    }, // scoreReview(e){
    // var that=this;
    // for(var i=0;i<that.data.stars.length;i++){
    //   var allItem = 'stars['+i+'].flag';
    //   console.log(allItem)
    //   that.setData({
    //     [allItem]: 1
    //   })
    // }
    //   var index=4-e.currentTarget.dataset.index;
    //   for(var i=0;i<=index;i++){
    //     var item = 'stars['+i+'].flag';
    //     this.setData({
    //       [item]:2
    //     })
    //   }
    //   let a=this.data.stars.filter(item=>item.flag==2)
    //   this.setData({
    //     chosedStar:6-a.length
    //   })
    // },

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
        checkScore(e) {
            this.stars.forEach((item) => {
                item.flag = 1;
                this.setData({
                    stars: this.stars
                });
            });
            var index = e.currentTarget.dataset.index;

            for (var i = 0; i <= index; i++) {
                var item = 'stars[' + i + '].flag';
                this.stars[i].flag = 2;
            }

            let a = this.stars.filter((item) => item.flag == 2);
            this.setData({
                chosedStar: 6 - a.length
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
