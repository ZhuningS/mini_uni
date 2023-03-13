<template>
    <view>
        <!-- pages/wxCase/checkbox/index.wxml -->
        <scroll-view scroll-x>
            <view class="head head1">
                <view>
                    <checkbox :checked="select_all" @tap="selectall" />
                </view>
                <view>名称</view>
                <view>原价</view>
                <view>现价</view>
                <view>开售时间</view>
                <view>结束时间</view>
            </view>
            <view class="con">
                <checkbox-group @change="checkboxChange">
                    <block v-for="(item, index) in list" :key="index">
                        <view class="head">
                            <view>
                                <checkbox :value="item.name" :checked="item.checked" />
                            </view>
                            <view>{{ item.name }}</view>
                            <view>{{ item.price }}</view>
                            <view>{{ item.sell_price }}</view>
                            <view>{{ item.star_date }}</view>
                            <view>{{ item.end_date }}</view>
                        </view>
                    </block>
                </checkbox-group>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            select_all: false,
            //是否全选
            list: [
                {
                    name: '回家的诱惑',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '鱿鱼游戏',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '主君的太阳',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '地陷',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '寄生虫',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '紧急救援',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '逆行者',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                }
            ],
            choseNames: '' //选中的名字列表
        };
    },
    methods: {
        //全选与反全选
        selectall: function (e) {
            var arr = []; //存放选中id的数组

            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checked = !this.select_all;

                if (this.list[i].checked == true) {
                    // 全选获取选中的值
                    arr = arr.concat(this.list[i].name.split(','));
                }
            }

            this.setData({
                list: this.list,
                select_all: !this.select_all,
                choseNames: arr
            });
        },

        // 单选
        checkboxChange: function (e) {
            console.log(e.detail.value);
            this.setData({
                choseNames: e.detail.value //单个选中的值
            });

            if (this.choseNames.length == this.list.length) {
                this.setData({
                    select_all: true
                });
            } else {
                this.setData({
                    select_all: false
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
