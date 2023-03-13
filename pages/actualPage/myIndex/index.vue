<template>
    <view>
        <!-- pages/actualPage/myIndex/index.wxml -->
        <view class="head_top" :style="'padding-top:' + (navHeight + 10) + 'px'">
            <view class="flex-row uu_info">
                <view class="user_ava">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view class="user_info">
                    <view class="text_ellipsis u_name">
                        <open-data type="userNickName"></open-data>
                    </view>
                    <view class="flex-row u_id" v-if="phone == '' && hyid == ''">
                        <view>暂未完善会员信息</view>
                    </view>
                    <view class="flex-row u_id" v-else>
                        <view>{{ phone }}</view>
                        <view class="text_ellipsis">会员ID：{{ hyid }}</view>
                    </view>
                </view>
            </view>
            <view class="uu_box">
                <image src="/static/pages/actualPage/img/my.png" class="bg_img"></image>
                <image src="/static/img/my8.png" class="uu_code" @tap.stop.prevent="showCode"></image>
                <view class="u1">
                    <text class="uu_l_text">银星级会员</text>
                    <image src="/static/img/my9.png" class="uu_level"></image>
                    <view v-if="hyid">会员ID：{{ hyid }}</view>
                </view>
            </view>
        </view>
        <view class="uu_card flex-row j_b">
            <view class="u_card u_left flex a_e" @tap.stop.prevent="toCard">
                <view class="u_desc">
                    <view class="mb21">
                        <text class="u_num">{{ coupon_num }}</text>
                        <text class="u_unit">张</text>
                    </view>
                    <view class="flex-row">
                        <view>我的优惠券</view>
                        <view class="left_arrow"></view>
                    </view>
                </view>
                <image src="/static/img/my2.png" class="u_left_img"></image>
            </view>
            <view class="u_right u_card flex a_e" @tap.stop.prevent="toGift">
                <view class="u_desc">
                    <view class="mb21">
                        <text class="u_num">{{ gift_num }}</text>
                        <text class="u_unit">张</text>
                    </view>
                    <view class="flex-row">
                        <view>我的礼品券</view>
                        <view class="left_arrow"></view>
                    </view>
                </view>
                <image src="/static/img/my3.png" class="u_left_img"></image>
            </view>
        </view>
        <view class="cen">
            <swiper class="swiper-box" :current="swiperCurrent" @animationfinish="swiperChange" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
                <block v-for="(item, index) in banner" :key="index">
                    <swiper-item>
                        <image :src="item.img_url" class="bg_img" mode="aspectFill"></image>
                    </swiper-item>
                </block>
            </swiper>
        </view>
        <view>
            <text class="b_title">会员服务</text>
            <view class="b_box">
                <block v-for="(item, index) in tabList" :key="index">
                    <view class="b_item flex-row j_b" @tap.stop.prevent="toDetail" :data-url="item.url">
                        <view class="flex-row">
                            <image :src="item.icon" class="item_icon"></image>
                            <view>{{ item.name }}</view>
                        </view>
                        <image src="/static/img/left_icon.png" class="b_left_icon"></image>
                    </view>
                </block>
            </view>
        </view>
        <!-- 弹框 -->
        <view class="mask" v-if="!show_code" @tap.stop.prevent="closeModal"></view>
        <view class="pop_info" v-if="!show_code">
            <view class="pop_box flex-column">
                <view class="p_ava">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <image src="/static/img/close_icon.png" @tap.stop.prevent="closeModal" class="p_close_icon"></image>
                <view class="flex-row">
                    <view class="p_code_id">会员ID：{{ hyid }}</view>
                    <view class="p_btn" @tap="copyCodeId">点击复制</view>
                </view>
                <image :src="code_uri" class="p_code_img"></image>
                <view class="show_tips">请向线下门店人员出示此二维码</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            //轮播图
            autoplay: true,

            //是否自动切换
            interval: 5000,

            //自动切换时间间隔,3s
            duration: 1000,

            //  滑动动画时长1s
            swiperCurrent: 0,

            show_code: true,

            //展示会员id弹框
            navHeight: '',

            //导航栏整体高度,
            tabList: [
                {
                    icon: '/static/img/my4.png',
                    name: '附近门店',
                    url: '/pages/store/index'
                },
                {
                    icon: '/static/img/my5.png',
                    name: '地址管理',
                    url: '/pages/address/index'
                },
                {
                    icon: '/static/img/my6.png',
                    name: '个人信息',
                    url: '/pages/userInfo/index'
                },
                {
                    icon: '/static/img/my10.png',
                    name: '条款政策',
                    url: '/pages/policy/index'
                },
                {
                    icon: '/static/img/my11.png',
                    name: '兑换中心',
                    url: '/pages/exchange/index'
                },
                {
                    icon: '/static/img/my12.png',
                    name: '我的订单',
                    url: '/pages/myOrder/index'
                }
            ],

            code_uri: '',
            login_status: 0,
            selected: 0,
            phone: '',
            hyid: '',
            coupon_num: '',
            gift_num: '',
            banner: ''
        };
    },
    onLoad: function (options) {
        this.getNavHeight();
    },
    onShow: function () {
        //自定义的tabbar
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 4
            });
        }

        this.loadData();
    },
    onShareAppMessage: function () {},
    methods: {
        //轮播图切换
        swiperChange: function (e) {
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                this.setData({
                    swiperCurrent: e.detail.current
                });
            }
        },

        closeModal() {
            this.setData({
                show_code: true
            });
        },

        showCode() {
            let login_status = this.login_status;

            if (login_status == 1) {
                this.setData({
                    show_code: false
                });
            } else {
                uni.navigateTo({
                    url: '/pages/login/index'
                });
            }
        },

        //获取头部自定义导航栏高度
        getNavHeight() {
            let menuButtonObject = uni.getMenuButtonBoundingClientRect();
            uni.getSystemInfo({
                success: (res) => {
                    let navHeight = res.statusBarHeight + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2; //导航高度

                    this.setData({
                        navHeight
                    });
                }
            });
        },

        loadData: function () {
            let that = this;
            ajax.httpReq('/customer/index/user-center', 'get', {}).then(function (res) {
                if (res.code == 1) {
                    that.setData({
                        phone: res.data.phone,
                        hyid: res.data.hyid,
                        coupon_num: res.data.coupon_num,
                        gift_num: res.data.gift_num,
                        banner: res.data.banner,
                        code_uri: res.data.code_uri,
                        login_status: res.data.login_status
                    });
                } else {
                    util.toolsFn.toastMsg(res.msg);
                }
            });
        },

        // 页面跳转
        toDetail(e) {
            let { url } = e.currentTarget.dataset;
            uni.navigateTo({
                url: url
            });
        },

        //了解详情
        toMoreDetail() {
            uni.navigateTo({
                url: '/pages/productDesc/index'
            });
        },

        // 查看优惠券
        toCard() {
            uni.navigateTo({
                url: '/pages/coupon/index?coupon_type=2'
            });
        },

        // 查礼品券
        toGift() {
            uni.navigateTo({
                url: '/pages/coupon/index?coupon_type=1'
            });
        },

        copyCodeId: function () {
            uni.setClipboardData({
                data: this.hyid.toString(),

                success(res) {},

                fail(err) {}
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
