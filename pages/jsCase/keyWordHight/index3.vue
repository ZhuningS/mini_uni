<template>
    <view>
        <!-- pages/jsCase/keyWordHight/index3.wxml -->
        <view class="head flex-row">
            <view class="head_input">
                <image src="/static/img/search_icon.png" class="search_icon"></image>
                <input type="text" placeholder="搜索" placeholder-class="place_holder" @input="getValue" :value="search" />
            </view>
            <view class="sha_icon" @tap.stop.prevent="clear_input">取消</view>
        </view>
        <view class="con">
            <view class="item" :data-index="index" v-for="(item, index) in filterList" :key="index">
                <highlight :text="item.name" :key="search" />
            </view>
        </view>
    </view>
</template>

<script>
import highlight from '../components/highlight/index';
// pages/jsCase/keyWordHight/index2.js
export default {
    components: {
        highlight
    },
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
            ]
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

                this.setData({
                    filterList: arr
                });
            } else {
                this.setData({
                    filterList: []
                });
            }
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
@import './index3.css';
</style>
