<template>
    <view>
        <!-- pages/wxCase/vanUpload/index.wxml -->
        <block v-for="(item, index) in list" :key="item.list">
            <view>
                <view>{{ item.name }}</view>
                <van-uploader
                    v-if="item.show"
                    :data-index="index"
                    upload-text="susu"
                    image-fit="aspectFill"
                    :file-list="item.fileList"
                    @delete="fileDel($event, { index, params })"
                    @after-read="afterRead($event, { index, params })"
                    :data-params="params"
                    use-before-read
                    @before-read="beforeRead($event, { index, params })"
                />
            </view>
        </block>
    </view>
</template>

<script>
import vanUploader from '@vant/weapp/uploader/index';
export default {
    components: {
        vanUploader
    },
    data() {
        return {
            list: [
                {
                    name: '上传1',
                    show: true,
                    fileList: []
                },
                {
                    show: true,
                    name: '上传2',
                    fileList: []
                }
            ],

            fileList: [
                {
                    url: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    url: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                }
            ],

            params: []
        };
    },
    onShow() {
        for (let i in this.fileList) {
            console.log(this.fileList[i]);
        }
    },
    onReachBottom: function () {
        console.log('页面上拉触底事件的处理函数');
    },
    onPullDownRefresh() {
        uni.stopPullDownRefresh();
    },
    onResize: function () {
        // 页面尺寸变化时执行
        console.log('assa');
    },
    methods: {
        /**
         * 删除
         * @param {*} e
         */
        fileDel(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let i = e.currentTarget.dataset.index;
            let { index } = e.detail;
            // let { index } = e.detail
            // this.data.fileList.splice(index, 1);
            // this.setData({
            //   fileList: this.data.fileList
            // })
            let list0 = this.list[i].fileList;
            list0.splice(index, 1);
            this.list[i].fileList = list0;
        },

        beforeRead(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { file, callback } = e.detail;
            callback(file.type === 'image');
        },

        afterRead(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let { index } = e.currentTarget.dataset;
            const { file } = e.detail;
            let list0 = this.list[index].fileList;
            list0.push({ ...file, url: file.url });
            this.list[index].fileList = list0;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
