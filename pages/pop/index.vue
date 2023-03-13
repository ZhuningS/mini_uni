<template>
    <view>
        <view class="head" @tap.stop.prevent="toChoseAdd">
            <image src="/static/img/bg_line.png" class="bg_hr"></image>
            <image src="/static/img/add_icon.png" :class="'head_icon ' + (address.consignee != null ? 'new_icon' : '')"></image>
            <view class="head_add">
                <view class="add_no" v-if="address.consignee == null">选择收货地址</view>
                <view class="add_yes" v-else>
                    <view class="add_text">{{ address.province_name }} {{ address.city_name }} {{ address.district_name }}{{ address.address }}</view>
                    <view class="add_name">
                        {{ address.consignee }}
                        <text>{{ address.phone }}</text>
                    </view>
                </view>
            </view>
            <image src="/static/img/add_left.png" class="head_arrow"></image>
        </view>
        <view class="goods">
            <block v-for="(item, index) in orderInfo.goodsList" :key="item.id">
                <view class="goods_con">
                    <view class="goods_img">
                        <image :src="item.goods_cover" class="img-160"></image>
                    </view>
                    <view class="goods-text">
                        <view class="de_text">
                            <text v-if="item.is_Giveaway == '1'" class="color">[赠品]</text>
                            {{ item.goods_name }}
                        </view>
                        <view class="goods_unit">
                            <view class="price">￥{{ item.goods_price }}</view>
                            <view class="quantity">X {{ item.goods_num }}</view>
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <view class="order_info">
            <view class="info j_b" data-index="1" @tap.stop.prevent="showDiscount">
                <view class="info_text">优惠券</view>
                <view v-if="hasDiscount == 1 && !discount_money && address.consignee != null" class="color">
                    {{ discount_num }}张可用
                    <image src="/static/img/add_left.png" class="img-19"></image>
                </view>
                <view v-if="hasDiscount == 1 && discount_money" class="color">
                    -￥{{ discount_money }}
                    <image src="/static/img/add_left.png" class="img-19"></image>
                </view>
                <view v-if="hasDiscount == 0 || address.consignee == null" class="no_color">
                    暂无优惠券可用
                    <image src="/static/img/add_left.png" class="img-19"></image>
                </view>
            </view>

            <view class="info1 j_b">
                <view class="info_text">运费</view>
                <view v-if="has_devfree === 1">￥{{ 100.0 }}</view>
                <view v-else>免物流费</view>
            </view>
            <view class="info1 j_b">
                <view class="info_text">运费</view>
                <view v-if="has_devfree === 1">￥{{ 100.0 }}</view>
                <view v-else>免物流费</view>
            </view>

            <view class="memo">
                <view class="info_text">备注</view>
            </view>

            <view class="input1">
                <input @input="memoInput" placeholder="请填写备注" placeholder-class="p_class" />
            </view>
        </view>

        <view class="bottom">
            <view class="view_btn">
                <view class="btn_text">
                    实付款：
                    <text class="color">￥{{ totalPrice }}</text>
                </view>
                <view class="bottom_btn" @tap.stop.prevent="">提交订单</view>
            </view>
        </view>
        <!-- 遮罩层mask -->
        <view class="mask" @tap="closeModal" v-if="!isShow" @touchmove.stop.prevent="returnFun"></view>
        <!-- 弹窗显示优惠券 -->
        <view class="discount_view" v-if="!isShowDiscount" @touchmove.stop.prevent="trueFun">
            <image src="/static/img/login_close.png" class="discount_close" @tap="closeDiscount"></image>
            <view class="discount_title">优惠券</view>

            <view class="nav flex-row j_b">
                <view @tap="tabNav" class="nav_item" data-index="0">
                    <view :class="type == 0 ? 'highlight color' : 'nav_item_text'">可用优惠券（{{ 2 }}）</view>
                    <view :class="type == 0 ? 'nav_line' : ''"></view>
                </view>

                <view @tap="tabNav" class="nav_item" data-index="1">
                    <view :class="type == 1 ? 'highlight color' : 'nav_item_text'">不可用优惠券（{{ 0 }}）</view>
                    <view :class="type == 1 ? 'nav_line' : ''"></view>
                </view>
            </view>
            <scroll-view scroll-y style="height: 682rpx">
                <view v-if="cardList.length != 0" class="card">
                    <block v-for="(item, index) in cardList" :key="index">
                        <view class="item_list flex-row" @tap.stop.prevent="parseEventDynamicCode($event, item.hasOver == 0 ? 'choseChecked' : '')" :data-id="item.id">
                            <view class="item_money">
                                <view class="money">
                                    <text class="text1">￥</text>
                                    <text class="money_text">{{ item.money }}</text>
                                </view>
                                <view class="case">
                                    <text>{{ item.case }}</text>
                                </view>
                            </view>
                            <view class="item_desc flex-row">
                                <view class="name_date">
                                    <view class="name_text">{{ item.name }}</view>
                                    <view class="date_text" @tap.stop.prevent="showMore" :data-id="item.id">
                                        用券时间{{ item.date }}
                                        <image v-if="item.more" src="/static/img/good_cou02.png" class="img_15"></image>
                                        <image v-else src="/static/img/good_cou01.png" class="img_15"></image>
                                    </view>
                                </view>
                                <view class="chose" v-if="item.hasOver == 0">
                                    <icon v-if="!item.checkd" class="icon-small" type="circle" size="18"></icon>
                                    <icon v-else class="icon-box-img" color="#000" type="success" size="18"></icon>
                                </view>
                            </view>
                        </view>

                        <view v-if="!item.more" class="rule">
                            {{ item.rule }}
                        </view>
                    </block>
                </view>

                <view v-if="cardList.length == 0" class="none1">
                    <image src="/static/img/no_img.png" class="none1_img"></image>
                </view>
            </scroll-view>

            <button class="go_confirm" @tap.stop.prevent="submitDis">确定</button>
        </view>
    </view>
</template>

<script>
// pages/orderConfirm/index.js
export default {
    data() {
        return {
            memo: '',

            //订单备注
            cardList: [
                {
                    id: 1,
                    money: 100,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 0,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 2,
                    money: 1000,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 0,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 3,
                    money: 1500,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 0,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 4,
                    money: 1600,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 1,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 4,
                    money: 1600,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 1,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 4,
                    money: 1600,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 1,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                },
                {
                    id: 4,
                    money: 1600,
                    case: '满1000可用',
                    name: '巴啦啦能量哈沙发',
                    date: '20/05/09 ~ 20/05/31',
                    hasOver: 1,
                    //未过期
                    checkd: false,
                    more: true,
                    rule: ' 使用规则：一张订单只能使用一种类型的优惠券，特价商品不可使用。一张订单只能使用一种类型的优惠券，特价商品不可使用。'
                }
            ],

            type: 0,

            //当前选中的导航栏索引( 0可用优惠券 1 不可用)
            isShowDiscount: true,

            //优惠券默认不展示弹框
            isShow: true,

            //是否展示弹窗
            totalPrice: 899.99,

            address: {
                consignee: 's小苏苏',
                phone: 1212321312312,
                province_name: '江苏',
                city_name: '南京',
                district_name: '浦口',
                address: 'shdugfdhsjbgdhf'
            },

            //收货地址
            hasDiscount: 1,

            //有优惠
            discount_num: 5,

            has_devfree: 1,

            //有运费
            orderInfo: {
                goodsList: [
                    {
                        goods_cover: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        goods_name: '巴啦啦能量哈沙发',
                        goods_price: '368.5',
                        goods_num: '5',
                        is_Giveaway: 0
                    },
                    {
                        goods_cover: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        goods_name: '巴啦啦能量哈沙发',
                        goods_price: '368.5',
                        goods_num: '5',
                        is_Giveaway: 1 //是否是赠品
                    },
                    {
                        goods_cover: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        goods_name: '巴啦啦能量哈沙发',
                        goods_price: '368.5',
                        goods_num: '5',
                        is_Giveaway: 1 //是否是赠品
                    },
                    {
                        goods_cover: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        goods_name: '巴啦啦能量哈沙发',
                        goods_price: '368.5',
                        goods_num: '5',
                        is_Giveaway: 1 //是否是赠品
                    }
                ]
            },

            isShowPay: false,
            discount_money: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        //优惠券用券时间显示更多的按钮
        showMore(e) {
            let id = e.currentTarget.dataset.id;
            let cardList = this.cardList;
            cardList.forEach((item) => {
                if (item.id == id) {
                    item.more = !item.more;
                }
            });
            this.setData({
                cardList: cardList
            });
        },

        memoInput(e) {
            let memo = e.detail.value;
            this.setData({
                memo: memo
            });
        },

        //展示mask
        showDiscount(e) {
            this.setData({
                isShow: false,
                isShowDiscount: false
            });
        },

        closeModal() {
            this.setData({
                isShow: true,
                isShowDiscount: true,
                isShowPay: true
            });
        },

        //关闭弹窗
        closeDiscount() {
            let _this = this;

            _this.setData({
                isShow: true,
                isShowDiscount: true
            });
        },

        //切换导航栏
        tabNav(e) {
            let currentTab = e.currentTarget.dataset.index;
            this.setData({
                type: currentTab
            });
        },

        choseChecked(e) {
            let cardList = this.cardList;
            let id = e.currentTarget.dataset.id;
            console.log(id);
            cardList.forEach((item) => {
                if (item.id === id) {
                    item.checkd = !item.checkd;
                } else {
                    item.checkd = false;
                }
            });
            this.setData({
                cardList: cardList
            });
        },

        //选择折扣
        submitDis() {
            let chosedList = this.cardList.filter((item) => item.checkd == true);
            let checkedDisId = '';

            if (chosedList.length != 0) {
                checkedDisId = chosedList[0].id;
                let dis = chosedList[0].money;
                this.setData({
                    discount_money: dis
                });
            } else {
                this.setData({
                    discount_money: ''
                });
            }

            this.setData({
                isShow: true,
                isShowDiscount: true
            });
        },

        toChoseAdd() {
            console.log('占位：函数 toChoseAdd 未声明');
        },

        returnFun() {
            console.log('占位：函数 return 未声明');
        },

        trueFun() {
            console.log('占位：函数 true 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
