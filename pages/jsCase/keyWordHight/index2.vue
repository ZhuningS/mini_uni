<template>
    <view>
        <!-- pages/jsCase/keyWordHight/index2.wxml -->
        <view class="head flex-row">
            <view class="head_input">
                <image src="/static/img/search_icon.png" class="search_icon"></image>
                <input type="text" placeholder="搜索" placeholder-class="place_holder" @input="getValue" :value="search" />
            </view>
            <view class="sha_icon" @tap.stop.prevent="clear_input">取消</view>
        </view>
        <view class="con">
            <view class="item" :data-index="index" v-for="(item, index) in filterList" :key="index">
                <text :class="i0.set && 'ative'" v-for="(i0, index1) in item.list" :key="i0.idx">{{ i0.val }}</text>
            </view>
        </view>
    </view>
</template>

<script>
// pages/jsCase/keyWordHight/index2.js
export default {
    data() {
        return {
            search: '',
            filterList: [],

            list: [
                {
                    name: ' 上海'
                },
                {
                    name: ' 江苏'
                },
                {
                    name: ' 江苏南京'
                },
                {
                    name: ' 江苏宿迁'
                },
                {
                    name: ' 江苏苏州'
                },
                {
                    name: ' 四川'
                }
            ],

            i0: {
                set: '',
                idx: '',
                val: ''
            }
        };
    },
    methods: {
        getValue(e) {
            let val = e.detail.value;
            this.setData({
                search: val
            });

            if (val.length > 0) {
                let arr = [];

                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].name.indexOf(val) > -1) {
                        arr.push({
                            name: this.list[i].name
                        });
                    }
                }

                this.setData(
                    {
                        filterList: arr
                    },
                    () => {
                        this.getHighlight(arr, val);
                    }
                );
            } else {
                this.setData({
                    filterList: []
                });
            }
        },

        /**
         * 关键字高亮处理
         * @param { String } datalist - 文本
         * @param { String } val - 关键字
         */
        getHighlight(datalist, val) {
            datalist.forEach((item) => {
                let textList = item.name.split('');
                let keyList = val.split('');
                let list = [];

                for (let i = 0; i < textList.length; i++) {
                    let obj = {
                        set: false,
                        val: textList[i]
                    };
                    list.push(obj);
                }

                for (let k = 0; k < keyList.length; k++) {
                    list.forEach((i0) => {
                        if (i0.val === keyList[k]) {
                            i0.set = true;
                        }
                    });
                }

                item.list = list;
            });
            this.setData({
                filterList: datalist
            });
        },

        clear_input() {
            this.setData({
                search: '',
                filterList: []
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
