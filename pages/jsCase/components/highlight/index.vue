<template>
    <view>
        <!-- pages/jsCase/components/highlight/index.wxml -->
        <text :class="item.set && 'ative'" v-for="(item, index) in highlightList" :key="index">{{ item.val }}</text>
    </view>
</template>

<script>
// pages/jsCase/components/highlight/index.js
export default {
    data() {
        return {
            highlightList: [] //处理后的数据
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        text: String,
        key: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 非空过滤
        changeText(e) {
            if (e.length > 0 && this.text.indexOf(e) > -1) {
                this.setHighlight(this.text, e);
            }
        },

        /**
         * 关键字高亮处理
         * @param { String } text - 文本
         * @param { String } key - 关键字
         */
        setHighlight(text, key) {
            let textList = text.split('');
            let keyList = key.split('');
            let list = [];

            for (let i = 0; i < textList.length; i++) {
                let obj = {
                    set: false,
                    val: textList[i]
                };
                list.push(obj);
            }

            for (let k = 0; k < keyList.length; k++) {
                list.forEach((item) => {
                    if (item.val === keyList[k]) {
                        item.set = true;
                    }
                });
            }

            this.setData({
                highlightList: list
            });
        }
    },
    watch: {
        key: {
            handler: function (e) {
                if (e.length > 0 && this.text.indexOf(e) > -1) {
                    this.setHighlight(this.text, e);
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
