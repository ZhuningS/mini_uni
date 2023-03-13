<template>
    <view>
        <!-- pages/scroll/index.wxml -->
        <view class="top" id="top">
            <view class="top_con">
                <text>1.scroll-view根据剩余高度填充</text>
                <text>2.滑动列表选中不同分类</text>
            </view>
        </view>
        <view class="con flex">
            <view class="left" :style="'height:' + scrollheight + 'rpx'">
                <scroll-view scroll-y :style="'height:' + scrollheight + 'rpx'" :scroll-with-animation="true" :scroll-top="scrollTop" class="s_left">
                    <view style="background: #fff">
                        <block v-for="(item, index) in cateList" :key="item.cateList">
                            <view
                                :class="
                                    'caname ' +
                                    (chosed_index == index ? 'chosed' : '') +
                                    '  ' +
                                    (index + 1 == chosed_index && 'pre_c') +
                                    ' ' +
                                    (index - 1 == chosed_index && 'next_c')
                                "
                                :id="'sidebar-item-' + item.id"
                                :data-id="item.id"
                                :data-index="index"
                                @tap.stop.prevent="choseCate"
                            >
                                {{ item.name }}
                            </view>
                        </block>
                    </view>
                </scroll-view>
            </view>
            <view class="right" :style="'height:' + scrollheight + 'rpx'">
                <scroll-view scroll-y :style="'height:' + scrollheight + 'rpx;'" :scroll-with-animation="true" :scroll-into-view="toTitle" class="s_right" @scroll="onScroll">
                    <view class="item" :id="'title-' + item.type_id" v-for="(item, index) in goods_list" :key="item.goods_list">
                        <view class="t_name">{{ item.type_name }}</view>

                        <view v-if="item.list.length > 0">
                            <view class="goods-item" v-for="(item1, index1) in item.list" :key="item1.goods_list">
                                <view class="flex j_b">
                                    <image :src="item1.img" class="item_img"></image>
                                    <view class="item_name">
                                        <text class="name">{{ item1.goods_name }}</text>
                                        <view class="flex-row">
                                            <text class="stock_text">价格:</text>
                                            <text class="s_price">￥{{ item1.price }}</text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>

                        <view v-else class="flex-column">
                            <image src="/static/img/goods_none.png" class="goods_none"></image>
                            <text class="no_tip">暂无商品哦~</text>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/scroll/index.js
export default {
    data() {
        return {
            scrollheight: '',
            chosed_index: 0,
            cateList: [
                {
                    id: 1,
                    name: '类别1'
                },
                {
                    id: 2,
                    name: '类别2'
                },
                {
                    id: 3,
                    name: '类别3'
                },
                {
                    id: 4,
                    name: '类别4'
                },
                {
                    id: 5,
                    name: '类别5'
                },
                {
                    id: 6,
                    name: '类别6'
                }
            ],
            chosed_cate_id: '',
            goods_list: [
                {
                    type_id: 1,
                    type_name: '类别1',
                    list: [
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的01',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的02',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        }
                    ]
                },
                {
                    type_id: 2,
                    type_name: '类别2',
                    list: [
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的05',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的06',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的07',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的08',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        }
                    ]
                },
                {
                    type_id: 3,
                    type_name: '类别3',
                    list: [
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的09',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的10',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的11',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的12',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        }
                    ]
                },
                {
                    type_id: 4,
                    type_name: '类别4',
                    list: [
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的13',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的14',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的13',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的14',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        }
                    ]
                },
                {
                    type_id: 5,
                    type_name: '类别5',
                    list: [
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的17',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        },
                        {
                            goods_name: '巴啦啦门路沙地柏阿实践活动氨基酸的18',
                            img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                            price: 356
                        } // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // }, {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的19',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的20',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的20',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                        // {
                        //   goods_name:'巴啦啦门路沙地柏阿实践活动氨基酸的20',
                        //   img:'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                        //   price:356.00,
                        // },
                    ]
                },
                {
                    type_id: 6,
                    type_name: '类别6',
                    list: []
                }
            ],
            toTitle: '',
            scrollTop: 0,
            top: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let windowHeight = uni.getSystemInfoSync().windowHeight; // 屏幕的高度

        let windowWidth = uni.getSystemInfoSync().windowWidth; // 屏幕的宽度

        this.setData({
            scrollheight: (windowHeight * 750) / windowWidth - 370
        });
        this.setData({
            chosed_cate_id: this.cateList[0].id
        }); // 设置每个分类的开始高度

        let top = [];

        for (var i = 0; i < this.goods_list.length; i++) {
            uni.createSelectorQuery()
                .select('#title-' + this.goods_list[i].type_id)
                .boundingClientRect(function (rect) {
                    console.log(rect);
                    var isTop = Number(rect.top);
                    top.push(isTop);
                })
                .exec();
        }

        this.setData({
            top: top
        });
    },
    onReady: function () {
        //设置铺满高度的另一种方法1
        // wx.createSelectorQuery().selectAll("#top").boundingClientRect((rect)=>{
        //   console.log(rect)
        // }).exec();
        //方法2
        /*let query = wx.createSelectorQuery().in(this);//this传入的是自定义组件的实例，否则获取到的rect值为null。
  wx.getSystemInfo({
    success: res => {
      console.log(res)
      let windowHeight =res.windowHeight
      query.select('#top').boundingClientRect();
      query.exec((res) => {
        console.log(res)
        let topHeight = res[0].height;
        console.log(topHeight)
        let scrollViewHeight = windowHeight  - topHeight;
        console.log(scrollViewHeight)
      });
    }
  }) */
    },
    onShow: function () {},
    methods: {
        /**
         * 选中分类
         */
        choseCate(e) {
            let { id, index } = e.currentTarget.dataset;
            this.setData({
                chosed_cate_id: id,
                chosed_index: index,
                toTitle: 'title-' + id
            });
            let { top, scrollTop } = this;
            let length = top.length;
            console.log(scrollTop);

            if (scrollTop > top[length - 2] - top[0]) {
            } else {
                console.log(111111);
            }
        },

        //滚动
        onScroll(e) {
            console.log(e.detail.scrollTop);
            this.setData({
                scrollTop: e.detail.scrollTop
            });
            var length = this.top.length;

            for (var i = 0; i < this.top.length; i++) {
                if (this.top[i] - this.top[0] <= this.scrollTop && i < length - 1 && this.top[i + 1] - this.top[0] > this.scrollTop) {
                    if (this.chosed_index != i) {
                        this.setData({
                            chosed_index: i
                        });
                    }
                }
            }

            if (this.scrollTop >= this.top[length - 1] - this.top[0]) {
                console.log(this.top[length - 1] - this.top[0]);
                this.setData({
                    chosed_index: length - 1
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
