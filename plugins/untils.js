export const arrDelDul = arr => {
  return Array.from(new Set(arr.flat(Infinity).sort((a, b) => a - b)));
};
export const mobileRight = phoneNum => {
  if (!phoneNum) return false;
  let isMobile = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
  return res;
};
/**
 * 调用App方法查看图片
 *  @param {Object} e - 点击事件
 */
export const appViewImg = e => {
  if (e.target.nodeName == 'IMG' || e.target.nodeName == 'img') {
    console.log(e.target.src);
    let imgSrc = e.target.src;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      watchImage(imgSrc);
      return;
    }
    if (/android/i.test(navigator.userAgent)) {
      javascript: PAATESSAYJS.watchImage(imgSrc, '');
      return;
    }
  }
};

/**
 * 判断设备类型
 * @param {*} UA - userAgent
 * @returns type - 设备类型
 *           env - 环境(微信/微博/qq)
 */
export const deviceType = UA => {
  const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA);
  const isIos = /iPhone|iPad|iPod/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isWechat = /MicroMessenger/i.test(UA);
  const isQQ = /QQ/i.test(UA);
  const isWeibo = /Weibo/i.test(UA);
  if (isMobile) {
    if (isIos) {
      if (isWechat) return { type: 'ios', env: 'wechat' };
      if (isQQ) return { type: 'ios', env: 'qq' };
      if (isWeibo) return { type: 'ios', env: 'weibo' };
      return { type: 'ios' };
    }

    if (isAndroid) {
      if (isWechat) return { type: 'android', env: 'wechat' };
      if (isQQ) return { type: 'android', env: 'qq' };
      if (isWeibo) return { type: 'android', env: 'weibo' };
      return { type: 'android' };
    }
  } else {
    return { type: 'pc' };
  }
};

/**
 * 千分位处理
 * @param {number} val - 处理的值
 * @returns {string} - 处理结果（含有小数和无小数）
 */
export const thousandFormat = val => {
  if (!val || val == '0.00') return '/ ';
  if (`${val}`.indexOf('.') >= 0) {
    return Number(val)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
    return `${val}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
  }
};
