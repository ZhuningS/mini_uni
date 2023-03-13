<template>
    <!-- pages/wxCase/exlipText/index2.wxml -->
    <view class="readmore">
        <view class="overview">
            <view class="title-tip">今日NBA头条</view>
            <view :class="'content ' + (readmore.status ? 'hidden' : '')">
                比赛还没结束，罗斯还是比赛的主宰，他突破上篮打进反超， 篮下的勾手命中为森林狼取得2分的领先，罗斯得到了全场球迷MVP的喊声，看哭了苍天。
                最后时刻，罗斯站上罚球线，两次罚球稳稳的命中，50分，新的里程碑，罗斯成为这个夜晚的主宰。
                就在暂停的时候，罗斯把所有队友聚集起来，激励着大家，看出罗斯的领袖气质。最后一次防守，又是罗斯，他封盖了爵士的最后一次出手，为森林狼拿到了比赛的胜利。
            </view>
            <view class="readmore-tip" @tap="toggle">{{ readmore.tip }}</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            readmore: {
                status: false,
                tip: '查看更多'
            }
        };
    },
    onReady() {
        const query = uni.createSelectorQuery();
        let self = this;
        query
            .select('.content')
            .boundingClientRect(function (res) {
                const lineHeight = 18;
                const height = res.height;
                const status = 'readmore.status';
                self[readmore.status] = height / lineHeight > 3;
            })
            .exec();
    },
    methods: {
        toggle() {
            const status = this.readmore.status;
            this.setData({
                readmore: {
                    status: !status,
                    tip: status ? '收起' : '更多'
                }
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
