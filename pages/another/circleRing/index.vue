<template>
    <view>
        <!-- pages/another/circleRing/index.wxml -->
        <view class="head_fix flex-row">
            <view class="head_box flex-row">
                <image src="/static/img/search_icon.png" class="s_icon"></image>
                <input class="i_ipt" placeholder="搜索目标名称" placeholder-class="p_class" />
            </view>
            <view @tap.stop.prevent="showDialogFun">筛选</view>
        </view>
        <view class="con" v-if="hasData">
            <block v-for="(item, index) in data_list" :key="index">
                <view class="c_item flex j_b" @tap.stop.prevent="toDetail">
                    <view>
                        <view class="flex c_one">
                            <view class="c_name">名称：</view>
                            <view class="c_va line_ellipsis">苏苏就是小苏苏</view>
                        </view>
                        <view class="flex c_one">
                            <view class="c_name">名称：</view>
                            <view class="c_va line_ellipsis">苏苏就是小苏苏</view>
                        </view>
                        <view class="flex c_one">
                            <view class="c_name">名称：</view>
                            <view class="c_va line_ellipsis">苏苏就是小苏苏</view>
                        </view>
                        <view class="flex c_one">
                            <view class="c_name">名称：</view>
                            <view class="c_va line_ellipsis">苏苏就是小苏苏</view>
                        </view>
                    </view>
                    <view class="c_charts flex-column">
                        <view class="c_cha">
                            <canvas-ring :id="'canvasRing' + index" class="c_a" :canvasWidth="80" :value="item.value" :lineWidth="3"></canvas-ring>
                            <view class="vaa" v-if="item.imgSrc">
                                <image :src="item.imgSrc" class="canvas_img"></image>
                                <view class="c_value">{{ item.value }}%</view>
                            </view>
                        </view>
                        <view>
                            <text class="c_num_has">6800</text>
                            <text>/120000</text>
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <!-- 筛选弹框 -->
        <view v-if="!showDialog">
            <view class="mask" @tap="closePop"></view>
            <view class="dialog">
                <scroll-view scroll-y style="height: 80%">
                    <view class="main_con">
                        <view class="dialog_item" v-if="typeList.length > 0">
                            <view class="flex-row j_b d_title">
                                <text class="d_name">时间类型:</text>
                            </view>
                            <view class="flex d_chose">
                                <block v-for="(item, index) in typeList" :key="index">
                                    <view :class="'d_item ' + (item.chosed == true ? 'chosed' : '')" @tap.stop.prevent="choseKey" data-list="typeList" :data-index="index">
                                        {{ item.type_name }}
                                    </view>
                                </block>
                            </view>
                        </view>

                        <view class="dialog_item" v-if="monthList.length > 0">
                            <view class="flex-row j_b d_title">
                                <text class="d_name">月度选择:</text>

                                <view class="d_status" v-if="show_more" @tap.stop.prevent="showMore">
                                    展开
                                    <image src="/static/img/open_up.png" class="zhank_icon"></image>
                                </view>
                                <view class="d_status" v-if="show_more != undefined && !show_more" @tap.stop.prevent="showMore">
                                    收起
                                    <image src="/static/img/clolse_down.png" class="zhank_icon"></image>
                                </view>
                            </view>
                            <view class="flex d_chose">
                                <block v-for="(item, index) in monthList" :key="index">
                                    <view
                                        :class="'d_item ' + (show_more ? 'd_item_none' : '') + ' ' + (item.chosed == true ? 'chosed' : '')"
                                        @tap.stop.prevent="choseKey"
                                        data-list="monthList"
                                        :data-index="index"
                                    >
                                        {{ item.value }}
                                    </view>
                                </block>
                            </view>
                        </view>

                        <view class="dialog_item" v-if="targetList.length > 0">
                            <view class="flex-row j_b d_title">
                                <text class="d_name">目标分类:</text>
                            </view>
                            <view class="flex d_chose">
                                <block v-for="(item, index) in targetList" :key="index">
                                    <view :class="'d_item ' + (item.chosed == true ? 'chosed' : '')" @tap.stop.prevent="choseKey" data-list="targetList" :data-index="index">
                                        {{ item.type_name }}
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="d_bottom">
                    <view class="d_view">
                        <view class="line"></view>
                        <view class="btn_text" @tap="reset">重置</view>
                        <view class="btn_text" @tap="search">确认</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 替换原先的接口  canvas 2d -->
        <view class="flex-row j_b rows">
            <view class="new_ca">
                <!-- style="width:{{canvasW}}px;height: {{canvasH}}px;" -->
                <canvas type="2d" id="myCanvas"></canvas>
            </view>
        </view>

        <image :src="imagePath" class="ca_img"></image>
        <view class="flex-row j_b rows">
            <!-- 其他样式的 圆环1 -->
            <canvas-ring id="ring1" :value="num_per"></canvas-ring>
            <!-- 其他样式的 2 -->
            <canvas-ring
                id="varyRing"
                :value="vary_val"
                :title="'苏苏小苏苏'"
                :maxValue="99"
                :minValue="0"
                :suffix="'**'"
                :startDegree="vary_start"
                :lineWidth="vary_lineW"
                :lineColor="vary_color"
                :valueColor="val_color"
            ></canvas-ring>
        </view>

        <!-- 其他样式的 圆环3 -->
        <view class="flex-row j_b rows">
            <view class="progress_box">
                <canvas class="progress_bg" canvas-id="canvasProgressbg"></canvas>
                <canvas class="progress_canvas" canvas-id="canvasProgress"></canvas>
                <view class="progress_text">
                    <view class="progress_dot"></view>
                    <text class="progress_info">{{ progress_txt }}</text>
                </view>
            </view>
        </view>

        <!-- 时间进度条 -->
        <view class="rows">
            <view class="out">
                <!-- 有报错 先注释一下 -->
                <!-- <view class='in' style="width: {{progressWidth}}% "></view> -->
            </view>
            <view class="flex-row j_b action">
                <text>{{ progressTime }}秒</text>
                <text @tap="playbtn" data-change="1">{{ playPausetips }}</text>
            </view>
        </view>
        <view class="flex-row j_b rows">
            <view class="progress_box">
                <canvas canvas-id="gg" class="progress_bg"></canvas>
            </view>
        </view>
    </view>
</template>

<script>
import canvasRing from '../components/canvas-ring/canvas-ring';
// pages/targetPlan/index.js
export default {
    components: {
        canvasRing
    },
    data() {
        return {
            canvasW: 220,
            canvasH: 220,
            progress_txt: '正在匹配中...',
            count: 0,

            // 设置 计数器 初始为0
            countTimer: null,

            // 设置 定时器 初始为null
            showDialog: true,

            //筛选弹框默认隐藏
            hasData: true,

            //是否有数据
            data_list: [
                {
                    value: 30
                },
                {
                    value: 68
                },
                {
                    value: 99
                }
            ],

            //数据列表
            typeList: [],

            // 时间类型
            monthList: [],

            //月度选择
            show_more: undefined,

            targetList: [],

            //目标分类
            num_per: 0,

            //
            //时间进度条
            progressWidth: 0,

            progressTime: 60,
            mark: true,
            playPausetips: '开始',
            imagePath: '',
            vary_color: '',
            val_color: '',
            vary_lineW: '',
            vary_start: '',
            vary_val: 0,
            peList: '',
            undefined: ''
        };
    },
    onShow: function () {
        //黑色圆环
        this.drawProgressbg('gg'); //圆环1

        this.getRing1(); //圆环2

        this.getRing2();
    },
    onReady: function () {
        //列表数据
        this.getRings();
        this.drawProgressbg('canvasProgressbg');
        this.countInterval();
        this.drawNew(2);
    },
    methods: {
        getRing1() {
            this.ring1 = this.$mp.page.selectComponent('#ring1').$vm;
            var num_per = 0;
            var timer = setInterval(() => {
                if (num_per >= 0) {
                    num_per++;
                }

                if (num_per >= 100) {
                    //到哪个值结束
                    num_per = 0;
                    clearInterval(timer); //清除定时器(不清除定时器 循环0-100的过程)
                }

                this.setData({
                    num_per
                });
                this.ring1.showCanvasRing();
            }, 50);
        },

        getRings() {
            //循环生成进度条
            this.data_list.forEach((item, index) => {
                this.canvasRing = this.$mp.page.selectComponent('#canvasRing' + index).$vm;
                this.canvasRing.showCanvasRing().then((res) => {
                    item.imgSrc = res;
                    this.setData({
                        data_list: this.data_list
                    });
                });
            });
        },

        getRing2() {
            this.varyRing = this.$mp.page.selectComponent('#varyRing').$vm; //定义函数产生随机数

            function randomNum(min, max) {
                return Math.floor(Math.random() * (min - max) + max);
            } //定义函数产生随机颜色

            function getRandomColor() {
                var red = Math.round(Math.random() * 255);
                var green = Math.round(Math.random() * 255);
                var blue = Math.round(Math.random() * 255);
                return 'rgba(' + red + ',' + green + ',' + blue + ',0.9)';
            }

            var vary_timer = setInterval(() => {
                this.setData({
                    vary_color: getRandomColor(),
                    val_color: getRandomColor(),
                    vary_lineW: randomNum(1, 20),
                    //线条的宽度 1~20随机数
                    vary_start: randomNum(0, 360),
                    //0~360的随机数
                    vary_val: randomNum(0, 72) //0~72的随机数
                });
                this.varyRing.showCanvasRing();
            }, 300);
            setTimeout(() => {
                clearInterval(vary_timer);
            }, 1200);
        },

        getData() {
            let typeList = [
                {
                    type_id: 0,
                    type_name: '苏苏1'
                },
                {
                    type_id: 1,
                    type_name: '苏苏2'
                },
                {
                    type_id: 2,
                    type_name: '苏苏3'
                }
            ];
            let monthList = [
                {
                    value: '2021-01'
                },
                {
                    value: '2021-02'
                },
                {
                    value: '2021-03'
                },
                {
                    value: '2021-04'
                },
                {
                    value: '2021-05'
                },
                {
                    value: '2021-06'
                },
                {
                    value: '2021-07'
                },
                {
                    value: '2021-08'
                }
            ];
            let targetList = [
                {
                    type_name: '苏苏4'
                },
                {
                    type_name: '苏苏5'
                },
                {
                    type_name: '苏苏6'
                },
                {
                    type_name: '苏苏7'
                }
            ];
            this.setData({
                typeList,
                monthList,
                targetList,
                show_more: monthList.length > 6 ? true : undefined
            });
        },

        //显示弹框
        showDialogFun() {
            //获取筛选数据
            this.getData();
            this.setData({
                showDialog: !this.showDialog
            });
        },

        closePop() {
            this.setData({
                showDialog: true
            });
        },

        //展开收起
        showMore(e) {
            this.setData({
                show_more: !this.show_more
            });
        },

        //选择（多选）
        choseKey(e) {
            let { index, list } = e.currentTarget.dataset;
            this[list][index].chosed = !this[list][index].chosed;
            this.list = this[list];
        },

        //单选
        choseAlone(e) {
            let { index } = e.currentTarget.dataset;
            let { peList } = this;
            peList.forEach((item) => {
                item.chosed = false;
            });
            peList[index].chosed = true;
            this.setData({
                peList
            });
        },

        playbtn() {
            let that = this;
            let mark = that.mark;

            if (mark) {
                that.timer = setInterval(that.run, 1000);
                that.setData({
                    mark: false,
                    playPausetips: '暂停'
                });
            } else {
                clearInterval(that.timer);
                that.setData({
                    mark: true,
                    playPausetips: '开始'
                });
            }
        },

        run() {
            let that = this;
            let totalProgressTime = 60;
            let progressWidth = that.progressWidth; //显示进度

            let progressTime = that.progressTime; //时间

            if (progressWidth === 100) {
                that.setData({
                    playPausetips: '已结束',
                    progressTime: 0
                });
                clearInterval(that.timer); //清除run

                return;
            }

            progressTime--;
            progressWidth = (totalProgressTime - progressTime) * (100 / 60);
            that.setData({
                progressWidth: progressWidth,
                progressTime: progressTime
            });
        },

        drawProgressbg: function (id) {
            // 使用 wx.createContext 获取绘图上下文 context(该接口已经不再维护了)
            var ctx = uni.createCanvasContext(id);
            ctx.setLineWidth(4); // 设置圆环的宽度

            ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色

            ctx.setLineCap('round'); // 设置圆环端点的形状

            ctx.beginPath(); //开始一个新的路径

            ctx.arc(110, 110, 100, 0, 2 * Math.PI, false); //设置一个原点(100,100)，半径为100的圆的路径到当前路径

            ctx.stroke(); //对当前路径进行描边

            ctx.draw(false, () => {
                // 延迟保存图片，解决生成图片错位bug。
                setTimeout(() => {
                    this.canvasToTempImage();
                }, 400);
            });
        },

        canvasToTempImage() {
            uni.canvasToTempFilePath(
                {
                    canvasId: 'gg',
                    success: (res) => {
                        let tempFilePath = res.tempFilePath;
                        this.setData({
                            imagePath: tempFilePath
                        });
                    }
                },
                this
            );
        },

        drawCircle: function (step) {
            var context = uni.createCanvasContext('canvasProgress'); // 设置渐变

            var gradient = context.createLinearGradient(200, 100, 100, 200);
            gradient.addColorStop('0', '#2661DD');
            gradient.addColorStop('0.5', '#40ED94');
            gradient.addColorStop('1.0', '#5956CC');
            context.setLineWidth(10);
            context.setStrokeStyle(gradient);
            context.setLineCap('round');
            context.beginPath(); // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定

            context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
            context.stroke();
            context.draw();
        },

        countInterval: function () {
            // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
            this.countTimer = setInterval(() => {
                if (this.count <= 60) {
                    /* 绘制彩色圆环进度条 
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
                    this.drawCircle(this.count / (60 / 2));
                    this.count++;
                } else {
                    this.setData({
                        progress_txt: '匹配成功'
                    });
                    clearInterval(this.countTimer);
                }
            }, 100);
        },

        drawNew(step) {
            const query = uni.createSelectorQuery();
            query
                .select('#myCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.scale(dpr, dpr);
                    var gradient = ctx.createLinearGradient(200, 100, 100, 200);
                    gradient.addColorStop('0', '#a57b5f');
                    gradient.addColorStop('0.5', '#cc9ad1');
                    gradient.addColorStop('1.0', '#b84e88');
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
                    ctx.stroke();
                });
        },

        toDetail() {
            console.log('占位：函数 toDetail 未声明');
        },

        reset() {
            console.log('占位：函数 reset 未声明');
        },

        search() {
            console.log('占位：函数 search 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
