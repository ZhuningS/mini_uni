<template>
    <view>
        <view class="head">
            <view class="head_search flex-row">
                <image src="/static/img/search.png" class="head_s_icon"></image>
                <input :placeholder="chosed_tab == 0 ? '可搜索选项一' : '可搜索选项二'" placeholder-class="p_class" class="head_ipt" @confirm="search" />
            </view>
        </view>
        <view class="con flex">
            <scroll-view :scroll-y="true" class="c_left">
                <block v-for="(item, index) in tab_list" :key="item.tab_list">
                    <view @tap.stop.prevent="choseTab" :data-index="index" :class="'flex-column j_c tab_item ' + (chosed_tab == index ? 'ative' : '')">{{ item.name }}</view>
                </block>
            </scroll-view>
            <scroll-view :scroll-y="true" class="c_right">
                <!-- 赠品 -->
                <view v-if="chosed_tab == 0" class="right_box">
                    <block v-for="(item, index) in goods_list" :key="item.goods_list">
                        <view :class="'g_item flex-row j_b ' + (item.checked && 'g_ative')" data-type="goods_list" @tap.stop.prevent="selectOne" :data-index="index">
                            <view class="flex">
                                <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="g_cover"></image>
                                <view>
                                    <view class="g_name line_ellipsis">{{ item.name }}</view>
                                    <view class="g_price">单价：¥{{ filters.toFix(item.price) }}</view>
                                </view>
                            </view>
                            <view class="flex-row">
                                <image src="/static/img/reduce.png" class="reduce_icon" @tap.stop.prevent="numChange" data-type="0" data-list="goods_list" :data-index="index" />
                                <view class="g_num">{{ item.num }}</view>
                                <image src="/static/img/plus.png" class="reduce_icon" @tap.stop.prevent="numChange" data-type="1" data-list="goods_list" :data-index="index" />
                            </view>
                        </view>
                    </block>
                </view>
                <!-- 优惠券 -->
                <view v-else class="right_box">
                    <block v-for="(item, index) in coupon_list" :key="item.coupon_list">
                        <view :class="'c_item ' + (item.checked && 'g_ative')" @tap.stop.prevent="selectOne" data-type="coupon_list" :data-index="index">
                            <view class="c_item_cou">
                                <view class="cou_title">{{ item.name }}</view>
                                <view>适用范围：{{ item.range }}</view>
                            </view>
                            <view class="flex-row j_e">
                                <image src="/static/img/reduce.png" class="reduce_icon" @tap.stop.prevent="numChange" data-type="0" data-list="coupon_list" :data-index="index" />
                                <view class="g_num">{{ item.num }}</view>
                                <image src="/static/img/plus.png" class="reduce_icon" @tap.stop.prevent="numChange" data-type="1" data-list="coupon_list" :data-index="index" />
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <!-- 底部固定按钮 -->
        <block v-if="chosed_tab == 0">
            <view class="fix_bottom">
                <view class="fix_box flex-row">
                    <view>已选：{{ total_num }}种赠品，共计{{ filters.toFix(total_price) }}元</view>
                    <view :class="'btn ' + (total_num > 0 && 'btn_ative')">确认选择</view>
                </view>
            </view>
        </block>
        <block v-if="chosed_tab == 1">
            <view class="fix_bottom">
                <view class="fix_box flex-row">
                    <view>已选：{{ total_coupon }}种优惠券</view>
                    <view :class="'btn ' + (total_coupon > 0 && 'btn_ative')">确认选择</view>
                </view>
            </view>
        </block>
    </view>
</template>
<script module="filters" lang="wxs" src="./filter.wxs"></script>
<script>
export default {
    data() {
        return {
            chosed_tab: '',
            //左侧tab选中
            chosed_gifts: [],
            //选中的赠品信息
            chosed_coups: [],
            //选中的优惠券信息
            tab_list: [
                {
                    name: '选项一'
                },
                {
                    name: '选项二'
                }
            ],
            goods_list: [
                {
                    name: '咿咿呀呀',
                    num: 1,
                    price: 55.49
                },
                {
                    name: '咿咿呀呀',
                    num: 1,
                    price: 65.49
                },
                {
                    name: '咿咿呀呀',
                    num: 1,
                    price: 99.49
                }
            ],
            total_num: 0,
            //选中的赠品个数
            total_price: 0,
            //选中的赠品价格
            coupon_list: [
                {
                    name: '小听粉核销券',
                    range: '可兑换小听粉1听',
                    num: 1
                },
                {
                    name: '满100-50优惠券',
                    range: '可用于在门店购买商品x、商品x、商品x、商品x、商品x、',
                    num: 1
                }
            ],
            total_coupon: 0 //选中的优惠券的个数
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        /**
         * 左边侧边栏选择切换
         * @param {*} e
         */
        choseTab(e) {
            let { index } = e.currentTarget.dataset;

            if (this.chosed_tab === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    chosed_tab: index
                });
            }
        },

        /**
         * 选择赠品或优惠券的方法
         * @param {*} e
         */
        selectOne(e) {
            let { index, type } = e.currentTarget.dataset;
            let list = this[type];
            let chosed_gifts = [];
            let chosed_coups = [];
            list.forEach((item, index0) => {
                if (index == index0) {
                    item.checked = !item.checked;
                }

                if (item.checked) {
                    if (type == 'goods_list') {
                        chosed_gifts.push(item);
                    } else {
                        chosed_coups.push(item);
                    }
                }
            });

            if (type == 'goods_list') {
                // chosed_gifts.forEach(item => {
                //   item.price = parseFloat(item.price)
                // })
                this.setData(
                    {
                        chosed_gifts,
                        total_num: chosed_gifts.length
                    },
                    () => {
                        this.getTotalPrice();
                    }
                );
            } else {
                this.setData({
                    chosed_coups,
                    total_coupon: chosed_coups.length
                });
            }

            this.type = list;
        },

        /**
         * 计算金额
         * @param {*} e
         */
        getTotalPrice() {
            let total_price = this.chosed_gifts.reduce((total, cur) => {
                return total + parseFloat(cur.num) * parseFloat(cur.price);
            }, 0);
            this.setData({
                total_price
            });
        },

        /**
         * 数量的++，和--的方法
         *   @param {*} e
         */
        numChange(e) {
            let { index, type, list } = e.currentTarget.dataset;
            let list0 = this[list];
            list0.forEach((item, index0) => {
                if (index == index0) {
                    if (type == 0) {
                        if (item.num <= 1) {
                            return uni.showToast({
                                title: '不能在减少了哦',
                                icon: 'none'
                            });
                        }

                        item.num--;
                    } else {
                        if (index == index0) {
                            if (item.num >= 10) {
                                return uni.showToast({
                                    title: '不能更多了哦',
                                    icon: 'none'
                                });
                            }

                            item.num++;
                        }
                    }
                }
            });
            this.list = list0;
            this.getTotalPrice();
        },

        search() {
            console.log('占位：函数 search 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
