<template>
    <view>
        <!-- pages/wxCase/showAction/index.wxml -->
        <view class="head">
            <view class="head_search flex-row">
                <image src="/static/img/search.png" class="head_s_icon"></image>
                <input placeholder="搜索" placeholder-class="p_class" class="head_ipt" />
            </view>
            <view class="flex-row j_a head_sel">
                <picker @change="change" data-checked="picker_chose1" data-type="storeList" data-value="store" :value="store" :range="storeList" range-key="name">
                    <view class="flex-row j_c">
                        <tetx class="text_ellipsis">{{ store }}</tetx>
                        <image :src="picker_chose1 ? '/img/open_up.png' : '/img/clolse_down.png'" class="arrow"></image>
                    </view>
                </picker>
                <picker @change="change" data-checked="picker_chose2" data-type="themeList" data-value="theme" :value="theme" :range="themeList" range-key="name">
                    <view class="flex-row j_c">
                        <tetx class="text_ellipsis">{{ theme }}</tetx>
                        <image :src="picker_chose2 ? '/img/open_up.png' : '/img/clolse_down.png'" class="arrow"></image>
                    </view>
                </picker>
                <picker @change="change" data-checked="picker_chose3" data-type="statusList" data-value="status" :value="status" :range="statusList" range-key="name">
                    <view class="flex-row j_c">
                        <tetx class="text_ellipsis">{{ status }}</tetx>
                        <image :src="picker_chose3 ? '/img/open_up.png' : '/img/clolse_down.png'" class="arrow"></image>
                    </view>
                </picker>
            </view>
            <view class="flex-row j_b">
                <picker @change="change" data-type="dateList" data-value="date" :value="date" :range="dateList" range-key="name">
                    <view class="flex-row head_date">
                        <text>{{ date }}</text>
                        <image src="/static/img/down_icon.png" class="down_year"></image>
                    </view>
                </picker>
                <view class="head_ac" @tap.stop.prevent="showAction">{{ show_action ? '取消' : '管理' }}</view>
            </view>
        </view>
        <view class="con">
            <!-- 有数据 -->
            <block v-if="hasData">
                <checkbox-group @change="actionChange">
                    <block v-for="(item, index) in list" :key="item.list">
                        <label>
                            <view class="flex-row">
                                <checkbox :value="item.value" :disabled="item.disabled" :checked="item.checked" v-if="show_action" />
                                <view class="c_item flex">
                                    <image src="/static/img/star-o.png" class="act_icon"></image>
                                    <view>
                                        <view class="item_title">123</view>
                                        <view class="item_date">开始时间：2012.11.20 15:27</view>
                                        <view class="flex-row j_b item_theme">
                                            <text class="text_ellipsis theme_text">主题：111</text>
                                            <text>当前报名人数：20</text>
                                        </view>
                                        <view>参与111</view>
                                    </view>
                                    <!-- 状态 -->
                                    <view :class="'status ' + (item.status == 0 ? 'ing' : 'over')">{{ item.status == 0 ? '进行中' : '已超时' }}</view>
                                </view>
                            </view>
                        </label>
                    </block>
                </checkbox-group>
            </block>
            <!-- 无数据 -->
            <block v-else></block>
        </view>

        <!-- 底部按钮 -->
        <view class="fix_bottom flex-row">
            <view class="flex-row j_b btn_list">
                <view>已选{{ list_num }}个</view>
                <view class="flex-row">
                    <view :class="'btn ' + (list_num > 0 ? 'btn_ative' : '')">按钮2</view>
                    <view :class="'btn  ' + (list_num > 0 ? 'btn_ative' : '')">按钮一</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // picker的上箭头下箭头
            picker_chose1: false,
            picker_chose2: false,
            picker_chose3: false,
            hasData: true,
            storeList: [
                {
                    name: '门店1'
                },
                {
                    name: '门店3'
                },
                {
                    name: '门店23'
                },
                {
                    name: '门店2221'
                },
                {
                    name: '门店2222221'
                }
            ],
            store: '选项一',
            //选择的门店
            themeList: [
                {
                    name: '主题1'
                },
                {
                    name: '主题133'
                },
                {
                    name: '主题12切4234'
                },
                {
                    name: '2主题1'
                },
                {
                    name: '玩儿主题1'
                }
            ],
            theme: '选项二',
            //选择的主题
            statusList: [
                {
                    name: '状态一'
                },
                {
                    name: '状态234'
                },
                {
                    name: '状态234一'
                },
                {
                    name: '状态32423一'
                },
                {
                    name: '状态23423423一'
                }
            ],
            status: '选项三',
            //选择的状态
            dateList: [
                {
                    name: '2021年10月'
                },
                {
                    name: '2021年11月'
                },
                {
                    name: '2021年12月'
                },
                {
                    name: '2021年9月'
                }
            ],
            date: '选择时间',
            //选择的时间
            show_action: false,
            //是否展示操作
            list_num: 0,
            //已选中的个数
            list: [
                {
                    value: 1,
                    status: 0,
                    disabled: false
                },
                {
                    value: 2,
                    status: 1,
                    disabled: false
                },
                {
                    value: 3,
                    status: 0,
                    disabled: false
                },
                {
                    value: 4,
                    status: 1,
                    disabled: true
                },
                {
                    value: 5,
                    status: 0,
                    disabled: true
                },
                {
                    value: 6,
                    status: 1,
                    disabled: false
                }
            ]
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    methods: {
        change: function (e) {
            let param = e.currentTarget.dataset.type;
            let data = e.currentTarget.dataset.value;
            let index = e.detail.value;
            let dataArr = this[param];
            let checked = e.currentTarget.dataset.checked;
            this[e.currentTarget.dataset.checked] = !this[checked];

            if (dataArr[index] !== undefined) {
                this[e.currentTarget.dataset.value] = dataArr[index].name;
            }
        },

        showAction() {
            this.setData({
                show_action: !this.show_action
            });

            if (!this.show_action) {
                this.list.forEach((item) => {
                    item.checked = false;
                });
                this.setData({
                    list_num: 0,
                    list: this.list
                });
            }
        },

        actionChange(e) {
            console.log('checkbox发生change事件，携带value值为：', e.detail.value);
            let { list } = this;
            let va = e.detail.value;
            console.log(va);
            list.forEach((item, index) => {
                item.checked = false;
                va.forEach((i0) => {
                    if (item.value == i0) {
                        item.checked = true;
                    }
                });
            });
            this.setData({
                list,
                list_num: va.length
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
