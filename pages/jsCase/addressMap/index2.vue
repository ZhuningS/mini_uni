<template>
    <view>
        <!-- pages/jsCase/addressMap/index2.wxml -->
        <!-- 
  腾讯地图调用地址：https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}
  百度地图调用地址： https://apis.map.baidu.com/ws/geocoder/v2/?location=${latitude},${longitude}&key=${keys}
 -->

        <view>{{ district }}</view>

        <region-picker @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker">当前选择：{{ region[0] }} - {{ region[1] }} - {{ region[2] }}</view>
        </region-picker>
    </view>
</template>

<script>
let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';

let _page;

let _this;

export default {
    data() {
        return {
            customItem: '全部',
            district: '',
            region: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        _this = this;
        uni.getLocation({
            success: function (res) {
                _this.getDistrict(res.latitude, res.longitude);
            }
        });
    },
    methods: {
        getDistrict(latitude, longitude) {
            _page = this;
            uni.request({
                url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    console.log(res.data.result.address_component.district, res.data.result); // 省

                    let province = res.data.result.address_component.province; // 市

                    let city = res.data.result.address_component.city; // 区

                    let district = res.data.result.address_component.district;

                    _page.setData({
                        district: res.data.result.address_component.district,
                        region: [province, city, district]
                    });
                }
            });
        },

        bindRegionChange(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value);
            this.setData({
                region: e.detail.value
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
