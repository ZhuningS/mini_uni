<template>
    <view>
        <!-- pages/actualPage/switchIndex/index.wxml -->
        <CardSwiper :data="swiperData" @loadmore="loadMore" back="pink"></CardSwiper>
    </view>
</template>

<script>
import CardSwiper from '../components/cardSwiper/cardSwiper';
// pages/actualPage/switchIndex/index.js
export default {
    components: {
        CardSwiper
    },
    data() {
        return {
            currentPage: 0,
            swiperData: [
                {
                    name: '内容1'
                },
                {
                    name: '内容2'
                },
                {
                    name: '内容3'
                }
            ]
        };
    },
    methods: {
        loadMore({ detail }) {
            console.log(detail);

            if (this.currentPage >= 1) {
                return;
            } //模拟总页数为3
            // mock数据（请求api分页数据）

            setTimeout(() => {
                this.currentPage++;
                detail.addToList([
                    {
                        name: `page: ${JSON.parse(JSON.stringify(this.currentPage))}, index: 1`
                    },
                    {
                        name: `page: ${JSON.parse(JSON.stringify(this.currentPage))}, index: 2`
                    },
                    {
                        name: `page: ${JSON.parse(JSON.stringify(this.currentPage))}, index: 3`
                    }
                ]);
            }, 1000);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
