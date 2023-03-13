<template>
    <view>
        <!-- pages/another/mroevideos/index.wxml -->
        <view class="c1_box">
            <view class="v1_box" @tap.stop.prevent="showPlaybtn" data-type="v1">
                <video
                    id="myVideo0"
                    :show-play-btn="true"
                    :show-center-play-btn="false"
                    :picture-in-picture-show-progress="true"
                    play-btn-position="center"
                    poster="https://i.postimg.cc/j57Lwdy3/123.png"
                    src="https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4"
                    :show-mute-btn="true"
                    :muted="true"
                    @ended="showEndBtn"
                    data-type="v1"
                ></video>
                <!-- 暂停按钮 -->
                <image src="/static/img/pause.png" class="pause_icon" @tap.stop.prevent="tobePlay" data-type="v1" v-if="v1_play"></image>
                <!-- 播放按钮 -->
                <image src="/static/img/play.png" class="pause_icon" @tap.stop.prevent="tobePause" data-type="v1" v-if="!v1_pause"></image>
            </view>
        </view>

        <view class="c1_box">
            <view class="v1_box" @tap.stop.prevent="showPlaybtn" data-type="v2">
                <video
                    id="myVideo1"
                    :show-play-btn="false"
                    :show-center-play-btn="false"
                    danmu-btn
                    :enable-danmu="true"
                    :danmu-list="danmuList"
                    :picture-in-picture-show-progress="true"
                    poster="https://i.postimg.cc/FsKgQ95T/yy.png"
                    src="https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4"
                    :picture-in-picture-mode="['push', 'pop']"
                    :show-mute-btn="true"
                    :muted="true"
                    @ended="showEndBtn"
                    data-type="v2"
                ></video>
                <!-- 暂停按钮 -->
                <image src="/static/img/pause.png" class="pause_icon" @tap.stop.prevent="tobePlay" data-type="v2" v-if="v2_play"></image>
                <!-- 播放按钮 -->
                <image src="/static/img/play.png" class="pause_icon" @tap.stop.prevent="tobePause" data-type="v2" v-if="!v2_pause"></image>
            </view>
        </view>
        <input placeholder="请输入弹幕的内容" @input="getValue" class="i_ipt" :value="danmu" />
        <view class="b_btn" @tap.stop.prevent="bindSendDanmu">发送弹幕</view>
        <!-- 
  video的属性：
  controls：是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
  autoplay:自动播放
  loop：是否循环
  muted：是否静音
  show-play-btn：是否显示视频底部控制栏的播放按钮
  show-center-play-btn：是否显示视频中间的播放按钮
  show-mute-btn：是否显示静音按钮
  enable-play-gesture:是否开启播放手势，即双击切换播放/暂停

  bindended:当播放到末尾时触发 ended 事件
-->
    </view>
</template>

<script>
// pages/another/mroevideos/index.js
export default {
    data() {
        return {
            //视频
            v1_play: true,
            //默认的显示播放的按钮
            v1_pause: true,
            //默认不显示暂停的按钮
            v2_play: true,
            //默认的显示播放的按钮
            v2_pause: true,
            //默认不显示暂停的按钮
            danmuList: [
                {
                    text: '苏苏的弹幕 打卡哈哈',
                    color: '#fff',
                    time: 1
                },
                {
                    text: '嘻嘻不错还可以的啦',
                    time: 1
                },
                {
                    text: '啊啊啊啊啊',
                    time: 1
                },
                {
                    text: '啊啊啊啊啊',
                    time: 1
                },
                {
                    text: '啊啊啊啊啊',
                    time: 1
                },
                {
                    text: '啊啊啊啊啊',
                    time: 2
                },
                {
                    text: '啊啊啊啊啊',
                    time: 12
                },
                {
                    text: '啊啊啊啊啊',
                    time: 2
                },
                {
                    text: '啊啊啊啊啊',
                    time: 2
                }
            ],
            danmu: ''
        };
    },
    onLoad: function (options) {},
    onReady: function () {},
    onShow: function () {},
    methods: {
        //随机生成弹幕的颜色
        getRandomColor() {
            const rgb = [];

            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16);

                if (color.length === 1) {
                    color = '0' + color;
                } else {
                    color = color;
                }

                rgb.push(color);
            }

            return '#' + rgb.join('');
        },

        getValue(e) {
            let val = e.detail.value;
            this.setData({
                danmu: val
            });
        },

        //发送弹幕
        bindSendDanmu() {
            // 利用循环和随机数调整位置
            var ranNum = Math.floor(Math.random() * 10);
            var danmuList = [];

            for (let index = 0; index < 10; index++) {
                danmuList.push('');
            }

            danmuList[ranNum] = this.danmu;

            for (let index = 0; index < danmuList.length; index++) {
                uni.createVideoContext('myVideo1').sendDanmu({
                    text: danmuList[index],
                    color: this.getRandomColor()
                });
            } //位置固定
            // wx.createVideoContext('myVideo1').sendDanmu({
            //   text: this.data.danmu,
            //   color: this.getRandomColor()
            // })
        },

        //控制视频播放
        tobePlay(e) {
            let { type } = e.currentTarget.dataset;
            let data_va1 = '';
            let data_va2 = '';
            if (type == 'v1') {
                uni.createVideoContext('myVideo0').play();
                uni.createVideoContext('myVideo0').requestFullScreen();
                data_va1 = 'v1_play';
                data_va2 = 'v1_pause';
            }

            if (type == 'v2') {
                uni.createVideoContext('myVideo1').play();
                data_va1 = 'v2_play';
                data_va2 = 'v2_pause';
            }

            if (type == 'v3') {
                uni.createVideoContext('myVideo2').play();
                data_va1 = 'v3_play';
                data_va2 = 'v3_pause';
            }

            setTimeout(() => {
                this.setData(
                    {},
                    setTimeout(() => {}, 3000)
                );
            }, 100);
        },

        //显示播放的按钮
        showPlaybtn(e) {
            let { type } = e.currentTarget.dataset;
            let data_va = '';

            if (type == 'v1') {
                if (this.v1_play) {
                    return false;
                }

                data_va = 'v1_pause';
            }

            if (type == 'v2') {
                if (this.v2_play) {
                    return false;
                }

                data_va = 'v2_pause';
            }

            if (type == 'v3') {
                if (this.v3_play) {
                    return false;
                }

                data_va = 'v3_pause';
            }

            this.setData(
                {},
                setTimeout(() => {}, 3000)
            );
        },

        //暂停视频的播放
        tobePause(e) {
            let { type } = e.currentTarget.dataset;
            let data_va1 = '';
            let data_va2 = '';
            if (type == 'v1') {
                uni.createVideoContext('myVideo0').pause();
                data_va1 = 'v1_play';
                data_va2 = 'v1_pause';
            }

            if (type == 'v2') {
                uni.createVideoContext('myVideo1').pause();
                data_va1 = 'v2_play';
                data_va2 = 'v2_pause';
            }

            if (type == 'v3') {
                uni.createVideoContext('myVideo2').pause();
                data_va1 = 'v3_play';
                data_va2 = 'v3_pause';
            }

            setTimeout(() => {}, 100);
        },

        //视频播放到末尾触发的事件 视频播放结束 显示暂停的按钮
        showEndBtn(e) {
            //显示暂停按钮 隐藏播放按钮
            let { type } = e.currentTarget.dataset;
            let data_va = '';
            let data_va1 = '';

            if (type == 'v1') {
                data_va = 'v1_play';
                data_va1 = 'v1_pause';
            }

            if (type == 'v2') {
                data_va = 'v2_play';
                data_va1 = 'v2_pause';
            }

            if (type == 'v3') {
                data_va = 'v3_play';
                data_va1 = 'v3_pause';
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
