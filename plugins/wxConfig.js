import { wxshareLink, wxshareData, wxShareRecord } from '@/assets/js/api'

export default {
  wxShowMenu: function (wxParam, urls, shareId) {
    wxshareLink({ urls }).then(res => {
      wx.config({
        debug: false, //生产环境需要关闭debug模式
        appId: res.appid, //appId通过微信服务号后台查看
        timestamp: res.timestamp, //生成签名的时间戳
        nonceStr: res.noncestr, //生成签名的随机字符串
        signature: res.signature, //签名
        jsApiList: [ //需要调用的JS接口列表
          'updateTimelineShareData', //分享给好友
          'updateAppMessageShareData', //分享到朋友圈
          'onMenuShareAppMessage', //1.0 分享到朋友
          'onMenuShareTimeline', //1.0分享到朋友圈
          'showMenuItems',
          'hideMenuItems'
        ]
      });

      wx.checkJsApi({
        jsApiList: ["showMenuItems"],
        success: function (res) {
          // wx.showMenuItems({

          //     menuList: [

          //         'menuItem:share:appMessage', //发送给朋友

          //         'menuItem:share:timeline' //分享到朋友圈

          //     ]

          // });

        }
      });

      wxshareData(wxParam).then(res => {
        wx.ready(function () {
          let shareData = {
            title: res.title, // 分享标题
            desc: res.desc, //分享描述
            link: res.urls, // 分享链接
            imgUrl: res.imgUrl, // 分享图标
            success: function () {
              if (shareId) {
                wxShareRecord({ batchId: shareId }).then(res => { })
              }
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              // alert('取消分享')
            }

          };
          if (wx.onMenuShareAppMessage) { //微信文档中提到这两个接口即将弃用，故判断
            wx.onMenuShareAppMessage(shareData);//1.0 分享到朋友
            wx.onMenuShareTimeline(shareData);//1.0分享到朋友圈
          } else {
            wx.updateAppMessageShareData(shareData);//1.4 分享到朋友
            wx.updateTimelineShareData(shareData);//1.4分享到朋友圈
          };

          //分享到朋友圈
          // wx.onMenuShareTimeline(shareData);

          //分享给朋友
          // wx.onMenuShareAppMessage(shareData);

        });
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.log(res, '微信分享错误')
        });
      })
    })
  }

}
