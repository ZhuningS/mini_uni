<template>
    <view class="card-swiper">
        <view
            :data-index="index"
            :style="'background: ' + back + ';'"
            :class="'card-swiper-item curdistance' + (swiperCurIndex + index) + (!!item.slideClass ? item.slideClass : '')"
            @tap="next"
            @touchstart.stop.prevent="touchCard.start"
            @touchmove.stop.prevent="touchCard.move"
            @touchend.stop.prevent="touchCard.end"
            @touchcancel.stop.prevent="touchCard.cancel"
            v-for="(item, index) in swiperData"
            :key="index"
        >
            {{ item.name }}
        </view>
    </view>
</template>

<script>
import TouchEvent from './utils/touchEvent';
export default {
    data() {
        return {
            isLoading: false,
            swiperData: [],
            swiperCurIndex: 0,
            slideClass: '',
            lockSwipe: false
        };
    },
    props: {
        data: Array,
        back: {
            type: String,
            default: '#fff'
        }
    },
    options: {
        multipleSlots: true
    },
    created() {
        this.swiperData = this.swiperData.concat(this.data);
        new TouchEvent(this, 'touchCard', {
            swipe: (evt) => {
                //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
                if (evt.direction === 'Up') {
                    this.next(evt);
                }

                if (evt.direction === 'Down') {
                    this.prev(evt);
                }
            }
        });
    },
    beforeMount() {
        this.setData({
            swiperData: this.data
        });
    },
    methods: {
        next(e) {
            if (this.lockSwipe) {
                return;
            }

            this.lockSwipe = true;

            if (-this.swiperCurIndex >= this.swiperData.length - 1) {
                return (this.lockSwipe = false);
            }

            if (-this.swiperCurIndex >= this.swiperData.length - 3) {
                this.loadMore();
            }

            const index = e.currentTarget.dataset['index'];
            this.swiperData[index].slideClass = ' ani-slide-up';
            this.setData({}, () => {
                this.setData({
                    swiperCurIndex: --this.swiperCurIndex
                });
            });
            setTimeout(() => {
                this.lockSwipe = false;
                this.swiperData[index].slideClass = '';
            }, 590);
        },

        prev(e) {
            const index = e.currentTarget.dataset['index'] - 1;

            if (this.lockSwipe || index < 0) {
                return;
            }

            this.lockSwipe = true;
            this.swiperData[index].slideClass = ' ani-slide-down';
            this.setData({
                swiperCurIndex: ++this.swiperCurIndex
            });
            setTimeout(() => {
                this.lockSwipe = false;
                this.swiperData[index].slideClass = '';
            }, 590);
        },

        loadMore() {
            this.isLoading = true;
            this.$emit('loadmore', {
                detail: {
                    addToList: this.addToList.bind(this)
                }
            });
        },

        addToList(list) {
            this.isLoading = false;
            this.setData({
                swiperData: this.swiperData.concat(list)
            });
        }
    }
};
</script>
<style>
@import './cardSwiper.css';
</style>
