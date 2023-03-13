<script>
// app.js
export default {
    data() {
        return {};
    },
    onLaunch() {
        // 展示本地存储能力
        uni.getSystemInfo({
            success: (res) => {
                let Height = res.windowHeight;
                this.globalData.Height = Height;
            }
        }); // 登录

        uni.login({
            success: (res) => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        }); // 自定义头部

        let menuButtonObject = uni.getMenuButtonBoundingClientRect();
        uni.getSystemInfo({
            success: (res) => {
                let statusBarHeight = res.statusBarHeight;
                let navTop = menuButtonObject.top;
                let navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width;
                let // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
                    navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
                //导航高度
                this.globalData.navHeight = navHeight; //导航栏总体高度

                this.globalData.navTop = navTop; //胶囊距离顶部距离

                this.globalData.navObj = menuButtonObject.height; //胶囊高度

                this.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)

                this.globalData.windowHeight = res.windowHeight;
                this.globalData.windowWidth = res.windowWidth; // console.log(navHeight,navTop,menuButtonObject.height,navObjWid)
            },

            fail(err) {
                console.log(err);
            }
        });
    },
    globalData: {
        userInfo: null
    }
};
</script>
<style>
@import './app.css';
</style>
