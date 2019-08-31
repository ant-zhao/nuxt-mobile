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
        document.body.style.paddingRight = '';
        document.body.parentElement.style.height = '';
        document.body.parentElement.style.overflow = ''; //出现滚动条
        document.removeEventListener('mousewheel', this.stopDef, false);
      }
    },
    $stopScroll() {
      if (process.browser) {
        document.body.style.paddingRight = '4px';
        document.body.parentElement.style.height = '100%';
        document.body.parentElement.style.overflow = 'hidden';
        document.addEventListener('mousewheel', this.stopDef, false); //禁止页面滑动
      }
    }
  }
};

export default setScroll;
