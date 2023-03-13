<template>
    <!-- pages/wxCase/radioBox/index.wxml -->
    <!-- 申请退款的弹框 -->
    <view v-if="!showApplyReason">
        <view class="mask" @tap="closeShow"></view>
        <view class="dialog_reason">
            <view class="promise_title">选择退货理由</view>
            <image src="/static/img/close1.png" class="layer_close" @tap="closeShow"></image>
            <scroll-view :scroll-y="true" class="radio" :scroll-into-view="viewId">
                <radio-group class="choose_ways" @change="radioShowReason">
                    <view class="choose_item flex-row j_b" v-for="(item, index) in typeList" :key="item.typeList">
                        <label class="label_radio">
                            <view>{{ item }}</view>
                            <radio :value="index" :checked="index == reason_type" color="#b8e9ec"></radio>
                        </label>
                    </view>
                </radio-group>
                <view class="edit_box" v-if="showEdit" id="edit_box">
                    <textarea placeholder="请输入申请的理由" maxlength="-1"></textarea>
                </view>
            </scroll-view>
            <view class="btn_bo">
                <button class="go_confirm" @tap="submit">确定</button>
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/radioBox/index.js
export default {
    data() {
        return {
            showApplyReason: false,
            //申请理由的弹框
            typeList: ['多拍、发错、 不想要', '缺货', '发货慢', '协商一致退款', '其他', '12312312'],
            reason_type: undefined,
            showEdit: false,
            //展示编辑区域
            viewId: '' //文本框id
        };
    },
    onShow: function () {},
    methods: {
        closeShow() {
            this.setData({
                showApplyReason: true
            });
        },

        //选择理由类型
        radioShowReason(e) {
            let index = e.detail.value;
            this.setData({
                reason_type: index
            });
            this.setData({
                showEdit: index == 4 ? true : false,
                viewId: index == 4 ? 'edit_box' : ''
            });
        },

        // 确定按钮
        submit() {
            this.setData({
                showApplyReason: true
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
