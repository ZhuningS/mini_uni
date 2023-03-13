<template>
    <view>
        <!-- pages/jsCase/papers/index.wxml -->
        <view class="hd" v-for="(item, index) in list" :key="item.list">
            <view class="title flex">
                <view>{{ index + 1 }}.</view>
                <view v-if="item.question_name">{{ item.question_name }}</view>
            </view>

            <image :src="item.question_img" class="title_img" v-if="item.question_img"></image>

            <view class="choose_box">
                <!-- 单选框 -->
                <block v-if="item.question_type == 1">
                    <radio-group @change="radioChange" :data-index="index">
                        <label class="c_head" v-for="(item1, index1) in item.option_list" :key="index1">
                            <view class="flex">
                                <radio :value="item1.id" :checked="item1.checked" />
                                <view class="name" style="flex-shrink: 0">{{ item1.option_label }} .</view>
                                <view class="name" v-if="item1.option_name">{{ item1.option_name }}</view>
                            </view>

                            <image :src="item1.option_img" class="test_img" v-if="item1.option_img"></image>
                        </label>
                    </radio-group>
                </block>
                <!-- 多选 -->
                <block v-if="item.question_type == 2">
                    <checkbox-group @change="checkboxChange" :data-index="index">
                        <label class="c_head" v-for="(item1, index1) in item.option_list" :key="index1">
                            <view class="flex-row">
                                <checkbox :value="item1.id" :checked="item1.checked" />
                                <view class="name">{{ item1.option_label }} .</view>
                                <view class="name" v-if="item1.option_name">{{ item1.option_name }}</view>
                            </view>

                            <image :src="item1.option_img" class="test_img" v-if="item1.option_img"></image>
                        </label>
                    </checkbox-group>
                </block>
            </view>
        </view>
        <view class="bottom_fix flex j_c">
            <view class="bottom_btn" @tap.stop.prevent="submitPaper" v-if="status != 2">提交</view>
            <view class="bottom_btn" @tap.stop.prevent="submitPaper" v-if="is_again">再次答题</view>
        </view>

        <!-- 提示弹框 -->
        <view v-if="show_modal">
            <view class="pop_info flex-column j_c">
                <view>剩余时间:</view>
                <view>{{ left_time_out }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            status: 0,

            //状态
            left_time: '',

            //剩余时间
            end_time: '',

            show_tip: true,

            //用来展示10分钟提示
            list: [
                {
                    id: 1,
                    question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
                    question_type: 1,
                    //单选题
                    option_list: [
                        {
                            id: 1001,
                            option_label: 'A',
                            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分'
                        },
                        {
                            id: 1002,
                            option_label: 'B',
                            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题'
                        },
                        {
                            id: 1003,
                            option_label: 'C',
                            option_name: 'RTS/CTS机制适合于传输较大的帧时使用'
                        },
                        {
                            id: 1004,
                            option_label: 'D',
                            option_name: '以上均不正确'
                        }
                    ]
                },
                {
                    id: 2,
                    question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
                    question_type: 1,
                    //单选题
                    option_list: [
                        {
                            id: 1001,
                            option_label: 'A',
                            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分'
                        },
                        {
                            id: 1002,
                            option_label: 'B',
                            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题'
                        },
                        {
                            id: 1003,
                            option_label: 'C',
                            option_name: 'RTS/CTS机制适合于传输较大的帧时使用'
                        },
                        {
                            id: 1004,
                            option_label: 'D',
                            option_name: '以上均不正确'
                        }
                    ]
                },
                {
                    id: 3,
                    question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
                    question_type: 1,
                    //单选题
                    option_list: [
                        {
                            id: 1001,
                            option_label: 'A',
                            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分'
                        },
                        {
                            id: 1002,
                            option_label: 'B',
                            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题'
                        },
                        {
                            id: 1003,
                            option_label: 'C',
                            option_name: 'RTS/CTS机制适合于传输较大的帧时使用'
                        },
                        {
                            id: 1004,
                            option_label: 'D',
                            option_name: '以上均不正确'
                        }
                    ]
                },
                {
                    id: 4,
                    question_name: '下列关于RTS/CTS机制的叙述，不正确的是',
                    question_type: 1,
                    //单选题
                    option_list: [
                        {
                            id: 1001,
                            option_label: 'A',
                            option_name: 'RTS/CTS机制是CSMA/CA协议的一部分'
                        },
                        {
                            id: 1002,
                            option_label: 'B',
                            option_name: 'RTS/CTS机制的主要作用是解决无线局域网中“暴露节点”问题'
                        },
                        {
                            id: 1003,
                            option_label: 'C',
                            option_name: 'RTS/CTS机制适合于传输较大的帧时使用'
                        },
                        {
                            id: 1004,
                            option_label: 'D',
                            option_name: '以上均不正确'
                        }
                    ]
                }
            ],

            show_modal: true,
            left_time_out: '',
            nc_paper_id: '',
            paper_name: '',
            is_again: ''
        };
    },
    onLoad: function (options) {
        this.getLeftTime('2021-12-7 01:20:45');
    },
    onUnload() {
        clearTimeout(this.timer);
    },
    methods: {
        formatDuring(mss) {
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (mss % (1000 * 60)) / 1000;
            return minutes + ' 分钟 ' + seconds + ' 秒 ';
        },

        formatTime(msTime) {
            let time = msTime / 1000;
            let day = Math.floor(time / 60 / 60 / 24);
            let hour = Math.floor(time / 60 / 60) % 24;
            let minute = Math.floor(time / 60) % 60;
            let second = Math.floor(time) % 60;
            return `${day}天${hour}时${minute}分${second}秒`;
        },

        //获取未来时间-当前时间的秒数
        handleBtnClick(end_time) {
            // 当前时间
            var currentTime = parseInt(new Date().getTime() / 1000); // 未来时间

            var futureTime = parseInt(new Date(end_time.replace(/-/g, '/')).getTime() / 1000);

            if (futureTime <= currentTime) {
                this.time = 0;
                return false;
            } else {
                this.time = futureTime - currentTime;
                return this.time;
            }
        },

        //获取剩余时间
        getLeftTime(end_time) {
            let left_time = this.handleBtnClick(end_time);
            console.log(left_time);
            this.timer = setInterval(() => {
                if (--left_time === 0) {
                    this.setData({
                        left_time: 0
                    });
                    clearInterval(this.timer);
                } else {
                    this.setData({
                        left_time,
                        left_time_out: this.formatTime(left_time)
                    });
                }

                if (this.left_time <= 600 || this.left_time > 0) {
                    if (this.show_tip) {
                        console.log(123); // wx.showToast({
                        //   title:'离结束时间10分钟',
                        //   icon: 'none',
                        //   duration: 1500,
                        // })
                        // wx.showModal({
                        //   title: '提示',
                        //   content: '离结束时间不到10分钟',
                        //   success: (res) => {
                        //     if (res.confirm) {
                        //       this.setData({
                        //         show_tip: false
                        //       })
                        //     } else if (res.cancel) {
                        //       console.log('用户点击取消')
                        //     }
                        //   }
                        // })
                    }
                } // if (this.data.left_time <= 0) {
                //   wx.showToast({
                //     title: '时间已到，将自动交卷',
                //     icon: 'none',
                //     duration: 1500,
                //   })
                //   // 交卷
                // }
            }, 1000);
        },

        //单选
        radioChange(e) {
            console.log(e.detail.value);
        },

        //多选
        checkboxChange(e) {
            var list = this.list;
            var index = e.currentTarget.dataset.index;
            var values = e.detail.value;

            for (let i = 0, lenI = list.length; i < lenI; ++i) {
                for (let j = 0; j < list[i].option_list.length; j++) {
                    if (i == index) {
                        list[i].option_list[j].checked = false;
                        list[i].checked = false;
                    }

                    for (let g = 0, lenG = values.length; g < lenG; ++g) {
                        if (list[i].option_list[j].id === values[g]) {
                            list[i].option_list[j].checked = true;
                            list[i].checked = true;
                            break;
                        }
                    }
                }
            }

            this.setData({
                list: list
            });
        },

        //获取详细信息
        getPaperDetail: function () {
            let that = this;
            api.getPaperDetail({
                retailer_id: that.checkedStoreId,
                paper_id: that.paperId
            }).then((res) => {
                if (res.code == 200) {
                    that.setData(
                        {
                            nc_paper_id: res.data.nc_paper_id,
                            paper_name: res.data.paper_name,
                            list: res.data.question_list,
                            status: res.data.status,
                            is_again: res.data.is_again,
                            end_time: res.data.end_time
                        },
                        () => {
                            uni.setNavigationBarTitle({
                                title: res.data.paper_name
                            }); // _this.getLeftTime(res.data.end_time)
                        }
                    );
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 1500
                    });
                    setTimeout(function () {
                        return uni.navigateBack({
                            delta: 1
                        });
                    }, 1500);
                }
            });
        },

        //提交试卷
        submitPaper: function () {
            var that = this;
            var list = that.list;
            let unIndex = [];
            list.forEach((item, index) => {
                let chosed = [];
                item.option_list.forEach((item0) => {
                    if (item0.checked) {
                        chosed.push({
                            id: item0.id
                        });
                    }
                });

                if (chosed.length > 0) {
                    item.chosed = true;
                } else {
                    item.chosed = false;
                }

                if (!item.chosed) {
                    unIndex.push(index + 1);
                }
            });

            if (unIndex.length > 0) {
                uni.showToast({
                    title: '第' + unIndex[0] + '题目未作答',
                    icon: 'error'
                });
                return false;
            } // _this.savePaper()
        },

        //提交试卷
        savePaper: function () {
            api.submitPaper({
                retailer_id: this.checkedStoreId,
                nc_paper_id: this.nc_paper_id,
                question: this.list
            }).then((res) => {
                if (res.code == 200) {
                    uni.showToast({
                        title: '提交试卷成功',
                        icon: 'none',
                        duration: 1500
                    });
                    setTimeout(function () {
                        uni.switchTab({
                            url: '/pages/paper/index'
                        });
                    }, 1500);
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
