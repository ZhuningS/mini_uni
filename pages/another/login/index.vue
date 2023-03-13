<template>
    <view>
        <!-- pages/another/login/index.wxml -->
        <image class="logo_icon" src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"></image>
        <view class="choose_box flex j_c">
            <view :class="'cbtn ' + (currentTab == 0 ? '' : 't_fss')" data-id="0" @tap="clickTab">选项一</view>
            <view :class="'cbtn ' + (currentTab == 1 ? '' : 't_fss')" data-id="1" @tap="clickTab">选项二</view>
        </view>

        <view class="con" v-if="acc">
            <block v-if="currentTab == 1">
                <input
                    :class="sel_phone ? 'border_bot1' : ''"
                    data-type="1"
                    type="number"
                    placeholder="请输入手机号"
                    placeholder-class="p_class"
                    @focus="bindfocus"
                    @blur="bindblur"
                    @input="bindPhone"
                    :value="phone"
                    maxlength="11"
                />
                <input
                    :class="sel_pass ? 'border_bot1' : ''"
                    data-type="2"
                    type="password"
                    placeholder="请输入密码"
                    placeholder-class="p_class"
                    @focus="bindfocus"
                    @blur="bindblur"
                    @input="bindPass"
                    :value="pass"
                />
                <image :class="'phone ' + (show == 1 ? 'show' : '')" data-type="1" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
                <image :class="'pass ' + (show == 2 ? 'show' : '')" data-type="2" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
            </block>
            <block v-else>
                <input
                    :class="sel_phone ? 'border_bot1' : ''"
                    data-type="1"
                    type="number"
                    placeholder="请输入账号"
                    placeholder-class="p_class"
                    @focus="bindfocus"
                    @blur="bindblur"
                    @input="bindPhone"
                    :value="phone"
                    maxlength="11"
                />
                <input
                    :class="sel_pass ? 'border_bot1' : ''"
                    data-type="2"
                    type="password"
                    placeholder="请输入密码"
                    placeholder-class="p_class"
                    @focus="bindfocus"
                    @blur="bindblur"
                    @input="bindPass"
                    :value="pass"
                />
                <image :class="'phone ' + (show == 1 ? 'show' : '')" data-type="1" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
                <image :class="'pass ' + (show == 2 ? 'show' : '')" data-type="2" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
            </block>
        </view>

        <view class="con" v-else>
            <input
                :class="sel_phone ? 'border_bot1' : ''"
                data-type="1"
                type="number"
                placeholder="请输入手机号"
                placeholder-class="p_class"
                @focus="bindfocus"
                @blur="bindblur"
                @input="bindPhone"
                :value="phone"
                maxlength="11"
            />
            <input
                :class="sel_pass ? 'border_bot1' : ''"
                data-type="2"
                type="number"
                placeholder="请输入验证码"
                placeholder-class="p_class"
                @focus="bindfocus"
                @blur="bindblur"
                @input="bindCode"
                :value="ver_code"
                maxlength="6"
            />
            <image :class="'code ' + (show == 1 ? 'show' : '')" data-type="1" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
            <image :class="'pass ' + (show == 2 ? 'show' : '')" data-type="2" src="/static/img/login_close.png" @tap.stop.prevent="phone_empty"></image>
            <button
                :class="'con_btn ' + (codeSend == 1 ? 'veri_ok' : '')"
                style="width: 200rpx"
                @tap="parseEventDynamicCode($event, codeSend == 1 ? 'sendCode' : '')"
                :disabled="smsFlag"
            >
                {{ sendTime }}
            </button>
        </view>

        <view class="change" v-if="acc">
            <block v-if="currentTab == 1">
                <view class="jump" @tap="changeCode" data-type="2">手机验证码登录</view>
                <view class="forget2" @tap="changePass">忘记密码？</view>
            </block>
            <block v-else>
                <view class="forget" @tap="changePass">忘记密码？</view>
            </block>
        </view>

        <view class="change" v-else>
            <view class="jump" @tap="changeCode" data-type="1">账号密码登录</view>
        </view>

        <!-- 登录按钮 -->
        <view class="con">
            <block v-if="is_can_click">
                <button class="login_btn btn_ok" @tap="btnLogin">登录</button>
            </block>
            <block v-else>
                <button class="login_btn btn_no">登录</button>
            </block>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            sel_pass: false,
            sel_phone: false,
            sel_code: false,
            phone: '',
            pass: '',
            ver_code: '',
            is_can_click: false,
            show: 0,
            acc: true,
            codeSend: 0,
            smsFlag: false,
            sendTime: '获取验证码',
            snsMsgWait: 60,
            loginType: 1,
            ifLogout: '',
            ifClick: true,
            sendBtn: true,
            currentTab: 0
        };
    },
    methods: {
        clickTab(e) {
            this.setData({
                currentTab: e.currentTarget.dataset.id,
                acc: true
            });
        },

        //前往忘记密码
        changePass: function () {
            uni.navigateTo({
                url: '/pages/forgotPwd/index'
            });
        },

        // 前往注册页
        goReg: function (e) {
            uni.navigateTo({
                url: '/pages/register/index'
            });
        },

        //获取焦点
        bindfocus: function (e) {
            let type = e.currentTarget.dataset.type;
            let val = e.detail.value;
            this.setData({
                sel_phone: type == 1 ? true : false,
                sel_pass: type == 2 ? true : false,
                show: val != '' ? type : 0
            });
        },

        //失去焦点
        bindblur: function () {
            let that = this;
            that.setData({
                sel_pass: false,
                sel_phone: false,
                show: 0
            });
        },

        //手机号
        bindPhone: function (e) {
            let val = e.detail.value;
            let type = 0;

            if (val != '') {
                type = 1;
            }

            this.setData({
                phone: e.detail.value,
                show: type,
                codeSend: type
            });
            this.inputClick();
        },

        //密码
        bindPass: function (e) {
            let val = e.detail.value;
            let type = 0;

            if (val != '') {
                type = 2;
            }

            this.setData({
                pass: e.detail.value,
                show: type
            });
            this.inputClick();
        },

        //验证码
        bindCode: function (e) {
            this.setData({
                ver_code: e.detail.value,
                show: e.target.dataset.type
            });
            this.inputClick();
        },

        //切换登录方式
        changeCode: function (e) {
            let type = e.currentTarget.dataset.type;
            let val = this.phone; //console.log(this)

            this.setData({
                acc: type == 2 ? false : true,
                pass: '',
                ver_code: '',
                show: 0,
                codeSend: val != '' ? 1 : 0,
                loginType: type
            });
            this.inputClick();
        },

        //验证不为空
        inputClick: function (e) {
            let status = true;

            if (this.phone == '') {
                status = false;
            }

            if (this.loginType == 1) {
                if (this.pass == '') {
                    status = false;
                }
            } else {
                if (this.ver_code == '') {
                    status = false;
                }
            }

            this.setData({
                is_can_click: status
            });
        },

        //清空
        phone_empty: function (e) {
            let type = e.currentTarget.dataset.type;
            this.setData({
                phone: type == 1 ? '' : this.phone,
                pass: type == 2 ? '' : this.pass,
                ver_code: '',
                show: 0,
                codeSend: 0
            });
            this.inputClick();
        },

        // 获取验证码
        sendCode: function () {
            //60秒后重新获取验证码
            let phone = this.phone;
            let tmp = /^1[0-9]{10}$/;
            let that = this;

            if (!tmp.test(phone)) {
                return util.toolsFn.toastMsg('请输入正确的手机号！', 'none');
            }

            if (that.sendBtn) {
                that.sendBtn = false;
                ajax.httpReq(
                    '/retailer/login/send-verify-code',
                    'post',
                    {
                        phone: phone
                    },
                    true
                ).then(function (res) {
                    that.resetBtn();
                });
            }
        },

        /**
         * 短信发送按钮倒计时
         */
        resetBtn: function () {
            var inter = setInterval(
                function () {
                    this.setData({
                        smsFlag: true,
                        sendTime: '(' + this.snsMsgWait + 's)重新获取',
                        snsMsgWait: this.snsMsgWait - 1
                    });

                    if (this.snsMsgWait < 0) {
                        clearInterval(inter);
                        this.setData({
                            sendTime: '获取验证码',
                            snsMsgWait: 60,
                            smsFlag: false,
                            sendBtn: true
                        });
                    }
                }.bind(this),
                1000
            );
        },

        /**
         * 登录方法
         */
        btnLogin() {
            let phone = this.phone;
            let pass = this.pass;
            let ver_code = this.ver_code;
            let loginType = this.loginType;
            let currentTab = this.currentTab;
            let that = this;
            let tmp = /^1[0-9]{10}$/;

            if (!tmp.test(phone) && currentTab == 1) {
                return util.toolsFn.toastMsg('请输入正确的手机号！', 'none');
            }

            if (that.ifClick) {
                that.ifClick = false;
                uni.getUserProfile({
                    desc: '用于完善会员资料',
                    success: (res) => {
                        var avatarUrl = res.userInfo.avatarUrl;
                        var nickName = res.userInfo.nickName;
                        uni.login({
                            success(res) {
                                if (res.code) {
                                    if (loginType == 1) {
                                        var dataJson = {
                                            wx_code: res.code,
                                            avatar: avatarUrl,
                                            nickname: nickName,
                                            login_account: phone,
                                            password: pass,
                                            login_type: loginType,
                                            role_type: currentTab
                                        };
                                    } else {
                                        var dataJson = {
                                            wx_code: res.code,
                                            avatar: avatarUrl,
                                            nickname: nickName,
                                            login_account: phone,
                                            ver_code: ver_code,
                                            login_type: loginType,
                                            role_type: currentTab
                                        };
                                    }

                                    ajax.httpReq('/retailer/login/confirm-login', 'post', dataJson, true).then(function (res) {
                                        if (res.code == 1) {
                                            if (res.data.error_jump == 0) {
                                                that.ifClick = true;
                                                uni.setStorageSync('access_token', res.data.token);
                                                uni.switchTab({
                                                    url: '/pages/index/index'
                                                });
                                            } else if (res.data.error_jump == 1) {
                                                //待审核
                                                util.toolsFn.jump('/pages/regAss/index?type=' + res.data.error_jump);
                                            } else if (res.data.error_jump == 2) {
                                                //审核不通过
                                                util.toolsFn.jump('/pages/regAss/index?type=' + res.data.error_jump + '&token=' + res.data.token); //完善信息
                                            } else if (res.data.error_jump == 3) {
                                                util.toolsFn.jump('/pages/ranchInfoDetails/index?token=' + res.data.token);
                                            }
                                        } else {
                                            that.ifClick = true;
                                            util.toolsFn.toastMsg(res.msg, 'none');
                                        }
                                    });
                                } else {
                                    that.ifClick = true;
                                    util.toolsFn.toastMsg('微信code获取失败！', 'none');
                                }
                            }
                        });
                    },

                    fail(res) {
                        that.ifClick = true;
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
