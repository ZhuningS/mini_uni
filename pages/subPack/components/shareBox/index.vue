<template>
    <view>
        <view :class="'share-wrap ' + (visible ? 'active' : '')" @touchmove.stop.prevent="preventDefault">
            <view :class="'share-back ' + (visible ? 'active' : '')"></view>
            <view :class="'share-container ' + (visible ? 'active' : '')">
                <view class="close" @tap="handleClose"></view>
                <image mode="widthFix" :src="sharePath" class="share-image" />
                <view class="share-tips">保存图片，叫伙伴们来参与吧</view>
                <view class="save-btn" @tap="handleSavePhoto"></view>
            </view>
        </view>
        <painter style="position: absolute; top: -9999rpx" :palette="imgDraw" @imgOK="onImgOK" scaleRatio="3" />
    </view>
</template>

<script>
import painter from '../../painter/painter';
export default {
    components: {
        painter
    },
    data() {
        return {
            imgDraw: {},
            //绘制图片的大对象
            sharePath: '',
            //生成的分享图
            visible: false
        };
    },
    props: {
        //属性值可以在组件使用时指定
        isCanDraw: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClose() {
            this.setData({
                visible: false
            });
            this.$emit('close');
        },

        drawPic() {
            if (this.sharePath) {
                //如果已经绘制过了本地保存有图片不需要重新绘制
                this.setData({
                    visible: true
                });
                this.$emit('initData');
                return;
            }

            uni.showLoading({
                title: '生成中'
            });
            this.setData({
                imgDraw: {
                    width: '720px',
                    height: '1280px',
                    background: '#f8f8f8',
                    views: [
                        {
                            type: 'image',
                            url: 'http://img1.maka.im/user/8982892/images/1c20d674cd6762877bc150a4850cc381.png',
                            css: {
                                width: '720px',
                                height: '1280px',
                                top: '0px',
                                left: '0px',
                                rotate: '0',
                                borderRadius: '',
                                borderWidth: '',
                                borderColor: '#000000',
                                shadow: '',
                                mode: 'scaleToFill'
                            }
                        },
                        {
                            type: 'image',
                            url: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                            css: {
                                width: '254px',
                                height: '308px',
                                top: '192px',
                                left: '230px',
                                rotate: '0',
                                borderRadius: '0',
                                borderWidth: '',
                                borderColor: '#000000',
                                shadow: '',
                                mode: 'scaleToFill'
                            }
                        },
                        {
                            type: 'text',
                            text: '努力做一个善良的人，做一个心态阳光的人，做一个积极向上的人，用正能量激发自己',
                            css: {
                                color: '#000000',
                                background: '',
                                width: '475px',
                                height: '75.02px',
                                top: '604px',
                                left: '119px',
                                rotate: '0',
                                borderRadius: '',
                                borderWidth: '',
                                borderColor: '#000000',
                                shadow: '',
                                padding: '0px',
                                fontSize: '20px',
                                fontWeight: 'normal',
                                maxLines: '2',
                                lineHeight: '37.74px',
                                textStyle: 'fill',
                                textDecoration: 'none',
                                fontFamily: '',
                                textAlign: 'center'
                            }
                        },
                        {
                            type: 'text',
                            text: '微笑开始新的一天',
                            css: {
                                color: '#000000',
                                background: '',
                                width: '600px',
                                height: '58.68px',
                                top: '698px',
                                left: '60px',
                                rotate: '0',
                                borderRadius: '',
                                borderWidth: '',
                                borderColor: '#000000',
                                shadow: '',
                                padding: '0px',
                                fontSize: '36px',
                                fontWeight: 'normal',
                                maxLines: '2',
                                lineHeight: '59.94px',
                                textStyle: 'fill',
                                textDecoration: 'none',
                                fontFamily: '',
                                textAlign: 'center'
                            }
                        },
                        {
                            type: 'image',
                            url: 'http://img1.maka.im/user/8982892/images/5ba0d49561a0e6be54b832bedb061320.jpg',
                            css: {
                                width: '127px',
                                height: '127px',
                                top: '1047px',
                                left: '532px',
                                rotate: '0',
                                borderRadius: '',
                                borderWidth: '',
                                borderColor: '#000000',
                                shadow: '',
                                mode: 'scaleToFill'
                            }
                        }
                    ]
                }
            });
        },

        onImgErr(e) {
            uni.hideLoading();
            uni.showToast({
                title: '生成分享图失败，请刷新页面重试'
            });
        },

        onImgOK(e) {
            uni.hideLoading();
            this.setData({
                sharePath: e.detail.path,
                visible: true
            }); //通知外部绘制完成，重置isCanDraw为false

            this.$emit('initData');
        },

        preventDefault() {},

        // 保存图片
        handleSavePhoto() {
            uni.showLoading({
                title: '正在保存...',
                mask: true
            });
            uni.saveImageToPhotosAlbum({
                filePath: this.sharePath,
                success: () => {
                    uni.showToast({
                        title: '保存成功'
                    });
                    setTimeout(() => {
                        this.setData({
                            visible: false
                        });
                        this.$emit('close');
                    }, 300);
                },
                fail: () => {
                    uni.getSetting({
                        success: (res) => {
                            let authSetting = res.authSetting;

                            if (!authSetting['scope.writePhotosAlbum']) {
                                uni.showModal({
                                    title: '提示',
                                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',

                                    success(res) {
                                        if (res.confirm) {
                                            uni.openSetting();
                                        }
                                    }
                                });
                            }
                        }
                    });
                    setTimeout(() => {
                        uni.hideLoading();
                        this.setData({
                            visible: false
                        });
                        this.$emit('close');
                    }, 300);
                }
            });
        }
    },
    watch: {
        isCanDraw: {
            handler: function (newVal, oldVal) {
                if (newVal) {
                    this.drawPic();
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
