/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}                设置光标与输入框保持的距离(默认0)
 * @param                {Number}                设置最大高度(可选)
 */

import Vue from 'vue';
const autoTextarea = {
  install(Vue) {
    Vue.prototype.autoTextarea = (elem, min) => {
      let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = (type, callback) => {
          elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle
          ? name => {
              let val = elem.currentStyle[name];

              if (name === 'height' && val.search(/px/i) !== 1) {
                let rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px';
              }

              return val;
            }
          : name => {
              return getComputedStyle(elem, null)[name];
            },
        minHeight = Math.max(parseFloat(getStyle('height')), min);

      elem.style.resize = 'none';

      let change = function() {
        let scrollTop,
          height,
          padding = 0,
          style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
          padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        }
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
          height = elem.scrollHeight - padding;
          style.overflowY = 'hidden';

          style.height = height + 'px';
          scrollTop += parseInt(style.height) - elem.currHeight;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          elem.currHeight = parseInt(style.height);
        }
      };

      addEvent('propertychange', change);
      addEvent('input', change);
      addEvent('focus', change);
      change();
    };
  }
};

Vue.use(autoTextarea);
