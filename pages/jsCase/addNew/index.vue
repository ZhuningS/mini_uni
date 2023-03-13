<template>
    <view>
        <!-- pages/actCreate/index.wxml -->
        <view class="container">
            <view class="act_title">选项</view>
            <view class="act_box">
                <view class="act_item flex j_b">
                    <view class="nowp">
                        <text class="require">*</text>
                        选项0：
                    </view>
                    <view class="flex-row act_right" @tap.stop.prevent="choseItem" data-url="/pages/jsCase/scList/index">
                        <text v-if="!theme.name">请选择</text>
                        <text v-else class="sel_text">{{ theme.name }}</text>
                        <image src="/static/img/de_icon2.png" class="right_arr" />
                    </view>
                </view>
                <view class="act_item flex j_b">
                    <view class="nowp">
                        <text class="require">*</text>
                        选项一：
                    </view>
                    <picker @change="bindPickerChange" :value="sel1" :range="list" range-key="name">
                        <view class="flex-row act_right">
                            <text v-if="!sel1">请选择</text>
                            <text v-else class="sel_text">{{ sel1 }}</text>
                            <image src="/static/img/de_icon2.png" class="right_arr" />
                        </view>
                    </picker>
                </view>
                <view class="act_item flex j_b">
                    <view class="nowp">
                        <text class="require">*</text>
                        开始时间：
                    </view>
                    <picker mode="date" fileds="day" :value="date" @change="bindDateChange">
                        <view class="flex-row act_right">
                            <text v-if="!date">请选择</text>
                            <text v-else class="sel_text">{{ date }}</text>
                            <image src="/static/img/de_icon2.png" class="right_arr" />
                        </view>
                    </picker>
                </view>
                <view class="flex-row j_b mb24">
                    <view class="act_title">选项新增0</view>
                    <view class="flex-row" @tap.stop.prevent="addItems" data-type="list1">
                        <image src="/static/img/add.png" class="act_add" />
                        <text class="add_text">添加选项</text>
                    </view>
                </view>
                <block v-if="list1.length > 0">
                    <block v-for="(item, index) in list1" :key="index">
                        <view>
                            <view class="flex-row j_b mb24">
                                <view class="act_store">选项{{ index + 1 }}</view>
                                <view class="flex-row" @tap.stop.prevent="delItems" :data-index="index" data-type="list1">
                                    <image src="/static/pages/jsCase/img/del.png" class="act_del" />
                                    <text class="del_text">刪除</text>
                                </view>
                            </view>
                            <view class="act_item flex j_b">
                                <view>
                                    <text class="require">*</text>
                                    选项一：
                                </view>
                                <picker>
                                    <view class="flex-row act_right">
                                        <text>请选择</text>
                                        <image src="/static/img/de_icon2.png" class="right_arr" />
                                    </view>
                                </picker>
                            </view>
                            <view class="act_item flex j_b">
                                <view>
                                    <text class="require">*</text>
                                    选项2：
                                </view>
                                <picker>
                                    <view class="flex-row act_right">
                                        <text>请选择</text>
                                        <image src="/static/img/de_icon2.png" class="right_arr" />
                                    </view>
                                </picker>
                            </view>
                        </view>
                    </block>
                </block>
                <view class="flex-row j_b mb24">
                    <view class="act_title">选项新增1</view>
                    <view class="flex-row" @tap.stop.prevent="addItems" data-type="list2">
                        <image src="/static/img/add.png" class="act_add" />
                        <text class="add_text">添加选项</text>
                    </view>
                </view>
                <block v-if="list2.length > 0">
                    <block v-for="(item, index) in list2" :key="index">
                        <view>
                            <view class="flex-row j_b mb24">
                                <view class="act_store">选项{{ index + 1 }}</view>
                                <view class="flex-row" @tap.stop.prevent="delItems" :data-index="index" data-type="list2">
                                    <image src="/static/pages/jsCase/img/del.png" class="act_del" />
                                    <text class="del_text">刪除</text>
                                </view>
                            </view>
                            <view class="act_item flex j_b">
                                <view>
                                    <text class="require">*</text>
                                    选项一
                                </view>
                                <picker>
                                    <view class="flex-row act_right">
                                        <text>请选择</text>
                                        <image src="/static/img/de_icon2.png" class="right_arr" />
                                    </view>
                                </picker>
                            </view>
                            <view class="act_item flex j_b">
                                <view>
                                    <text class="require">*</text>
                                    请输入：
                                </view>
                                <input placeholder="请输入" placeholder-class="p_class" />
                            </view>
                        </view>
                    </block>
                </block>
            </view>
        </view>
        <view class="fix_bottom flex">
            <view>保存草稿</view>
            <view>创建</view>
            <view>创建并提交</view>
            <view>下一步</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            theme: {
                name: ''
            },

            list1: [],

            //，门店与导购
            list2: [],

            //费用
            list: [
                {
                    name: '选项一'
                },
                {
                    name: '选项2'
                },
                {
                    name: '选项3'
                }
            ],

            sel1: '',
            date: ''
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        bindPickerChange: function (e) {
            this.setData({
                sel1: this.list[e.detail.value].name
            });
        },

        bindDateChange(e) {
            this.setData({
                date: e.detail.value
            });
        },

        /*
    添加门店
    */
        addItems(e) {
            let { type } = e.currentTarget.dataset;
            let list = this[type];
            list.push({});
            this.type = list;
        },

        /*
    删除门店
    */
        delItems(e) {
            let { index, type } = e.currentTarget.dataset;
            let list = this[type];
            list.splice(index, 1);
            this.type = list;
        },

        /**
         * 页面跳转
         * @param {*} e
         */
        choseItem(e) {
            let { url } = e.currentTarget.dataset;
            uni.navigateTo({
                url: url
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
