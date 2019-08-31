import Vue from 'vue';
import domHover from './domHover';
import setScroll from './domScroll';
import pageJump from './pageJump';
import seo from './seo';

Vue.mixin(domHover);
Vue.mixin(setScroll);
Vue.mixin(pageJump);
Vue.mixin(seo);
