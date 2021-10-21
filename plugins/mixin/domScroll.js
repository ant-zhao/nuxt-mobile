const setScroll = {
    computed: {},
    methods: {
        $stopDef(e) {
            if (process.browser) {
                //防止浏览器默认行为(W3C)
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                //IE中组织浏览器行为
                else {
                    window.event.returnValue = fale;
                    return false;
                }
            }
        },
        $playScroll() {
            if (process.browser) {
                document.body.parentElement.style.height = "";
                document.body.parentElement.style.overflow = "";
                document.removeEventListener("mousewheel", this.stopDef, false);
            }
        },
        $stopScroll() {
            if (process.browser) {
                document.body.parentElement.style.height = "100%";
                document.body.parentElement.style.overflow = "hidden";
                document.addEventListener("mousewheel", this.stopDef, false); //禁止页面滑动
            }
        },
        $stopScale() {
            if(!process.browser)return;
            // 当一个手指放在屏幕上时，会触发 touchstart 事件。如果另一个手指又放在了屏幕上，则会先触发 gesturestart 事件
            document.addEventListener('gesturestart', function (e) {
                e.preventDefault();
            });
    
            // 在单个元素上单击两次 ===  dblclick
            document.addEventListener('dblclick', function (e) {
                e.preventDefault();
            });
    
            // 一个手指放在屏幕上时，会触发 touchstart 事件
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });
    
            // 如果一个或两个手指在屏幕上滑动，将会触发 gesturechange 事件
            // 但只要有一个手指移开， 就会触发 gestureend 事件，紧接着又会触发基于该手指的 touchend 事件
            var lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                var now = (new Date()).getTime();
                // 如果在300ms内触发两次touchend，就阻止默认事件
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
    }
};

export default setScroll;
