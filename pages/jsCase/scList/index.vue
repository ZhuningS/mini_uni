<template>
    <view>
        <!-- pages/jsCase/scList/index.wxml -->
        <view class="head">
            <view class="head_search flex-row">
                <image src="/static/img/search.png" class="head_s_icon"></image>
                <input placeholder="搜索活动名称" placeholder-class="p_class" class="head_ipt" @confirm="search" />
            </view>
        </view>
        <view class="con flex">
            <scroll-view :scroll-y="true" class="c_left">
                <block v-for="(item, index) in 20" :key="item.tab_list">
                    <view @tap.stop.prevent="choseTab" :data-index="index" :class="'flex-column j_c tab_item ' + (chosed_tab == index ? 'ative' : '')">选项{{ index + 1 }}</view>
                </block>
            </scroll-view>
            <view :scroll-y="true" class="c_right">
                <scroll-view :scroll-y="true" class="c_right_sc">
                    <radio-group @change="themeChange">
                        <view class="theme_box">
                            <block v-for="(item, index) in theme_list" :key="item.theme_list">
                                <label>
                                    <view class="theme_item">
                                        <view class="t_title flex j_b">
                                            主题：{{ item.name }}
                                            <!-- 选择 -->
                                            <radio :checked="item.checked" :value="item.id"></radio>
                                        </view>
                                        <view class="t_context">活动内容：{{ item.content }}</view>
                                    </view>
                                </label>
                            </block>
                        </view>
                    </radio-group>
                </scroll-view>
                <view class="c_right_bottom">
                    <view :class="'btn ' + (chosed_theme && 'btn_ative')" @tap.stop.prevent="chosed_theme && 'submit'">确认选择</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            chosed_tab: '',
            chosed_theme: '',

            //选中的主题
            theme_list: [
                {
                    id: 1,
                    name: '就按时法苏发生绝对是僵尸粉金黄色的费是的分',
                    content: '主是大好人法闪电黄蜂烧开后打飞机数据库的红富士康绝代风华水电费是第三方的'
                },
                {
                    id: 2,
                    name: '嘻嘻哈哈哈',
                    content: '水电费还是得防火纱看见了的发谁看得见风和水电费还是得发结束动画飞上来的翻山倒海就扣分水电费 '
                }
            ],

            theme: ''
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
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

        themeChange(e) {
            console.log('radio发生change事件，携带value值为：', e.detail.value);
            this.setData({
                chosed_theme: e.detail.value
            });
        },

        /**
         * 确认选择按钮
         */
        submit() {
            let { chosed_theme, theme_list } = this;
            var theme = theme_list.filter((item) => {
                return item.id == chosed_theme;
            })[0];
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2]; // 前一个页面

            prePage.setData(
                {
                    theme
                },
                () => {
                    uni.navigateBack({
                        delta: -1
                    });
                }
            );
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
