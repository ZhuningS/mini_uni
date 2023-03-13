<template>
    <view>
        <view class="con">
            <view class="top1">新建收货地址</view>
            <view class="con2 flex-row j_b" @tap="getLocation">
                <view class="con2_text1">收货地址</view>
                <block v-if="add">
                    <view class="con2_input">
                        <input type="text" placeholder="点击选择收货地址" placeholder-class="p_class" disabled />
                        <image class="add_arrow" src="/static/img/add_left.png"></image>
                    </view>
                </block>
                <block v-else>
                    <view class="con2_add">
                        <view class="add_name">{{ addressName }}</view>
                        <view class="add_deta">{{ addressDetail }}</view>
                        <image class="add_arrow" src="/static/img/add_left.png"></image>
                    </view>
                </block>
            </view>

            <view class="con2 flex-row j_b">
                <view class="con2_text1">详细地址</view>
                <view class="con2_input">
                    <input type="text" placeholder="详细地址，例1层101室" placeholder-class="p_class" @input="setInput" data-type="detail" :value="params.detail" />
                </view>
            </view>
            <view class="con2 flex-row j_b">
                <view class="con2_text1">联系人</view>
                <view class="con2_input">
                    <input type="text" placeholder="请填写" placeholder-class="p_class" @input="setInput" data-type="contact" :value="params.contact" />
                </view>
            </view>
            <view class="con2 flex-row j_b">
                <view class="con2_text1">手机号</view>
                <view class="con2_input">
                    <input type="number" placeholder="请填写" placeholder-class="p_class" @input="setInput" data-type="phone" :value="params.phone" maxlength="11" />
                </view>
            </view>
        </view>
        <view :class="'btn bg ' + (can_click ? 'ok' : '')" @tap="subAddress">保存</view>
        <view class="la_tip" v-if="!address_id" @tap="chooseAddress">获取微信收货地址</view>
    </view>
</template>

<script>
// pages/choseAddress/index.js
export default {
    data() {
        return {
            add: true,
            addressName: '',
            addressDetail: '',

            params: {
                detail: '',
                phone: '',
                contact: ''
            },

            //默认不可点击
            can_click: false,

            address_id: ''
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        setInput(e) {
            let { type } = e.currentTarget.dataset;
            let val = e.detail.value;
            let k = `params.${type}`;
            this[`params.${type}`] = val;
            this.inputClick();
        },

        inputClick() {
            let params = this.params;
            let status = true;
            let { addressName, addressDetail } = this;
            if (addressName == '') {
                status = false;
            }

            if (addressDetail == '') {
                status = false;
            }

            if (params.detail == '') {
                status = false;
            }

            if (params.phone == '') {
                status = false;
            }

            if (params.contact == '') {
                status = false;
            }

            this.setData({
                can_click: status
            });
        },

        //获取用户定位授权，地图选点
        getLocation: function () {
            uni.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.userLocation']) {
                        uni.authorize({
                            scope: 'scope.userLocation',
                            success: (res) => {},
                            fail: (res) => {
                                uni.showModal({
                                    title: '提示',
                                    content: '系统需要获取该您当前的定位，请确保您的位置授权已开启',
                                    showCancel: false,
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.openSetting({});
                                        }
                                    }
                                });
                            }
                        });
                    }

                    uni.chooseLocation({
                        success: (res) => {
                            console.log(res);

                            if (res.address != '' && res.name != '') {
                                this.setData({
                                    addressName: res.name,
                                    addressDetail: res.address,
                                    add: false
                                });
                                this.inputClick();
                            }
                        }
                    });
                }
            });
        },

        //获取微信收货地址
        chooseAddress() {
            // scope.address 通讯地址（已取消授权，可以直接调用对应接口）
            uni.chooseAddress({
                success: (res) => {
                    console.log(res);
                    this.setData({
                        addressName: res.detailInfo,
                        addressDetail: res.provinceName + res.cityName + res.countyName,
                        'params.contact': res.userName,
                        'params.phone': res.telNumber,
                        'params.detail': res.detailInfo,
                        add: false
                    });
                    this.inputClick();
                }
            });
        },

        subAddress() {
            let params = this.params;
            let { addressName, addressDetail } = this;
            let tmp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

            if (params.phone != '') {
                if (!tmp.test(params.phone)) {
                    return uni.showToast({
                        title: '请输入正确的手机号',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    });
                }
            } else {
                uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                });
            }

            if (addressName == '' || addressDetail == '') {
                uni.showToast({
                    title: '请选择收货地址',
                    icon: 'none'
                });
                return false;
            }

            if (params.detail == '') {
                uni.showToast({
                    title: '请输入详细地址',
                    icon: 'none'
                });
                return false;
            }

            if (params.contact == '') {
                uni.showToast({
                    title: '请输入联系人',
                    icon: 'none'
                });
                return false;
            }

            let subParams = params;
            subParams.addressName = addressName;
            subParams.addressDetail = addressDetail;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
