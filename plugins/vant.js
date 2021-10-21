import Vue from 'vue';
import { 
    Button, Toast, Notify, Field, Popup, Tabs, Tab, Empty, Card, Row, Col, Icon, Pagination, Form, PasswordInput,
    Divider, Search, Uploader, Picker, CheckboxGroup, Checkbox, CellGroup, Cell, Skeleton, ImagePreview, Switch,
    Loading
} from 'vant';
import zhMessage from '@/components/zh-message';
Vue.use(Button);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Empty);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(PasswordInput);
Vue.use(Divider);
Vue.use(Search);
Vue.use(Uploader);
Vue.use(Picker);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(CellGroup);
Vue.use(Cell);
Vue.use(Skeleton);
Vue.use(Switch);
Vue.use(Loading);
Vue.use(Toast);   // 已自动挂载 Vue.prototype.$toast
Vue.use(Notify);  // 同上

Vue.prototype.$zhMessage = zhMessage;
Vue.prototype.$ImagePreview = ImagePreview;
