import Vue from 'vue';
import Router from 'vue-router';

//首页
import Index from '~/pages/index';

//普道信息页
import About from '~/pages/about';

//资讯页
import Zixun from '~/pages/industry';
import ZxColumn from '~/pages/zixun/column';
import artDetail from '~/pages/zixun/detail';

//视频
import Shipin from '~/pages/shipin/list';
import SpDetail from '~/pages/shipin/detail';

//问答页
import Wenda from '~/pages/wenda/list';
import WdDetail from '~/pages/wenda/detail';
import WdAsk from '~/pages/wenda/ask';

//登录页
import Sign from '~/pages/sign';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/about.html',
        name: 'about',
        component: About
      },

      {
        path: '/zixun',
        name: 'zixun',
        component: Zixun
      },
      {
        path: '/column:key',
        name: 'zixun-column',
        component: ZxColumn,
        children: [{ path: ':id', name: 'art-detail', component: artDetail }]
      },
      {
        path: '/shipi:key',
        name: 'shipin-list',
        component: Shipin,
        children: [{ path: ':id', name: 'shipin-detail', component: SpDetail }]
      },
      {
        path: '/wend:key',
        component: Wenda,
        children: [
          { path: 'ask', name: 'wenda-ask', component: WdAsk },
          { path: ':id', name: 'wenda-detail', component: WdDetail }
        ]
      },
      {
        path: '/sign.html',
        name: 'sign',
        component: Sign
      }
    ]
  });
}
