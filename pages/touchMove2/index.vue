<template>
    <!-- pages/touchMove2/index.wxml -->
    <view class="con">
        <block v-for="(item, index) in cardList" :key="index">
            <view class="top">
                <movable-area>
                    <movable-view
                        :out-of-bounds="true"
                        direction="horizontal"
                        :x="item.xmove"
                        :inertia="true"
                        :data-index="index"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                        @change="handleMovableChange"
                    >
                        <view>{{ item.name }}</view>
                    </movable-view>
                </movable-area>
                <view class="movable_delete_btn" :data-id="item.id" @tap="handleDelete">删除</view>
            </view>
        </block>
    </view>
    <!-- <view class="f">
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
  <view class="f1">1</view>
   <view class="clear"></view>
</view> -->
</template>

<script>
// pages/touchMove2/index.js
export default {
    data() {
        return {
            cardList: [
                {
                    id: '1',
                    name: '左滑试试吧',
                    xmove: 0
                },
                {
                    id: '2',
                    name: '左滑试试吧',
                    xmove: 0
                },
                {
                    id: '3',
                    name: '左滑试试吧',
                    xmove: 0
                },
                {
                    id: '4',
                    name: '左滑试试吧',
                    xmove: 0
                }
            ]
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        /**
         * 处理touchstart事件
         */
        handleTouchStart(e) {
            this.startX = e.touches[0].pageX;
        },

        /**
         * 处理touchend事件
         */
        handleTouchEnd(e) {
            if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
                this.showDeleteButton(e);
            } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
                this.showDeleteButton(e);
            } else {
                this.hideDeleteButton(e);
            }
        },

        /**
         * 显示删除按钮
         */
        showDeleteButton: function (e) {
            let index = e.currentTarget.dataset.index;
            this.setXmove(index, -65);
        },

        /**
         * 隐藏删除按钮
         */
        hideDeleteButton: function (e) {
            let index = e.currentTarget.dataset.index;
            this.setXmove(index, 0);
        },

        /**
         * 设置movable-view位移
         */
        setXmove: function (index, xmove) {
            let { cardList } = this;
            cardList[index].xmove = xmove;
            this.setData({
                cardList: cardList
            });
            console.log(this.cardList);
        },

        /**
         * 处理movable-view移动事件
         */
        handleMovableChange: function (e) {
            if (e.detail.source === 'friction') {
                if (e.detail.x < -30) {
                    this.showDeleteButton(e);
                } else {
                    this.hideDeleteButton(e);
                }
            } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
                this.hideDeleteButton(e);
            }
        },

        handleDelete(e) {
            let { id } = e.currentTarget.dataset;
            this.itemDel(id);
        },

        itemDel(id) {
            this.cardList.forEach((item, index) => {
                if (item.id == id) {
                    this.cardList.splice(index, 1);
                }

                this.setData({
                    cardList: this.cardList
                });
                uni.showToast({
                    title: '删除成功',
                    icon: 'success'
                });
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
