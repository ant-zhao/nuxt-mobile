import Vue from 'vue';

import { Loading, MessageBox, Message } from 'element-ui';

Vue.use(Loading.directive);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
