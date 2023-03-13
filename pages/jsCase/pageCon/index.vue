<template>
    <view>
        <!-- pages/jsCase/pageCon/index.wxml -->
        <view>
            <view class="screen screen1">
                <block v-for="(contact, index) in contacts" :key="contact.id">
                    <view class="contact" @tap="showNext" :data-idx="index">
                        <share-element class="avatar" key="avatar" :duration="duration" :transform="transformIdx === index">
                            <image mode="widthFix" :src="contact.img"></image>
                        </share-element>
                        <share-element :duration="duration" class="name" key="name" :transform="transformIdx === index">
                            {{ contact.name }}
                        </share-element>
                        <view class="list">
                            <view>手机号: {{ contact.phone }}</view>
                            <view>邮箱: {{ contact.email }}</view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <page-container
            :show="show"
            :overlay="overlay"
            close-on-slide-down
            :duration="duration"
            :position="position"
            @beforeenter="onBeforeEnter"
            @enter="onEnter"
            @afterenter="onAfterEnter"
            @beforeleave="onBeforeLeave"
            @leave="onLeave"
            @afterleave="onAfterLeave"
            @clickoverlay="onClickOverlay"
        >
            <view class="screen screen2">
                <view class="contact">
                    <share-element class="avatar ava_pa" :duration="duration" key="avatar" transform>
                        <image mode="widthFix" :src="contact.img" />
                    </share-element>
                    <share-element class="name" key="name" :duration="duration" transform>
                        {{ contact.name }}
                    </share-element>
                    <view :class="'paragraph ' + (show ? 'enter' : '')">
                        共享元素是一种动画形式，类似于 flutter Hero动画，表现为元素像是在页面间穿越一样。该组件需与 page-container 组件结合使用。 使用时需在当前页放置 share-element
                        组件，同时在 page-container 容器中放置对应的 share-element 组件，对应关系通过属性值 key 映射。 当设置 page-container 显示时，transform 属性为 true
                        的共享元素会产生动画。当前页面容器退出时，会产生返回动画。
                        <view></view>
                        小程序如果在页面内进行复杂的界面设计（如在页面内弹出半屏的弹窗、在页面内加载一个全屏的子页面等），用户进行返回操作会直接离开当前页面，不符合用户预期，预期应为关闭当前弹出的组件。
                        为此提供“假页”容器组件，效果类似于 popup
                        弹出层，页面内存在该容器时，当用户进行返回操作，关闭该容器不关闭页面。返回操作包括三种情形，右滑手势、安卓物理返回键和调用 navigateBack 接口。
                    </view>
                    <button class="screen2-button" @tap="showPrev" v-if="show" hover-class="none">Click Me</button>
                </view>
            </view>
        </page-container>

        <!-- 共享元素。
共享元素是一种动画形式，类似于 flutter Hero动画，表现为元素像是在页面间穿越一样。该组件需与 page-container 组件结合使用。
使用时需在当前页放置 share-element 组件，同时在 page-container 容器中放置对应的 share-element 组件，对应关系通过属性值 key 映射。
当设置 page-container 显示时，transform 属性为 true 的共享元素会产生动画。当前页面容器退出时，会产生返回动画。 -->
        <!-- 小程序如果在页面内进行复杂的界面设计（如在页面内弹出半屏的弹窗、在页面内加载一个全屏的子页面等），用户进行返回操作会直接离开当前页面，不符合用户预期，预期应为关闭当前弹出的组件。 为此提供“假页”容器组件，效果类似于 popup 弹出层，页面内存在该容器时，当用户进行返回操作，关闭该容器不关闭页面。返回操作包括三种情形，右滑手势、安卓物理返回键和调用 navigateBack 接口。 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            contacts: [
                {
                    id: 1,
                    name: 'susu1',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 2,
                    name: 'susu2',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 3,
                    name: 'susu3',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 4,
                    name: 'susu4',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 5,
                    name: 'susu5',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 6,
                    name: 'susu6',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 7,
                    name: 'susu7',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                },
                {
                    id: 8,
                    name: 'susu8',
                    img: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                    phone: '0101 123456',
                    mobile: '0770 123456',
                    email: 'frank@emailionicsorter.com'
                }
            ],
            contact: {
                id: '',
                img: '',
                name: '',
                phone: '',
                email: ''
            },
            transformIdx: 0,
            position: 'center',
            duration: 300,
            show: false,
            overlay: false
        };
    },
    onLoad: function (options) {
        this.setData({
            contact: this.contacts[0]
        });
    },
    methods: {
        showNext(e) {
            const idx = e.currentTarget.dataset.idx;
            this.setData({
                show: true,
                contact: this.contacts[idx],
                transformIdx: idx
            });
        },

        showPrev() {
            this.setData({
                show: false
            });
        },

        onBeforeEnter(res) {
            console.log(res);
        },

        onEnter(res) {
            console.log(res);
        },

        onAfterEnter(res) {
            console.log(res);
        },

        onBeforeLeave(res) {
            console.log(res);
        },

        onLeave(res) {
            console.log(res);
        },

        onAfterLeave(res) {
            console.log(res);
        },

        onClickOverlay() {
            console.log('占位：函数 onClickOverlay 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
