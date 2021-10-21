import Vue from 'vue';
import MessageCom from './components/index.vue'
let MessageConstructor = Vue.extend(MessageCom);

let seed = 1;
let instance;
const zhMessage = function (options,callback) {
    if(!process.browser) return;
    options = options || {};
    if (typeof options === 'string') {
        options = {
            type: "info",
            message: options,
            duration: 2000,
            animateTime: 300
        };
    } else {
        options = {
            ...options,
            type: options.type || "info",
            duration: options.duration || 2000,
            animateTime: options.animateTime || 300
        }
    }
    let userOnClose = options.onClose||callback;
    instance = new MessageConstructor({
        el: document.createElement("div"),
        data: {
            ...options,
            visible: false
        }
    });
    let id = 'message_' + seed++;
    instance.id = id;
    let vm = instance.$mount();
    let el = vm.$el;
    document.body.appendChild(el); // 把生成的提示的dom插入body中
    vm.visible = true;
    let t1 = setTimeout(() => {
        clearTimeout(t1);
        vm.visible = false;  // 隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
        let t2 = setTimeout(() => {
            clearTimeout(t2);
            document.body.removeChild(el); //从body中移除dom
            instance.$destroy();
            vm = null // 设置为null，好让js垃圾回收算法回收，释放内存
            instance && (typeof userOnClose === 'function') && userOnClose();
        }, options.animateTime)
    }, options.duration)
    return instance;
};

['info', 'success', 'warning', 'error'].forEach(type => {
    zhMessage[type] = options => {
        if(!options&&!options.message) return;
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return zhMessage(options);
    };
});

export default zhMessage;