<template>
    <view>
        <!-- pages/apiDemo/getUserInfo/index.wxml -->
        <!-- 若小程序需收集用户昵称头像等信息，可以通过 头像昵称填写功能 功能进行收集 -->
        <!-- 亲测：安卓机不生效，苹果生效 -->
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image class="avatar" :src="avatarUrl"></image>
        </button>
        <!-- 需要将 button 组件 open-type 的值设置为 chooseAvatar，当用户选择需要使用的头像之后，可以通过 bindchooseavatar 事件回调获取到获取到头像信息的临时路径。 -->
        <input type="nickname" class="i" placeholder="请输入昵称" />
        <!-- <open-data type="userAvatarUrl"></open-data> -->
    </view>
</template>

<script>
import baseUrl from '../../../config';
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
export default {
    data() {
        return {
            avatarUrl: defaultAvatarUrl
        };
    },
    onLoad(e) {
        console.log(baseUrl.host); // wx.request({
        //   url: baseUrl.host + '/a',
        //   data: 1,
        //   success: (res) => {
        //     console.log(res)
        //   }
        // })
    },
    methods: {
        onChooseAvatar(e) {
            console.log(e);
            const { avatarUrl } = e.detail;
            this.setData({
                avatarUrl
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
