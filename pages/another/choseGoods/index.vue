<template>
    <view>
        <!-- pages/choseGoods/index.wxml -->
        <view class="head flex j_b">
            <block v-for="(item, index) in navList" :key="item.navList">
                <view class="c_tab" :data-index="index" @tap.stop.prevent="tabNav">
                    <view :class="'tabbar_li ' + (type == index ? 'on' : '')">{{ item }}</view>
                    <view class="c_line" v-if="type == index"></view>
                </view>
            </block>
        </view>
        <view class="con">
            <block v-for="(item, index) in goods_list" :key="index">
                <view class="c_item flex" @tap.stop.prevent="choseGoods" :data-index="index">
                    <image :src="item.goods_cover" class="c_item_img"></image>
                    <view>
                        <text class="line_ellipsis item_text">{{ item.goods_name }}</text>
                        <text class="item_price">￥{{ item.sale_price }}</text>
                    </view>
                    <view class="item_icon">
                        <image src="/static/img/cart_select.png" v-if="item.chosed"></image>
                        <image src="/static/img/cart_uncheck.png" v-else></image>
                    </view>
                </view>
            </block>
        </view>

        <view v-if="type == 0" class="c_case flex j_b">
            <text>剩余可选商品数量</text>
            <text class="quantity_text">{{ remain_num }}</text>
        </view>
        <view v-else class="c_case1">
            <view class="flex j_b">
                <text>剩余可选商品价值</text>
                <text class="quantity_text">{{ remain_money }}元</text>
            </view>
            <view class="line" v-if="if_needPay"></view>
            <view class="flex j_b need_text" v-if="needPay">
                <text>订单仍需支付金额</text>
                <text class="quantity_text1">{{ needPay }}元</text>
            </view>
        </view>
        <view class="button" @tap="changeSubmit">确定</view>
    </view>
</template>

<script>
// pages/choseGoods/index.js
const math = require('../utils/math.min');

math.config({
    number: 'BigNumber'
});
export default {
    data() {
        return {
            navList: ['数量', '面值'],
            type: 0,
            goods_list: [
                {
                    goods_cover: 'https://i.postimg.cc/65STLQNc/333.webp',
                    goods_name: '可可爱爱的丸子妹表情包，你值得拥有！！',
                    sale_price: '99.00'
                },
                {
                    goods_cover: 'https://i.postimg.cc/65STLQNc/333.webp',
                    goods_name: '可可爱爱的丸子妹表情包，你值得拥有！！',
                    sale_price: '4.80'
                },
                {
                    goods_cover: 'https://i.postimg.cc/65STLQNc/333.webp',
                    goods_name: '可可爱爱的丸子妹表情包，你值得拥有！！',
                    sale_price: '55.60'
                },
                {
                    goods_cover: 'https://i.postimg.cc/65STLQNc/333.webp',
                    goods_name: '可可爱爱的丸子妹表情包，你值得拥有！！',
                    sale_price: '24.58'
                },
                {
                    goods_cover: 'https://i.postimg.cc/65STLQNc/333.webp',
                    goods_name: '可可爱爱的丸子妹表情包，你值得拥有！！',
                    sale_price: '1220.98'
                }
            ],
            card_price: '1000',
            num: '3',
            if_needPay: false,
            //是否超出所需金额
            remain_money: '',
            //剩余可选商品价值
            needPay: '',
            //实物兑换 仍需的money
            remain_num: '' //剩余可选商品数量
        };
    },
    onLoad: function (options) {
        this.setData({
            remain_money: this.card_price,
            remain_num: this.num
        });
    },
    onShow: function () {
        let a = '49';
        let b = '3.99';
        console.log(
            typeof a,
            math.evaluate(`${a}+${b}`).toString(),
            math.evaluate(`${a}-${b}`).toString(),
            (13.435).toFixed(2),
            (1.335).toFixed(2),
            (1.362).toFixed(2),
            (1.55).toFixed(2),
            (1.33).toFixed(2)
        );
    },
    methods: {
        tabNav(e) {
            let { index } = e.currentTarget.dataset;

            if (this.type === index || index === undefined) {
                return false;
            } else {
                let { goods_list } = this;
                goods_list.forEach((item) => {
                    item.chosed = false;
                });
                this.setData({
                    type: index,
                    goods_list
                });
            }
        },

        // 实物兑换选择商品
        choseGoods(e) {
            let { index } = e.currentTarget.dataset;
            let { goods_list, card_price, num, type } = this;
            let goods_info = goods_list[index];
            if (type == 0) {
                //数量
                //实现多选
                if (this.remain_num > 0) {
                    goods_info.chosed = !goods_info.chosed;
                    this.setData({
                        goods_list: goods_list
                    });
                } else {
                    if (!goods_info.chosed) {
                        uni.showToast({
                            title: '剩余可选为0',
                            icon: 'none'
                        });
                    }

                    goods_info.chosed = false;
                    this.setData({
                        goods_list: goods_list
                    });
                }

                let chose_list = goods_list.filter((item) => item.chosed); //选中数量

                let list_len = chose_list.length; //剩余可选数量

                let last_len = num - list_len;
                this.setData({
                    remain_num: last_len > 0 ? last_len : 0
                });
            } else {
                //面值
                goods_info.chosed = !goods_info.chosed;
                this.setData({
                    goods_list: goods_list
                });
                let chose_list = goods_list.filter((item) => item.chosed); // 订单金额

                let totalPrice = 0; //     chose_list.forEach(item=>{
                //       totalPrice=totalPrice+parseFloat(item.sale_price)
                //     })
                //     chose_list.forEach(item=>{
                //       totalPrice+=math.multiply(item.sale_price,1)
                //     })

                chose_list.forEach((item) => {
                    totalPrice = math.evaluate(`${item.sale_price}+${totalPrice}`).toString();
                });
                console.log(totalPrice); //剩余可选金额

                console.log(typeof totalPrice, typeof card_price);
                console.log(card_price - totalPrice);
                let last_money = math.evaluate(`${card_price}-${totalPrice}`).toFixed(2);
                console.log(last_money);
                console.log(typeof last_money);
                this.setData({
                    remain_money: last_money > 0 ? last_money : 0
                });
                console.log(parseFloat(totalPrice), parseFloat(card_price));

                if (parseFloat(totalPrice) > parseFloat(card_price)) {
                    this.setData({
                        if_needPay: true,
                        needPay: math.evaluate(`${totalPrice}-${card_price}`).toFixed(2)
                    });
                } else {
                    this.setData({
                        if_needPay: false,
                        needPay: 0
                    });
                }
            }
        },

        changeSubmit() {
            console.log('占位：函数 changeSubmit 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
