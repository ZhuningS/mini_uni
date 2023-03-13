<template>
    <!-- pages/another/videosSwitch/index.wxml -->
    <view class="content">
        <view class="video" v-if="videos.length > 0" v-for="(item, index) in videos" :key="index">
            <block v-if="item.videoHidden">
                <!-- 背景 -->
                <image class="poster" :src="item.poster" />
                <!-- 开始按钮 -->
                <view class="play" @tap.stop.prevent="play" :data-index="index">
                    <image src="https://js.51dongshi.com/index/images/icon_play_smaller.png"></image>
                </view>
                <!-- 标题 -->
                <view class="title">{{ item.title }}</view>
            </block>

            <!-- 视频 -->

            <video
                :id="'myVideo' + item.id"
                :src="item.src"
                :style="'left: ' + (item.videoHidden ? '-2000rpx' : '0rpx') + ';'"
                poster=""
                controls
                object-fit="cover"
                @loadedmetadata.stop.prevent="bindloadedmetadata"
                @pause.stop.prevent="bindpause"
                @ended.stop.prevent="bindended"
                @play.stop.prevent="bindplay"
                :data-index="index"
                :data-id="item.id"
            ></video>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            videos: [
                {
                    // 用于区分实例绑定
                    id: 1,
                    // 视频封面
                    poster: 'https://i.postimg.cc/FsKgQ95T/yy.png',
                    // 视频地址
                    src: 'https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4',
                    // 视频标题
                    title: '元旦的来历',
                    // 视频实例
                    myVideo: '',
                    // 是否隐藏视频
                    videoHidden: true
                },
                {
                    id: 2,
                    poster: 'https://i.postimg.cc/FsKgQ95T/yy.png',
                    src: 'https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4',
                    title: '圣诞节的由来',
                    myVideo: '',
                    videoHidden: true
                },
                {
                    id: 3,
                    poster: 'https://i.postimg.cc/j57Lwdy3/123.png',
                    src: 'https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4',
                    title: '平安夜的由来',
                    myVideo: '',
                    videoHidden: true
                }
            ]
        };
    },
    methods: {
        play(e) {
            this.videoEven('点击播放', e);
        },

        bindloadedmetadata(e) {
            this.videoEven('监听加载完成', e);
        },

        bindpause(e) {
            this.videoEven('监听暂停', e);
        },

        bindended(e) {
            this.videoEven('监听播放完毕', e);
        },

        bindplay(e) {
            this.videoEven('监听播放', e);
        },

        // 视频事件总控制
        videoEven(type, e) {
            let videos = this.videos;
            let id = e.currentTarget.dataset.id;
            let index = e.currentTarget.dataset.index;

            switch (type) {
                case '点击播放':
                    videos[index].myVideo.play();
                    break;

                case '监听加载完成':
                    videos[index].myVideo = uni.createVideoContext('myVideo' + id);
                    break;

                case '监听暂停':
                    videos[index].videoHidden = true;
                    break;

                case '监听播放完毕':
                    videos[index].videoHidden = true; // 播放下一个视频逻辑----------------------

                    if (index + 1 != videos.length) {
                        // 不是最后一个视频
                        this.videos[index + 1].myVideo.play(); // 继续播放下一个
                    } // 播放下一个视频逻辑----------------------

                    break;

                case '监听播放':
                    videos[index].videoHidden = false; // 暂停其他视频逻辑----------------------

                    for (let item of videos) {
                        if (item.id != id) {
                            item.myVideo.pause();
                        }
                    } // 暂停其他视频逻辑----------------------

                    break;
            }

            this.setData({
                videos
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
