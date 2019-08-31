import Vue from 'vue';
import moment from 'moment';
const handleData = {
  install(Vue) {
    Vue.prototype.handleData = {
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      $format(date, format) {
        if (typeof date == 'string') {
          if (date.indexOf('T') >= 0) {
            date = date.replace('T', ' ');
          }
          date = new Date(Date.parse(date.replace(/-/g, '/')));
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          S: date.getMilliseconds()
        };
        let w = [
          ['日', '一', '二', '三', '四', '五', '六'],
          ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        ];
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
          );
        }
        if (/(w+)/.test(format)) {
          format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
          }
        }
        return format;
      },
      pastDate(dateTimeStamp) {
        if (process.browser) {
          let result = '';
          let now = new Date().getTime();
          let diffValue = now - dateTimeStamp;
          if (diffValue < 0) {
            console.log('时间不对劲,服务器创建时间与当前时间不同步');
            return (result = '刚刚');
          }
          let dayC = diffValue / this.day;
          let hourC = diffValue / this.hour;
          let minC = diffValue / this.minute;
          if (parseInt(dayC) >= 1) {
            result = moment(new Date(dateTimeStamp)).format('YYYY-MM-DD');
          } else if (hourC >= 1) {
            result = '' + parseInt(hourC) + '小时前';
          } else if (minC >= 5) {
            result = '' + parseInt(minC) + '分钟前';
          } else result = '刚刚';
          return result;
        }
      }
    };
  }
};

Vue.use(handleData);
