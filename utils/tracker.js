import api from './api';
module.exports = {
    /**
     * 埋点上报条数
     */
    reportNumber: 5,

    /**
     * 埋点
     * @param remark 标记
     */
    log(name = '') {
        let pages = getCurrentPages(),
            currentPage = pages[pages.length - 1],
            page = `/${currentPage.route}`,
            //当前页面路由
            tracker = uni.getStorageSync('tracker') || []; //对埋点数据缓存

        tracker.push({
            page,
            name,
            create_time: new Date().getTime() / 1000
        });
        uni.setStorageSync('tracker', tracker);

        if (tracker.length >= this.reportNumber) {
            this.reportLog();
        }
    },

    /**
     * 上报埋点数据
     */
    reportLog() {
        let data = uni.getStorageSync('tracker') || [],
            access_token = uni.getStorageSync('access_token') || '';

        if (data.length > 0 && access_token) {
            //清空埋点缓存数据
            uni.setStorageSync('tracker', []); //上报数据

            api.reportLog({
                data
            }).then((res) => {
                //上报失败， 重新加入缓存，等待下次上报
                if (res.code !== 10000) {
                    let nowLog = uni.getStorageSync('tracker') || [];
                    uni.setStorageSync('tracker', nowLog.concat(data));
                }
            });
        }
    }
};
