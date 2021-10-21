import Vue from "vue";
import axios from "axios";
import { getQueryString } from "@/utils/index";
const JSSha = require("jssha");
const APPID =
    window.location.host === "talk.paat.com"
        ? "wx94975cb7557f7620"
        : "wxd1d04a9e3134a709";
const APPSECRET =
    window.location.host === "talk.paat.com"
        ? "09ec62bbbfa3c4e86b7ad2a173f38458"
        : "66552d6a1076cdf4aa1a81b37dfb2e0e";
const WxShare = {
    install(Vue) {
        Vue.prototype.$WxShare = {
            getToken(APPID, APPSECRET) {
                return axios
                    .get(`/share/token/${APPID}`)
                    .then(res => res && res.data);
            },
            getTicket() {
                return axios
                    .get(`/share/jsapi/${APPID}?url=${window.location.href}`)
                    .then(res => res && res.data);
            },
            raw(args) {
                var keys = Object.keys(args);
                var newArgs = {};
                keys = keys.sort();

                keys.forEach(function(key) {
                    newArgs[key.toLowerCase()] = args[key];
                });

                var str = "";
                for (var k in newArgs) {
                    str += "&" + k + "=" + newArgs[k];
                }

                str = str.substr(1);
                return str;
            },
            getSign(ticket) {
                var timestamp = Math.floor(Date.now() / 1000);
                var nonceStr = Math.random()
                    .toString(36)
                    .substr(2, 15);
                var rawString = this.raw({
                    jsapi_ticket: ticket,
                    url: window.location.href,
                    nonceStr,
                    timestamp
                });
                var shaObj = new JSSha("SHA-1", "TEXT");
                shaObj.update(rawString);
                return {
                    nonceStr,
                    timestamp,
                    signature: shaObj.getHash("HEX"),
                    rawString: rawString
                };
            },
            wxConfig(config) {
                let from = getQueryString("from");
                let appinstall = getQueryString("appinstall");
                if (from || appinstall) {
                    //假如拼接上了
                    window.location.href = window.location.href.split("?")[0];
                }
                if (window && window.location) {
                    this.getTicket().then(data => {
                        if (data && data.data) {
                            const signature = data.data;
                            wx.config({
                                debug: false,
                                appId: APPID,
                                timestamp: signature.timestamp,
                                nonceStr: signature.nonce,
                                signature: signature.signature,
                                jsApiList: [
                                    "checkJsApi",
                                    "updateAppMessageShareData",
                                    "updateTimelineShareData",
                                    "onMenuShareWeibo",
                                    "onMenuShareQQ",
                                    "onMenuShareQZone",
                                    "onMenuShareTimeline",
                                    "onMenuShareAppMessage"
                                ]
                            });
                            wx.ready(function() {
                                const wxConfig = {
                                    ...config,
                                    link: window.location.href
                                };
                                wx.updateAppMessageShareData(wxConfig);
                                wx.updateTimelineShareData(wxConfig);
                                wx.onMenuShareWeibo(wxConfig);
                                wx.onMenuShareQQ(wxConfig);
                                wx.onMenuShareQZone(wxConfig);
                                wx.onMenuShareTimeline(wxConfig);
                                wx.onMenuShareAppMessage(wxConfig);
                            });
                        }
                    });
                }
            }
        };
    }
};

Vue.use(WxShare);
