<template>
    <view>
        <view class="head_top">
            <!-- <image src="https://i.postimg.cc/Bn1XpkSn/susu.jpg" class="bg_img"/> -->
        </view>

        <view class="con">
            <text class="title">上传照片</text>
            <view class="flex-row img_list">
                <block v-for="(item, index) in imgList" :key="index">
                    <view class="item_img">
                        <image :src="item" class="img_item" mode="aspectFill" @tap.stop.prevent="previewImg" :data-src="item"></image>
                        <image src="/static/img/close1.png" class="close" @tap.stop.prevent="deleteUpload" :data-index="index + ' '"></image>
                    </view>
                </block>
                <view class="item_img1 flex-column" @tap.stop.prevent="chooseImg" v-if="show">
                    <image src="/static/img/add.png" class="add_img" mode="aspectFill"></image>
                    <text>{{ imgList.length }}/{{ maxPhoto }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/photoDoor/index.js
export default {
    data() {
        return {
            show: true,

            //显示选择图片的按钮
            imgList: [
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Gm7KjGmN/111.jpg',
                'https://i.postimg.cc/Bv28vfkg/222.webp',
                'https://i.postimg.cc/65STLQNc/333.webp',
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg'
            ],

            //最大上传10张图片
            maxPhoto: 10,

            selected: 0
        };
    },
    onLoad: function (options) {},
    onShow: function () {
        //自定义的tabbar
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            });
        }
    },
    methods: {
        /**
         * 选择上传方式
         * @param {*} e
         */
        chooseImg(e) {
            if (this.NextTap) {
                return;
            }

            this.NextTap = true;
            setTimeout(() => {
                this.NextTap = false;
            }, 1500); //1.5秒之后可以再次点击，防止用户重复点击

            uni.showActionSheet({
                itemList: ['从相册中选择', '拍照'],
                success: (res) => {
                    if (!res.cancel) {
                        if (res.tapIndex == 0) {
                            this.chooseWxImage('album'); //相册
                        } else if (res.tapIndex == 1) {
                            this.chooseWxImage('camera'); //拍照
                        }
                    }
                }
            });
        },

        /**
         * 上传照片
         * @param {*} type
         */
        chooseWxImage: function (type) {
            let { imgList, maxPhoto } = this;

            if (imgList.length > 10) {
                uni.showToast({
                    title: '最多上传10张',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }

            uni.chooseImage({
                count: maxPhoto - imgList.length,
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: (res) => {
                    console.log(res);
                    let tempFilePaths = res.tempFilePaths; //成功后返回的的路径

                    console.log(tempFilePaths);
                    tempFilePaths.forEach((item) => {
                        // fileUpload.upload('/common/upload-img', item).then(res => {
                        //   if (res.code == 10000 && imgList.length < 10) {
                        //     imgList.push(res.data)
                        //     this.setData({
                        //       imgList,
                        //       show: imgList.length >= 10 ? false : true
                        //     })
                        //   }
                        // })
                        imgList.push(item);
                    });
                    this.setData({
                        imgList: imgList,
                        show: imgList.length >= 10 ? false : true
                    });
                }
            });
        },

        /*
         * 图片预览
         * @param e
         */
        previewImg(e) {
            let currentUrl = e.currentTarget.dataset.src;
            let urls = this.imgList;
            uni.previewImage({
                current: currentUrl,
                // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            });
        },

        /**
         * 删除上传的图片
         * @param e
         */
        deleteUpload(e) {
            let { index } = e.currentTarget.dataset;
            let { imgList } = this;
            imgList.splice(index, 1);
            this.setData({
                imgList: imgList,
                show: imgList.length >= 10 ? false : true
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
