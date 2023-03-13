<template>
    <view>
        <!-- pages/wxCase/vanUpload/index2.wxml -->
        <block v-for="(item, index) in memu_list" :key="item.memu_list">
            <view class="menu">
                <view class="memu_title">{{ index + 1 }}.{{ item.title }}</view>
                <van-uploader
                    :data-index="index"
                    :file-list="item.fileList"
                    @delete="fileDel($event, { index })"
                    @after-read="afterRead($event, { index })"
                    use-before-read
                    @before-read="beforeRead($event, { index })"
                    :deletable="true"
                />
            </view>
        </block>
    </view>
</template>

<script>
import vanUploader from '@vant/weapp/uploader/index';
// pages/wxCase/vanUpload/index2.js
export default {
    components: {
        vanUploader
    },
    data() {
        return {
            memu_list: [
                {
                    title: '选项一',
                    fileList: []
                },
                {
                    title: '选项2',
                    fileList: []
                },
                {
                    title: '选项3',
                    fileList: []
                },
                {
                    title: '选项4',
                    fileList: []
                },
                {
                    title: '选项5',
                    fileList: []
                }
            ]
        };
    },
    methods: {
        afterRead(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let { index } = e.currentTarget.dataset;
            const { file } = e.detail;
            let list = this.memu_list[index].fileList;
            list.push({ ...file, url: file.url });
        },

        beforeRead(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { file, callback } = e.detail;
            callback(file.type === 'image');
        },

        fileDel(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let i = e.currentTarget.dataset.index;
            let { index } = e.detail;
            let list = this.memu_list[i].fileList;
            list.splice(index, 1); // this.setData({
            this.memu_list[i].fileList = list;
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
